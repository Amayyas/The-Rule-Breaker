import './LevelComplete.css';

function LevelComplete({ level, score, onNextLevel, onRestart }) {
    return (
        <div className="modal-overlay">
            <div className="level-complete-content">
                <div className="complete-icon">🎉</div>

                <h2 className="complete-title">Niveau {level} Terminé !</h2>

                <div className="complete-stats">
                    <div className="stat-item">
                        <div className="stat-label">Score Final</div>
                        <div className="stat-value">{score}</div>
                    </div>
                </div>

                <p className="complete-message">
                    Vous avez déchiffré les règles cachées ! Prêt pour le prochain défi ?
                </p>

                <div className="complete-actions">
                    <button className="modal-button secondary" onClick={onRestart}>
                        ↻ Recommencer
                    </button>
                    <button className="modal-button primary" onClick={onNextLevel}>
                        Niveau Suivant →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LevelComplete;
