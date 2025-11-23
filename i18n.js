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
		
		// Language selector
		language: '語言',
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français'
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
		
		// Language selector
		language: 'Language',
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français'
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
		
		// Language selector
		language: 'Langue',
		languageChinese: '繁體中文',
		languageEnglish: 'English',
		languageFrench: 'Français'
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
	
	// 更新側邊欄
	const sidebar = document.querySelector('#sidebar h2');
	if (sidebar) sidebar.textContent = t('symbolGuide');
	
	// 更新符號說明
	const symbolList = document.querySelectorAll('#sidebar ul li');
	if (symbolList.length >= 6) {
		symbolList[0].innerHTML = `<strong>⚔️</strong> - ${t('attack')}`;
		symbolList[1].innerHTML = `<strong>⚡️</strong> - ${t('skill')}`;
		symbolList[2].innerHTML = `<strong>🛡️</strong> - ${t('defense')}`;
		symbolList[3].innerHTML = `<strong>💀</strong> - ${t('enemyAttack')}`;
		symbolList[4].innerHTML = `<strong>🧪</strong> - ${t('heal')}`;
		symbolList[5].innerHTML = `<strong>⭐</strong> - ${t('luckyBonus')}`;
	}
	
	// 更新歡迎訊息
	const welcomePanel = document.getElementById('welcome-panel');
	if (welcomePanel) welcomePanel.textContent = t('welcomeMessage');
	
	// 更新按鈕
	const moveFront = document.getElementById('move-front');
	const moveLeft = document.getElementById('move-left');
	const moveRight = document.getElementById('move-right');
	if (moveFront) moveFront.textContent = t('front');
	if (moveLeft) moveLeft.textContent = t('left');
	if (moveRight) moveRight.textContent = t('right');
	
	const spinBtn = document.getElementById('spin-btn');
	const stopBtn = document.getElementById('stop-btn');
	const autoSpinBtn = document.getElementById('auto-spin-btn');
	const fleeBtn = document.getElementById('flee-btn');
	const saveBtn = document.getElementById('save-btn');
	const loadBtn = document.getElementById('load-btn');
	const submitBtn = document.getElementById('submit-btn');
	
	if (spinBtn) spinBtn.textContent = t('spin');
	if (stopBtn) stopBtn.textContent = t('stop');
	if (autoSpinBtn) autoSpinBtn.textContent = t('autoSpin');
	if (fleeBtn) fleeBtn.textContent = t('flee');
	if (saveBtn) saveBtn.textContent = t('save');
	if (loadBtn) loadBtn.textContent = t('load');
	if (submitBtn) submitBtn.textContent = t('submit');
	
	// 更新輸入框
	const input = document.getElementById('game-input');
	if (input) input.placeholder = t('inputPlaceholder');
	
	// 更新裝備面板
	const equipPanel = document.querySelector('#equipment-panel h3');
	if (equipPanel) equipPanel.textContent = t('equipmentAndInventory');
	
	const closeEquipBtn = document.getElementById('close-equip');
	if (closeEquipBtn) closeEquipBtn.textContent = t('close');
	
	// 更新黑市面板
	const blackMarketPanel = document.querySelector('#blackmarket-panel h3');
	if (blackMarketPanel) blackMarketPanel.textContent = t('blackMarket');
	
	const blackMarketDesc = document.getElementById('blackmarket-desc');
	if (blackMarketDesc) blackMarketDesc.textContent = t('blackMarketDesc');
	
	const closeBlackMarketBtn = document.getElementById('close-blackmarket');
	if (closeBlackMarketBtn) closeBlackMarketBtn.textContent = t('close');
	
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
