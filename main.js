// ===== 主程式 (UI 初始化與遊戲邏輯) =====
// 依賴: js/core/App.js, js/core/GameState.js, js/data.js, js/music.js, js/enemyNames.js, i18n.js

document.addEventListener('DOMContentLoaded', function() {
	// Initialize App singleton
	App.init();

	const output = App.elements.output;
	const input = document.getElementById('game-input');
	const button = document.getElementById('submit-btn');
	const spinBtn = App.elements.spinBtn;
	const stopBtn = App.elements.stopBtn;

	// Legacy compatibility - expose version globally
	window.APP_VERSION = App.version;
	
	// 初始化音樂系統
	MusicSystem.init();
	
	// 調試信息：顯示螢幕尺寸和符號設定
	console.log('=== 螢幕尺寸診斷 ===');
	console.log(`視口寬度: ${window.innerWidth}px`);
	console.log(`視口高度: ${window.innerHeight}px`);
	console.log(`設備像素比: ${window.devicePixelRatio}`);
	console.log(`符號高度: ${getSymbolHeight()}px`);
	console.log(`高亮框位置: ${getHighlightTop()}px`);
	console.log(`UserAgent: ${navigator.userAgent}`);

	// 初始化語言選擇器
	const languageSelect = document.getElementById('language-select');
	if (languageSelect) {
		languageSelect.value = currentLanguage;
		languageSelect.addEventListener('change', function() {
			changeLanguage(this.value);
			if (window.game) {
				// 清空遊戲輸出區域
				output.innerHTML = '';
				// 重新生成方向提示以更新語言
				game.generateDirectionHints();
				// 更新玩家和敵人狀態顯示
				game.updateStatus();
			}
		});
	}
	
	// 初始化UI語言
	updateUILanguage();

	// 初始不允許旋轉，直到玩家選擇移動方向
	spinBtn.disabled = true;
	const reels = App.elements.reels;

	// Early slot machine module initialization (before populateReels)
	// Game will be passed later after it's created
	if (typeof initSlotMachine === 'function') {
		initSlotMachine(reels, spinBtn, stopBtn, null);
	}

	// EVENTS, EVENT_WEIGHTS, ENEMY_IMAGE_MAP, chooseEvent 已移至 js/data.js

	// Local alias for App.showMessage
	const showMessage = App.showMessage.bind(App);
	// Global access via App singleton
	window.showMessage = showMessage;

	// SYMBOLS, SYMBOL_WEIGHTS, pickWeightedSymbol, getSymbolHeight, getHighlightTop 已移至 js/data.js
	// ITEMS, QUALITY_BONUS, PYRAMID_AFFIXES, SET_BONUSES 已移至 js/data.js
	// genEnemyName 已移至 js/enemyNames.js

	// populateReels moved to js/slotMachine.js - module initialized above
	populateReels();

	// 簡單遊戲狀態（玩家與敵人）
	class Game {
		constructor() {
			// Use GameState factories for consistent initialization
			this.player = GameState.createPlayerState();
			this.enemy = GameState.createEnemyState();
			Object.assign(this, GameState.createGameFlags());
			Object.assign(this, GameState.createMapState());
			Object.assign(this, GameState.createComboState());
		}

		// All methods are provided by mixins:
		// - EquipmentMixin: equipItem, unequipItem, formatItem, getActiveSetBonus, getSetBonusValue
		// - UIMixin: updateStatus, showEquipmentPanel, showChoicePanel, showPyramidChoice
		// - BattleMixin: battle, attemptFlee, enemyAutoAttack, applySlotResults
		// - ShopsMixin: blackMarket, tradingPost
		// - NavigationMixin: generateDirectionHints, generateBranchPath, chooseBranchType, moveStep, handleBranchEvents, choosePyramidEvent, nextMap, handleEvent
		// - XPMixin: xpForNext, addXP
		// - PersistenceMixin: saveGame, loadGame
		// - DungeonMixin: enterPyramid, exitPyramid
		// See: js/equipment.js, js/ui.js, js/battle.js, js/shops.js, js/mixins/*.js
	}


	// Required mixins for game functionality
	const REQUIRED_MIXINS = {
		EquipmentMixin: typeof EquipmentMixin !== 'undefined' ? EquipmentMixin : null,
		UIMixin: typeof UIMixin !== 'undefined' ? UIMixin : null,
		BattleMixin: typeof BattleMixin !== 'undefined' ? BattleMixin : null,
		ShopsMixin: typeof ShopsMixin !== 'undefined' ? ShopsMixin : null,
		PersistenceMixin: typeof PersistenceMixin !== 'undefined' ? PersistenceMixin : null,
		DungeonMixin: typeof DungeonMixin !== 'undefined' ? DungeonMixin : null,
		NavigationMixin: typeof NavigationMixin !== 'undefined' ? NavigationMixin : null,
		XPMixin: typeof XPMixin !== 'undefined' ? XPMixin : null
	};

	// Validate all required mixins loaded
	const missingMixins = Object.entries(REQUIRED_MIXINS)
		.filter(([name, mixin]) => !mixin)
		.map(([name]) => name);

	if (missingMixins.length > 0) {
		const errorMsg = `Game initialization failed: Missing mixins: ${missingMixins.join(', ')}`;
		console.error(errorMsg);
		showMessage(`❌ ${errorMsg}`);
		return; // Prevent game from starting with missing functionality
	}

	// Apply mixins to Game prototype
	Object.values(REQUIRED_MIXINS).forEach(mixin => {
		Object.assign(Game.prototype, mixin);
	});

	const game = new Game();
	App.game = game;
	// Global reference for event handlers that use window.game
	window.game = game;

	// Update slot machine module with game reference
	if (typeof initSlotMachine === 'function') {
		initSlotMachine(reels, spinBtn, stopBtn, game);
	}

	game.updateStatus();
	game.generateDirectionHints();

	// Initialize debug system
	if (typeof DebugSystem !== 'undefined') {
		DebugSystem.init(game);
	}

	// 如果音樂已啟用，嘗試播放（可能需要用戶互動）
	if (MusicSystem.isEnabled) {
		// 延遲播放以確保頁面完全載入
		setTimeout(() => {
			MusicSystem.play();
		}, 500);
	}

	// Slot machine functions are provided by js/slotMachine.js module
	// (startSpin, stopSequentially, stopAutoSpinLoop, startAutoSpinLoop, toggleAutoSpin)

	// Slot button event listeners
	spinBtn.addEventListener('click', ()=>{
		if (!game.inBattle) {
			showMessage('目前不在戰鬥中，無法使用旋轉。');
			return;
		}
		spinBtn.disabled = true;
		stopBtn.disabled = false;
		showMessage('開始旋轉...');
		startSpin();
	});

	stopBtn.addEventListener('click', ()=>{
		stopSequentially();
	});

	// 簡單的輸入處理（保留用戶原本的指令輸入框功能）
	button.addEventListener('click', function() {
		const cmd = input.value.trim();
		if (!cmd) { showMessage('請輸入指令。'); return; }
		showMessage(`你輸入了：${cmd}`);
		input.value = '';
	});

	input.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') button.click();
	});

	// Movement buttons (using DOMRefs)
	if (DOMRefs.moveFront) DOMRefs.moveFront.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('前'); });
	if (DOMRefs.moveLeft) DOMRefs.moveLeft.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('左'); });
	if (DOMRefs.moveRight) DOMRefs.moveRight.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('右'); });

	// Equipment panel close button
	if (DOMRefs.closeEquipBtn) {
		DOMRefs.closeEquipBtn.addEventListener('click', ()=> {
			if (DOMRefs.equipmentPanel) DOMRefs.equipmentPanel.style.display = 'none';
		});
	}

		// 使用事件委派處理裝備按鈕，避免重複綁定
		// Use bubbling-phase handler and avoid calling preventDefault()
		// to ensure native touch/scroll behavior on mobile is not blocked.
		document.addEventListener('click', function(e) {
			const button = e.target.closest('.unequip-btn, .open-equip-btn');

			if (button) {
				// stopPropagation is enough to isolate the click handling
				// for these buttons; do NOT call preventDefault here as it
				// can interfere with touch interactions on mobile browsers.
				e.stopPropagation();

				const slot = button.getAttribute('data-slot');

				if (button.classList.contains('unequip-btn')) {
					if (slot) {
						game.unequipItem(slot);
					}
				} else if (button.classList.contains('open-equip-btn')) {
					if (slot) {
						game.showEquipmentPanel(slot);
					}
				}
			}
		}, false);

	// Auto-spin and flee buttons (using DOMRefs)
	if (DOMRefs.autoSpinBtn) {
		DOMRefs.autoSpinBtn.addEventListener('click', ()=>{
			if (!game.inBattle) {
				showMessage('目前不在戰鬥中，無法使用自動旋轉。');
				return;
			}
			const isAuto = toggleAutoSpin();
			DOMRefs.autoSpinBtn.textContent = isAuto ? '停止自動' : '自動旋轉';
		});
	}
	if (DOMRefs.fleeBtn) {
		DOMRefs.fleeBtn.addEventListener('click', ()=>{ game.attemptFlee(); });
	}

	// Music control buttons (using DOMRefs)
	if (DOMRefs.musicToggle) {
		DOMRefs.musicToggle.addEventListener('click', ()=> {
			MusicSystem.toggle();
			updateUILanguage();
		});
	}

	if (DOMRefs.volumeSlider) {
		DOMRefs.volumeSlider.addEventListener('input', (e) => {
			MusicSystem.setVolume(e.target.value);
			if (DOMRefs.volumeDisplay) {
				DOMRefs.volumeDisplay.textContent = e.target.value + '%';
			}
		});
	}

	// Periodic check to ensure auto-spin stops when battle ends
	setInterval(() => {
		if (!game.inBattle && isAutoSpinning()) {
			console.log('Battle ended but auto-spin still running, stopping');
			stopAutoSpinLoop();
		}
	}, 500);

	// Save/Load buttons (using DOMRefs)
	if (DOMRefs.saveBtn) {
		DOMRefs.saveBtn.addEventListener('click', () => {
			game.saveGame();
		});
	}

	if (DOMRefs.loadBtn) {
		DOMRefs.loadBtn.addEventListener('click', () => {
			const data = game.loadGame();
			if (data) {
				// Update UI state based on battle status
				if (game.inBattle) {
					DOMRefs.enableBattle();
					DOMRefs.disableMovement();
				} else {
					DOMRefs.disableBattle();
					DOMRefs.enableMovement();
				}
			}
		});
	}

	// 初始歡迎訊息已放在頁面上方（#welcome-panel），不重複顯示在訊息區。
	// Debug panel moved to js/mixins/DebugMixin.js - initialized via DebugSystem.init(game)
});

