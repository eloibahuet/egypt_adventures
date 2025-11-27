// ===== Navigation Module =====
// Handles navigation, direction hints, event dispatching, and map progression

/**
 * Navigation mixin - methods to be attached to Game prototype
 * Dependencies: showMessage (global), t (global - i18n), currentLanguage (global),
 *               chooseEvent (from data.js), BranchHandlers (from branchHandlers.js)
 */
const NavigationMixin = {
	/**
	 * Generate direction hints with branch paths
	 */
	generateDirectionHints() {
		// Handle oasis blessing effect (auto-recovery)
		if (this.player.oasisBlessing && this.player.oasisBlessing > 0) {
			const healAmount = Math.floor(this.player.max_hp * 0.05);
			const staminaAmount = Math.floor(this.player.max_stamina * 0.05);
			this.player.hp = Math.min(this.player.max_hp, this.player.hp + healAmount);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaAmount);
			this.player.oasisBlessing--;
			showMessage(`🌴 綠洲祝福：自動恢復 ${healAmount} HP 和 ${staminaAmount} 體力（剩餘 ${this.player.oasisBlessing} 次）`);
		}

		// Pre-determine events and possible branches for each direction
		const directions = {
			'前': this.generateBranchPath(),
			'左': this.generateBranchPath(),
			'右': this.generateBranchPath()
		};

		// Caravan rest guarantee: ensure at least one caravan rest per map
		if (!this.inPyramid && !this.hasEncounteredCaravanRest) {
			const progressRatio = this.map_steps / this.map_goal;
			const dirKeys = Object.keys(directions);

			// If map progress > 60% and no caravan rest yet, force one direction to have it
			if (progressRatio >= 0.6) {
				const targetDir = dirKeys[Math.floor(Math.random() * dirKeys.length)];
				directions[targetDir].main = 'caravan_rest';
				directions[targetDir].branches = [];
				showMessage('🏪 你感覺前方不遠處有驛站的氣息...');
			} else if (progressRatio >= 0.3 && Math.random() < 0.4) {
				// After 30% progress, 40% chance to spawn caravan in one direction
				const targetDir = dirKeys[Math.floor(Math.random() * dirKeys.length)];
				directions[targetDir].main = 'caravan_rest';
			}
		}

		// Bandit info effect: increase good event probability
		if (this.player.banditInfo && this.player.banditInfo > 0) {
			const goodEvents = ['merchant', 'oasis', 'buried_treasure', 'ancient_shrine', 'caravan_rest', 'trading_post', 'desert_oasis'];
			const dirKeys = Object.keys(directions);
			const targetDir = dirKeys[Math.floor(Math.random() * dirKeys.length)];
			const goodEvent = goodEvents[Math.floor(Math.random() * goodEvents.length)];
			directions[targetDir].main = goodEvent;
			showMessage(`🗺️ 強盜情報：你感覺${targetDir}方似乎有好東西...（剩餘 ${this.player.banditInfo} 次）`);
			this.player.banditInfo--;
		}

		// Pyramid dungeon doesn't appear in first 10 steps
		if (!this.inPyramid && this.map_steps <= 10) {
			Object.keys(directions).forEach(dir => {
				if (directions[dir].main === 'pyramid') {
					directions[dir] = this.generateBranchPath();
					if (directions[dir].main === 'pyramid') {
						directions[dir].main = 'monster';
						directions[dir].branches = [];
					}
				}
			});
		}

		// Store current direction event mapping
		this.currentDirections = directions;

		// Generate hint text (multi-language)
		const hints = {
			'monster': [t('hintBattle'), t('hintDust'), t('hintKilling'), t('hintRoar'), t('hintFootprints')],
			'elite': [t('hintPowerful'), t('hintGiantShadow'), t('hintDeepRoar'), t('hintDanger')],
			'mini_boss': [t('hintTemple'), t('hintTerror'), t('hintFootsteps'), t('hintHugeShadow')],
			'merchant': [t('hintCaravanBells'), t('hintTent'), t('hintSpices'), t('hintMerchantFlag')],
			'black_market': [t('hintMysteryDeal'), t('hintBlackTent'), t('hintBlackMarket'), t('hintMaskedMerchant')],
			'oasis': [t('hintWater'), t('hintGreen'), t('hintMoist'), t('hintPalms'), t('hintFreshWater')],
			'sandstorm': [t('hintSandstorm'), t('hintStrongWind'), t('hintWindSound'), t('hintDarkSky')],
			'buried_treasure': [t('hintStrangeMark'), t('hintAncientSign'), t('hintShining'), t('hintTreasure')],
			'pyramid': [t('hintPyramidTop'), t('hintAncientTemple'), t('hintStone'), t('hintMystery')],
			'dead_traveler': [t('hintDeadTraveler'), t('hintAbandonedItems'), t('hintOldBackpack'), t('hintTragedy')],
			'ancient_shrine': [t('hintShrine'), t('hintStatue'), t('hintHoly'), t('hintRune')],
			'caravan_rest': [t('hintCaravanRest'), t('hintLaughter'), t('hintCampfire'), t('hintFood')],
			'lost_merchant': ['🐪 迷失的商隊呼救聲', '商隊的旗幟在風中飄揚', '你聽到駱駝的哀鳴'],
			'cursed_shrine': ['⚠️ 不祥的氣息', '神殿散發詭異光芒', '低語聲從廢墟中傳來'],
			'bandit_ambush': ['⚔️ 沙丘後有人影移動', '刀劍碰撞的聲音', '你感覺被人盯上了'],
			'ancient_puzzle': ['🧩 神秘的石碑', '古老的象形文字', '謎題的氣息'],
			'desert_oasis': ['🌴 清新的水汽', '茂密的植被', '綠洲的芬芳', '生命的氣息'],
			'empty': [
				t('hintEmpty1'),
				t('hintEmpty2'),
				t('hintEmpty3'),
				t('hintEmpty4'),
				t('hintEmpty5')
			]
		};

		// Compass effect: show more detailed hints
		const hasCompass = this.player.compassEffect && this.player.compassEffect > 0;

		const directionTexts = {
			'前': t('dirFront'),
			'左': t('dirLeft'),
			'右': t('dirRight')
		};

		let message = this.inPyramid
			? `${t('pyramidPassage')}\n`
			: `${t('desertJourney')}\n`;

		Object.keys(directions).forEach(dir => {
			const eventPath = directions[dir];
			const event = eventPath.main;
			const hintPool = hints[event] || hints['empty'];

			// Filter out hints that would show as "nothing happened"
			const filteredPool = hintPool.filter(h => {
				if (!h) return false;
				const normalized = String(h).trim();
				if (!normalized) return false;
				if (normalized === t('hintNothing')) return false;
				if (normalized === '什麼都沒有') return false;
				return true;
			});

			// If no hints available after filtering, use fallback
			const finalPool = (filteredPool.length > 0) ? filteredPool : [
				t('hintEmptyFallback1'),
				t('hintEmptyFallback2'),
				t('hintEmptyFallback3')
			];
			const hint = finalPool[Math.floor(Math.random() * finalPool.length)];

			// Compass effect: show event type
			let compassInfo = '';
			if (hasCompass) {
				const eventNames = {
					'monster': '普通敵人',
					'elite': '精英敵人',
					'mini_boss': '小頭目',
					'merchant': '商人',
					'black_market': '黑市',
					'oasis': '綠洲',
					'sandstorm': '沙塵暴',
					'pyramid': '金字塔',
					'buried_treasure': '寶藏',
					'dead_traveler': '旅者遺體',
					'ancient_shrine': '神殿',
					'caravan_rest': '驛站',
					'lost_merchant': '迷失商隊',
					'cursed_shrine': '詛咒神殿',
					'bandit_ambush': '強盜',
					'ancient_puzzle': '古老謎題',
					'desert_oasis': '沙漠綠洲',
					'trading_post': '交易站',
					'empty': '平靜路段'
				};
				compassInfo = ` 🧭[${eventNames[event] || event}]`;
			}

			// If there are branches, add extra hint
			let branchHint = '';
			if (eventPath.branches && eventPath.branches.length > 0) {
				branchHint = ' ✨';
				if (eventPath.branches.length > 1) branchHint = ' ⭐';
			}

			// Adjust format based on language
			if (currentLanguage === 'zh-TW') {
				message += `${directionTexts[dir]} ${hint}${compassInfo}${branchHint}。\n`;
			} else {
				message += `${directionTexts[dir]} ${hint}${compassInfo}${branchHint}.\n`;
			}
		});

		// Consume compass effect
		if (hasCompass) {
			this.player.compassEffect--;
			if (this.player.compassEffect > 0) {
				showMessage(`🧭 沙漠指南針剩餘 ${this.player.compassEffect} 次使用`);
			} else {
				showMessage('🧭 沙漠指南針效果已消失');
			}
		}

		message += `\n${t('chooseDirection')}`;
		showMessage(message);
	},

	/**
	 * Generate branch path with main event and possible branches
	 * @returns {Object} Path object with main event and branches array
	 */
	generateBranchPath() {
		const mainEvent = this.inPyramid ? this.choosePyramidEvent() : chooseEvent();
		const branches = [];

		// 30% chance to trigger branch
		if (Math.random() < 0.3) {
			const branchType = this.chooseBranchType(mainEvent);
			branches.push(branchType);
		}

		// 10% chance to trigger double branch
		if (Math.random() < 0.1 && branches.length > 0) {
			const secondBranch = this.chooseBranchType(mainEvent);
			if (secondBranch !== branches[0]) {
				branches.push(secondBranch);
			}
		}

		return { main: mainEvent, branches: branches };
	},

	/**
	 * Choose appropriate branch type based on main event
	 * @param {string} mainEvent - The main event type
	 * @returns {string} Branch type
	 */
	chooseBranchType(mainEvent) {
		const branchMap = {
			'monster': ['ambush', 'treasure_drop', 'ally_join', 'escape_route'],
			'elite': ['epic_loot', 'curse', 'power_surge', 'boss_insight'],
			'mini_boss': ['legendary_loot', 'god_blessing', 'ancient_power', 'hidden_passage'],
			'merchant': ['discount', 'rare_item', 'trade_quest', 'caravan_info'],
			'black_market': ['stolen_goods', 'black_contract', 'smuggler_route', 'forbidden_item'],
			'oasis': ['healing_spring', 'hidden_treasure', 'desert_guide', 'oasis_blessing'],
			'sandstorm': ['lost_items', 'shelter_find', 'storm_vision', 'sand_curse'],
			'pyramid': ['secret_chamber', 'pharaoh_curse', 'divine_trial', 'treasure_vault'],
			'ancient_shrine': ['god_trial', 'divine_gift', 'ancient_wisdom', 'curse_removal'],
			'buried_treasure': ['trap_avoid', 'double_loot', 'treasure_map', 'curse_item'],
			'dead_traveler': ['dying_wish', 'revenge_quest', 'inherited_skill', 'cursed_item'],
			'caravan_rest': ['trade_opportunity', 'rest_bonus', 'caravan_quest', 'guide_hire'],
			'empty': ['mirage', 'buried_cache', 'desert_spirit', 'quicksand']
		};

		const options = branchMap[mainEvent] || ['random_event'];
		return options[Math.floor(Math.random() * options.length)];
	},

	/**
	 * Handle player movement in a direction
	 * @param {string} direction - Direction chosen ('前', '左', '右')
	 */
	moveStep(direction) {
		// If no direction hints exist, generate new ones
		if (!this.currentDirections) {
			this.generateDirectionHints();
			return; // Wait for player choice
		}

		// Get event path for chosen direction
		const eventPath = this.currentDirections[direction];

		if (this.inPyramid) {
			// Pyramid dungeon mode
			this.pyramidSteps += 1;
			showMessage(`${t('youChose')} ${direction} ${t('direction')}🔺 ${t('pyramidExploration')}: ${this.pyramidSteps}/${this.pyramidMaxSteps} ${t('steps')}`);
		} else {
			// Normal map mode
			this.map_steps += 1;
			showMessage(`${t('youChose')} ${direction} ${t('direction')}${t('movedSteps')} ${this.map_steps}/${this.map_goal} ${t('steps')}`);
		}

		// Clear current direction mapping
		this.currentDirections = null;

		// Handle main event
		this.handleEvent(eventPath.main);

		// Handle branch events
		if (eventPath.branches && eventPath.branches.length > 0) {
			this.handleBranchEvents(eventPath.branches);
		}

		// Check if pyramid or normal map completed (only when not in battle)
		if (!this.inBattle) {
			if (this.inPyramid && this.pyramidSteps >= this.pyramidMaxSteps) {
				this.exitPyramid();
			} else if (!this.inPyramid && this.map_steps >= this.map_goal) {
				this.nextMap();
			}
		}

		this.updateStatus();

		// If not in battle and not in shop, generate next direction hints
		if (!this.inBattle && !this.inShop) {
			this.generateDirectionHints();
		}
	},

	/**
	 * Handle branch events
	 * @param {string[]} branches - Array of branch event types
	 */
	handleBranchEvents(branches) {
		branches.forEach(branch => {
			// Use BranchHandlers dispatch table
			if (typeof BranchHandlers !== 'undefined' && BranchHandlers[branch]) {
				BranchHandlers[branch].call(this);
			} else {
				showMessage(`${t('branchSpecialEvent')}: ${branch}`);
			}
		});
	},

	/**
	 * Choose pyramid-specific event
	 * @returns {string} Event type
	 */
	choosePyramidEvent() {
		// Pyramid events: higher monster encounter rate
		const pyramidEvents = ['monster', 'elite', 'mini_boss', 'oasis', 'empty'];
		const pyramidWeights = [35, 25, 15, 10, 15]; // 75% combat rate
		const total = pyramidWeights.reduce((a, b) => a + b, 0);
		let r = Math.random() * total;
		for (let i = 0, acc = 0; i < pyramidWeights.length; i++) {
			acc += pyramidWeights[i];
			if (r < acc) return pyramidEvents[i];
		}
		return 'monster';
	},

	/**
	 * Advance to next map
	 */
	nextMap() {
		showMessage(t('desertCleared'));
		this.map_steps = 0;
		this.difficulty += 1;
		this.map_goal += 5;
		// Reset caravan rest tracking for new map
		this.hasEncounteredCaravanRest = false;
		this.updateStatus();
	},

	/**
	 * Handle event dispatch
	 * @param {string} event - Event type (snake_case)
	 */
	handleEvent(event) {
		// Combat events handled directly via battle()
		if (event === 'monster' || event === 'elite' || event === 'mini_boss') {
			this.battle(event);
			return;
		}

		// Special case: caravan_rest sets a flag
		if (event === 'caravan_rest') {
			this.hasEncounteredCaravanRest = true;
		}

		// Try EventRegistry first (new system)
		if (typeof EventRegistry !== 'undefined' && EventRegistry.triggerEvent(this, event)) {
			return;
		}

		// Fallback to Game class methods (for blackMarket, tradingPost, etc.)
		// Convert snake_case to camelCase for method lookup
		const methodName = event.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
		if (typeof this[methodName] === 'function') {
			this[methodName]();
			return;
		}

		showMessage(t('nothingHappened'));
	}
};
