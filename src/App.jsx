import { useState, useEffect, useRef } from 'react';
import Grid from './components/Grid';
import ScorePanel from './components/ScorePanel';
import ActionHistory from './components/ActionHistory';
import HintPanel from './components/HintPanel';
import HypothesisModal from './components/HypothesisModal';
import LevelComplete from './components/LevelComplete';
import { generateRules, evaluateAction } from './gameRules';
import './App.css';

function App() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState([]);
  const [activeRules, setActiveRules] = useState([]);
  const [actionHistory, setActionHistory] = useState([]);
  const [hints, setHints] = useState([]);
  const [showHypothesisModal, setShowHypothesisModal] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [actionCount, setActionCount] = useState(0);
  const [feedbackAnimation, setFeedbackAnimation] = useState(null);

  const audioContextRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  // Initialize game
  useEffect(() => {
    initializeLevel(level);
  }, [level]);

  const initializeLevel = (lvl) => {
    // Generate random grid
    const colors = ['red', 'blue', 'yellow', 'green', 'purple'];
    const newGrid = Array(5).fill(null).map(() =>
      Array(5).fill(null).map(() => colors[Math.floor(Math.random() * colors.length)])
    );

    setGrid(newGrid);
    setActiveRules(generateRules(lvl));
    setActionHistory([]);
    setHints([]);
    setActionCount(0);
    setShowLevelComplete(false);
  };

  // Play sound effect
  const playSound = (type) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'success') {
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } else if (type === 'fail') {
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } else if (type === 'neutral') {
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    }
  };

  const handleCellClick = (row, col) => {
    const action = {
      row,
      col,
      color: grid[row][col],
      timestamp: Date.now()
    };

    const result = evaluateAction(action, grid, actionHistory, activeRules);
    const newScore = Math.max(0, score + result.points);

    setScore(newScore);
    setActionHistory(prev => [...prev, { ...action, points: result.points }]);
    setActionCount(prev => prev + 1);

    // Sound and animation feedback
    if (result.points > 0) {
      playSound('success');
      setFeedbackAnimation({ type: 'success', row, col });
    } else if (result.points < 0) {
      playSound('fail');
      setFeedbackAnimation({ type: 'fail', row, col });
    } else {
      playSound('neutral');
    }

    setTimeout(() => setFeedbackAnimation(null), 500);

    // Reveal hints after certain number of actions
    if (actionCount + 1 === 10 && hints.length === 0) {
      setHints([activeRules[0].hint]);
    } else if (actionCount + 1 === 20 && hints.length === 1) {
      setHints(prev => [...prev, activeRules[1]?.hint || 'Continue exploring...']);
    } else if (actionCount + 1 === 30 && hints.length === 2 && activeRules[2]) {
      setHints(prev => [...prev, activeRules[2].hint]);
    }

    // Level completion after 40 actions with positive score
    if (actionCount + 1 >= 40 && newScore > 50) {
      setTimeout(() => setShowLevelComplete(true), 1000);
    }
  };

  const handleNextLevel = () => {
    setLevel(prev => prev + 1);
    setScore(0);
  };

  const handleRestart = () => {
    setLevel(1);
    setScore(0);
    initializeLevel(1);
  };

  const handleRevealRules = () => {
    const allHints = activeRules.map(rule => rule.hint);
    setHints(allHints);
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="glitch" data-text="THE RULE BREAKER">THE RULE BREAKER</span>
          </h1>
          <p className="app-subtitle">Découvrez les règles cachées...</p>
        </header>

        <div className="game-layout">
          <div className="main-panel">
            <ScorePanel
              score={score}
              level={level}
              actionCount={actionCount}
            />

            <Grid
              grid={grid}
              onCellClick={handleCellClick}
              feedbackAnimation={feedbackAnimation}
            />

            <div className="action-buttons">
              <button
                className="hypothesis-button"
                onClick={() => setShowHypothesisModal(true)}
              >
                💡 Je pense avoir compris !
              </button>

              {actionCount >= 15 && (
                <button
                  className="hint-button"
                  onClick={handleRevealRules}
                >
                  🔍 Révéler un indice
                </button>
              )}
            </div>
          </div>

          <div className="side-panel">
            <ActionHistory history={actionHistory.slice(-5)} />
            <HintPanel hints={hints} />
          </div>
        </div>

        <footer className="app-footer">
          <button className="restart-button" onClick={handleRestart}>
            ↻ Recommencer
          </button>
          <div className="footer-info">
            Actions: {actionCount} | Règles actives: {activeRules.length}
          </div>
        </footer>
      </div>

      {showHypothesisModal && (
        <HypothesisModal
          activeRules={activeRules}
          onClose={() => setShowHypothesisModal(false)}
        />
      )}

      {showLevelComplete && (
        <LevelComplete
          level={level}
          score={score}
          onNextLevel={handleNextLevel}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
