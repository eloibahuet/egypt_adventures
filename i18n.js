// 多語言翻譯系統
const TRANSLATIONS = {
	'zh-TW': {
		// UI Elements
		title: 'Egypt Adventures',
		symbolGuide: '符號說明',
		attack: '攻擊',
		skill: '技能',
		defense: '防禦',
		enemyAttack: '敵人攻擊',
		heal: '回復',
		luckyBonus: '幸運加成',
		welcomeMessage: '迷途的旅人，請選擇前進的方向來決定你在沙漠中的命運吧！',
		remainingSteps: '剩餘步數',
		
		// Direction buttons
		front: '前',
		left: '左',
		right: '右',
		
		// Action buttons
		spin: '旋轉',
		stop: '停止',
		autoSpin: '自動旋轉',
		flee: '逃離',
		save: '💾 儲存',
		load: '📂 讀取',
		submit: '送出',
		close: '關閉',
		
		// Equipment panel
		equipmentAndInventory: '裝備與背包',
		empty: '空',
		inputPlaceholder: '請輸入指令...',
		
		// Black market
		blackMarket: '黑市商人',
		blackMarketDesc: '黑市中可以以賭博方式購買裝備（普通～史詩），最多可購買兩件。請小心行事！',
		
		// Game messages
		chooseDirection: '你選擇哪個方向？',
		desertJourney: '你沿著沙漠前行...',
		pyramidPassage: '你在金字塔的通道中，感受著古老的氣息...',
		youChose: '你選擇往',
		direction: '走。',
		movedSteps: '已移動',
		steps: '步',
		pyramidExploration: '🔺 金字塔探險',
		
		// Direction hints
		dirFront: '前方',
		dirLeft: '左邊',
		dirRight: '右邊',
		
		// Event hints
		hintBattle: '聽見戰鬥的聲音',
		hintDust: '看到沙塵飛揚',
		hintKilling: '感覺到殺氣',
		hintRoar: '聽到咆哮聲',
		hintFootprints: '看見腳印',
		hintPowerful: '感受到強大的氣息',
		hintGiantShadow: '看到巨大的身影',
		hintDeepRoar: '聽到低沉的吼聲',
		hintDanger: '察覺到危險的氣息',
		hintTemple: '看到古老的神殿',
		hintTerror: '感覺到恐怖的壓迫感',
		hintFootsteps: '聽到震撼的腳步聲',
		hintHugeShadow: '看見巨大的陰影',
		hintCaravanBells: '聽到商隊的駝鈴聲',
		hintTent: '看到商旅的帳篷',
		hintSpices: '聞到香料的味道',
		hintMerchantFlag: '看見商人的旗幟',
		hintMysteryDeal: '聽到神秘的交易聲',
		hintBlackTent: '看到可疑的黑帳篷',
		hintBlackMarket: '察覺到黑市的氣息',
		hintMaskedMerchant: '看見蒙面商人',
		hintWater: '聽到流水聲',
		hintGreen: '看到綠色植物',
		hintMoist: '感覺到濕潤的空氣',
		hintPalms: '看見棕櫚樹的倒影',
		hintFreshWater: '聞到清新的水氣',
		hintSandstorm: '看到黃沙漫天',
		hintStrongWind: '感覺到強風吹來',
		hintWindSound: '聽到風沙呼嘯',
		hintDarkSky: '天色變得昏暗',
		hintStrangeMark: '看到奇怪的地標',
		hintAncientSign: '發現古老的記號',
		hintShining: '看見反光的物體',
		hintTreasure: '察覺到寶藏的氣息',
		hintPyramidTop: '看到金字塔的尖頂',
		hintAncientTemple: '發現古老的神殿',
		hintStone: '看見巨大的石碑',
		hintMystery: '感受到神秘的力量',
		hintDeadTraveler: '看到倒下的旅人',
		hintAbandonedItems: '發現遺棄的物品',
		hintOldBackpack: '看見破舊的背包',
		hintTragedy: '察覺到悲劇的痕跡',
		hintShrine: '看到神秘的祭壇',
		hintStatue: '發現古老的雕像',
		hintHoly: '感受到神聖的力量',
		hintRune: '看見發光的符文',
		hintCaravanRest: '看到駱駝商隊休息',
		hintLaughter: '聽到旅人的歡笑聲',
		hintCampfire: '看見營火的亮光',
		hintFood: '聞到食物的香味',
		hintCalm: '一片平靜',
		hintNothing: '什麼都沒有',
		hintOnlyDesert: '只有沙漠',
		hintPeaceful: '風平浪靜',
		hintSilent: '寂靜無聲',
		
		// Branch events
		branchAmbush: '⚠️ 突然遭遇伏擊！額外的敵人出現！',
		branchTreasureDrop: '✨ 敵人掉落了稀有寶物！',
		branchAllyJoin: '👥 一位流浪戰士加入協助你戰鬥！（下次戰鬥攻擊+20%）',
		branchEscapeRoute: '🏃 發現逃生路線！（可選擇逃跑）',
		branchEpicLoot: '💎 獲得史詩級戰利品！',
		branchCurse: '💀 被詛咒！最大生命-10%',
		branchPowerSurge: '⚡ 力量激增！攻擊力暫時+50%（3回合）',
		branchBossInsight: '🔍 洞察敵人弱點！下次對BOSS傷害+30%',
		branchLegendaryLoot: '👑 傳說級寶物！',
		branchGodBlessing: '✨ 獲得神祇祝福！全屬性+10%',
		branchAncientPower: '🔥 吸收古老力量！永久攻擊+5',
		branchHiddenPassage: '🚪 發現隱藏通道！跳過3步',
		branchDiscount: '💰 商人給你折扣！所有物品8折',
		branchRareItem: '🎁 商人展示稀有商品！',
		branchHealingSpring: '💧 治癒之泉！完全恢復生命值',
		branchHiddenTreasure: '🗝️ 發現隱藏寶藏！',
		branchDesertGuide: '🧭 遇到沙漠嚮導！下5步顯示事件類型',
		branchOasisBlessing: '🌴 綠洲祝福！生命恢復速度+50%（持續）',
		branchSecretChamber: '🔓 發現秘密房間！獲得大量金幣',
		branchDivineTrial: '⚔️ 神聖試煉！擊敗額外守衛獲得神器',
		branchDoubleLoot: '💰💰 雙倍寶藏！',
		branchCurseItem: '😈 獲得詛咒物品！強大但有代價',
		branchRevengeQuest: '⚔️ 接受復仇任務！擊敗特定敵人獲得獎勵',
		branchQuicksand: '⚠️ 陷入流沙！損失一些金幣',
		branchSpecialEvent: '🎲 觸發特殊事件',
		
		// Game events messages
		mirageAppear: '💫 你看到了遠處的幻象...',
		mirageReal: '🌴 幻象是真的！你找到了一處隱藏的綠洲！',
		mirageRecovery: '完全恢復HP和體力，並且找到',
		goldCoins: '金幣！',
		mirageHallucination: '😵 那只是海市蜃樓...你追逐幻象消耗了體力。',
		staminaLoss: '體力',
		mirageTreasure: '✨ 幻象指引你找到了真正的寶藏！',
		obtained: '獲得',
		mirageDanger: '⚠️ 幻象引導你走入危險區域！',
		damageTaken: '受到傷害',
		hp: 'HP',
		stamina: '體力',
		maxStamina: '最大體力',
		oasisFound: '發現綠洲，恢復生命與體力。',
		levelUp: '升級！你現在等級',
		hpStaminaRecovered: '(HP/體力完全恢復)',
		shrineBlessing: '✨ 神殿的祝福降臨！最大體力',
		caravanBuyFood: '🍖 你向商隊購買了食物和休息（花費60金幣），HP和體力完全恢復！',
		caravanGift: '🍞 商隊分享了食物和水，HP',
		quicksandStruggle: '😰 你在流沙中掙扎，消耗了大量體力和生命。',
		consumeStamina: '消耗體力',
		sandstormEncounter: '遭遇沙漠風暴，受到些微損傷。',
		sandstormDamage: '風暴造成生命損失',
		buriedTreasureFound: '🏺 你發現了一個掩埋在沙中的古老陶罐...',
		treasureJackpot: '✨ 陶罐中滿是閃亮的金幣！獲得',
		goldLuckBonus: '（金幣幸運加成',
		treasureGood: '💰 陶罐中有一些金幣，獲得',
		treasurePoor: '🪙 陶罐中只有少量金幣，獲得',
		treasureEmpty: '😔 陶罐是空的，什麼也沒有...',
		treasureDecayed: '💔 陶罐中的黃金已經完全風化，化為塵土，一無所獲。',
		deadTravelerFound: '💀 你發現了一具罹難旅人的遺體...',
		strangerMet: '👤 你遇到了一位神秘的陌生人...',
		strangerGamble: '🎲 陌生人邀請你賭一把：投入100金幣，有機會獲得雙倍或失去全部...',
		strangerGambleLost: '😔 你輸了，損失100金幣。',
		strangerGambleWon: '🎉 你贏了！獲得200金幣（淨賺100）！',
		strangerNoGold: '陌生人想邀請你賭博，但你的金幣不足（需要100金幣）。',
		strangerLeaves: '陌生人微笑著離開了。',
		strangerGiftGold: '💰 陌生人贈送你',
		strangerDisappear: '金幣後消失了。',
		strangerGiftPotions: '🧪 陌生人給了你2瓶藥水後神秘地消失了。',
		strangerGiftItem: '✨ 陌生人贈送你',
		strangerSmoke: '後化作煙霧消失了！',
		strangerProphecy: '🔮 陌生人預言了你的未來...',
		prophecyCombat: '「你將在下一次戰鬥中獲得勝利的力量」',
		prophecyGold: '「財富之神將眷顧你」',
		prophecyDefense: '「危險即將降臨，但你會倖存」',
		combatLuck: '戰鬥幸運',
		goldLuck: '金幣幸運',
		gainShield: '獲得30點護盾',
		strangerCurse: '😈 陌生人露出邪惡的笑容，對你施加了詛咒！',
		curseGoldLoss: '💸 你的金幣憑空消失了',
		curseHpLoss: '💀 詛咒侵蝕你的身體',
		
		// Black market
		price: '價格',
		buy: '購買',
		purchased: '已購買',
		blackMarketLimit: '已達黑市購買上限（2 件）。',
		blackMarketEnd: '黑市交易結束。',
		notEnoughGold: '金幣不足，無法購買此物品。',
		blackMarketBought: '在黑市購買',
		spent: '花費',
		revealAttributes: '揭露裝備屬性',
		noSpecialAttributes: '無特殊屬性',
		leaveBlackMarket: '離開黑市。',
		
		// Equipment panel
		equipped: '已裝備',
		inventory: '背包',
		weapon: '武器',
		armor: '防具',
		amulet: '護符',
		none: '無',
		unequip: '卸下',
		equip: '裝備',
		setBonus: '套裝效果',
		noMatchingItems: '（無對應物品）',
		inventoryEmpty: '背包是空的',
		unequipped: '卸下',
		addedToInventory: '已放入背包',
		
		// Language selector
		language: '語言',
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français',
		
		// Equipment system
		gainedExp: '獲得經驗值',
		equipTo: '裝備',
		to: '到',
		gainedGoldLuck: '獲得金幣幸運',
		maxHpBonus: '最大生命',
		maxStaminaBonus: '最大體力',
		cannotEquip: '此物品無法裝備。',
		noEquipmentInSlot: '此欄位沒有裝備。',
		goldLuckRemaining: '金幣幸運',
		remaining: '剩餘',
		
		// Map progress
		desertCleared: '成功走出沙漠，進入下一張地圖，難度提升！',
		nothingHappened: '什麼都沒發生。',
		
		// Battle system
		encounterEnemy: '遭遇',
		enterBattle: '進入插槽戰鬥！',
		encounterEnemyName: '遭遇敵人：',
		pyramidEnemyStrong: '⚠️ 金字塔敵人實力強大！血量x',
		attackX: '攻擊x',
		strengthX: '強度x',
		notInBattle: '目前不在戰鬥中。',
		fleeSuccess: '你成功逃離戰鬥！',
		fleeFailed: '逃跑失敗！敵人獲得一次攻擊機會！',
		dodgedAttack: '你閃避了敵人的自動普攻！(戰鬥幸運',
		enemyAutoAttack: '敵人自動普攻，造成',
		damageText: '傷害',
		shieldAbsorbed: '護盾吸收',
		playerHp: '玩家 HP',
		
		// Caravan events
		caravanMet: '遇到商隊：若資金足夠可補給藥水（50金/瓶）。',
		supplySuccess: '補給成功，藥水+1',
		supplyNoGold: '金幣不足，無法購買補給。',
		blackMarketMet: '遇到黑市商人：能在黑市中獲得普通到史詩級裝備，此為賭博交易，最多購買兩件。',
		blackMarketError: '（系統錯誤：黑市介面未載入）',
		
		// Dead traveler events
		foundEquipmentOnBody: '⚔️ 你在遺體旁找到了',
		addedToInventoryMsg: '（已加入背包）',
		foundGoldAndItem: '💰 你找到了',
		goldCoinsText: '金幣和',
		foundGoldOnly: '💰 你在遺體旁找到了',
		goldCoinsEnd: '金幣。',
		travelerNothing: '🕊️ 你為旅人默哀，但身上已經沒有任何有價值的東西了。',
		travelerDecayed: '💨 遺體和裝備都已被風沙侵蝕，無法使用。',
		travelerScorpions: '🦂 遺體周圍有毒蠍的痕跡，你謹慎地離開了，什麼也沒拿。',
		minorInjury: '（小心離開時受到輕傷',
		hpLoss: 'HP）',
		
		// Temple events
		templeFound: '🛕 你發現了一座古老的神殿廢墟...',
		templeBlessingMaxHp: '✨ 神殿的祝福降臨！最大HP',
		templeBlessingCombatLuck: '✨ 神殿的祝福降臨！戰鬥幸運',
		templeBlessingGoldLuck: '✨ 神殿的祝福降臨！金幣幸運',
		templeTreasure: '💎 你在神殿中找到了古老的寶藏！獲得',
		curseDamage: '受到詛咒傷害',
		trapTriggered: '💥 你觸發了古老的陷阱！',
		trapDamage: '陷阱造成',
		pointDamage: '點傷害！',
		
		// Caravan rest events
		caravanRestMet: '🐪 你遇到了一支商隊正在休息...',
		boughtPotions: '🧪 你向商隊購買了2瓶藥水（花費60金幣）',
		caravanNoGold: '商隊願意交易，但你的金幣不足（需要60金幣）。',
		caravanGiftGold: '💰 商隊隊長贈送你一些金幣（+',
		thankYou: '）以答謝你的到來。',
		caravanGiftPotion: '🧪 商隊贈送你一瓶藥水以表善意。',
		caravanKnowledge: '📜 商隊分享了沙漠中的生存經驗和地圖情報。',
		caravanBandits: '⚔️ 這是一群偽裝的盜賊！',
		
		// Nomad camp events
		nomadCampMet: '⛺ 你遇到了一個遊牧民族的營地...',
		nomadHospitality: '🏕️ 遊牧民熱情地接待了你，提供食物和休息。',
		hpRestore: 'HP',
		staminaRestore: '體力',
		nomadGiftItem: '🎁 遊牧民贈送你一件',
		nomadLegends: '📖 遊牧民告訴你關於沙漠的古老傳說和秘密。',
		gainedExpAndGold: '獲得經驗值和',
		nomadHostile: '⚔️ 這個部落對外來者不友善！',
		
		// Quicksand events
		quicksandTrapped: '⚠️ 你踩到了流沙！',
		quicksandEscaped: '💨 你迅速脫離了流沙區域！',
		staminaConsumed: '消耗體力',
		quicksandDeep: '💀 你陷入流沙深處，幾乎要窒息！',
		potionBroken: '🧪 在掙扎中不小心打破了一瓶藥水（-1藥水）',
		
		// Scorpion events
		scorpionNest: '🦂 你無意中闖入了毒蠍的巢穴！',
		scorpionAvoided: '🏃 你小心地繞過毒蠍，成功避開了危險！',
		scorpionStung: '😣 你被毒蠍蜇了一下！',
		poisonDamage: '受到毒素傷害',
		scorpionSwarm: '💀 多隻毒蠍攻擊了你！',
		hpStaminaLoss: 'HP',
		scorpionTreasure: '✨ 在躲避毒蠍時，你發現了牠們守護的寶藏！',
		gainedGold: '獲得',
		
		// Ancient ruins events
		ruinsFound: '🏛️ 你發現了一處古代遺跡...',
		foundArtifact: '⚱️ 你在遺跡中找到了古代神器',
		ruinsKnowledge: '📜 你研究了遺跡上的銘文，獲得了古老的知識。',
		ruinsTrap: '💥 你觸發了遺跡的守護機關！',
		receivedDamage: '受到',
		ruinsGuardian: '👹 遺跡的守護者被喚醒了！',
		
		// Trading post events
		tradingPostFound: '🏪 你發現了一個沙漠驛站！',
		tradingPostDesc: '這裡可以補給物資，也可以出售你不需要的裝備。',
		soldItem: '💰 賣出',
		obtainedGold: '獲得',
		boughtPotion: '🧪 購買藥水 x1',
		boughtFood: '🍖 購買食物，HP +30，體力 +15',
		fullRestore: '💊 完全恢復！HP和體力全滿！',
		notEnoughGoldShop: '❌ 金幣不足！',
		leftTradingPost: '你離開了驛站，繼續踏上旅程。',
		
		// God events
		godMet: '遇到古埃及神祇，獲得祝福或詛咒（隨機）。',
		godBlessingGold: '獲得祝福：金幣',
		goldLuckBonus2: '（含金幣幸運加成',
		goldLuckDecreased: '金幣幸運',
		godBlessingSimple: '獲得祝福：金幣 +50',
		godCurse: '受到詛咒：HP -15',
		
		// Pyramid events
		pyramidFound: '🔺 你發現了一座古老的金字塔！',
		pyramidDanger: '這裡充滿危險，但也蘊藏著巨大的寶藏...',
		pyramidInfo: '金字塔副本：8步探險，敵人強度極高（隨地圖提升），獎勵豐厚（15倍經驗/金幣），保證掉落優良以上裝備！',
		declinePyramid: '你決定不進入金字塔，繼續前行。',
		enterPyramid: '⚡ 你踏入了金字塔深處...',
		pyramidStart: '🔺 金字塔副本開始！你有 8 步探險機會。',
		exitPyramid: '🌅 你走出了金字塔，回到了沙漠中。',
		pyramidComplete: '金字塔副本完成！探索了',
		stepCount: '步。',
		
		// Slot battle results
		slotResult: '主要符號：',
		matchCount: '，匹配數：',
		consecutive: '，連續',
		multiplier: '（乘數',
		normalAttack: '你發動普通攻擊',
		skillAttack: '你使用技能',
		causingDamage: '，對敵人造成',
		defenseGain: '你獲得防禦',
		combo: '（連擊',
		shieldGain: '），護盾',
		potionUse: '使用紅色水瓶',
		restoreHp: '，回復 HP',
		restoreStamina: '體力',
		luckGain: '獲得戰鬥幸運',
		improveRate: '，提高暴擊與閃避機率。',
		dodgedSymbolAttack: '你閃避了敵人符號攻擊（戰鬥幸運',
		critText: '（暴擊）',
		
		// Misc
		strangerMerchant: '🏪 陌生人原來是個特殊商人！',
		bonus: '加成'
	},
	
	'en': {
		// UI Elements
		title: 'Egypt Adventures',
		symbolGuide: 'Symbol Guide',
		attack: 'Attack',
		skill: 'Skill',
		defense: 'Defense',
		enemyAttack: 'Enemy Attack',
		heal: 'Heal',
		luckyBonus: 'Lucky Bonus',
		welcomeMessage: 'Lost traveler, choose your path to decide your fate in the desert!',
		remainingSteps: 'Remaining Steps',
		
		// Direction buttons
		front: 'Forward',
		left: 'Left',
		right: 'Right',
		
		// Action buttons
		spin: 'Spin',
		stop: 'Stop',
		autoSpin: 'Auto Spin',
		flee: 'Flee',
		save: '💾 Save',
		load: '📂 Load',
		submit: 'Submit',
		close: 'Close',
		
		// Equipment panel
		equipmentAndInventory: 'Equipment & Inventory',
		empty: 'Empty',
		inputPlaceholder: 'Enter command...',
		
		// Black market
		blackMarket: 'Black Market',
		blackMarketDesc: 'In the black market, you can gamble to buy equipment (Common ~ Epic), up to two items. Be careful!',
		
		// Game messages
		chooseDirection: 'Which direction do you choose?',
		desertJourney: 'You journey through the desert...',
		pyramidPassage: 'You are in the pyramid passage, feeling the ancient aura...',
		youChose: 'You chose to go',
		direction: '.',
		movedSteps: 'Moved',
		steps: 'steps',
		pyramidExploration: '🔺 Pyramid Exploration',
		
		// Direction hints
		dirFront: 'Ahead',
		dirLeft: 'To the left',
		dirRight: 'To the right',
		
		// Event hints
		hintBattle: 'you hear battle sounds',
		hintDust: 'you see dust rising',
		hintKilling: 'you feel killing intent',
		hintRoar: 'you hear roaring',
		hintFootprints: 'you see footprints',
		hintPowerful: 'you sense powerful aura',
		hintGiantShadow: 'you see a giant shadow',
		hintDeepRoar: 'you hear deep roaring',
		hintDanger: 'you sense danger',
		hintTemple: 'you see an ancient temple',
		hintTerror: 'you feel terrifying pressure',
		hintFootsteps: 'you hear thunderous footsteps',
		hintHugeShadow: 'you see a huge shadow',
		hintCaravanBells: 'you hear caravan bells',
		hintTent: 'you see merchant tents',
		hintSpices: 'you smell spices',
		hintMerchantFlag: 'you see merchant flags',
		hintMysteryDeal: 'you hear mysterious dealings',
		hintBlackTent: 'you see a suspicious black tent',
		hintBlackMarket: 'you sense black market activity',
		hintMaskedMerchant: 'you see a masked merchant',
		hintWater: 'you hear water flowing',
		hintGreen: 'you see green plants',
		hintMoist: 'you feel moist air',
		hintPalms: 'you see palm tree reflections',
		hintFreshWater: 'you smell fresh water',
		hintSandstorm: 'you see sandstorm approaching',
		hintStrongWind: 'you feel strong wind',
		hintWindSound: 'you hear howling wind',
		hintDarkSky: 'the sky darkens',
		hintStrangeMark: 'you see strange landmarks',
		hintAncientSign: 'you find ancient markings',
		hintShining: 'you see something shining',
		hintTreasure: 'you sense treasure nearby',
		hintPyramidTop: 'you see pyramid peaks',
		hintAncientTemple: 'you find an ancient temple',
		hintStone: 'you see a huge stone tablet',
		hintMystery: 'you feel mysterious power',
		hintDeadTraveler: 'you see a fallen traveler',
		hintAbandonedItems: 'you find abandoned items',
		hintOldBackpack: 'you see an old backpack',
		hintTragedy: 'you sense tragedy',
		hintShrine: 'you see a mysterious shrine',
		hintStatue: 'you find an ancient statue',
		hintHoly: 'you feel sacred power',
		hintRune: 'you see glowing runes',
		hintCaravanRest: 'you see a resting caravan',
		hintLaughter: 'you hear travelers laughing',
		hintCampfire: 'you see campfire light',
		hintFood: 'you smell food',
		hintCalm: 'all is calm',
		hintNothing: 'there is nothing',
		hintOnlyDesert: 'only desert',
		hintPeaceful: 'peaceful and calm',
		hintSilent: 'silent',
		
		// Branch events
		branchAmbush: '⚠️ Sudden ambush! Extra enemies appear!',
		branchTreasureDrop: '✨ Enemy dropped rare treasure!',
		branchAllyJoin: '👥 A wandering warrior joins to help! (Next battle +20% attack)',
		branchEscapeRoute: '🏃 Found escape route! (Can flee)',
		branchEpicLoot: '💎 Obtained epic loot!',
		branchCurse: '💀 Cursed! Max HP -10%',
		branchPowerSurge: '⚡ Power surge! Attack +50% temporarily (3 turns)',
		branchBossInsight: '🔍 Insight into enemy weakness! +30% damage to bosses',
		branchLegendaryLoot: '👑 Legendary treasure!',
		branchGodBlessing: '✨ Received god\'s blessing! All stats +10%',
		branchAncientPower: '🔥 Absorbed ancient power! Permanent +5 attack',
		branchHiddenPassage: '🚪 Found hidden passage! Skip 3 steps',
		branchDiscount: '💰 Merchant gives discount! All items 20% off',
		branchRareItem: '🎁 Merchant shows rare goods!',
		branchHealingSpring: '💧 Healing spring! Fully restored HP',
		branchHiddenTreasure: '🗝️ Found hidden treasure!',
		branchDesertGuide: '🧭 Met desert guide! Next 5 steps show event types',
		branchOasisBlessing: '🌴 Oasis blessing! HP recovery +50% (permanent)',
		branchSecretChamber: '🔓 Found secret chamber! Obtained lots of gold',
		branchDivineTrial: '⚔️ Divine trial! Defeat guardian for artifact',
		branchDoubleLoot: '💰💰 Double treasure!',
		branchCurseItem: '😈 Obtained cursed item! Powerful but with cost',
		branchRevengeQuest: '⚔️ Accepted revenge quest! Defeat specific enemy for reward',
		branchQuicksand: '⚠️ Caught in quicksand! Lost some gold',
		branchSpecialEvent: '🎲 Triggered special event',
		
		// Game events messages
		mirageAppear: '💫 You see a mirage in the distance...',
		mirageReal: '🌴 The mirage is real! You found a hidden oasis!',
		mirageRecovery: 'Fully restored HP and stamina, and found',
		goldCoins: 'gold!',
		mirageHallucination: '😵 It was just a mirage... Chasing illusions consumed your stamina.',
		staminaLoss: 'Stamina',
		mirageTreasure: '✨ The mirage led you to real treasure!',
		obtained: 'Obtained',
		mirageDanger: '⚠️ The mirage led you into a dangerous area!',
		damageTaken: 'Damage taken',
		hp: 'HP',
		stamina: 'Stamina',
		maxStamina: 'Max Stamina',
		oasisFound: 'Found an oasis, restored health and stamina.',
		levelUp: 'Level up! You are now level',
		hpStaminaRecovered: '(HP/Stamina fully recovered)',
		shrineBlessing: '✨ The shrine\'s blessing descends! Max Stamina',
		caravanBuyFood: '🍖 You bought food and rest from the caravan (cost 60 gold), HP and stamina fully recovered!',
		caravanGift: '🍞 The caravan shared food and water, HP',
		quicksandStruggle: '😰 You struggled in quicksand, consuming lots of stamina and health.',
		consumeStamina: 'Consumed stamina',
		sandstormEncounter: 'Encountered a desert sandstorm, took minor damage.',
		sandstormDamage: 'Storm caused HP loss',
		buriedTreasureFound: '🏺 You found an ancient jar buried in the sand...',
		treasureJackpot: '✨ The jar is full of shining gold coins! Obtained',
		goldLuckBonus: '(Gold luck bonus',
		treasureGood: '💰 The jar contains some gold coins, obtained',
		treasurePoor: '🪙 The jar has only a few gold coins, obtained',
		treasureEmpty: '😔 The jar is empty, nothing inside...',
		treasureDecayed: '💔 The gold in the jar has completely decayed to dust, found nothing.',
		deadTravelerFound: '💀 You found the body of a fallen traveler...',
		strangerMet: '👤 You met a mysterious stranger...',
		strangerGamble: '🎲 The stranger invites you to gamble: invest 100 gold, chance to double or lose all...',
		strangerGambleLost: '😔 You lost, -100 gold.',
		strangerGambleWon: '🎉 You won! Obtained 200 gold (net +100)!',
		strangerNoGold: 'The stranger wants to invite you to gamble, but you don\'t have enough gold (need 100 gold).',
		strangerLeaves: 'The stranger smiles and leaves.',
		strangerGiftGold: '💰 The stranger gave you',
		strangerDisappear: 'gold and disappeared.',
		strangerGiftPotions: '🧪 The stranger gave you 2 potions and mysteriously vanished.',
		strangerGiftItem: '✨ The stranger gave you',
		strangerSmoke: 'and disappeared in smoke!',
		strangerProphecy: '🔮 The stranger prophesied your future...',
		prophecyCombat: '"You will gain the power of victory in your next battle"',
		prophecyGold: '"The god of wealth will favor you"',
		prophecyDefense: '"Danger approaches, but you will survive"',
		combatLuck: 'Combat Luck',
		goldLuck: 'Gold Luck',
		gainShield: 'Gained 30 shield',
		strangerCurse: '😈 The stranger shows an evil smile and curses you!',
		curseGoldLoss: '💸 Your gold vanished into thin air',
		curseHpLoss: '💀 The curse erodes your body',
		
		// Black market
		price: 'Price',
		buy: 'Buy',
		purchased: 'Purchased',
		blackMarketLimit: 'Black market purchase limit reached (2 items).',
		blackMarketEnd: 'Black market trade ended.',
		notEnoughGold: 'Not enough gold to buy this item.',
		blackMarketBought: 'Bought at black market',
		spent: 'spent',
		revealAttributes: 'Revealed equipment attributes',
		noSpecialAttributes: 'No special attributes',
		leaveBlackMarket: 'Left black market.',
		
		// Equipment panel
		equipped: 'Equipped',
		inventory: 'Inventory',
		weapon: 'Weapon',
		armor: 'Armor',
		amulet: 'Amulet',
		none: 'None',
		unequip: 'Unequip',
		equip: 'Equip',
		setBonus: 'Set Bonus',
		noMatchingItems: '(No matching items)',
		inventoryEmpty: 'Inventory is empty',
		unequipped: 'Unequipped',
		addedToInventory: 'added to inventory',
		
		// Language selector
		language: 'Language',
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français',
		
		// Equipment system
		gainedExp: 'Gained experience',
		equipTo: 'Equipped',
		to: 'to',
		gainedGoldLuck: 'Gained Gold Luck',
		maxHpBonus: 'Max HP',
		maxStaminaBonus: 'Max Stamina',
		cannotEquip: 'Cannot equip this item.',
		noEquipmentInSlot: 'No equipment in this slot.',
		goldLuckRemaining: 'Gold Luck',
		remaining: 'remaining',
		
		// Map progress
		desertCleared: 'Successfully crossed the desert, entering next map with increased difficulty!',
		nothingHappened: 'Nothing happened.',
		
		// Battle system
		encounterEnemy: 'Encountered',
		enterBattle: 'entering slot battle!',
		encounterEnemyName: 'Encountered enemy:',
		pyramidEnemyStrong: '⚠️ Pyramid enemy is extremely powerful! HP x',
		attackX: 'Attack x',
		strengthX: 'Strength x',
		notInBattle: 'Not currently in battle.',
		fleeSuccess: 'You successfully fled from battle!',
		fleeFailed: 'Flee failed! Enemy gets a free attack!',
		dodgedAttack: 'You dodged enemy auto attack! (Combat Luck',
		enemyAutoAttack: 'Enemy auto attack, dealing',
		damageText: 'damage',
		shieldAbsorbed: 'shield absorbed',
		playerHp: 'Player HP',
		
		// Caravan events
		caravanMet: 'Met a caravan: Can purchase potions if you have enough gold (50 gold/potion).',
		supplySuccess: 'Supply successful, potion +1',
		supplyNoGold: 'Not enough gold to purchase supplies.',
		blackMarketMet: 'Met black market merchant: Can obtain Common~Epic equipment through gambling, max 2 items.',
		blackMarketError: '(System error: Black market interface not loaded)',
		
		// Dead traveler events
		foundEquipmentOnBody: '⚔️ You found',
		addedToInventoryMsg: '(added to inventory)',
		foundGoldAndItem: '💰 You found',
		goldCoinsText: 'gold and',
		foundGoldOnly: '💰 You found',
		goldCoinsEnd: 'gold near the body.',
		travelerNothing: '🕊️ You mourned the traveler, but nothing valuable remains.',
		travelerDecayed: '💨 The body and equipment have been eroded by sandstorms, unusable.',
		travelerScorpions: '🦂 There are scorpion traces around the body, you carefully left without taking anything.',
		minorInjury: '(Minor injury while leaving',
		hpLoss: 'HP)',
		
		// Temple events
		templeFound: '🛕 You discovered ancient temple ruins...',
		templeBlessingMaxHp: '✨ The temple\'s blessing descends! Max HP',
		templeBlessingCombatLuck: '✨ The temple\'s blessing descends! Combat Luck',
		templeBlessingGoldLuck: '✨ The temple\'s blessing descends! Gold Luck',
		templeTreasure: '💎 You found ancient treasure in the temple! Obtained',
		curseDamage: 'Curse damage taken',
		trapTriggered: '💥 You triggered an ancient trap!',
		trapDamage: 'Trap dealt',
		pointDamage: 'damage!',
		
		// Caravan rest events
		caravanRestMet: '🐪 You encountered a resting caravan...',
		boughtPotions: '🧪 You bought 2 potions from the caravan (cost 60 gold)',
		caravanNoGold: 'The caravan is willing to trade, but you don\'t have enough gold (need 60 gold).',
		caravanGiftGold: '💰 The caravan leader gave you some gold (+',
		thankYou: ') as thanks for your visit.',
		caravanGiftPotion: '🧪 The caravan gave you a potion as a gesture of goodwill.',
		caravanKnowledge: '📜 The caravan shared desert survival experience and map intelligence.',
		caravanBandits: '⚔️ These are bandits in disguise!',
		
		// Nomad camp events
		nomadCampMet: '⛺ You encountered a nomad camp...',
		nomadHospitality: '🏕️ The nomads warmly welcomed you, providing food and rest.',
		hpRestore: 'HP',
		staminaRestore: 'Stamina',
		nomadGiftItem: '🎁 The nomads gave you',
		nomadLegends: '📖 The nomads told you ancient desert legends and secrets.',
		gainedExpAndGold: 'Gained experience and',
		nomadHostile: '⚔️ This tribe is hostile to outsiders!',
		
		// Quicksand events
		quicksandTrapped: '⚠️ You stepped into quicksand!',
		quicksandEscaped: '💨 You quickly escaped the quicksand area!',
		staminaConsumed: 'Consumed stamina',
		quicksandDeep: '💀 You sank deep into quicksand, nearly suffocating!',
		potionBroken: '🧪 Accidentally broke a potion while struggling (-1 potion)',
		
		// Scorpion events
		scorpionNest: '🦂 You accidentally entered a scorpion nest!',
		scorpionAvoided: '🏃 You carefully avoided the scorpions, successfully evading danger!',
		scorpionStung: '😣 You were stung by a scorpion!',
		poisonDamage: 'Poison damage taken',
		scorpionSwarm: '💀 Multiple scorpions attacked you!',
		hpStaminaLoss: 'HP',
		scorpionTreasure: '✨ While avoiding scorpions, you found their guarded treasure!',
		gainedGold: 'Gained',
		
		// Ancient ruins events
		ruinsFound: '🏛️ You discovered ancient ruins...',
		foundArtifact: '⚱️ You found an ancient artifact in the ruins',
		ruinsKnowledge: '📜 You studied the inscriptions on the ruins, gaining ancient knowledge.',
		ruinsTrap: '💥 You triggered the ruins\' defensive mechanism!',
		receivedDamage: 'Received',
		ruinsGuardian: '👹 The ruins\' guardian has awakened!',
		
		// Trading post events
		tradingPostFound: '🏪 You found a desert trading post!',
		tradingPostDesc: 'Here you can resupply and sell unneeded equipment.',
		soldItem: '💰 Sold',
		obtainedGold: 'obtained',
		boughtPotion: '🧪 Bought potion x1',
		boughtFood: '🍖 Bought food, HP +30, Stamina +15',
		fullRestore: '💊 Full recovery! HP and Stamina fully restored!',
		notEnoughGoldShop: '❌ Not enough gold!',
		leftTradingPost: 'You left the trading post and continued your journey.',
		
		// God events
		godMet: 'Met an ancient Egyptian deity, received blessing or curse (random).',
		godBlessingGold: 'Received blessing: Gold',
		goldLuckBonus2: '(including Gold Luck bonus',
		goldLuckDecreased: 'Gold Luck',
		godBlessingSimple: 'Received blessing: Gold +50',
		godCurse: 'Received curse: HP -15',
		
		// Pyramid events
		pyramidFound: '🔺 You discovered an ancient pyramid!',
		pyramidDanger: 'Filled with danger, but also great treasures...',
		pyramidInfo: 'Pyramid dungeon: 8-step exploration, extremely powerful enemies (scales with map), generous rewards (15x exp/gold), guaranteed Fine+ equipment drop!',
		declinePyramid: 'You decided not to enter the pyramid and continued onward.',
		enterPyramid: '⚡ You stepped into the pyramid depths...',
		pyramidStart: '🔺 Pyramid dungeon started! You have 8 exploration steps.',
		exitPyramid: '🌅 You exited the pyramid and returned to the desert.',
		pyramidComplete: 'Pyramid dungeon complete! Explored',
		stepCount: 'steps.',
		
		// Slot battle results
		slotResult: 'Main symbol:',
		matchCount: ', Matches:',
		consecutive: ', Consecutive',
		multiplier: '(Multiplier',
		normalAttack: 'You launched normal attack',
		skillAttack: 'You used skill',
		causingDamage: ', dealing',
		defenseGain: 'You gained defense',
		combo: '(Combo',
		shieldGain: '), Shield',
		potionUse: 'Used red potion',
		restoreHp: ', restored HP',
		restoreStamina: 'Stamina',
		luckGain: 'Gained Combat Luck',
		improveRate: ', improving critical and dodge chance.',
		dodgedSymbolAttack: 'You dodged enemy symbol attack (Combat Luck',
		critText: '(Critical)',
		
		// Misc
		strangerMerchant: '🏪 The stranger turned out to be a special merchant!',
		bonus: 'bonus'
	},
	
	'fr': {
		// UI Elements
		title: 'Egypt Adventures',
		symbolGuide: 'Guide des Symboles',
		attack: 'Attaque',
		skill: 'Compétence',
		defense: 'Défense',
		enemyAttack: 'Attaque Ennemie',
		heal: 'Soin',
		luckyBonus: 'Bonus de Chance',
		welcomeMessage: 'Voyageur égaré, choisissez votre chemin pour décider de votre destin dans le désert !',
		remainingSteps: 'Étapes Restantes',
		
		// Direction buttons
		front: 'Avant',
		left: 'Gauche',
		right: 'Droite',
		
		// Action buttons
		spin: 'Tourner',
		stop: 'Arrêter',
		autoSpin: 'Tour Auto',
		flee: 'Fuir',
		save: '💾 Sauvegarder',
		load: '📂 Charger',
		submit: 'Envoyer',
		close: 'Fermer',
		
		// Equipment panel
		equipmentAndInventory: 'Équipement & Inventaire',
		empty: 'Vide',
		inputPlaceholder: 'Entrez une commande...',
		
		// Black market
		blackMarket: 'Marché Noir',
		blackMarketDesc: 'Au marché noir, vous pouvez parier pour acheter de l\'équipement (Commun ~ Épique), jusqu\'à deux objets. Soyez prudent !',
		
		// Game messages
		chooseDirection: 'Quelle direction choisissez-vous ?',
		desertJourney: 'Vous voyagez à travers le désert...',
		pyramidPassage: 'Vous êtes dans le passage de la pyramide, sentant l\'aura ancienne...',
		youChose: 'Vous avez choisi d\'aller',
		direction: '.',
		movedSteps: 'Déplacé',
		steps: 'pas',
		pyramidExploration: '🔺 Exploration de Pyramide',
		
		// Direction hints
		dirFront: 'Devant',
		dirLeft: 'À gauche',
		dirRight: 'À droite',
		
		// Event hints
		hintBattle: 'vous entendez des bruits de combat',
		hintDust: 'vous voyez de la poussière s\'élever',
		hintKilling: 'vous sentez l\'intention meurtrière',
		hintRoar: 'vous entendez des rugissements',
		hintFootprints: 'vous voyez des empreintes',
		hintPowerful: 'vous sentez une aura puissante',
		hintGiantShadow: 'vous voyez une ombre géante',
		hintDeepRoar: 'vous entendez un rugissement profond',
		hintDanger: 'vous sentez le danger',
		hintTemple: 'vous voyez un temple ancien',
		hintTerror: 'vous sentez une pression terrifiante',
		hintFootsteps: 'vous entendez des pas tonitruants',
		hintHugeShadow: 'vous voyez une énorme ombre',
		hintCaravanBells: 'vous entendez des cloches de caravane',
		hintTent: 'vous voyez des tentes de marchands',
		hintSpices: 'vous sentez des épices',
		hintMerchantFlag: 'vous voyez des drapeaux de marchands',
		hintMysteryDeal: 'vous entendez des transactions mystérieuses',
		hintBlackTent: 'vous voyez une tente noire suspecte',
		hintBlackMarket: 'vous sentez l\'activité du marché noir',
		hintMaskedMerchant: 'vous voyez un marchand masqué',
		hintWater: 'vous entendez de l\'eau couler',
		hintGreen: 'vous voyez des plantes vertes',
		hintMoist: 'vous sentez l\'air humide',
		hintPalms: 'vous voyez des reflets de palmiers',
		hintFreshWater: 'vous sentez l\'eau fraîche',
		hintSandstorm: 'vous voyez une tempête de sable approcher',
		hintStrongWind: 'vous sentez un vent fort',
		hintWindSound: 'vous entendez le vent hurler',
		hintDarkSky: 'le ciel s\'assombrit',
		hintStrangeMark: 'vous voyez des repères étranges',
		hintAncientSign: 'vous trouvez des marques anciennes',
		hintShining: 'vous voyez quelque chose briller',
		hintTreasure: 'vous sentez un trésor à proximité',
		hintPyramidTop: 'vous voyez des sommets de pyramide',
		hintAncientTemple: 'vous trouvez un temple ancien',
		hintStone: 'vous voyez une énorme tablette de pierre',
		hintMystery: 'vous sentez un pouvoir mystérieux',
		hintDeadTraveler: 'vous voyez un voyageur tombé',
		hintAbandonedItems: 'vous trouvez des objets abandonnés',
		hintOldBackpack: 'vous voyez un vieux sac à dos',
		hintTragedy: 'vous sentez la tragédie',
		hintShrine: 'vous voyez un sanctuaire mystérieux',
		hintStatue: 'vous trouvez une statue ancienne',
		hintHoly: 'vous sentez un pouvoir sacré',
		hintRune: 'vous voyez des runes brillantes',
		hintCaravanRest: 'vous voyez une caravane au repos',
		hintLaughter: 'vous entendez des voyageurs rire',
		hintCampfire: 'vous voyez la lumière d\'un feu de camp',
		hintFood: 'vous sentez de la nourriture',
		hintCalm: 'tout est calme',
		hintNothing: 'il n\'y a rien',
		hintOnlyDesert: 'seulement le désert',
		hintPeaceful: 'paisible et calme',
		hintSilent: 'silencieux',
		
		// Branch events
		branchAmbush: '⚠️ Embuscade soudaine ! Des ennemis supplémentaires apparaissent !',
		branchTreasureDrop: '✨ L\'ennemi a laissé tomber un trésor rare !',
		branchAllyJoin: '👥 Un guerrier errant se joint pour aider ! (Prochain combat +20% d\'attaque)',
		branchEscapeRoute: '🏃 Route d\'évasion trouvée ! (Peut fuir)',
		branchEpicLoot: '💎 Butin épique obtenu !',
		branchCurse: '💀 Maudit ! PV max -10%',
		branchPowerSurge: '⚡ Montée de puissance ! Attaque +50% temporairement (3 tours)',
		branchBossInsight: '🔍 Aperçu de la faiblesse ennemie ! +30% de dégâts aux boss',
		branchLegendaryLoot: '👑 Trésor légendaire !',
		branchGodBlessing: '✨ Bénédiction divine reçue ! Toutes les stats +10%',
		branchAncientPower: '🔥 Pouvoir ancien absorbé ! +5 d\'attaque permanent',
		branchHiddenPassage: '🚪 Passage caché trouvé ! Sauter 3 étapes',
		branchDiscount: '💰 Le marchand offre une réduction ! Tous les objets -20%',
		branchRareItem: '🎁 Le marchand montre des objets rares !',
		branchHealingSpring: '💧 Source de guérison ! PV complètement restaurés',
		branchHiddenTreasure: '🗝️ Trésor caché trouvé !',
		branchDesertGuide: '🧭 Guide du désert rencontré ! Les 5 prochaines étapes montrent les types d\'événements',
		branchOasisBlessing: '🌴 Bénédiction de l\'oasis ! Récupération PV +50% (permanent)',
		branchSecretChamber: '🔓 Chambre secrète trouvée ! Beaucoup d\'or obtenu',
		branchDivineTrial: '⚔️ Épreuve divine ! Vaincre le gardien pour un artefact',
		branchDoubleLoot: '💰💰 Double trésor !',
		branchCurseItem: '😈 Objet maudit obtenu ! Puissant mais à un prix',
		branchRevengeQuest: '⚔️ Quête de vengeance acceptée ! Vaincre un ennemi spécifique pour une récompense',
		branchQuicksand: '⚠️ Pris dans des sables mouvants ! Perdu de l\'or',
		branchSpecialEvent: '🎲 Événement spécial déclenché',
		
		// Game events messages
		mirageAppear: '💫 Vous voyez un mirage au loin...',
		mirageReal: '🌴 Le mirage est réel ! Vous avez trouvé une oasis cachée !',
		mirageRecovery: 'PV et endurance complètement restaurés, et trouvé',
		goldCoins: 'd\'or !',
		mirageHallucination: '😵 Ce n\'était qu\'un mirage... Poursuivre des illusions a consommé votre endurance.',
		staminaLoss: 'Endurance',
		mirageTreasure: '✨ Le mirage vous a conduit à un vrai trésor !',
		obtained: 'Obtenu',
		mirageDanger: '⚠️ Le mirage vous a conduit dans une zone dangereuse !',
		damageTaken: 'Dégâts subis',
		hp: 'PV',
		stamina: 'Endurance',
		maxStamina: 'Endurance Max',
		oasisFound: 'Oasis trouvée, santé et endurance restaurées.',
		levelUp: 'Niveau supérieur ! Vous êtes maintenant niveau',
		hpStaminaRecovered: '(PV/Endurance complètement récupérés)',
		shrineBlessing: '✨ La bénédiction du sanctuaire descend ! Endurance Max',
		caravanBuyFood: '🍖 Vous avez acheté de la nourriture et du repos à la caravane (coût 60 or), PV et endurance complètement récupérés !',
		caravanGift: '🍞 La caravane a partagé de la nourriture et de l\'eau, PV',
		quicksandStruggle: '😰 Vous vous êtes débattu dans des sables mouvants, consommant beaucoup d\'endurance et de santé.',
		consumeStamina: 'Endurance consommée',
		sandstormEncounter: 'Rencontre avec une tempête de sable du désert, légères blessures subies.',
		sandstormDamage: 'La tempête a causé une perte de PV',
		buriedTreasureFound: '🏺 Vous avez trouvé une ancienne jarre enterrée dans le sable...',
		treasureJackpot: '✨ La jarre est remplie de pièces d\'or brillantes ! Obtenu',
		goldLuckBonus: '(Bonus de chance d\'or',
		treasureGood: '💰 La jarre contient quelques pièces d\'or, obtenu',
		treasurePoor: '🪙 La jarre n\'a que quelques pièces d\'or, obtenu',
		treasureEmpty: '😔 La jarre est vide, rien à l\'intérieur...',
		treasureDecayed: '💔 L\'or dans la jarre s\'est complètement désintégré en poussière, rien trouvé.',
		deadTravelerFound: '💀 Vous avez trouvé le corps d\'un voyageur tombé...',
		strangerMet: '👤 Vous avez rencontré un étranger mystérieux...',
		strangerGamble: '🎲 L\'étranger vous invite à parier : investissez 100 or, chance de doubler ou tout perdre...',
		strangerGambleLost: '😔 Vous avez perdu, -100 or.',
		strangerGambleWon: '🎉 Vous avez gagné ! Obtenu 200 or (net +100) !',
		strangerNoGold: 'L\'étranger veut vous inviter à parier, mais vous n\'avez pas assez d\'or (besoin de 100 or).',
		strangerLeaves: 'L\'étranger sourit et s\'en va.',
		strangerGiftGold: '💰 L\'étranger vous a donné',
		strangerDisappear: 'or et a disparu.',
		strangerGiftPotions: '🧪 L\'étranger vous a donné 2 potions et a mystérieusement disparu.',
		strangerGiftItem: '✨ L\'étranger vous a donné',
		strangerSmoke: 'et a disparu en fumée !',
		strangerProphecy: '🔮 L\'étranger a prophétisé votre avenir...',
		prophecyCombat: '"Vous obtiendrez le pouvoir de la victoire dans votre prochain combat"',
		prophecyGold: '"Le dieu de la richesse vous favorisera"',
		prophecyDefense: '"Le danger approche, mais vous survivrez"',
		combatLuck: 'Chance de Combat',
		goldLuck: 'Chance d\'Or',
		gainShield: 'Obtenu 30 de bouclier',
		strangerCurse: '😈 L\'étranger affiche un sourire maléfique et vous maudit !',
		curseGoldLoss: '💸 Votre or a disparu dans les airs',
		curseHpLoss: '💀 La malédiction érode votre corps',
		
		// Black market
		price: 'Prix',
		buy: 'Acheter',
		purchased: 'Acheté',
		blackMarketLimit: 'Limite d\'achat du marché noir atteinte (2 objets).',
		blackMarketEnd: 'Commerce du marché noir terminé.',
		notEnoughGold: 'Pas assez d\'or pour acheter cet objet.',
		blackMarketBought: 'Acheté au marché noir',
		spent: 'dépensé',
		revealAttributes: 'Attributs de l\'équipement révélés',
		noSpecialAttributes: 'Aucun attribut spécial',
		leaveBlackMarket: 'Quitté le marché noir.',
		
		// Equipment panel
		equipped: 'Équipé',
		inventory: 'Inventaire',
		weapon: 'Arme',
		armor: 'Armure',
		amulet: 'Amulette',
		none: 'Aucun',
		unequip: 'Enlever',
		equip: 'Équiper',
		setBonus: 'Bonus d\'Ensemble',
		noMatchingItems: '(Aucun objet correspondant)',
		inventoryEmpty: 'L\'inventaire est vide',
		unequipped: 'Enlevé',
		addedToInventory: 'ajouté à l\'inventaire',
		
		// Language selector
		language: 'Langue',
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français',
		
		// Equipment system
		gainedExp: 'Expérience gagnée',
		equipTo: 'Équipé',
		to: 'à',
		gainedGoldLuck: 'Chance d\'Or gagnée',
		maxHpBonus: 'PV Max',
		maxStaminaBonus: 'Endurance Max',
		cannotEquip: 'Impossible d\'équiper cet objet.',
		noEquipmentInSlot: 'Aucun équipement dans cet emplacement.',
		goldLuckRemaining: 'Chance d\'Or',
		remaining: 'restant',
		
		// Map progress
		desertCleared: 'Traversée du désert réussie, entrée dans la prochaine carte avec difficulté accrue !',
		nothingHappened: 'Il ne s\'est rien passé.',
		
		// Battle system
		encounterEnemy: 'Rencontré',
		enterBattle: 'entrée en combat de machines à sous !',
		encounterEnemyName: 'Ennemi rencontré :',
		pyramidEnemyStrong: '⚠️ L\'ennemi de la pyramide est extrêmement puissant ! PV x',
		attackX: 'Attaque x',
		strengthX: 'Force x',
		notInBattle: 'Pas actuellement en combat.',
		fleeSuccess: 'Vous avez réussi à fuir le combat !',
		fleeFailed: 'Fuite échouée ! L\'ennemi obtient une attaque gratuite !',
		dodgedAttack: 'Vous avez esquivé l\'attaque auto ennemie ! (Chance de Combat',
		enemyAutoAttack: 'Attaque auto ennemie, infligeant',
		damageText: 'dégâts',
		shieldAbsorbed: 'bouclier absorbé',
		playerHp: 'PV du joueur',
		
		// Caravan events
		caravanMet: 'Rencontré une caravane : Peut acheter des potions si vous avez assez d\'or (50 or/potion).',
		supplySuccess: 'Approvisionnement réussi, potion +1',
		supplyNoGold: 'Pas assez d\'or pour acheter des fournitures.',
		blackMarketMet: 'Rencontré un marchand du marché noir : Peut obtenir équipement Commun~Épique par pari, max 2 objets.',
		blackMarketError: '(Erreur système : Interface du marché noir non chargée)',
		
		// Dead traveler events
		foundEquipmentOnBody: '⚔️ Vous avez trouvé',
		addedToInventoryMsg: '(ajouté à l\'inventaire)',
		foundGoldAndItem: '💰 Vous avez trouvé',
		goldCoinsText: 'or et',
		foundGoldOnly: '💰 Vous avez trouvé',
		goldCoinsEnd: 'or près du corps.',
		travelerNothing: '🕊️ Vous avez pleuré le voyageur, mais rien de valeur ne reste.',
		travelerDecayed: '💨 Le corps et l\'équipement ont été érodés par les tempêtes de sable, inutilisables.',
		travelerScorpions: '🦂 Il y a des traces de scorpions autour du corps, vous êtes parti prudemment sans rien prendre.',
		minorInjury: '(Blessure mineure en partant',
		hpLoss: 'PV)',
		
		// Temple events
		templeFound: '🛕 Vous avez découvert des ruines de temple ancien...',
		templeBlessingMaxHp: '✨ La bénédiction du temple descend ! PV Max',
		templeBlessingCombatLuck: '✨ La bénédiction du temple descend ! Chance de Combat',
		templeBlessingGoldLuck: '✨ La bénédiction du temple descend ! Chance d\'Or',
		templeTreasure: '💎 Vous avez trouvé un trésor ancien dans le temple ! Obtenu',
		curseDamage: 'Dégâts de malédiction subis',
		trapTriggered: '💥 Vous avez déclenché un piège ancien !',
		trapDamage: 'Le piège a infligé',
		pointDamage: 'dégâts !',
		
		// Caravan rest events
		caravanRestMet: '🐪 Vous avez rencontré une caravane au repos...',
		boughtPotions: '🧪 Vous avez acheté 2 potions à la caravane (coût 60 or)',
		caravanNoGold: 'La caravane est prête à échanger, mais vous n\'avez pas assez d\'or (besoin de 60 or).',
		caravanGiftGold: '💰 Le chef de caravane vous a donné de l\'or (+',
		thankYou: ') en remerciement de votre visite.',
		caravanGiftPotion: '🧪 La caravane vous a donné une potion en geste de bonne volonté.',
		caravanKnowledge: '📜 La caravane a partagé l\'expérience de survie dans le désert et des renseignements cartographiques.',
		caravanBandits: '⚔️ Ce sont des bandits déguisés !',
		
		// Nomad camp events
		nomadCampMet: '⛺ Vous avez rencontré un camp de nomades...',
		nomadHospitality: '🏕️ Les nomades vous ont chaleureusement accueilli, offrant nourriture et repos.',
		hpRestore: 'PV',
		staminaRestore: 'Endurance',
		nomadGiftItem: '🎁 Les nomades vous ont donné',
		nomadLegends: '📖 Les nomades vous ont raconté des légendes anciennes du désert et des secrets.',
		gainedExpAndGold: 'Expérience gagnée et',
		nomadHostile: '⚔️ Cette tribu est hostile aux étrangers !',
		
		// Quicksand events
		quicksandTrapped: '⚠️ Vous êtes tombé dans des sables mouvants !',
		quicksandEscaped: '💨 Vous avez rapidement échappé à la zone de sables mouvants !',
		staminaConsumed: 'Endurance consommée',
		quicksandDeep: '💀 Vous avez coulé profondément dans les sables mouvants, presque suffoqué !',
		potionBroken: '🧪 Cassé accidentellement une potion en se débattant (-1 potion)',
		
		// Scorpion events
		scorpionNest: '🦂 Vous êtes entré accidentellement dans un nid de scorpions !',
		scorpionAvoided: '🏃 Vous avez soigneusement évité les scorpions, échappant au danger avec succès !',
		scorpionStung: '😣 Vous avez été piqué par un scorpion !',
		poisonDamage: 'Dégâts de poison subis',
		scorpionSwarm: '💀 Plusieurs scorpions vous ont attaqué !',
		hpStaminaLoss: 'PV',
		scorpionTreasure: '✨ En évitant les scorpions, vous avez trouvé leur trésor gardé !',
		gainedGold: 'Gagné',
		
		// Ancient ruins events
		ruinsFound: '🏛️ Vous avez découvert des ruines anciennes...',
		foundArtifact: '⚱️ Vous avez trouvé un artefact ancien dans les ruines',
		ruinsKnowledge: '📜 Vous avez étudié les inscriptions sur les ruines, gagnant des connaissances anciennes.',
		ruinsTrap: '💥 Vous avez déclenché le mécanisme de défense des ruines !',
		receivedDamage: 'Reçu',
		ruinsGuardian: '👹 Le gardien des ruines s\'est réveillé !',
		
		// Trading post events
		tradingPostFound: '🏪 Vous avez trouvé un poste de commerce du désert !',
		tradingPostDesc: 'Ici vous pouvez vous réapprovisionner et vendre l\'équipement dont vous n\'avez pas besoin.',
		soldItem: '💰 Vendu',
		obtainedGold: 'obtenu',
		boughtPotion: '🧪 Acheté potion x1',
		boughtFood: '🍖 Acheté nourriture, PV +30, Endurance +15',
		fullRestore: '💊 Récupération complète ! PV et Endurance complètement restaurés !',
		notEnoughGoldShop: '❌ Pas assez d\'or !',
		leftTradingPost: 'Vous avez quitté le poste de commerce et continué votre voyage.',
		
		// God events
		godMet: 'Rencontré une divinité égyptienne ancienne, reçu bénédiction ou malédiction (aléatoire).',
		godBlessingGold: 'Bénédiction reçue : Or',
		goldLuckBonus2: '(incluant bonus de Chance d\'Or',
		goldLuckDecreased: 'Chance d\'Or',
		godBlessingSimple: 'Bénédiction reçue : Or +50',
		godCurse: 'Malédiction reçue : PV -15',
		
		// Pyramid events
		pyramidFound: '🔺 Vous avez découvert une pyramide ancienne !',
		pyramidDanger: 'Remplie de dangers, mais aussi de grands trésors...',
		pyramidInfo: 'Donjon de pyramide : 8 étapes d\'exploration, ennemis extrêmement puissants (augmente avec la carte), récompenses généreuses (15x exp/or), équipement Bon+ garanti !',
		declinePyramid: 'Vous avez décidé de ne pas entrer dans la pyramide et avez continué.',
		enterPyramid: '⚡ Vous êtes entré dans les profondeurs de la pyramide...',
		pyramidStart: '🔺 Donjon de pyramide commencé ! Vous avez 8 étapes d\'exploration.',
		exitPyramid: '🌅 Vous êtes sorti de la pyramide et retourné dans le désert.',
		pyramidComplete: 'Donjon de pyramide terminé ! Exploré',
		stepCount: 'étapes.',
		
		// Slot battle results
		slotResult: 'Symbole principal :',
		matchCount: ', Correspondances :',
		consecutive: ', Consécutif',
		multiplier: '(Multiplicateur',
		normalAttack: 'Vous avez lancé une attaque normale',
		skillAttack: 'Vous avez utilisé une compétence',
		causingDamage: ', infligeant',
		defenseGain: 'Vous avez gagné en défense',
		combo: '(Combo',
		shieldGain: '), Bouclier',
		potionUse: 'Utilisé potion rouge',
		restoreHp: ', PV restaurés',
		restoreStamina: 'Endurance',
		luckGain: 'Chance de Combat gagnée',
		improveRate: ', améliorant les chances de critique et d\'esquive.',
		dodgedSymbolAttack: 'Vous avez esquivé l\'attaque de symbole ennemi (Chance de Combat',
		critText: '(Critique)',
		
		// Misc
		strangerMerchant: '🏪 L\'étranger s\'est avéré être un marchand spécial !',
		bonus: 'bonus'
	}
};

