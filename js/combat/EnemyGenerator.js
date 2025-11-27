// ===== EnemyGenerator.js - Item Generation & Loot Utilities =====
// Handles item cloning with rarity scaling and pyramid affixes
// Dependencies: QUALITY_BONUS, PYRAMID_AFFIXES (from data.js)

/**
 * Standard rarities in order
 */
const RARITIES = ['common', 'rare', 'excellent', 'epic', 'legendary'];

/**
 * Rarity scale multipliers for attribute scaling
 */
const RARITY_SCALE = {
    common: 1,
    rare: 1.8,
    excellent: 1.5,
    epic: 2.2,
    legendary: 3.0
};

/**
 * Bonus count by rarity for quality bonuses
 */
const BONUS_COUNT_BY_RARITY = {
    common: 0,
    rare: 2,
    excellent: 1,
    epic: 3,
    legendary: 4
};

/**
 * Pick a rarity based on weighted probabilities
 * @param {number[]} weights - Array of 5 weights for [common, rare, excellent, epic, legendary]
 * @returns {string} Selected rarity
 */
function pickWeightedRarity(weights) {
    const total = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * total;
    let acc = 0;
    for (let i = 0; i < weights.length; i++) {
        acc += weights[i];
        if (r < acc) return RARITIES[i];
    }
    return 'common';
}

/**
 * Clone item with rarity scaling and pyramid affixes
 * @param {Object} base - Base item template from ITEMS
 * @param {string} rarity - Item rarity
 * @param {boolean} isPyramid - Whether this is a pyramid item
 * @returns {Object} Cloned item with applied bonuses
 */
function cloneItem(base, rarity, isPyramid = false) {
    const it = Object.assign({}, base);
    it.rarity = rarity;

    // Scale attributes based on rarity
    const scale = RARITY_SCALE[rarity] || 1;
    if (it.atk) it.atk = Math.max(1, Math.round(it.atk * scale));
    if (it.def) it.def = Math.max(1, Math.round(it.def * scale));
    if (it.luck_gold) it.luck_gold = Math.max(1, Math.round(it.luck_gold * scale));
    if (it.luck_combat) it.luck_combat = Math.max(1, Math.round(it.luck_combat * scale));
    if (it.max_hp_bonus) it.max_hp_bonus = Math.max(1, Math.round(it.max_hp_bonus * scale));

    // Add quality bonuses based on rarity
    const bonusCount = BONUS_COUNT_BY_RARITY[rarity] || 0;
    if (bonusCount > 0 && QUALITY_BONUS[it.slot] && QUALITY_BONUS[it.slot][rarity]) {
        const pool = QUALITY_BONUS[it.slot][rarity].slice();
        for (let n = 0; n < bonusCount && pool.length > 0; n++) {
            const idx = Math.floor(Math.random() * pool.length);
            const bonus = pool.splice(idx, 1)[0];
            Object.assign(it, bonus);
        }
    }

    // Add pyramid affix for non-common items
    if (isPyramid && rarity !== 'common') {
        const affix = PYRAMID_AFFIXES[Math.floor(Math.random() * PYRAMID_AFFIXES.length)];
        it.affix = affix.id;
        it.affixName = affix.name;
        it.affixColor = affix.color;
        for (const key in affix.bonus) {
            if (it[key]) {
                it[key] += affix.bonus[key];
            } else {
                it[key] = affix.bonus[key];
            }
        }
        it.isPyramid = true;
    }

    return it;
}

// Expose globally for other modules
window.cloneItem = cloneItem;
window.pickWeightedRarity = pickWeightedRarity;
window.RARITIES = RARITIES;
