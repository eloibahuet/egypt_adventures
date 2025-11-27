// ===== GameState.js - Default State Shape =====
// Defines the initial state for a new game
// Dependencies: None

const GameState = {
    // Create a fresh player state
    createPlayerState() {
        return {
            hp: 100,
            max_hp: 100,
            shield: 0,
            stamina: 50,
            max_stamina: 50,
            potions: 2,
            gold: 500,
            luck_combat: 0,
            luck_gold: 0,
            level: 1,
            xp: 0,
            inventory: [],
            equipment: {
                weapon: null,
                armor: null,
                amulet: null
            },
            // Temporary effects
            oasisBlessing: 0,
            banditInfo: 0,
            compassEffect: 0
        };
    },

    // Create a fresh enemy state
    createEnemyState() {
        return {
            hp: 100,
            max_hp: 100,
            baseAttack: 10,
            turnsToAttack: 3,
            type: null,
            name: null,
            strength: 1
        };
    },

    // Create initial game flags
    createGameFlags() {
        return {
            inBattle: false,
            inPyramid: false,
            inShop: false,
            hasEncounteredCaravanRest: false
        };
    },

    // Create map state
    createMapState() {
        return {
            map_steps: 0,
            map_goal: 30,
            difficulty: 1,
            pyramidSteps: 0,
            pyramidMaxSteps: 8,
            normalMapSteps: 0
        };
    },

    // Create combo tracking state
    createComboState() {
        return {
            consecutivePrimarySymbol: null,
            consecutivePrimaryCount: 0
        };
    },

    // XP curve calculation
    xpForNextLevel(level) {
        if (level >= 99) return Infinity;
        return Math.floor(100 * level * Math.pow(1.06, level - 1));
    }
};

// Expose globally
window.GameState = GameState;
