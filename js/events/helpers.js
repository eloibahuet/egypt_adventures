// Event Handlers - Shared Helper Functions

// Pick a weighted random outcome from an array of {weight, ...} objects
function pickWeightedOutcome(outcomes) {
    const total = outcomes.reduce((s, o) => s + o.weight, 0);
    let r = Math.random() * total;
    for (const o of outcomes) {
        r -= o.weight;
        if (r <= 0) return o;
    }
    return outcomes[outcomes.length - 1];
}

// Get map difficulty multiplier (exponential scaling)
function getMapMultiplier(difficulty) {
    return Math.pow(2, difficulty - 1);
}

// Generate an item with specified rarity and difficulty scaling
function generateItem(rarity, difficulty = 1, isPyramid = false) {
    const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const item = Object.assign({}, baseItem);
    item.rarity = rarity;

    // Scale attributes based on rarity
    const scaleMap = { common: 1, rare: 1.5, excellent: 1.8, epic: 2.2, legendary: 3.0 };
    const scale = scaleMap[rarity] || 1;

    if (item.atk) item.atk = Math.max(1, Math.round(item.atk * scale));
    if (item.def) item.def = Math.max(1, Math.round(item.def * scale));
    if (item.luck_gold) item.luck_gold = Math.max(1, Math.round(item.luck_gold * scale));
    if (item.luck_combat) item.luck_combat = Math.max(1, Math.round(item.luck_combat * scale));
    if (item.max_hp_bonus) item.max_hp_bonus = Math.max(1, Math.round(item.max_hp_bonus * scale));

    // Add quality bonuses based on rarity
    const bonusCountMap = { common: 0, rare: 2, excellent: 1, epic: 3, legendary: 4 };
    const bonusCount = bonusCountMap[rarity] || 0;

    if (bonusCount > 0 && QUALITY_BONUS[item.slot] && QUALITY_BONUS[item.slot][rarity]) {
        const pool = QUALITY_BONUS[item.slot][rarity].slice();
        for (let n = 0; n < bonusCount && pool.length > 0; n++) {
            const idx = Math.floor(Math.random() * pool.length);
            const bonus = pool.splice(idx, 1)[0];
            Object.assign(item, bonus);
        }
    }

    // Add pyramid affixes if applicable
    if (isPyramid && rarity !== 'common') {
        const affix = PYRAMID_AFFIXES[Math.floor(Math.random() * PYRAMID_AFFIXES.length)];
        item.affix = affix.id;
        item.affixName = affix.name;
        item.affixColor = affix.color;
        for (const key in affix.bonus) {
            item[key] = (item[key] || 0) + affix.bonus[key];
        }
        item.isPyramid = true;
    }

    return item;
}
