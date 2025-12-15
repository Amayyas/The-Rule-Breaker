import './HintPanel.css';

function HintPanel({ hints }) {
    return (
        <div className="hint-panel">
            <h3 className="hint-title">
                <span className="hint-icon">💡</span>
                Indices
            </h3>

            {hints.length === 0 ? (
                <div className="hint-empty">
                    <div className="empty-icon">🔒</div>
                    <p>Les indices apparaîtront après quelques essais...</p>
                </div>
            ) : (
                <div className="hint-list">
                    {hints.map((hint, index) => (
                        <div
                            key={index}
                            className="hint-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="hint-number">{index + 1}</div>
                            <div className="hint-text">{hint}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HintPanel;
