import './Grid.css';

function Grid({ grid, onCellClick, feedbackAnimation }) {
    const getColorClass = (color) => {
        const colorMap = {
            red: 'cell-red',
            blue: 'cell-blue',
            yellow: 'cell-yellow',
            green: 'cell-green',
            purple: 'cell-purple'
        };
        return colorMap[color] || '';
    };

    const getAnimationClass = (row, col) => {
        if (!feedbackAnimation) return '';
        if (feedbackAnimation.row === row && feedbackAnimation.col === col) {
            return feedbackAnimation.type === 'success' ? 'correct-animation' : 'wrong-animation';
        }
        return '';
    };

    return (
        <div className="grid-container">
            <div className="grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                        {row.map((color, colIndex) => (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                className={`grid-cell ${getColorClass(color)} ${getAnimationClass(rowIndex, colIndex)}`}
                                onClick={() => onCellClick(rowIndex, colIndex)}
                                aria-label={`Cell ${rowIndex}-${colIndex}, ${color}`}
                            >
                                <div className="cell-inner">
                                    <div className="cell-glow"></div>
                                </div>
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            <div className="grid-overlay"></div>
        </div>
    );
}

export default Grid;
