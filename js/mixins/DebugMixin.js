// ===== Debug Module =====
// Handles debug panel and cheat functions
// Dependencies: showMessage (global), DOMRefs (global), ITEMS (from data.js), QUALITY_BONUS (from data.js)

/**
 * Debug system - provides debug panel and cheat functions
 * Initialized via DebugSystem.init(game) after game is created
 */
const DebugSystem = {
	game: null,
	debugPanel: null,
	debugMode: false,

	/**
	 * Initialize debug system
	 * @param {Game} gameInstance - The game instance to debug
	 */
	init(gameInstance) {
		this.game = gameInstance;
		this.debugPanel = this.createDebugPanel();
		this.attachEventListeners();
		this.attachKeyboardShortcut();

		// Log availability
		console.log('%c🛠️ DEBUG MODE AVAILABLE', 'color: #0f0; font-size: 16px; font-weight: bold;');
		console.log('%cPress Ctrl+Shift+D to toggle debug panel', 'color: #0ff; font-size: 14px;');
	},

	/**
	 * Create the debug panel DOM element
	 * @returns {HTMLElement} The debug panel element
	 */
	createDebugPanel() {
		const panel = document.createElement('div');
		panel.id = 'debug-panel';
		panel.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: rgba(0, 0, 0, 0.95);
			color: #0f0;
			font-family: 'Courier New', monospace;
			font-size: 13px;
			border: 2px solid #0f0;
			border-radius: 8px;
			padding: 20px;
			z-index: 10000;
			display: none;
			max-width: 600px;
			max-height: 80vh;
			overflow-y: auto;
			box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
		`;

		panel.innerHTML = `
			<h2 style="margin-top: 0; color: #0f0; text-align: center; text-shadow: 0 0 10px #0f0;">🛠️ DEBUG MODE 🛠️</h2>
			<div style="margin-bottom: 16px; padding: 8px; background: rgba(0, 255, 0, 0.1); border-radius: 4px;">
				<div style="margin-bottom: 4px;">快捷鍵: <strong>Ctrl+Shift+D</strong> 開關除錯面板</div>
				<div>修改數值後會立即套用到遊戲狀態</div>
			</div>

			<div class="debug-section">
				<h3>玩家狀態</h3>
				<div class="debug-input-row">
					<label>HP: <input type="number" id="debug-hp" /></label>
					<label>最大HP: <input type="number" id="debug-max-hp" /></label>
				</div>
				<div class="debug-input-row">
					<label>體力: <input type="number" id="debug-stamina" /></label>
					<label>最大體力: <input type="number" id="debug-max-stamina" /></label>
				</div>
				<div class="debug-input-row">
					<label>護盾: <input type="number" id="debug-shield" /></label>
					<label>藥水: <input type="number" id="debug-potions" /></label>
				</div>
				<div class="debug-input-row">
					<label>金幣: <input type="number" id="debug-gold" /></label>
					<label>等級: <input type="number" id="debug-level" /></label>
				</div>
				<div class="debug-input-row">
					<label>經驗值: <input type="number" id="debug-xp" /></label>
					<label>戰鬥幸運: <input type="number" id="debug-luck-combat" /></label>
				</div>
				<div class="debug-input-row">
					<label>金幣幸運: <input type="number" id="debug-luck-gold" /></label>
				</div>
			</div>

			<div class="debug-section">
				<h3>地圖狀態</h3>
				<div class="debug-input-row">
					<label>已移動步數: <input type="number" id="debug-map-steps" /></label>
					<label>目標步數: <input type="number" id="debug-map-goal" /></label>
				</div>
				<div class="debug-input-row">
					<label>難度: <input type="number" id="debug-difficulty" /></label>
					<label>
						金字塔模式:
						<input type="checkbox" id="debug-in-pyramid" />
					</label>
				</div>
				<div class="debug-input-row">
					<label>金字塔步數: <input type="number" id="debug-pyramid-steps" /></label>
				</div>
			</div>

			<div class="debug-section">
				<h3>戰鬥狀態</h3>
				<div class="debug-input-row">
					<label>
						進行中:
						<input type="checkbox" id="debug-in-battle" />
					</label>
				</div>
				<div id="debug-enemy-section">
					<div class="debug-input-row">
						<label>敵人HP: <input type="number" id="debug-enemy-hp" /></label>
						<label>敵人最大HP: <input type="number" id="debug-enemy-max-hp" /></label>
					</div>
					<div class="debug-input-row">
						<label>敵人攻擊: <input type="number" id="debug-enemy-attack" /></label>
						<label>攻擊倒數: <input type="number" id="debug-enemy-turns" /></label>
					</div>
					<div class="debug-input-row">
						<label>敵人強度: <input type="number" step="0.1" id="debug-enemy-strength" /></label>
					</div>
				</div>
			</div>

			<div class="debug-section">
				<h3>快速操作</h3>
				<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
					<button class="debug-btn" id="debug-heal-full">完全恢復</button>
					<button class="debug-btn" id="debug-add-gold">+1000金幣</button>
					<button class="debug-btn" id="debug-level-up">升級</button>
					<button class="debug-btn" id="debug-kill-enemy">秒殺敵人</button>
					<button class="debug-btn" id="debug-add-item">隨機裝備</button>
					<button class="debug-btn" id="debug-start-battle">開始戰鬥</button>
					<button class="debug-btn" id="debug-end-battle">結束戰鬥</button>
					<button class="debug-btn" id="debug-enter-pyramid">進入金字塔</button>
				</div>
			</div>

			<div style="margin-top: 16px; text-align: center;">
				<button class="debug-btn" id="debug-apply" style="background: #0a0; font-size: 1.1em; padding: 10px 20px;">套用變更</button>
				<button class="debug-btn" id="debug-close" style="background: #a00; font-size: 1.1em; padding: 10px 20px;">關閉</button>
			</div>
		`;

		// Add styles for debug panel elements
		this.injectStyles();
		document.body.appendChild(panel);
		return panel;
	},

	/**
	 * Inject CSS styles for debug panel
	 */
	injectStyles() {
		if (document.getElementById('debug-panel-styles')) return;

		const style = document.createElement('style');
		style.id = 'debug-panel-styles';
		style.textContent = `
			.debug-section {
				margin: 16px 0;
				padding: 12px;
				background: rgba(0, 255, 0, 0.05);
				border: 1px solid rgba(0, 255, 0, 0.3);
				border-radius: 4px;
			}
			.debug-section h3 {
				margin: 0 0 12px 0;
				color: #0ff;
				font-size: 1.1em;
				text-shadow: 0 0 5px #0ff;
			}
			.debug-input-row {
				display: flex;
				gap: 12px;
				margin-bottom: 8px;
				flex-wrap: wrap;
			}
			.debug-input-row label {
				flex: 1;
				min-width: 120px;
				display: flex;
				align-items: center;
				gap: 8px;
			}
			.debug-input-row input[type="number"],
			.debug-input-row input[type="text"] {
				flex: 1;
				background: rgba(0, 255, 0, 0.1);
				border: 1px solid #0f0;
				color: #0f0;
				padding: 4px 8px;
				border-radius: 3px;
				font-family: 'Courier New', monospace;
			}
			.debug-input-row input[type="checkbox"] {
				width: 20px;
				height: 20px;
			}
			.debug-btn {
				background: rgba(0, 255, 0, 0.2);
				border: 1px solid #0f0;
				color: #0f0;
				padding: 6px 12px;
				border-radius: 4px;
				cursor: pointer;
				font-family: 'Courier New', monospace;
				font-weight: bold;
				transition: all 0.2s;
			}
			.debug-btn:hover {
				background: rgba(0, 255, 0, 0.4);
				box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
			}
			.debug-btn:active {
				transform: scale(0.95);
			}
		`;
		document.head.appendChild(style);
	},

	/**
	 * Load current game values into debug panel inputs
	 */
	loadDebugValues() {
		const game = this.game;
		document.getElementById('debug-hp').value = game.player.hp;
		document.getElementById('debug-max-hp').value = game.player.max_hp;
		document.getElementById('debug-stamina').value = game.player.stamina;
		document.getElementById('debug-max-stamina').value = game.player.max_stamina;
		document.getElementById('debug-shield').value = game.player.shield;
		document.getElementById('debug-potions').value = game.player.potions;
		document.getElementById('debug-gold').value = game.player.gold;
		document.getElementById('debug-level').value = game.player.level;
		document.getElementById('debug-xp').value = game.player.xp;
		document.getElementById('debug-luck-combat').value = game.player.luck_combat;
		document.getElementById('debug-luck-gold').value = game.player.luck_gold;
		document.getElementById('debug-map-steps').value = game.map_steps;
		document.getElementById('debug-map-goal').value = game.map_goal;
		document.getElementById('debug-difficulty').value = game.difficulty;
		document.getElementById('debug-in-pyramid').checked = game.inPyramid;
		document.getElementById('debug-pyramid-steps').value = game.pyramidSteps;
		document.getElementById('debug-in-battle').checked = game.inBattle;
		document.getElementById('debug-enemy-hp').value = game.enemy.hp;
		document.getElementById('debug-enemy-max-hp').value = game.enemy.max_hp;
		document.getElementById('debug-enemy-attack').value = game.enemy.baseAttack;
		document.getElementById('debug-enemy-turns').value = game.enemy.turnsToAttack;
		document.getElementById('debug-enemy-strength').value = game.enemy.strength || 1;
	},

	/**
	 * Apply debug panel values to game state
	 */
	applyDebugChanges() {
		const game = this.game;
		const spinBtn = document.getElementById('spin-btn');
		const autoBtn = document.getElementById('auto-spin-btn');

		game.player.hp = parseInt(document.getElementById('debug-hp').value) || 0;
		game.player.max_hp = parseInt(document.getElementById('debug-max-hp').value) || 1;
		game.player.stamina = parseInt(document.getElementById('debug-stamina').value) || 0;
		game.player.max_stamina = parseInt(document.getElementById('debug-max-stamina').value) || 1;
		game.player.shield = parseInt(document.getElementById('debug-shield').value) || 0;
		game.player.potions = parseInt(document.getElementById('debug-potions').value) || 0;
		game.player.gold = parseInt(document.getElementById('debug-gold').value) || 0;
		game.player.level = parseInt(document.getElementById('debug-level').value) || 1;
		game.player.xp = parseInt(document.getElementById('debug-xp').value) || 0;
		game.player.luck_combat = parseInt(document.getElementById('debug-luck-combat').value) || 0;
		game.player.luck_gold = parseInt(document.getElementById('debug-luck-gold').value) || 0;
		game.map_steps = parseInt(document.getElementById('debug-map-steps').value) || 0;
		game.map_goal = parseInt(document.getElementById('debug-map-goal').value) || 30;
		game.difficulty = parseInt(document.getElementById('debug-difficulty').value) || 1;
		game.inPyramid = document.getElementById('debug-in-pyramid').checked;
		game.pyramidSteps = parseInt(document.getElementById('debug-pyramid-steps').value) || 0;

		const wasBattle = game.inBattle;
		game.inBattle = document.getElementById('debug-in-battle').checked;

		if (game.inBattle) {
			game.enemy.hp = parseInt(document.getElementById('debug-enemy-hp').value) || 0;
			game.enemy.max_hp = parseInt(document.getElementById('debug-enemy-max-hp').value) || 1;
			game.enemy.baseAttack = parseInt(document.getElementById('debug-enemy-attack').value) || 10;
			game.enemy.turnsToAttack = parseInt(document.getElementById('debug-enemy-turns').value) || 3;
			game.enemy.strength = parseFloat(document.getElementById('debug-enemy-strength').value) || 1;

			if (!wasBattle) {
				// Enable battle controls
				if (spinBtn) spinBtn.disabled = false;
				if (autoBtn) autoBtn.disabled = false;
				DOMRefs.disableMovement();
			}
		} else if (wasBattle && !game.inBattle) {
			// Disable battle controls
			if (spinBtn) spinBtn.disabled = true;
			if (autoBtn) autoBtn.disabled = true;
			DOMRefs.enableMovement();
		}

		game.updateStatus();
		showMessage('🛠️ Debug: 遊戲狀態已更新');
	},

	/**
	 * Attach event listeners for debug panel buttons
	 */
	attachEventListeners() {
		const self = this;
		const game = this.game;

		// Quick actions
		document.getElementById('debug-heal-full').addEventListener('click', () => {
			game.player.hp = game.player.max_hp;
			game.player.stamina = game.player.max_stamina;
			game.player.shield = 0;
			self.loadDebugValues();
			game.updateStatus();
			showMessage('🛠️ Debug: 完全恢復');
		});

		document.getElementById('debug-add-gold').addEventListener('click', () => {
			game.player.gold += 1000;
			self.loadDebugValues();
			game.updateStatus();
			showMessage('🛠️ Debug: +1000 金幣');
		});

		document.getElementById('debug-level-up').addEventListener('click', () => {
			game.player.level += 1;
			game.player.max_hp += 10;
			game.player.max_stamina += 5;
			game.player.hp = Math.min(game.player.max_hp, game.player.hp + 10);
			game.player.stamina = Math.min(game.player.max_stamina, game.player.stamina + 5);
			self.loadDebugValues();
			game.updateStatus();
			showMessage('🛠️ Debug: 升級');
		});

		document.getElementById('debug-kill-enemy').addEventListener('click', () => {
			if (game.inBattle) {
				game.enemy.hp = 0;
				self.loadDebugValues();
				game.updateStatus();
				showMessage('🛠️ Debug: 敵人HP歸零');
			} else {
				showMessage('🛠️ Debug: 目前不在戰鬥中');
			}
		});

		document.getElementById('debug-add-item').addEventListener('click', () => {
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const rarities = ['common', 'rare', 'excellent', 'epic', 'legendary'];
			const rarity = rarities[Math.floor(Math.random() * rarities.length)];

			// Add extra attributes based on rarity
			const bonusPool = QUALITY_BONUS[item.slot]?.[rarity] || [];
			const extraAttributes = {};
			if (bonusPool.length > 0) {
				const bonusCount = rarity === 'rare' ? 2 : rarity === 'epic' ? 2 : rarity === 'legendary' ? 4 : 0;
				const usedIndices = new Set();
				for (let i = 0; i < bonusCount; i++) {
					let bonus;
					do {
						const randomIndex = Math.floor(Math.random() * bonusPool.length);
						if (!usedIndices.has(randomIndex)) {
							bonus = bonusPool[randomIndex];
							usedIndices.add(randomIndex);
						}
					} while (!bonus);
					Object.assign(extraAttributes, bonus);
				}
			}

			// Add enhancement level
			const enhanceLevel = Math.floor(Math.random() * 10) + 1;

			const newItem = Object.assign({}, item, { rarity, enhanceLevel }, extraAttributes);
			game.player.inventory.push(newItem);
			showMessage(`🛠️ Debug: 獲得 ${game.formatItem(newItem)}`);
		});

		document.getElementById('debug-start-battle').addEventListener('click', () => {
			if (!game.inBattle) {
				game.battle('monster');
				self.loadDebugValues();
				showMessage('🛠️ Debug: 強制開始戰鬥');
			} else {
				showMessage('🛠️ Debug: 已在戰鬥中');
			}
		});

		document.getElementById('debug-end-battle').addEventListener('click', () => {
			if (game.inBattle) {
				game.inBattle = false;
				const spinBtn = document.getElementById('spin-btn');
				const stopBtn = document.getElementById('stop-btn');
				const autoBtn = document.getElementById('auto-spin-btn');

				if (spinBtn) spinBtn.disabled = true;
				if (stopBtn) stopBtn.disabled = true;
				if (autoBtn) autoBtn.disabled = true;

				try { if (typeof stopAutoSpinLoop === 'function') stopAutoSpinLoop(); } catch (e) { }

				DOMRefs.enableMovement();

				self.loadDebugValues();
				game.updateStatus();
				showMessage('🛠️ Debug: 強制結束戰鬥');
			} else {
				showMessage('🛠️ Debug: 目前不在戰鬥中');
			}
		});

		document.getElementById('debug-enter-pyramid').addEventListener('click', () => {
			if (!game.inPyramid) {
				game.enterPyramid();
				self.loadDebugValues();
				showMessage('🛠️ Debug: 進入金字塔');
			} else {
				showMessage('🛠️ Debug: 已在金字塔中');
			}
		});

		document.getElementById('debug-apply').addEventListener('click', () => {
			self.applyDebugChanges();
		});

		document.getElementById('debug-close').addEventListener('click', () => {
			self.debugPanel.style.display = 'none';
		});
	},

	/**
	 * Attach keyboard shortcut for debug panel
	 */
	attachKeyboardShortcut() {
		const self = this;
		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.shiftKey && e.key === 'D') {
				e.preventDefault();
				self.debugMode = !self.debugMode;
				if (self.debugMode) {
					self.loadDebugValues();
					self.debugPanel.style.display = 'block';
					showMessage('🛠️ Debug模式已啟動 (Ctrl+Shift+D 關閉)');
				} else {
					self.debugPanel.style.display = 'none';
					showMessage('🛠️ Debug模式已關閉');
				}
			}
		});
	},

	/**
	 * Toggle debug panel visibility
	 */
	toggle() {
		this.debugMode = !this.debugMode;
		if (this.debugMode) {
			this.loadDebugValues();
			this.debugPanel.style.display = 'block';
		} else {
			this.debugPanel.style.display = 'none';
		}
	},

	/**
	 * Show debug panel
	 */
	show() {
		this.debugMode = true;
		this.loadDebugValues();
		this.debugPanel.style.display = 'block';
	},

	/**
	 * Hide debug panel
	 */
	hide() {
		this.debugMode = false;
		this.debugPanel.style.display = 'none';
	}
};
