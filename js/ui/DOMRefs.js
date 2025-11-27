// ===== DOMRefs.js - Centralized DOM Element References =====
// Provides lazy-loaded access to common DOM elements
// Dependencies: None (loaded early)

const DOMRefs = {
    // Cached references
    _cache: {},

    // Clear cache (useful for testing or dynamic content)
    clearCache() {
        this._cache = {};
    },

    // Get element with caching
    _get(id) {
        if (!this._cache[id]) {
            this._cache[id] = document.getElementById(id);
        }
        return this._cache[id];
    },

    // Game output area
    get output() { return this._get('game-output'); },
    get input() { return this._get('game-input'); },
    get submitBtn() { return this._get('submit-btn'); },

    // Slot machine elements
    get spinBtn() { return this._get('spin-btn'); },
    get stopBtn() { return this._get('stop-btn'); },
    get autoSpinBtn() { return this._get('auto-spin-btn'); },
    get fleeBtn() { return this._get('flee-btn'); },
    get reels() {
        if (!this._cache._reels) {
            this._cache._reels = [
                this._get('reel-0'),
                this._get('reel-1'),
                this._get('reel-2')
            ];
        }
        return this._cache._reels;
    },

    // Movement buttons
    get moveFront() { return this._get('move-front'); },
    get moveLeft() { return this._get('move-left'); },
    get moveRight() { return this._get('move-right'); },

    // Status displays
    get playerStatus() { return this._get('player-status'); },
    get enemyStatus() { return this._get('enemy-status'); },
    get mapSteps() { return this._get('map-steps'); },
    get statusSummary() { return this._get('status-summary'); },

    // Panels
    get equipmentPanel() { return this._get('equipment-panel'); },
    get equipContent() { return this._get('equip-content'); },
    get closeEquipBtn() { return this._get('close-equip'); },
    get blackmarketPanel() { return this._get('blackmarket-panel'); },
    get blackmarketItems() { return this._get('blackmarket-items'); },
    get closeBlackmarketBtn() { return this._get('close-blackmarket'); },

    // Save/Load
    get saveBtn() { return this._get('save-btn'); },
    get loadBtn() { return this._get('load-btn'); },

    // Music controls
    get musicToggle() { return this._get('music-toggle'); },
    get volumeSlider() { return this._get('volume-slider'); },
    get volumeDisplay() { return this._get('volume-display'); },

    // Language
    get languageSelect() { return this._get('language-select'); },
    get versionDisplay() { return this._get('version-display'); },

    // Helper: disable movement buttons
    disableMovement() {
        if (this.moveFront) this.moveFront.disabled = true;
        if (this.moveLeft) this.moveLeft.disabled = true;
        if (this.moveRight) this.moveRight.disabled = true;
    },

    // Helper: enable movement buttons
    enableMovement() {
        if (this.moveFront) this.moveFront.disabled = false;
        if (this.moveLeft) this.moveLeft.disabled = false;
        if (this.moveRight) this.moveRight.disabled = false;
    },

    // Helper: disable battle buttons
    disableBattle() {
        if (this.spinBtn) this.spinBtn.disabled = true;
        if (this.stopBtn) this.stopBtn.disabled = true;
        if (this.autoSpinBtn) this.autoSpinBtn.disabled = true;
    },

    // Helper: enable battle buttons
    enableBattle() {
        if (this.spinBtn) this.spinBtn.disabled = false;
        if (this.autoSpinBtn) this.autoSpinBtn.disabled = false;
    }
};

// Expose globally
window.DOMRefs = DOMRefs;
