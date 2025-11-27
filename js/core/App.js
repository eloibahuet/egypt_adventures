// ===== App.js - Global Application Container =====
// Centralizes globals to reduce window pollution
// Dependencies: DOMRefs (must be loaded first)

const App = {
    version: null,
    game: null,

    // Initialize App
    init() {
        this.version = DOMRefs.versionDisplay ? DOMRefs.versionDisplay.textContent.trim() : 'Version 1.0.0';
        console.log('App Version:', this.version);
    },

    // Central message display function
    showMessage(msg) {
        const output = DOMRefs.output;
        if (!output) return;

        const node = document.createElement('div');
        node.innerHTML = msg;
        output.appendChild(node);

        // Keep only last 20 messages
        while (output.children.length > 20) {
            output.removeChild(output.firstChild);
        }

        // Auto-scroll to bottom
        output.scrollTop = output.scrollHeight;
    },

    // Enable battle buttons when entering combat
    enableBattleButtons() {
        if (this.game && this.game.inBattle) {
            DOMRefs.enableBattle();
        }
    },

    // Disable movement during battle
    disableMovementButtons() {
        DOMRefs.disableMovement();
    },

    // Enable movement outside battle
    enableMovementButtons() {
        DOMRefs.enableMovement();
    }
};

// Expose globally
window.App = App;
