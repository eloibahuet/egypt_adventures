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

// Generate a random item with specified rarity
// Delegates to cloneItem from EnemyGenerator.js for consistent scaling
function generateItem(rarity, difficulty = 1, isPyramid = false) {
    const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    return cloneItem(baseItem, rarity, isPyramid);
}
