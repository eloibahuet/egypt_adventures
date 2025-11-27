// ===== UI Module =====
// Handles UI-related functionality: status display, panels, dialogs

/**
 * UI mixin - methods to be attached to Game prototype
 * Dependencies: showMessage (global), t (global - i18n),
 *               SET_BONUSES, ENEMY_IMAGE_MAP (from data.js),
 *               DOMRefs (from DOMRefs.js)
 */
const UIMixin = {
	/**
	 * Update player and enemy status panels
	 */
	updateStatus() {
		const playerStatusEl = DOMRefs.playerStatus;
		const enemyStatusEl = DOMRefs.enemyStatus;

		if (playerStatusEl) {
			// Calculate combo display text (during battle)
			let comboText = t('none');
			if (this.inBattle) {
				const sym = this.consecutivePrimarySymbol || '-';
				const count = this.consecutivePrimaryCount || 0;
				const mult = Math.max(1, count);
				comboText = `${sym} x${count} (x${mult})`;
			}

			const playerPct = Math.max(0, Math.min(100, Math.floor((this.player.hp / this.player.max_hp) * 100)));

			// Calculate XP progress
			const xpNeeded = this.xpForNext(this.player.level);
			const xpPct = this.player.level >= 99 ? 100 : Math.max(0, Math.min(100, Math.floor((this.player.xp / xpNeeded) * 100)));

			// Check set bonus
			const setBonus = this.getActiveSetBonus();
			let setBonusHtml = '';
			if (setBonus) {
				const rarityText = this._getRarityText(setBonus.rarity);
				setBonusHtml = `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4px 8px; border-radius: 4px; color: white; font-size: 11px; margin: 4px 0;">⚡ ${setBonus.name} (${rarityText})</div>`;
			}

			playerStatusEl.innerHTML = `
				<div class="stat-label">${t('player')} Lv.${this.player.level}</div>
				<div class="hp-row">${t('hp')}: <span class="hp-text">${this.player.hp}/${this.player.max_hp}</span></div>
				<div class="hp-bar"><div class="hp-inner" style="width:${playerPct}%"></div></div>
				<div class="xp-row">${t('xp')}: <span class="xp-text">${this.player.xp}/${xpNeeded === Infinity ? 'MAX' : xpNeeded}</span></div>
				<div class="xp-bar"><div class="xp-inner" style="width:${xpPct}%"></div></div>
				<div class="stats-row">
					<div>${t('stamina')}: ${this.player.stamina}/${this.player.max_stamina}</div>
					<div>${t('shield')}: ${this.player.shield}</div>
					<div>${t('potions')}: ${this.player.potions}</div>
					<div>${t('gold')}: ${this.player.gold}</div>
					<div>${t('luckCombat')}: ${this.player.luck_combat}</div>
					<div>${t('luckGoldShort')}: ${this.player.luck_gold}</div>
				</div>
				${setBonusHtml}
				<div class="combo-row ${(this.inBattle && (this.consecutivePrimaryCount||0) > 1) ? 'combo-active' : ''}">Combo: ${comboText}</div>
				<div class="equip-row">
					<span class="equip-label">${t('weapon')}: ${this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : t('none')}</span>
					<div class="equip-buttons">
						<button class="open-equip-btn" data-slot="weapon">${t('equip')}</button>
						<button class="unequip-btn" data-slot="weapon">${t('unequip')}</button>
					</div>
				</div>
				<div class="equip-row">
					<span class="equip-label">${t('armor')}: ${this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : t('none')}</span>
					<div class="equip-buttons">
						<button class="open-equip-btn" data-slot="armor">${t('equip')}</button>
						<button class="unequip-btn" data-slot="armor">${t('unequip')}</button>
					</div>
				</div>
				<div class="equip-row">
					<span class="equip-label">${t('amulet')}: ${this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : t('none')}</span>
					<div class="equip-buttons">
						<button class="open-equip-btn" data-slot="amulet">${t('equip')}</button>
						<button class="unequip-btn" data-slot="amulet">${t('unequip')}</button>
					</div>
				</div>
			`;
		}

		// Update enemy status to right panel
		if (enemyStatusEl) {
			const enemyPct = this.enemy && this.enemy.max_hp ? Math.max(0, Math.min(100, Math.floor((this.enemy.hp / this.enemy.max_hp) * 100))) : 0;

			// Select enemy image based on type
			let enemyImage = '';
			if (this.inBattle && this.enemy.type) {
				const imagePath = ENEMY_IMAGE_MAP[this.enemy.type] || ENEMY_IMAGE_MAP.default;
				enemyImage = `<div style="text-align: center; margin-top: 5px;"><img src="${imagePath}" alt="${this.enemy.name || ''}" style="max-width: 100%; width: 120px; height: auto; opacity: 0.9; mix-blend-mode: multiply;"></div>`;
			}

			enemyStatusEl.innerHTML = `
				<div class="stat-label">${t('enemy')}</div>
				${this.inBattle ? `
					<div class="hp-row">${this.enemy.name || t('enemy')}  ${t('hp')}: <span class="hp-text">${this.enemy.hp}/${this.enemy.max_hp}</span></div>
					<div class="hp-bar"><div class="hp-inner enemy-hp" style="width:${enemyPct}%"></div></div>
					${enemyImage}
					<div class="stats-row"><div>${t('attackIn')}: ${this.enemy.turnsToAttack}</div><div>${t('strengthX').replace(' x', '')}: x${(this.enemy.strength||1).toFixed(2)}</div></div>
				` : `
					<div class="hp-row">${t('none')}</div>
					<div class="hp-bar"><div class="hp-inner enemy-hp" style="width:0%"></div></div>
				`}
			`;
		}

		// Sync brief status summary to sidebar (as backup display)
		const summary = DOMRefs.statusSummary;
		if (summary) {
			summary.textContent = `HP:${this.player.hp}/${this.player.max_hp}  ${t('stamina')}:${this.player.stamina}/${this.player.max_stamina}  ${t('gold')}:${this.player.gold}  ${t('luckCombat')}:${this.player.luck_combat} ${t('goldLuck')}:${this.player.luck_gold}`;
		}

		// Update map steps display
		const mapEl = DOMRefs.mapSteps;
		if (mapEl) {
			if (this.inPyramid) {
				mapEl.textContent = `🔺 ${this.pyramidSteps}/${this.pyramidMaxSteps}`;
			} else {
				mapEl.textContent = Math.max(0, this.map_goal - this.map_steps);
			}
		}
	},

	/**
	 * Helper to get localized rarity text
	 * @param {string} rarity - Rarity key
	 * @returns {string} Localized rarity name
	 */
	_getRarityText(rarity) {
		const rarityKeys = {
			'rare': { 'zh-TW': '稀有', 'en': 'Rare', 'fr': 'Rare' },
			'excellent': { 'zh-TW': '精良', 'en': 'Excellent', 'fr': 'Excellent' },
			'epic': { 'zh-TW': '史詩', 'en': 'Epic', 'fr': 'Épique' },
			'legendary': { 'zh-TW': '傳說', 'en': 'Legendary', 'fr': 'Légendaire' }
		};
		return rarityKeys[rarity]?.[currentLanguage] || rarityKeys[rarity]?.['en'] || rarity;
	},

	/**
	 * Show equipment panel with optional slot filter
	 * @param {string|null} filterSlot - Filter by slot type ('weapon'|'armor'|'amulet') or null for all
	 */
	showEquipmentPanel(filterSlot = null) {
		const panel = DOMRefs.equipmentPanel;
		const content = DOMRefs.equipContent;
		if (!panel || !content) return;

		// List current equipment and inventory
		let html = `<div><strong>${t('equipped')}</strong></div>`;
		const noneText = t('none');
		const weapText = this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : noneText;
		const armText = this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : noneText;
		const amuText = this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : noneText;

		html += `<div>${t('weapon')}: ${weapText} <button class="unequip-inline" data-slot="weapon">${t('unequip')}</button> <button class="open-equip-inline" data-slot="weapon">${t('equip')}</button></div>`;
		html += `<div>${t('armor')}: ${armText} <button class="unequip-inline" data-slot="armor">${t('unequip')}</button> <button class="open-equip-inline" data-slot="armor">${t('equip')}</button></div>`;
		html += `<div>${t('amulet')}: ${amuText} <button class="unequip-inline" data-slot="amulet">${t('unequip')}</button> <button class="open-equip-inline" data-slot="amulet">${t('equip')}</button></div>`;

		// Show set bonus
		const setBonus = this.getActiveSetBonus();
		if (setBonus) {
			const setParts = [];
			if (setBonus.effects.atk) setParts.push(`${t('atkShort')}+${setBonus.effects.atk}`);
			if (setBonus.effects.def) setParts.push(`${t('defShort')}+${setBonus.effects.def}`);
			if (setBonus.effects.max_hp_bonus) setParts.push(`${t('hp')}+${setBonus.effects.max_hp_bonus}`);
			if (setBonus.effects.stamina_bonus) setParts.push(`${t('stamina')}+${setBonus.effects.stamina_bonus}`);
			if (setBonus.effects.luck_combat) setParts.push(`${t('combatLuck')}+${setBonus.effects.luck_combat}`);
			if (setBonus.effects.luck_gold) setParts.push(`${t('goldLuck')}+${setBonus.effects.luck_gold}`);
			if (setBonus.effects.crit_rate) setParts.push(`Crit+${setBonus.effects.crit_rate}%`);
			if (setBonus.effects.combo_rate) setParts.push(`Combo+${setBonus.effects.combo_rate}%`);
			if (setBonus.effects.skill_power) setParts.push(`${t('skill')}+${setBonus.effects.skill_power}%`);
			if (setBonus.effects.dodge_rate) setParts.push(`Dodge+${setBonus.effects.dodge_rate}%`);

			const rarityText = this._getRarityText(setBonus.rarity);
			html += `<hr/><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 10px; border-radius: 6px; color: white; margin: 8px 0;"><strong>⚡ ${t('setBonus')}: ${setBonus.name} (${rarityText})</strong><br/>${setParts.join(' ')}</div>`;
		}

		html += `<hr/><div><strong>${t('inventory')}</strong></div>`;
		const inv = this.player.inventory;
		let shown = 0;

		for (let i = 0; i < inv.length; i++) {
			const it = inv[i];
			if (filterSlot && it.slot !== filterSlot) continue;
			shown++;
			const disp = this.formatItem(it) || `${it.name}`;
			html += `<div>${i+1}. ${disp} (${it.rarity}) <button data-idx="${i}" class="equip-now">${t('equip')}</button></div>`;
		}

		if (shown === 0) html += `<div>${t('noMatchingItems')}</div>`;
		content.innerHTML = html;
		panel.style.display = 'block';

		const game = this;

		// Bind equip buttons
		setTimeout(() => {
			Array.from(content.querySelectorAll('.equip-now')).forEach(b => {
				b.addEventListener('click', () => {
					const idx = parseInt(b.getAttribute('data-idx'));
					game.equipItem(idx);
					game.showEquipmentPanel(filterSlot);
				});
			});

			// Inline unequip/equip buttons
			Array.from(content.querySelectorAll('.unequip-inline')).forEach(b => {
				b.addEventListener('click', () => {
					const slot = b.getAttribute('data-slot');
					game.unequipItem(slot);
					game.showEquipmentPanel(filterSlot);
				});
			});

			Array.from(content.querySelectorAll('.open-equip-inline')).forEach(b => {
				b.addEventListener('click', () => {
					const slot = b.getAttribute('data-slot');
					game.showEquipmentPanel(slot);
				});
			});
		}, 50);
	},

	/**
	 * Show generic choice dialog panel
	 * @param {string} title - Dialog title
	 * @param {Array} choices - Array of {id, label} choice objects
	 * @param {Function} callback - Callback function receiving chosen id
	 */
	showChoicePanel(title, choices, callback) {
		// Disable movement buttons
		DOMRefs.disableMovement();

		// Create choice dialog
		const panel = document.createElement('div');
		panel.id = 'encounter-choice-panel';
		panel.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: linear-gradient(180deg, #fff9e6, #ffe4b3);
			border: 3px solid #d4a855;
			border-radius: 12px;
			padding: 24px;
			box-shadow: 0 8px 24px rgba(0,0,0,0.3);
			z-index: 100;
			min-width: 320px;
			max-width: 90vw;
			text-align: center;
		`;

		// Generate choice buttons HTML
		const choicesHtml = choices.map(choice => `
			<button class="choice-btn" data-choice-id="${choice.id}" style="
				display: block;
				width: 100%;
				padding: 12px 16px;
				margin: 8px 0;
				font-size: 1em;
				background: linear-gradient(180deg, #f5f5f5, #e0e0e0);
				color: #333;
				border: 2px solid #d4a855;
				border-radius: 6px;
				cursor: pointer;
				transition: all 0.2s;
			">${choice.label}</button>
		`).join('');

		panel.innerHTML = `
			<h2 style="color: #8b4513; margin-top: 0; margin-bottom: 16px;">🏜️ ${title}</h2>
			<div style="text-align: left;">
				${choicesHtml}
			</div>
		`;

		document.body.appendChild(panel);

		// Bind choice button events
		const choiceBtns = panel.querySelectorAll('.choice-btn');
		choiceBtns.forEach(btn => {
			btn.addEventListener('mouseenter', () => {
				btn.style.background = 'linear-gradient(180deg, #e8b44c, #d4a02e)';
				btn.style.color = 'white';
			});
			btn.addEventListener('mouseleave', () => {
				btn.style.background = 'linear-gradient(180deg, #f5f5f5, #e0e0e0)';
				btn.style.color = '#333';
			});
			btn.addEventListener('click', () => {
				const choiceId = btn.getAttribute('data-choice-id');
				// Remove panel
				if (panel.parentNode) {
					panel.parentNode.removeChild(panel);
				}
				// Re-enable movement buttons
				DOMRefs.enableMovement();
				// Execute callback
				if (callback) {
					callback(choiceId);
				}
			});
		});
	},

	/**
	 * Show pyramid entrance choice dialog
	 */
	showPyramidChoice() {
		// Disable movement buttons
		DOMRefs.disableMovement();

		const game = this;

		// Create choice dialog
		const panel = document.createElement('div');
		panel.id = 'pyramid-choice-panel';
		panel.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: linear-gradient(180deg, #fff9e6, #ffe4b3);
			border: 3px solid #d4a855;
			border-radius: 12px;
			padding: 24px;
			box-shadow: 0 8px 24px rgba(0,0,0,0.3);
			z-index: 100;
			min-width: 350px;
			text-align: center;
		`;

		panel.innerHTML = `
			<h2 style="color: #8b4513; margin-top: 0;">${t('pyramidExploration')}</h2>
			<p style="font-size: 1.1em; line-height: 1.6;">
				${t('pyramidDanger')}
			</p>
			<div style="background: #fff; padding: 12px; border-radius: 6px; margin: 12px 0; border: 1px solid #ddd;">
				<strong>${t('pyramidInfo').split(':')[0]}:</strong><br>
				✦ 8 ${t('steps')}<br>
				✦ ${t('hp')} x${(3 + this.difficulty * 0.5).toFixed(1)}, ${t('atkShort')} x${(2.5 + this.difficulty * 0.3).toFixed(1)}<br>
				✦ ${t('xp')} x15<br>
				✦ ${t('gold')} x15<br>
			</div>
			<div style="display: flex; gap: 12px; justify-content: center; margin-top: 20px;">
				<button id="pyramid-enter-btn" style="
					padding: 12px 24px;
					font-size: 1.1em;
					background: linear-gradient(180deg, #e8b44c, #d4a02e);
					color: white;
					border: none;
					border-radius: 6px;
					cursor: pointer;
					font-weight: bold;
					box-shadow: 0 2px 6px rgba(0,0,0,0.2);
				">⚔️ ${t('enterPyramid').replace('⚡ ', '')}</button>
				<button id="pyramid-decline-btn" style="
					padding: 12px 24px;
					font-size: 1.1em;
					background: linear-gradient(180deg, #999, #777);
					color: white;
					border: none;
					border-radius: 6px;
					cursor: pointer;
					font-weight: bold;
					box-shadow: 0 2px 6px rgba(0,0,0,0.2);
				">🚶 ${t('close')}</button>
			</div>
		`;

		document.body.appendChild(panel);

		// Bind button events
		const enterBtn = document.getElementById('pyramid-enter-btn');
		if (enterBtn) {
			enterBtn.addEventListener('click', () => {
				game.enterPyramid();
				document.body.removeChild(panel);
			});
		}

		const declineBtn = document.getElementById('pyramid-decline-btn');
		if (declineBtn) {
			declineBtn.addEventListener('click', () => {
				showMessage(t('declinePyramid'));
				document.body.removeChild(panel);
				DOMRefs.enableMovement();
			});
		}
	}
};
