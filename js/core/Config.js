// ===== Config.js - Gameplay Tuning Constants =====
// Centralizes magic numbers for easy balancing
// Dependencies: None

const Config = {
    // Battle system constants (from battle.js)
    BATTLE: {
        // Base multipliers for pyramid vs normal enemies
        HP_MULT: { pyramid: 3.0, normal: 2.0 },
        ATK_MULT: { pyramid: 2.5, normal: 1.0 },
        STRENGTH_MULT: { pyramid: 1.5, normal: 1.5 },

        // Difficulty scaling per map level (pyramid only)
        HP_SCALE_PER_DIFF: 0.5,
        ATK_SCALE_PER_DIFF: 0.3,
        STRENGTH_SCALE_PER_DIFF: 0.2,

        // Enemy type base stats
        MONSTER: { hp: 100, hpPerDiff: 10, atk: 10, atkPerDiff: 2, strength: 1.0 },
        ELITE: { hp: 150, hpPerDiff: 20, atk: 15, atkPerDiff: 5, strength: 1.6 },
        MINI_BOSS: { hp: 250, hpPerDiff: 40, atk: 25, atkPerDiff: 8, strength: 2.4 },

        // Mini-boss pyramid reduction
        MINI_BOSS_PYRAMID_REDUCTION: 0.8,

        // Combat bonuses
        TRIPLE_BONUS: 2.5,
        PYRAMID_XP_MULTIPLIER: 15,

        // Flee mechanics
        FLEE_BASE_CHANCE: 0.4,
        FLEE_LUCK_BONUS: 0.02,
        FLEE_MAX_CHANCE: 0.9
    },

    // Slot machine constants (from slotMachine.js)
    SLOT: {
        SPIN_SPEED_BASE: 30,
        SPIN_SPEED_VARIANCE: 20,
        SYMBOL_REPEATS: 8,
        AUTO_SPIN_INTERVAL: 900,
        INITIAL_SPIN_DELAY: 900,
        BUTTON_ENABLE_DELAY: 200
    },

    // Shop constants (from shops.js)
    SHOP: {
        // Black market
        BLACK_MARKET_MAX_PURCHASES: 2,
        BLACK_MARKET_PRICE_MIN: 149,
        BLACK_MARKET_PRICE_RANGE: 880,  // max = min + range
        BLACK_MARKET_ITEMS_COUNT: 3,

        // Rarity weights for black market
        RARITY_WEIGHTS: [
            { r: 'common', w: 40 },
            { r: 'rare', w: 30 },
            { r: 'excellent', w: 20 },
            { r: 'epic', w: 8 },
            { r: 'legendary', w: 2 }
        ]
    },

    // XP and leveling constants (from GameState.js)
    XP: {
        BASE: 100,
        CURVE: 1.06,
        MAX_LEVEL: 99
    },

    // UI constants (from App.js)
    UI: {
        MESSAGE_LIMIT: 20
    },

    // Map progression
    MAP: {
        DEFAULT_GOAL: 30,
        PYRAMID_MAX_STEPS: 8
    }
};

// Expose globally
window.Config = Config;
