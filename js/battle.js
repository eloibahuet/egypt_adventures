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

		// Adjust enemy HP and attack based on type
		// Pyramid enemies scale with map difficulty: HP x(3+difficulty*0.5), ATK x(2.5+difficulty*0.3), strength x(1.5+difficulty*0.2)
		// Non-pyramid: increased strength (+0.5) and doubled HP (x2)
		let hpMultiplier = this.inPyramid ? (3.0 + this.difficulty * 0.5) : 2.0;
		let atkMultiplier = this.inPyramid ? (2.5 + this.difficulty * 0.3) : 1.0;
		let strengthBonus = this.inPyramid ? (1.5 + this.difficulty * 0.2) : 1.5;

		if (type === 'elite') {
			this.enemy.max_hp = Math.floor((150 + 20 * this.difficulty) * hpMultiplier);
			this.enemy.baseAttack = Math.floor((15 + 5 * this.difficulty) * atkMultiplier);
			this.enemy.strength = 1.6 * strengthBonus;
		} else if (type === 'mini_boss') {
			// Pyramid mini-boss difficulty reduced by 20%
			const miniBossHpMult = this.inPyramid ? hpMultiplier * 0.8 : hpMultiplier;
			const miniBossAtkMult = this.inPyramid ? atkMultiplier * 0.8 : atkMultiplier;
			const miniBossStrMult = this.inPyramid ? strengthBonus * 0.8 : strengthBonus;
			this.enemy.max_hp = Math.floor((250 + 40 * this.difficulty) * miniBossHpMult);
			this.enemy.baseAttack = Math.floor((25 + 8 * this.difficulty) * miniBossAtkMult);
			this.enemy.strength = 2.4 * miniBossStrMult;
		} else {
			this.enemy.max_hp = Math.floor((100 + 10 * this.difficulty) * hpMultiplier);
			this.enemy.baseAttack = Math.floor((10 + 2 * this.difficulty) * atkMultiplier);
			this.enemy.strength = 1.0 * strengthBonus;
		}

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
			showMessage('目前不在戰鬥中。');
			return;
		}

		// Cancel auto-spin
		stopAutoSpinLoop();

		const fleeChance = Math.min(0.9, 0.4 + 0.02 * this.player.luck_combat);
		if (Math.random() < fleeChance) {
			showMessage('你成功逃離戰鬥！');
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
			showMessage('逃跑失敗！敵人獲得一次攻擊機會！');
			setTimeout(() => {
				if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack();
			}, 300);
		}
	},

	/**
	 * Enemy auto-attack when turn counter reaches 0
	 */
	enemyAutoAttack() {
		// Calculate base attack and reduce base damage (more suitable for beginners)
		const raw = this.enemy.baseAttack;
		// If player has consecutive symbols, enemy slightly increases counter-attack (risk), adjusted to linear multiplier
		const extra = Math.max(0, this.consecutivePrimaryCount - 1) * 0.3; // 30% counter per combo
		let dmg = Math.floor(raw * (1 + extra));

		// Player has dodge chance (from luck and armor passive dodge)
		const armorDodge = this.player.equipment.armor ? (this.player.equipment.armor.dodge_rate || 0) : 0;
		const dodgeChance = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodge / 100); // Max 50% dodge

		if (Math.random() < dodgeChance) {
			showMessage(`你閃避了敵人的自動攻擊！(戰鬥幸運 ${this.player.luck_combat})`);
			// Consume some combat luck after successful dodge
			if (this.player.luck_combat && this.player.luck_combat > 0) {
				this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
				showMessage(`戰鬥幸運 -1（剩餘 ${this.player.luck_combat}）。`);
			}
		} else {
			const consumedShield = Math.min(this.player.shield, dmg);
			const mitigated = Math.max(0, dmg - this.player.shield);
			this.player.shield -= consumedShield;
			this.player.hp -= mitigated;
			showMessage(`敵人自動攻擊，造成 ${dmg} 傷害（護盾吸收 ${consumedShield}），玩家 HP -${mitigated}。`);
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

		// Triple match gives extra 2.5x bonus (equivalent to 2.5x of 2-slot effect)
		const tripleBonus = matchCount === 3 ? 2.5 : 1;

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
				// Calculate crit chance (affected by combat luck), apply crit multiplier
				let baseDmg = 15 * matchCount;
				baseDmg = Math.round(baseDmg * tripleBonus);
				baseDmg = Math.max(1, Math.round(baseDmg * comboMultiplier));
				const weaponAtk = this.player.equipment.weapon ? (this.player.equipment.weapon.atk || 0) : 0;
				baseDmg += weaponAtk;
				const weaponCritRate = this.player.equipment.weapon ? (this.player.equipment.weapon.crit_rate || 0) : 0;
				const critChance = Math.min(0.75, 0.08 + 0.05 * this.player.luck_combat + weaponCritRate / 100);
				let isCrit = Math.random() < critChance;
				let finalDmg = isCrit ? Math.floor(baseDmg * 2.0) : baseDmg;
				this.enemy.hp -= finalDmg;
				showMessage(`你發動普通攻擊 x${matchCount}${isCrit? '（暴擊）':''}，對敵人造成 ${finalDmg} 傷害。`);
				break;
			}
			case '⚡️': {
				let baseDmg = 25 * matchCount;
				baseDmg = Math.round(baseDmg * tripleBonus);
				baseDmg = Math.max(1, Math.round(baseDmg * comboMultiplier));
				const weaponAtk2 = this.player.equipment.weapon ? (this.player.equipment.weapon.atk || 0) : 0;
				baseDmg += weaponAtk2;
				const weaponSkillPower = this.player.equipment.weapon ? (this.player.equipment.weapon.skill_power || 0) : 0;
				baseDmg = Math.floor(baseDmg * (1 + weaponSkillPower / 100));
				const weaponCritRate2 = this.player.equipment.weapon ? (this.player.equipment.weapon.crit_rate || 0) : 0;
				const critChance2 = Math.min(0.75, 0.08 + 0.05 * this.player.luck_combat + weaponCritRate2 / 100);
				let isCrit2 = Math.random() < critChance2;
				let finalDmg2 = isCrit2 ? Math.floor(baseDmg * 2.2) : baseDmg;
				this.enemy.hp -= finalDmg2;
				const staminaCost = 5 * matchCount;
				this.player.stamina = Math.max(0, this.player.stamina - staminaCost);
				showMessage(`你使用技能 x${matchCount}${isCrit2? '（暴擊）':''}，對敵人造成 ${finalDmg2} 傷害，消耗體力 ${staminaCost}。`);
				break;
			}
			case '🛡️': {
				let shieldGain = 10 * matchCount;
				shieldGain = Math.round(shieldGain * tripleBonus);
				shieldGain = Math.max(1, Math.round(shieldGain * comboMultiplier));
				this.player.shield += shieldGain;
				showMessage(`你獲得防禦 x${matchCount}（連擊 x${effectiveCombo}），護盾 +${shieldGain}。`);
				break;
			}
			case '🧪': {
				// Potion effect scales with map difficulty
				const baseHpPerSymbol = 90 + (this.difficulty * 10);
				let hpGain = baseHpPerSymbol * matchCount;
				hpGain = Math.round(hpGain * tripleBonus);
				hpGain = Math.max(1, Math.round(hpGain * comboMultiplier));
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
				const baseStaminaPerSymbol = 30 + (this.difficulty * 8);
				let staminaGain = baseStaminaPerSymbol * matchCount;
				staminaGain = Math.round(staminaGain * tripleBonus);
				staminaGain = Math.max(1, Math.round(staminaGain * comboMultiplier));
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
				showMessage(`使用紅色水瓶 x${matchCount}（連擊 x${effectiveCombo}，地圖${this.difficulty}），回復 HP ${hpGain}、體力 ${staminaGain}。`);
				break;
			}
			case '⭐': {
				let luckGain = matchCount * tripleBonus;
				this.player.luck_combat += luckGain;
				showMessage(`獲得戰鬥幸運 +${luckGain}，提高暴擊與閃避機率。`);
				break;
			}
			case '💀': {
				let rawDmg = 10 * matchCount;
				rawDmg = Math.round(rawDmg * tripleBonus);
				const armorDodgeSkull = this.player.equipment.armor ? (this.player.equipment.armor.dodge_rate || 0) : 0;
				const dodgeChanceSkull = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodgeSkull / 100);
				if (Math.random() < dodgeChanceSkull) {
					showMessage(`你閃避了敵人符號攻擊（戰鬥幸運 ${this.player.luck_combat}）！`);
					if (this.player.luck_combat && this.player.luck_combat > 0) {
						this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
						showMessage(`戰鬥幸運 -1（剩餘 ${this.player.luck_combat}）。`);
					}
				} else {
					const consumedShield = Math.min(this.player.shield, rawDmg);
					const mitigated = Math.max(0, rawDmg - this.player.shield);
					this.player.shield -= consumedShield;
					this.player.hp -= mitigated;
					showMessage(`敵人攻擊 x${matchCount}，原始傷害 ${rawDmg}，護盾吸收 ${consumedShield}，實際受損 ${mitigated}。`);
				}
				break;
			}
			case '💰': {
				const coinValue = 20;
				let got = coinValue * matchCount;
				got = Math.round(got * tripleBonus);
				got = Math.max(1, Math.round(got * comboMultiplier));
				this.player.gold += got;
				showMessage(`獲得金幣 ${got}（💰 x${matchCount}，連擊 x${effectiveCombo}）。`);
				break;
			}
			default: {
				showMessage('此符號沒有主要效果。');
				break;
			}
		}
	},

	/**
	 * Handle victory - rewards and battle end
	 * @private
	 */
	_handleVictory() {
		showMessage('你擊敗了敵人！戰鬥結束，獲得獎勵。');

		// Play victory music
		if (typeof MusicSystem !== 'undefined') {
			MusicSystem.playVictory();
		}

		// Check for bandit loot
		if (this.player.banditsLoot) {
			const banditGold = this.player.banditsLoot;
			this.player.gold += banditGold;
			showMessage(`💰 從強盜那裡奪回了戰利品：${banditGold} 金幣！`);
			this.player.banditsLoot = 0;
		}

		// Pyramid multiplier (changed to 15x)
		const pyramidMultiplier = this.inPyramid ? 15 : 1;

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
