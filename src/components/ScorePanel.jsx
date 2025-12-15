import './ScorePanel.css';

function ScorePanel({ score, level, actionCount }) {
    return (
        <div className="score-panel">
            <div className="score-item score-main">
                <div className="score-label">Score</div>
                <div className="score-value">{score}</div>
            </div>

            <div className="score-divider"></div>

            <div className="score-item">
                <div className="score-label">Niveau</div>
                <div className="score-value score-small">{level}</div>
            </div>

            <div className="score-divider"></div>

            <div className="score-item">
                <div className="score-label">Actions</div>
                <div className="score-value score-small">{actionCount}</div>
            </div>
        </div>
    );
}

export default ScorePanel;
