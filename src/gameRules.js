// Rule Bank - Different types of rules the AI can use
export const RULE_BANK = {
  // Color-based rules
  sameColorAdjacent: {
    id: 'sameColorAdjacent',
    description: 'Cliquer sur des cases adjacentes de même couleur donne +10 points',
    hint: 'Les cases de même couleur semblent liées...',
    check: (action, grid, history) => {
      if (history.length === 0) return { valid: false, points: 0 };
      const lastAction = history[history.length - 1];
      const current = action;
      
      // Check if adjacent
      const isAdjacent = Math.abs(current.row - lastAction.row) + Math.abs(current.col - lastAction.col) === 1;
      
      if (isAdjacent && current.color === lastAction.color) {
        return { valid: true, points: 10 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  alternatingColors: {
    id: 'alternatingColors',
    description: 'Alterner entre deux couleurs différentes donne +8 points',
    hint: 'La variété est récompensée...',
    check: (action, grid, history) => {
      if (history.length === 0) return { valid: false, points: 0 };
      const lastAction = history[history.length - 1];
      
      if (action.color !== lastAction.color) {
        return { valid: true, points: 8 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  diagonalPenalty: {
    id: 'diagonalPenalty',
    description: 'Cliquer en diagonal fait perdre -5 points',
    hint: 'Évitez les mouvements en diagonale...',
    check: (action, grid, history) => {
      if (history.length === 0) return { valid: false, points: 0 };
      const lastAction = history[history.length - 1];
      const current = action;
      
      // Check if diagonal
      const isDiagonal = Math.abs(current.row - lastAction.row) === 1 && 
                         Math.abs(current.col - lastAction.col) === 1;
      
      if (isDiagonal) {
        return { valid: true, points: -5 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  cornerBonus: {
    id: 'cornerBonus',
    description: 'Cliquer sur les coins donne +12 points',
    hint: 'Les angles cachent quelque chose...',
    check: (action, grid, history) => {
      const corners = [
        [0, 0], [0, 4], [4, 0], [4, 4]
      ];
      
      const isCorner = corners.some(([r, c]) => r === action.row && c === action.col);
      
      if (isCorner) {
        return { valid: true, points: 12 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  centerPenalty: {
    id: 'centerPenalty',
    description: 'Cliquer sur le centre fait perdre -8 points',
    hint: 'Le centre est dangereux...',
    check: (action, grid, history) => {
      if (action.row === 2 && action.col === 2) {
        return { valid: true, points: -8 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  edgeBonus: {
    id: 'edgeBonus',
    description: 'Cliquer sur les bords (non-coins) donne +6 points',
    hint: 'Restez sur les bords...',
    check: (action, grid, history) => {
      const isEdge = (action.row === 0 || action.row === 4 || action.col === 0 || action.col === 4);
      const isCorner = (action.row === 0 || action.row === 4) && (action.col === 0 || action.col === 4);
      
      if (isEdge && !isCorner) {
        return { valid: true, points: 6 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  samePositionPenalty: {
    id: 'samePositionPenalty',
    description: 'Cliquer deux fois de suite sur la même case fait perdre -10 points',
    hint: 'Ne répétez pas vos actions...',
    check: (action, grid, history) => {
      if (history.length === 0) return { valid: false, points: 0 };
      const lastAction = history[history.length - 1];
      
      if (action.row === lastAction.row && action.col === lastAction.col) {
        return { valid: true, points: -10 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  redBlueCombo: {
    id: 'redBlueCombo',
    description: 'Alterner rouge et bleu donne un bonus de +15 points',
    hint: 'Rouge et bleu forment une combinaison puissante...',
    check: (action, grid, history) => {
      if (history.length === 0) return { valid: false, points: 0 };
      const lastAction = history[history.length - 1];
      
      const colors = ['red', 'blue'];
      const lastColorIndex = colors.indexOf(lastAction.color);
      const currentColorIndex = colors.indexOf(action.color);
      
      if (lastColorIndex !== -1 && currentColorIndex !== -1 && lastColorIndex !== currentColorIndex) {
        return { valid: true, points: 15 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  threeInRow: {
    id: 'threeInRow',
    description: 'Cliquer sur 3 cases consécutives de même couleur donne +20 points',
    hint: 'La consistance est récompensée...',
    check: (action, grid, history) => {
      if (history.length < 2) return { valid: false, points: 0 };
      
      const last1 = history[history.length - 1];
      const last2 = history[history.length - 2];
      
      if (action.color === last1.color && last1.color === last2.color) {
        return { valid: true, points: 20 };
      }
      return { valid: false, points: 0 };
    }
  },
  
  yellowAvoid: {
    id: 'yellowAvoid',
    description: 'Cliquer sur une case jaune fait perdre -7 points',
    hint: 'Le jaune semble dangereux...',
    check: (action, grid, history) => {
      if (action.color === 'yellow') {
        return { valid: true, points: -7 };
      }
      return { valid: false, points: 0 };
    }
  }
};

// Get a random subset of rules for a level
export function generateRules(difficulty = 1) {
  const allRuleIds = Object.keys(RULE_BANK);
  const numRules = Math.min(2 + difficulty - 1, 5); // Level 1: 2 rules, Level 2: 3 rules, etc.
  
  // Shuffle and select
  const shuffled = allRuleIds.sort(() => Math.random() - 0.5);
  const selectedIds = shuffled.slice(0, numRules);
  
  return selectedIds.map(id => RULE_BANK[id]);
}

// Evaluate an action against all active rules
export function evaluateAction(action, grid, history, activeRules) {
  let totalPoints = 0;
  const triggeredRules = [];
  
  activeRules.forEach(rule => {
    const result = rule.check(action, grid, history);
    if (result.valid) {
      totalPoints += result.points;
      triggeredRules.push({
        ruleId: rule.id,
        points: result.points
      });
    }
  });
  
  return {
    points: totalPoints,
    triggeredRules
  };
}
