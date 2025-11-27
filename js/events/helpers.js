// Event Handlers - Shared Helper Functions
// Note: Core utilities (pickWeightedOutcome, getMapMultiplier) are now in js/core/Utils.js
// These functions remain for backward compatibility and are provided by Utils.js shims

// Generate a random item with specified rarity
// Delegates to cloneItem from EnemyGenerator.js for consistent scaling
function generateItem(rarity, difficulty = 1, isPyramid = false) {
    const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    return cloneItem(baseItem, rarity, isPyramid);
}
