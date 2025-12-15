import { useState } from 'react';
import './HypothesisModal.css';

function HypothesisModal({ activeRules, onClose }) {
    const [userHypothesis, setUserHypothesis] = useState('');
    const [showRules, setShowRules] = useState(false);

    const handleSubmit = () => {
        setShowRules(true);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                <h2 className="modal-title">Vos Hypothèses</h2>

                {!showRules ? (
                    <>
                        <p className="modal-description">
                            Décrivez les règles que vous pensez avoir découvertes :
                        </p>

                        <textarea
                            className="hypothesis-input"
                            placeholder="Ex: Cliquer sur des cases adjacentes de même couleur donne des points..."
                            value={userHypothesis}
                            onChange={(e) => setUserHypothesis(e.target.value)}
                            rows={6}
                        />

                        <div className="modal-actions">
                            <button className="modal-button secondary" onClick={onClose}>
                                Annuler
                            </button>
                            <button className="modal-button primary" onClick={handleSubmit}>
                                Révéler les règles
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="hypothesis-section">
                            <h3 className="section-title">Votre Hypothèse :</h3>
                            <div className="hypothesis-box">
                                {userHypothesis || "Aucune hypothèse formulée"}
                            </div>
                        </div>

                        <div className="rules-section">
                            <h3 className="section-title">Règles Réelles :</h3>
                            <div className="rules-list">
                                {activeRules.map((rule, index) => (
                                    <div key={rule.id} className="rule-item">
                                        <div className="rule-number">{index + 1}</div>
                                        <div className="rule-description">{rule.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="modal-button primary" onClick={onClose}>
                                Continuer à jouer
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default HypothesisModal;
