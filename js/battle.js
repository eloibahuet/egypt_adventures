// ===== Battle System Module =====
// Handles combat-related functionality: battle initiation, slot results, enemy AI, fleeing

/**
 * Battle mixin - methods to be attached to Game prototype
 * Dependencies: showMessage (global), MusicSystem (global), App (global),
 *               SYMBOLS, ITEMS, QUALITY_BONUS, PYRAMID_AFFIXES (from data.js),
 *               genEnemyName (from enemyNames.js)
 */
const BattleMixin = {
	/**
	 * Calculate scaled value with match count, triple bonus, and combo multiplier
	 * @private
	 */
	_calcScaledValue(base, matchCount, tripleBonus, comboMultiplier) {
		let value = base * matchCount;
		value = Math.round(value * tripleBonus);
		return Math.max(1, Math.round(value * comboMultiplier));
	},

	/**
	 * Get weapon attribute safely
	 * @private
	 */
	_getWeaponAttr(attr) {
		return this.player.equipment.weapon ? (this.player.equipment.weapon[attr] || 0) : 0;
	},

	/**
	 * Get armor attribute safely
	 * @private
	 */
	_getArmorAttr(attr) {
		return this.player.equipment.armor ? (this.player.equipment.armor[attr] || 0) : 0;
	},

	/**
	 * Calculate crit chance based on luck and weapon
	 * @private
	 */
	_calcCritChance() {
		const weaponCritRate = this._getWeaponAttr('crit_rate');
		return Math.min(0.75, 0.08 + 0.05 * this.player.luck_combat + weaponCritRate / 100);
	},

	/**
	 * Calculate dodge chance based on luck and armor
	 * @private
	 */
	_calcDodgeChance() {
		const armorDodge = this._getArmorAttr('dodge_rate');
		return Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodge / 100);
	},

	/**
	 * Initiate battle with enemy
	 * @param {string} type - Enemy type: 'monster', 'elite', or 'mini_boss'
	 */
	battle(type) {
		// Stop auto-spin and disable auto button when entering battle
		try { stopAutoSpinLoop(); } catch(e) {}
		showMessage(`${t('encounterEnemy')} ${type}，${t('enterBattle')}`);

		// Set battle state and enemy attributes
		this.inBattle = true;

		// Switch to battle music
		if (typeof MusicSystem !== 'undefined') {
			MusicSystem.switchTrack('battle');
		}

		// Store enemy type (for displaying corresponding image)
		this.enemy.type = type;
		// Generate enemy name
		this.enemy.name = genEnemyName(type);
		showMessage(`${t('encounterEnemyName')}${this.enemy.name}`);

		// Disable movement buttons during battle
		DOMRefs.disableMovement();

		// Get battle constants from Config
		const B = Config.BATTLE;

		// Adjust enemy HP and attack based on type
		// Pyramid enemies scale with map difficulty, non-pyramid use normal multipliers
		let hpMultiplier = this.inPyramid
			? (B.HP_MULT.pyramid + this.difficulty * B.HP_SCALE_PER_DIFF)
			: B.HP_MULT.normal;
		let atkMultiplier = this.inPyramid
			? (B.ATK_MULT.pyramid + this.difficulty * B.ATK_SCALE_PER_DIFF)
			: B.ATK_MULT.normal;
		let strengthBonus = this.inPyramid
			? (B.STRENGTH_MULT.pyramid + this.difficulty * B.STRENGTH_SCALE_PER_DIFF)
			: B.STRENGTH_MULT.normal;

		// Get enemy type base stats from Config
		const stats = type === 'elite' ? B.ELITE
			: type === 'mini_boss' ? B.MINI_BOSS
			: B.MONSTER;

		if (type === 'mini_boss' && this.inPyramid) {
			// Pyramid mini-boss difficulty reduced
			hpMultiplier *= B.MINI_BOSS_PYRAMID_REDUCTION;
			atkMultiplier *= B.MINI_BOSS_PYRAMID_REDUCTION;
			strengthBonus *= B.MINI_BOSS_PYRAMID_REDUCTION;
		}

		this.enemy.max_hp = Math.floor((stats.hp + stats.hpPerDiff * this.difficulty) * hpMultiplier);
		this.enemy.baseAttack = Math.floor((stats.atk + stats.atkPerDiff * this.difficulty) * atkMultiplier);
		this.enemy.strength = stats.strength * strengthBonus;

		if (this.inPyramid) {
			this.enemy.name += ` (金字塔-地圖${this.difficulty})`;
			showMessage(`${t('pyramidEnemyStrong')}${hpMultiplier.toFixed(1)}、${t('attackX')}${atkMultiplier.toFixed(1)}、${t('strengthX')}${strengthBonus.toFixed(1)}`);
		}

		this.enemy.hp = this.enemy.max_hp;
		this.enemy.turnsToAttack = 3;
		this.consecutivePrimarySymbol = null;
		this.consecutivePrimaryCount = 0;
		this.updateStatus();

		// Auto-start slot and stop after short delay (simulate auto-battle)
		startSpin();
		setTimeout(() => {
			stopSequentially();
			// Enable buttons after first spin completes
			setTimeout(() => {
				App.enableBattleButtons();
			}, 200);
		}, 900);
	},

	/**
	 * Attempt to flee from battle
	 */
	attemptFlee() {
		if (!this.inBattle) {
			showMessage(t('notInBattle'));
			return;
		}

		// Cancel auto-spin
		stopAutoSpinLoop();

		const B = Config.BATTLE;
		const fleeChance = Math.min(B.FLEE_MAX_CHANCE, B.FLEE_BASE_CHANCE + B.FLEE_LUCK_BONUS * this.player.luck_combat);
		if (Math.random() < fleeChance) {
			showMessage(t('fleeSuccess'));
			this.inBattle = false;

			// Switch back to exploration music
			if (typeof MusicSystem !== 'undefined') {
				MusicSystem.switchTrack('exploration');
			}

			DOMRefs.disableBattle();

			// Stop auto-spin and disable auto button
			try { stopAutoSpinLoop(); } catch(e) {}
			if (DOMRefs.autoSpinBtn) DOMRefs.autoSpinBtn.disabled = true;

			DOMRefs.enableMovement();
			this.enemy.hp = 0;
			this.updateStatus();
		} else {
			showMessage(t('fleeFailed'));
			setTimeout(() => {
				if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack();
			}, 300);
		}
	},

	/**
	 * Enemy auto-attack when turn counter reaches 0
	 */
	enemyAutoAttack() {
		// Calculate base attack with combo counter-attack bonus
		const raw = this.enemy.baseAttack;
		const extra = Math.max(0, this.consecutivePrimaryCount - 1) * 0.3; // 30% counter per combo
		const dmg = Math.floor(raw * (1 + extra));

		if (Math.random() < this._calcDodgeChance()) {
			showMessage(t('dodgedAutoAttack', { luck: this.player.luck_combat }));
			// Consume some combat luck after successful dodge
			if (this.player.luck_combat > 0) {
				this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
				showMessage(t('luckConsumed', { remaining: this.player.luck_combat }));
			}
		} else {
			const consumedShield = Math.min(this.player.shield, dmg);
			const mitigated = Math.max(0, dmg - this.player.shield);
			this.player.shield -= consumedShield;
			this.player.hp -= mitigated;
			showMessage(t('enemyAutoAttackDamage', { damage: dmg, absorbed: consumedShield, actual: mitigated }));
		}

		// Reset attack countdown
		this.enemy.turnsToAttack = 3;
		this.updateStatus();
	},

	/**
	 * Process slot machine results and apply effects
	 * @param {string[]} results - Array of 3 symbols from slot machine
	 */
	applySlotResults(results) {
		// Check if battle has ended, if so don't process results
		if (!this.inBattle) {
			return;
		}

		// Use leftmost slot (results[0]) as primary symbol, only count consecutive same symbols from left
		const primary = results[0];
		let matchCount = 1; // At least the first slot
		if (results[1] === primary) {
			matchCount = 2;
			if (results[2] === primary) {
				matchCount = 3;
			}
		}

		// Triple match gives extra bonus (equivalent to multiplied 2-slot effect)
		const tripleBonus = matchCount === 3 ? Config.BATTLE.TRIPLE_BONUS : 1;

		// Calculate current combo (including current slot) and display
		const previousCombo = (this.inBattle && this.consecutivePrimarySymbol === primary) ? this.consecutivePrimaryCount : 0;
		const effectiveCombo = previousCombo + 1;
		// Combo effect is now linear multiplier: 2x for 2, 3x for 3, 4x for 4
		const comboMultiplier = effectiveCombo;

		// Brief prompt showing primary symbol, match count and current combo
		const bonusMsg = matchCount === 3 ? '【三連加成 x2.5】' : '';
		showMessage(`主要符號：${primary}，匹配數：${matchCount}${bonusMsg}，連續 x${effectiveCombo}（乘數 x${comboMultiplier}）`);

		this._processSymbolEffect(primary, matchCount, tripleBonus, comboMultiplier, effectiveCombo);

		// Battle related: track consecutive primary symbols (combo)
		if (this.inBattle) {
			if (this.consecutivePrimarySymbol === primary) {
				this.consecutivePrimaryCount += 1;
			} else {
				this.consecutivePrimarySymbol = primary;
				this.consecutivePrimaryCount = 1;
			}
			showMessage(`目前連續主符號：${this.consecutivePrimarySymbol} x${this.consecutivePrimaryCount}`);

			// Update status and messages first
			this.updateStatus();

			// Enemy turn countdown (if enemy is still alive)
			this.enemy.turnsToAttack -= 1;
			if (this.enemy.turnsToAttack <= 0 && this.enemy.hp > 0) {
				// Delay enemy attack to let slot effects display first
				setTimeout(() => {
					if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack();
				}, 300);
			}

			// If enemy is defeated, end battle (immediate processing)
			if (this.enemy.hp <= 0) {
				this._handleVictory();
			}
		}

		// Check player death
		this._checkPlayerDeath();

		this.updateStatus();

		// Check battle state again after updateStatus, ensure auto-spin stops correctly
		if (!this.inBattle && typeof stopAutoSpinLoop === 'function') {
			try {
				stopAutoSpinLoop();
				DOMRefs.disableBattle();
			} catch(e) {
				console.error('強制停止自動旋轉失敗:', e);
			}
		}
	},

	/**
	 * Process individual symbol effects
	 * @private
	 */
	_processSymbolEffect(primary, matchCount, tripleBonus, comboMultiplier, effectiveCombo) {
		switch (primary) {
			case '⚔️': {
				// Normal attack with crit chance
				let baseDmg = this._calcScaledValue(15, matchCount, tripleBonus, comboMultiplier);
				baseDmg += this._getWeaponAttr('atk');
				const isCrit = Math.random() < this._calcCritChance();
				const finalDmg = isCrit ? Math.floor(baseDmg * 2.0) : baseDmg;
				this.enemy.hp -= finalDmg;
				showMessage(t('normalAttack', { count: matchCount, crit: isCrit ? t('critical') : '', damage: finalDmg }));
				break;
			}
			case '⚡️': {
				// Skill attack with skill power bonus
				let baseDmg = this._calcScaledValue(25, matchCount, tripleBonus, comboMultiplier);
				baseDmg += this._getWeaponAttr('atk');
				const skillPower = this._getWeaponAttr('skill_power');
				baseDmg = Math.floor(baseDmg * (1 + skillPower / 100));
				const isCrit = Math.random() < this._calcCritChance();
				const finalDmg = isCrit ? Math.floor(baseDmg * 2.2) : baseDmg;
				this.enemy.hp -= finalDmg;
				const staminaCost = 5 * matchCount;
				this.player.stamina = Math.max(0, this.player.stamina - staminaCost);
				showMessage(t('skillAttack', { count: matchCount, crit: isCrit ? t('critical') : '', damage: finalDmg, stamina: staminaCost }));
				break;
			}
			case '🛡️': {
				const shieldGain = this._calcScaledValue(10, matchCount, tripleBonus, comboMultiplier);
				this.player.shield += shieldGain;
				showMessage(t('shieldGain', { count: matchCount, combo: effectiveCombo, shield: shieldGain }));
				break;
			}
			case '🧪': {
				// Potion effect scales with map difficulty
				const baseHp = 90 + (this.difficulty * 10);
				const hpGain = this._calcScaledValue(baseHp, matchCount, tripleBonus, comboMultiplier);
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
				const baseStamina = 30 + (this.difficulty * 8);
				const staminaGain = this._calcScaledValue(baseStamina, matchCount, tripleBonus, comboMultiplier);
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
				showMessage(t('potionUse', { count: matchCount, combo: effectiveCombo, map: this.difficulty, hp: hpGain, stamina: staminaGain }));
				break;
			}
			case '⭐': {
				const luckGain = Math.round(matchCount * tripleBonus);
				this.player.luck_combat += luckGain;
				showMessage(t('luckGain', { luck: luckGain }));
				break;
			}
			case '💀': {
				const rawDmg = Math.round(10 * matchCount * tripleBonus);
				if (Math.random() < this._calcDodgeChance()) {
					showMessage(t('dodgedSymbolAttack', { luck: this.player.luck_combat }));
					if (this.player.luck_combat > 0) {
						this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
						showMessage(t('luckConsumed', { remaining: this.player.luck_combat }));
					}
				} else {
					const consumedShield = Math.min(this.player.shield, rawDmg);
					const mitigated = Math.max(0, rawDmg - this.player.shield);
					this.player.shield -= consumedShield;
					this.player.hp -= mitigated;
					showMessage(t('enemySymbolAttack', { count: matchCount, raw: rawDmg, absorbed: consumedShield, actual: mitigated }));
				}
				break;
			}
			case '💰': {
				const got = this._calcScaledValue(20, matchCount, tripleBonus, comboMultiplier);
				this.player.gold += got;
				showMessage(t('goldGain', { gold: got, count: matchCount, combo: effectiveCombo }));
				break;
			}
			default: {
				showMessage(t('noSymbolEffect'));
				break;
			}
		}
	},

	/**
	 * Handle victory - rewards and battle end
	 * @private
	 */
	_handleVictory() {
		showMessage(t('victoryMessage'));

		// Play victory music
		if (typeof MusicSystem !== 'undefined') {
			MusicSystem.playVictory();
		}

		// Check for bandit loot
		if (this.player.banditsLoot) {
			const banditGold = this.player.banditsLoot;
			this.player.gold += banditGold;
			showMessage(t('banditLootRecovered', { gold: banditGold }));
			this.player.banditsLoot = 0;
		}

		// Pyramid multiplier from Config
		const pyramidMultiplier = this.inPyramid ? Config.BATTLE.PYRAMID_XP_MULTIPLIER : 1;

		// Enemy type reward multiplier (elite x2, mini-boss x3)
		let enemyTypeMultiplier = 1;
		if (this.enemy.strength >= 2.4) { // mini_boss
			enemyTypeMultiplier = 3;
		} else if (this.enemy.strength >= 1.6) { // elite
			enemyTypeMultiplier = 2;
		}

		// Gold reward based on difficulty
		const baseReward = 20 * this.difficulty;
		const reward = baseReward * pyramidMultiplier * enemyTypeMultiplier;
		this.player.gold += reward;

		let rewardMsg = `獲得金幣 ${reward}`;
		if (this.inPyramid) {
			rewardMsg = `🔺 金字塔獎勵 x${pyramidMultiplier}！獲得金幣 ${reward} (基礎 ${baseReward} x${pyramidMultiplier}`;
			if (enemyTypeMultiplier > 1) {
				rewardMsg += ` x${enemyTypeMultiplier}`;
			}
			rewardMsg += ')';
		} else if (enemyTypeMultiplier > 1) {
			rewardMsg += ` (基礎 ${baseReward} x${enemyTypeMultiplier})`;
		}
		showMessage(rewardMsg);

		// XP calculation
		const mapMultiplier = Math.pow(2, this.difficulty - 1);
		const baseXP = Math.floor(15 * this.difficulty * (this.enemy.strength || 1));
		const xpGain = Math.floor(baseXP * mapMultiplier * pyramidMultiplier * enemyTypeMultiplier);
		if (this.inPyramid) {
			showMessage(`🔺 金字塔經驗值 x${pyramidMultiplier}！`);
		}
		this.addXP(xpGain);

		// Drop mechanism
		this._handleLootDrop(pyramidMultiplier, enemyTypeMultiplier);

		// End battle
		this._endBattle();
	},

	/**
	 * Handle loot drops after victory
	 * @private
	 */
	_handleLootDrop(pyramidMultiplier, enemyTypeMultiplier) {
		let dropped = null;

		if (this.inPyramid) {
			// Pyramid guarantees 1-2 rare/epic items
			const dropCount = 1 + Math.floor(Math.random() * 2);
			showMessage(`🔺 金字塔寶藏！掉落 ${dropCount} 件裝備`);
			for (let i = 0; i < dropCount; i++) {
				const rarityRoll = Math.random();
				let targetRarity = rarityRoll < 0.3 ? 'epic' : 'rare';
				const candidateItems = ITEMS.filter(it => it.slot);
				if (candidateItems.length > 0) {
					const baseItem = candidateItems[Math.floor(Math.random() * candidateItems.length)];
					dropped = cloneItem(baseItem, targetRarity, true);
					this.player.inventory.push(dropped);
					showMessage(`  ✨ 獲得 ${this.formatItem(dropped)}`);
				}
			}
		} else {
			// Normal map drops (uses pickWeightedRarity from EnemyGenerator.js)
			if (enemyTypeMultiplier === 3) { // mini_boss
				const weights = [10,50,10,25,5];
				const dropCount = 1 + Math.floor(Math.random() * 2);
				showMessage(`💎 小頭目掉落 ${dropCount} 件裝備！`);
				for (let i = 0; i < dropCount; i++) {
					const rarity = pickWeightedRarity(weights);
					const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
					dropped = cloneItem(baseItem, rarity);
					this.player.inventory.push(dropped);
					showMessage(`  獲得 ${this.formatItem(dropped)}`);
				}
			} else if (enemyTypeMultiplier === 2) { // elite
				const weights = [15,40,15,20,10];
				const dropCount = 1 + Math.floor(Math.random() * 2);
				const dropRoll = Math.random() * 100;
				const dropChance = 85;
				console.log(`Elite drop check: roll=${dropRoll}, chance=${dropChance}, count=${dropCount}`);
				if (dropRoll < dropChance) {
					showMessage(`⚔️ 精英掉落 ${dropCount} 件裝備！`);
					for (let i = 0; i < dropCount; i++) {
						const rarity = pickWeightedRarity(weights);
						const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
						dropped = cloneItem(baseItem, rarity);
						this.player.inventory.push(dropped);
						console.log(`Elite dropped item ${i+1}:`, dropped.name, rarity);
						showMessage(`  獲得 ${this.formatItem(dropped)}`);
					}
				} else {
					console.log('Elite drop failed:', dropRoll, '>=', dropChance);
				}
			} else {
				// Normal enemy drops
				const weights = [70,20,6,3,1];
				const rollRarity = pickWeightedRarity(weights);
				if (rollRarity !== 'common') {
					const baseItem = ITEMS[Math.floor(Math.random()*ITEMS.length)];
					dropped = cloneItem(baseItem, rollRarity);
					this.player.inventory.push(dropped);
					showMessage(`敵人掉落：${this.formatItem(dropped)}`);
				}
			}
		}
	},

	/**
	 * End battle and restore UI state
	 * @private
	 */
	_endBattle() {
		// Stop auto-spin
		try { stopAutoSpinLoop(); } catch(e) {}

		this.inBattle = false;

		// Switch back to exploration music
		if (typeof MusicSystem !== 'undefined') {
			MusicSystem.switchTrack('exploration');
		}

		// Disable battle buttons
		DOMRefs.disableBattle();

		// Disable and reset auto-spin button
		if (DOMRefs.autoSpinBtn) {
			DOMRefs.autoSpinBtn.disabled = true;
			DOMRefs.autoSpinBtn.textContent = '自動旋轉';
			DOMRefs.autoSpinBtn.style.background = '';
		}

		// Enable movement buttons
		DOMRefs.enableMovement();

		this.enemy.turnsToAttack = 3;

		// Check if pyramid or map goal reached after battle ends
		if (this.inPyramid && this.pyramidSteps >= this.pyramidMaxSteps) {
			this.exitPyramid();
		} else if (!this.inPyramid && this.map_steps >= this.map_goal) {
			this.nextMap();
		} else {
			// Only generate direction hints if not leaving pyramid/map
			this.generateDirectionHints();
		}
	},

	/**
	 * Check if player died and handle resurrection or game over
	 * @private
	 */
	_checkPlayerDeath() {
		if (this.player.hp <= 0) {
			if (this.player.potions > 0) {
				this.player.potions -= 1;
				this.player.hp = this.player.max_hp;
				this.player.stamina = this.player.max_stamina;
				showMessage(`HP 歸零，消耗一瓶藥水自動復活並回滿 HP/體力。剩餘藥水：${this.player.potions}`);
			} else {
				showMessage('你倒下了，遊戲結束。沒有藥水可用。請重新整理頁面以重玩。');
				try { stopAutoSpinLoop(); } catch(e) {}
				this.inBattle = false;
				if (typeof MusicSystem !== 'undefined') {
					MusicSystem.switchTrack('exploration');
				}
				DOMRefs.disableBattle();
				if (DOMRefs.autoSpinBtn) {
					DOMRefs.autoSpinBtn.disabled = true;
					DOMRefs.autoSpinBtn.textContent = '自動旋轉';
					DOMRefs.autoSpinBtn.style.background = '';
				}
			}
		}
	}
};

// cloneItem and pickWeightedRarity are now in js/combat/EnemyGenerator.js