// 當前語言設置
let currentLanguage = localStorage.getItem('gameLanguage') || 'zh-TW';

// 獲取翻譯文本
function t(key) {
	return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS['zh-TW'][key] || key;
}

// 切換語言
function changeLanguage(lang) {
	if (TRANSLATIONS[lang]) {
		currentLanguage = lang;
		localStorage.setItem('gameLanguage', lang);
		updateUILanguage();
	}
}

// 更新UI語言
function updateUILanguage() {
	// 更新標題
	document.querySelector('h1').textContent = t('title');
	
	// 使用 data-i18n 屬性自動更新所有元素
	document.querySelectorAll('[data-i18n]').forEach(el => {
		const key = el.getAttribute('data-i18n');
		el.textContent = t(key);
	});
	
	// 使用 data-i18n-placeholder 更新 placeholder
	document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
		const key = el.getAttribute('data-i18n-placeholder');
		el.placeholder = t(key);
	});
	
	// 使用 data-i18n-prefix 更新前綴文字（保留後面的內容）
	document.querySelectorAll('[data-i18n-prefix]').forEach(el => {
		const key = el.getAttribute('data-i18n-prefix');
		const textNode = Array.from(el.childNodes).find(node => node.nodeType === 3);
		if (textNode) {
			textNode.textContent = t(key);
		}
	});
	
	// 更新符號說明（需要保留 HTML 結構）
	const symbolList = document.querySelectorAll('#sidebar ul li');
	if (symbolList.length >= 6) {
		symbolList[0].innerHTML = `<strong>⚔️</strong> - <span data-i18n="attack">${t('attack')}</span>`;
		symbolList[1].innerHTML = `<strong>⚡️</strong> - <span data-i18n="skill">${t('skill')}</span>`;
		symbolList[2].innerHTML = `<strong>🛡️</strong> - <span data-i18n="defense">${t('defense')}</span>`;
		symbolList[3].innerHTML = `<strong>💀</strong> - <span data-i18n="enemyAttack">${t('enemyAttack')}</span>`;
		symbolList[4].innerHTML = `<strong>🧪</strong> - <span data-i18n="heal">${t('heal')}</span>`;
		symbolList[5].innerHTML = `<strong>⭐</strong> - <span data-i18n="luckyBonus">${t('luckyBonus')}</span>`;
	}
	
	// 更新地圖資訊
	updateMapInfoText();
}

// 更新地圖資訊文字（需要遊戲實例配合）
function updateMapInfoText() {
	const mapInfo = document.getElementById('map-info');
	if (mapInfo && window.game) {
		const steps = game.inPyramid ? game.pyramidSteps : game.map_steps;
		const maxSteps = game.inPyramid ? game.pyramidMaxSteps : game.map_goal;
		mapInfo.innerHTML = `${t('remainingSteps')}: <span id="map-steps">${steps}/${maxSteps}</span>`;
	}
}
