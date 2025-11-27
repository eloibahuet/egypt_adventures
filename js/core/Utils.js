// ===== Utils.js - Centralized Utility Functions =====
// Groups commonly used utilities to reduce global pollution
// Dependencies: None (standalone utilities)

const Utils = {
    /**
     * Pick a weighted random item from an array of {weight, ...} objects
     * @param {Object[]} outcomes - Array of objects with weight property
     * @returns {Object} Selected outcome
     */
    pickWeightedOutcome(outcomes) {
        const total = outcomes.reduce((s, o) => s + o.weight, 0);
        let r = Math.random() * total;
        for (const o of outcomes) {
            r -= o.weight;
            if (r <= 0) return o;
        }
        return outcomes[outcomes.length - 1];
    },

    /**
     * Get map difficulty multiplier (exponential scaling)
     * @param {number} difficulty - Current map difficulty level
     * @returns {number} Multiplier value
     */
    getMapMultiplier(difficulty) {
        return Math.pow(2, difficulty - 1);
    },

    /**
     * Pick a rarity based on weighted probabilities
     * @param {number[]} weights - Array of 5 weights for [common, rare, excellent, epic, legendary]
     * @returns {string} Selected rarity
     */
    pickWeightedRarity(weights) {
        const total = weights.reduce((s, w) => s + w, 0);
        let r = Math.random() * total;
        let acc = 0;
        for (let i = 0; i < weights.length; i++) {
            acc += weights[i];
            if (r < acc) return RARITIES[i];
        }
        return 'common';
    },

    /**
     * Pick a weighted symbol based on SYMBOL_WEIGHTS
     * @returns {string} Selected symbol
     */
    pickWeightedSymbol() {
        const pool = [];
        for (const s of SYMBOLS) {
            const w = SYMBOL_WEIGHTS[s] || 1;
            for (let i = 0; i < w; i++) pool.push(s);
        }
        return pool[Math.floor(Math.random() * pool.length)];
    },

    /**
     * Get symbol height based on screen width (responsive)
     * @returns {number} Symbol height in pixels
     */
    getSymbolHeight() {
        const width = window.innerWidth;
        if (width <= 400) return 41;
        if (width <= 600) return 60;
        return 60;
    },

    /**
     * Get highlight box top position (responsive)
     * @returns {number} Top position in pixels
     */
    getHighlightTop() {
        const width = window.innerWidth;
        if (width <= 400) return 20.5;
        return 30;
    },

    /**
     * Clamp a number between min and max
     * @param {number} value - Value to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped value
     */
    clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    },

    /**
     * Generate a random integer between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// Expose globally
window.Utils = Utils;

// Backward compatibility - expose individual functions globally
// TODO: Remove these after updating all callsites to use Utils.method()
window.pickWeightedOutcome = Utils.pickWeightedOutcome.bind(Utils);
window.getMapMultiplier = Utils.getMapMultiplier.bind(Utils);
window.pickWeightedRarity = Utils.pickWeightedRarity.bind(Utils);
window.pickWeightedSymbol = Utils.pickWeightedSymbol.bind(Utils);
window.getSymbolHeight = Utils.getSymbolHeight.bind(Utils);
window.getHighlightTop = Utils.getHighlightTop.bind(Utils);
