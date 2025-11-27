// ===== Dungeon Module =====
// Handles pyramid/dungeon related functionality
// Dependencies: showMessage (global), DOMRefs (global)

/**
 * Dungeon mixin - methods to be attached to Game prototype
 * Manages pyramid dungeon state and transitions
 */
const DungeonMixin = {
	/**
	 * Enter the pyramid dungeon
	 * Saves current map state and starts pyramid exploration
	 */
	enterPyramid() {
		showMessage('⚡ 你踏入了金字塔深處...');
		showMessage('🔺 金字塔副本開始！你有 8 步探險機會。');
		this.inPyramid = true;
		this.pyramidSteps = 0;
		this.normalMapSteps = this.map_steps; // Save current steps
		this.updateStatus();

		// Re-enable movement buttons
		DOMRefs.enableMovement();
	},

	/**
	 * Exit the pyramid dungeon
	 * Restores normal map state
	 */
	exitPyramid() {
		showMessage('🌅 你走出了金字塔，回到了沙漠中。');
		showMessage(`金字塔副本完成！探索了 ${this.pyramidSteps}/${this.pyramidMaxSteps} 步。`);
		this.inPyramid = false;
		this.pyramidSteps = 0;
		this.map_steps = this.normalMapSteps; // Restore normal map steps
		this.updateStatus();
	},

	/**
	 * Check if pyramid exploration is complete
	 * @returns {boolean} True if all pyramid steps are exhausted
	 */
	isPyramidComplete() {
		return this.inPyramid && this.pyramidSteps >= this.pyramidMaxSteps;
	},

	/**
	 * Get remaining pyramid steps
	 * @returns {number} Remaining steps in pyramid
	 */
	getRemainingPyramidSteps() {
		if (!this.inPyramid) return 0;
		return Math.max(0, this.pyramidMaxSteps - this.pyramidSteps);
	},

	/**
	 * Advance one step in the pyramid
	 * @returns {boolean} True if still in pyramid, false if exploration ended
	 */
	advancePyramidStep() {
		if (!this.inPyramid) return false;

		this.pyramidSteps++;

		if (this.isPyramidComplete()) {
			this.exitPyramid();
			return false;
		}

		return true;
	},

	/**
	 * Get pyramid difficulty multiplier
	 * Pyramid has higher base difficulty
	 * @returns {number} Difficulty multiplier for pyramid
	 */
	getPyramidDifficultyMultiplier() {
		if (!this.inPyramid) return 1;
		// Pyramid base multiplier + progression bonus
		return 1.5 + (this.pyramidSteps * 0.1);
	}
};
