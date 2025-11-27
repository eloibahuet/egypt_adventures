// ===== Persistence Module =====
// Handles save/load functionality for the game
// Dependencies: showMessage (global)

/**
 * Persistence mixin - methods to be attached to Game prototype
 * Provides save/load/clear game state functionality
 */
const PersistenceMixin = {
	/**
	 * Storage key for localStorage
	 */
	SAVE_KEY: 'egypt_adventures_save',

	/**
	 * Serialize current game state for saving
	 * @returns {Object} Serialized game state
	 */
	serializeState() {
		return {
			player: this.player,
			enemy: this.enemy,
			inBattle: this.inBattle,
			consecutivePrimarySymbol: this.consecutivePrimarySymbol,
			consecutivePrimaryCount: this.consecutivePrimaryCount,
			map_steps: this.map_steps,
			map_goal: this.map_goal,
			difficulty: this.difficulty,
			inPyramid: this.inPyramid,
			pyramidSteps: this.pyramidSteps,
			pyramidMaxSteps: this.pyramidMaxSteps,
			normalMapSteps: this.normalMapSteps,
			hasEncounteredCaravanRest: this.hasEncounteredCaravanRest,
			timestamp: Date.now()
		};
	},

	/**
	 * Restore game state from deserialized data
	 * @param {Object} data - Deserialized save data
	 */
	deserializeState(data) {
		this.player = data.player;
		this.enemy = data.enemy;
		this.inBattle = data.inBattle;
		this.consecutivePrimarySymbol = data.consecutivePrimarySymbol;
		this.consecutivePrimaryCount = data.consecutivePrimaryCount;
		this.map_steps = data.map_steps;
		this.map_goal = data.map_goal;
		this.difficulty = data.difficulty;
		this.inPyramid = data.inPyramid || false;
		this.pyramidSteps = data.pyramidSteps || 0;
		this.pyramidMaxSteps = data.pyramidMaxSteps || 8;
		this.normalMapSteps = data.normalMapSteps || 0;
		this.hasEncounteredCaravanRest = data.hasEncounteredCaravanRest || false;
	},

	/**
	 * Save game to localStorage
	 * @returns {boolean} True if save was successful
	 */
	saveGame() {
		try {
			const saveData = this.serializeState();
			const saveString = JSON.stringify(saveData);
			localStorage.setItem(this.SAVE_KEY, saveString);

			// Verify save was successful
			const verify = localStorage.getItem(this.SAVE_KEY);
			if (verify && verify === saveString) {
				const saveDate = new Date(saveData.timestamp);
				showMessage(`💾 遊戲已儲存！(等級 ${this.player.level}, 金幣 ${this.player.gold}, 時間 ${saveDate.toLocaleTimeString('zh-TW')})`);
				return true;
			} else {
				showMessage('⚠️ 儲存可能失敗，請檢查瀏覽器設定是否允許 localStorage');
				return false;
			}
		} catch (e) {
			showMessage('❌ 儲存失敗：' + e.message);
			console.error('Save error:', e);
			return false;
		}
	},

	/**
	 * Load game from localStorage
	 * @returns {Object|null} Loaded save data or null if no save exists
	 */
	loadGame() {
		try {
			const saveData = localStorage.getItem(this.SAVE_KEY);
			if (!saveData) {
				showMessage('❌ 找不到存檔！請先點擊「儲存」按鈕建立存檔。');
				return null;
			}

			console.log('Load data length:', saveData.length);
			const data = JSON.parse(saveData);

			// Restore game state
			this.deserializeState(data);

			// Update UI
			this.updateStatus();
			const saveDate = new Date(data.timestamp);
			showMessage(`📂 讀取成功！存檔時間：${saveDate.toLocaleString('zh-TW')}`);

			return data;
		} catch (e) {
			showMessage('❌ 讀取失敗：' + e.message);
			console.error('Load error:', e);
			return null;
		}
	},

	/**
	 * Check if a save exists
	 * @returns {boolean} True if save exists
	 */
	hasSaveGame() {
		return localStorage.getItem(this.SAVE_KEY) !== null;
	},

	/**
	 * Clear saved game data
	 */
	clearSaveGame() {
		localStorage.removeItem(this.SAVE_KEY);
		showMessage('🗑️ 存檔已清除');
	},

	/**
	 * Get save metadata without loading full state
	 * @returns {Object|null} Save metadata (timestamp, level, gold) or null
	 */
	getSaveInfo() {
		try {
			const saveData = localStorage.getItem(this.SAVE_KEY);
			if (!saveData) return null;

			const data = JSON.parse(saveData);
			return {
				timestamp: data.timestamp,
				level: data.player?.level,
				gold: data.player?.gold,
				inPyramid: data.inPyramid
			};
		} catch (e) {
			return null;
		}
	}
};
