import './ActionHistory.css';

function ActionHistory({ history }) {
    const getResultIcon = (points) => {
        if (points > 0) return '✓';
        if (points < 0) return '✗';
        return '○';
    };

    const getResultClass = (points) => {
        if (points > 0) return 'positive';
        if (points < 0) return 'negative';
        return 'neutral';
    };

    const formatColor = (color) => {
        const colorEmojis = {
            red: '🔴',
            blue: '🔵',
            yellow: '🟡',
            green: '🟢',
            purple: '🟣'
        };
        return colorEmojis[color] || color;
    };

    return (
        <div className="action-history">
            <h3 className="history-title">Historique</h3>

            {history.length === 0 ? (
                <div className="history-empty">
                    <div className="empty-icon">📋</div>
                    <p>Aucune action pour l'instant...</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map((action, index) => (
                        <div
                            key={action.timestamp}
                            className={`history-item ${getResultClass(action.points)}`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="history-icon">
                                {getResultIcon(action.points)}
                            </div>

                            <div className="history-details">
                                <div className="history-position">
                                    {formatColor(action.color)} [{action.row},{action.col}]
                                </div>
                                <div className="history-points">
                                    {action.points > 0 ? '+' : ''}{action.points}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ActionHistory;
