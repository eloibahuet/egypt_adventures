document.addEventListener('DOMContentLoaded', function() {
	const output = document.getElementById('game-output');
	const input = document.getElementById('game-input');
	const button = document.getElementById('submit-btn');
	const spinBtn = document.getElementById('spin-btn');
	const stopBtn = document.getElementById('stop-btn');

	// σê¥σºïσîûΦ¬₧Φ¿ÇΘü╕µôçσÖ¿
	const languageSelect = document.getElementById('language-select');
	if (languageSelect) {
		languageSelect.value = currentLanguage;
		languageSelect.addEventListener('change', function() {
			changeLanguage(this.value);
			if (window.game) {
				// µ╕àτ⌐║Θüèµê▓Φ╝╕σç║σìÇσƒƒ
				output.innerHTML = '';
				// Θçìµû░τöƒµêÉµû╣σÉæµÅÉτñ║Σ╗Ñµ¢┤µû░Φ¬₧Φ¿Ç
				game.generateDirectionHints();
				// µ¢┤µû░τÄ⌐σ«╢σÆîµò╡Σ║║τïÇµàïΘí»τñ║
				game.updateStatus();
			}
		});
	}
	
	// σê¥σºïσîûUIΦ¬₧Φ¿Ç
	updateUILanguage();

	// σê¥σºïΣ╕ìσàüΦ¿▒µùïΦ╜ë∩╝îτ¢┤σê░τÄ⌐σ«╢Θü╕µôçτº╗σïòµû╣σÉæ
	spinBtn.disabled = true;
	const reels = [document.getElementById('reel-0'), document.getElementById('reel-1'), document.getElementById('reel-2')];

// Σ║ïΣ╗╢σêùΦí¿Φêçµ¼èΘçì∩╝êσ░ìµçëσÄƒ Python∩╝ë
const EVENTS = ['monster', 'elite', 'mini_boss', 'merchant', 'black_market', 'oasis', 'sandstorm', 'egyptian_god', 'pyramid', 'buried_treasure', 'dead_traveler', 'ancient_shrine', 'caravan_rest', 'mirage', 'nomad_camp', 'quicksand', 'scorpion_nest', 'ancient_ruins', 'mysterious_stranger', 'trading_post', 'empty'];
const EVENT_WEIGHTS = [22,8,4,7,4,6,8,4,6,6,6,5,5,4,5,5,4,5,4,6,2];

function chooseEvent() {
	const total = EVENT_WEIGHTS.reduce((a,b)=>a+b,0);
	let r = Math.random() * total;
	for (let i=0,acc=0;i<EVENT_WEIGHTS.length;i++){
		acc += EVENT_WEIGHTS[i];
		if (r < acc) return EVENTS[i];
	}
	return 'empty';
}

	function showMessage(msg) {
		// µû░σó₧Σ╕ÇσÇïΦ¿èµü»τ»ÇΘ╗₧∩╝îΣ╕ªτó║Σ┐¥σÅ¬Σ┐¥τòÖµ£Çµû░20µó¥
		const node = document.createElement('div');
		node.innerHTML = msg; // Σ╜┐τö¿ innerHTML Σ╗Ñµö»µÅ┤ HTML µ¿Öτ▒ñ∩╝êσªéΘíÅΦë▓∩╝ë
		output.appendChild(node);
		// ΦïÑΦ╢àΘüÄ20σëç∩╝îτº╗ΘÖñµ£ÇΦêèτÜä
		while (output.children.length > 20) {
			output.removeChild(output.firstChild);
		}
		// Φç¬σïòµì▓σïòσê░µ£Çσ║ò
		output.scrollTop = output.scrollHeight;
	}

	// µÅÆµº╜µ⌐ƒτ¼ªΦÖƒ∩╝êτ¢«σëìσ»ªΦú¥τÜäτ¼ªΦÖƒ∩╝ë
	// µêæσÇæΣ╜┐τö¿σèáµ¼èµû╣µ│òΦ«ôµö╗µôèτ¼ªΦÖƒσç║τÅ╛µ⌐ƒτÄçΦ╝âΘ½ÿ
	const SYMBOLS = ['ΓÜö∩╕Å','ΓÜí∩╕Å','≡ƒ¢í∩╕Å','≡ƒÆÇ','≡ƒº¬','Γ¡É','≡ƒÆ░'];
	// µ¼èΘçìΦ¿¡σ«Ü∩╝êσÅ»Φ¬┐∩╝ë∩╝Üµö╗µôèΦ╝âσ╕╕σç║τÅ╛
	const SYMBOL_WEIGHTS = {
		'ΓÜö∩╕Å': 6,
		'ΓÜí∩╕Å': 3,
		'≡ƒ¢í∩╕Å': 3,
		'≡ƒÆÇ': 2,
		'≡ƒº¬': 2,
		'Γ¡É': 4,
		'≡ƒÆ░': 2
	};

	function pickWeightedSymbol() {
		const pool = [];
		for (const s of SYMBOLS) {
			const w = SYMBOL_WEIGHTS[s] || 1;
			for (let i=0;i<w;i++) pool.push(s);
		}
		return pool[Math.floor(Math.random() * pool.length)];
	}
	const VISIBLE = 2; // Σ╕¡ΘûôΘí»τñ║1σÇï∩╝îσ»ªΣ╜£Σ╕èµ»ÅσÇï symbol Θ½ÿσ║ªτé║ 60px∩╝îreel Θ½ÿσ║ª 120px
	const SYMBOL_HEIGHT = 60; // Φêç CSS σÉîµ¡Ñ

// Φú¥σéÖΦêçµÄëΦÉ╜µ¿úµ£¼∩╝êσƒ║τñÄσ▒¼µÇº∩╝îσôüΦ│¬µ£âσ£¿τöƒµêÉµÖéµ╖╗σèá∩╝ë
const ITEMS = [
	// µ¡ªσÖ¿Θí₧
	{ name: 'Θ¥ÆΘèàσèì', slot: 'weapon', atk: 3, rarity: 'common' },
	{ name: 'Θï╝ΘÉ╡σèì', slot: 'weapon', atk: 6, rarity: 'common' },
	{ name: 'µ│òΦÇüσ╜ÄσêÇ', slot: 'weapon', atk: 8, rarity: 'common' },
	{ name: 'Φüûτö▓Φƒ▓µê░µûº', slot: 'weapon', atk: 10, rarity: 'common' },
	{ name: 'Φì╖Θ¡»µû»Σ╣ïσèì', slot: 'weapon', atk: 12, rarity: 'common' },
	{ name: 'Θÿ┐σè¬µ»öµû»Σ╣ïΘÄî', slot: 'weapon', atk: 15, rarity: 'common' },
	{ name: 'σñ¬ΘÖ╜τÑ₧Σ╣ïτƒ¢', slot: 'weapon', atk: 18, rarity: 'common' },
	
	// Θÿ▓σà╖Θí₧
	{ name: 'τÜ«τö▓', slot: 'armor', def: 2, rarity: 'common' },
	{ name: 'Θï╝ΘÉ╡ΘÄºτö▓', slot: 'armor', def: 5, rarity: 'common' },
	{ name: 'µ▓Öµ╝áΘò╖Φóì', slot: 'armor', def: 3, rarity: 'common' },
	{ name: 'µ│òΦÇüΦ¡╖Φâ╕', slot: 'armor', def: 7, rarity: 'common' },
	{ name: 'Φüûτö▓Φƒ▓ΘÄºτö▓', slot: 'armor', def: 9, rarity: 'common' },
	{ name: 'Θ╗âΘçæµê░τö▓', slot: 'armor', def: 12, rarity: 'common' },
	{ name: 'τÑ₧µ«┐σ«êΦ¡╖τö▓', slot: 'armor', def: 15, rarity: 'common' },
	
	// Φ¡╖τ¼ªΘí₧
	{ name: 'σ╣╕ΘüïΦ¡╖τ¼ª', slot: 'amulet', luck_gold: 1, rarity: 'common' },
	{ name: 'µê░Θ¼ÑΦ¡╖τ¼ª', slot: 'amulet', luck_combat: 1, rarity: 'common' },
	{ name: 'Φüûτö▓Φƒ▓σó£Θú╛', slot: 'amulet', luck_gold: 2, rarity: 'common' },
	{ name: 'Φì╖Θ¡»µû»Σ╣ïτ£╝', slot: 'amulet', luck_combat: 2, rarity: 'common' },
	{ name: 'τöƒσæ╜Σ╣ïτ¼ª', slot: 'amulet', max_hp_bonus: 20, rarity: 'common' },
	{ name: 'σè¢ΘçÅΣ╣ïτ¼ª', slot: 'amulet', atk: 3, rarity: 'common' },
	{ name: 'σ«êΦ¡╖Σ╣ïτ¼ª', slot: 'amulet', def: 3, rarity: 'common' }
];

// 新增裝備項目（擴充裝備池）
ITEMS.push(
	// 武器 - 隨機稀有度
	{ name: '太陽神之劍', slot: 'weapon', atk: 22, skill_power: 8, rarity: 'rare' },
	{ name: '黃沙之裂斧', slot: 'weapon', atk: 28, crit_rate: 6, rarity: 'excellent' },
	{ name: '星辰滅絕刃', slot: 'weapon', atk: 36, skill_power: 18, crit_rate: 10, rarity: 'epic' },

	// 防具
	{ name: '尼羅河甲', slot: 'armor', def: 18, max_hp_bonus: 40, rarity: 'rare' },
	{ name: '赤陶重甲', slot: 'armor', def: 24, dodge_rate: 6, rarity: 'excellent' },
	{ name: '王者守護衣', slot: 'armor', def: 32, max_hp_bonus: 80, rarity: 'epic' },

	// 護符 / 飾品
	{ name: '幸運祈願符+', slot: 'amulet', luck_gold: 4, rarity: 'rare' },
	{ name: '戰鬥祝福墜飾', slot: 'amulet', luck_combat: 4, atk: 4, rarity: 'excellent' },
	{ name: '傳說王者之眼', slot: 'amulet', luck_combat: 6, max_hp_bonus: 120, rarity: 'legendary' }
);

// σôüΦ│¬Θíìσñûσ▒¼µÇºµ▒á
const QUALITY_BONUS = {
	weapon: {
		// µ¡ªσÖ¿Θíìσñûσ▒¼µÇº∩╝ÜµÜ┤µôèτÄçπÇüΘÇúµôèτÄçπÇüµèÇΦâ╜σó₧σ╣à
		common: [], // µÖ«ΘÇÜτäíΘíìσñûσ▒¼µÇº
		rare: [ // τ¿Çµ£ë∩╝Ü1σÇïΘíìσñûσ▒¼µÇº
			{ crit_rate: 5 }, // +5% µÜ┤µôèτÄç
			{ crit_rate: 8 },
			{ combo_rate: 8 }, // +8% ΘÇúµôèτ╢¡µîüτÄç
			{ combo_rate: 12 },
			{ skill_power: 10 }, // +10% µèÇΦâ╜σé╖σ«│
			{ skill_power: 15 }
		],
		epic: [ // σÅ▓Φ⌐⌐∩╝Ü2σÇïΘíìσñûσ▒¼µÇº
			{ crit_rate: 10, combo_rate: 15 },
			{ crit_rate: 12, skill_power: 20 },
			{ combo_rate: 18, skill_power: 25 },
			{ crit_rate: 15, combo_rate: 20 },
			{ skill_power: 30, combo_rate: 15 }
		]
		,excellent: [
			{ crit_rate: 10 },
			{ crit_rate: 12, combo_rate: 12 },
			{ combo_rate: 15 },
			{ skill_power: 20 },
			{ atk: 3, crit_rate: 8 }
		],
		legendary: [
			{ crit_rate: 20, combo_rate: 25 },
			{ skill_power: 50, crit_rate: 25 },
			{ atk: 8, skill_power: 30, combo_rate: 20 },
			{ crit_rate: 30, combo_rate: 30, skill_power: 40 }
		]
	},
	armor: {
		common: [],
		rare: [ // τ¿Çµ£ë∩╝Ü1σÇïΘíìσñûσ▒¼µÇº
			{ max_hp_bonus: 15 }, // +15 µ£Çσñºτöƒσæ╜
			{ max_hp_bonus: 20 },
			{ stamina_bonus: 10 }, // +10 µ£ÇσñºΘ½öσè¢
			{ stamina_bonus: 15 },
			{ dodge_rate: 5 }, // +5% ΘûâΘü┐τÄç
			{ dodge_rate: 8 }
		],
		epic: [ // σÅ▓Φ⌐⌐∩╝Ü2σÇïΘíìσñûσ▒¼µÇº
			{ max_hp_bonus: 30, stamina_bonus: 20 },
			{ max_hp_bonus: 25, dodge_rate: 10 },
			{ stamina_bonus: 25, dodge_rate: 12 },
			{ max_hp_bonus: 40, dodge_rate: 8 },
			{ dodge_rate: 15, stamina_bonus: 30 }
		]
		,excellent: [
			{ max_hp_bonus: 45, stamina_bonus: 25 },
			{ max_hp_bonus: 35, dodge_rate: 12 },
			{ stamina_bonus: 30, dodge_rate: 10 },
			{ def: 6, max_hp_bonus: 30 }
		],
		legendary: [
			{ max_hp_bonus: 100, stamina_bonus: 50, dodge_rate: 20 },
			{ def: 12, max_hp_bonus: 80, dodge_rate: 18 },
			{ stamina_bonus: 60, dodge_rate: 25, def: 10 }
		]
	},
	amulet: {
		common: [],
		rare: [ // τ¿Çµ£ë∩╝Ü1σÇïΘíìσñûσ▒¼µÇº
			{ luck_combat: 1 },
			{ luck_gold: 1 },
			{ max_hp_bonus: 15 },
			{ atk: 2 },
			{ def: 2 }
		],
		epic: [ // σÅ▓Φ⌐⌐∩╝Ü2σÇïΘíìσñûσ▒¼µÇº
			{ luck_combat: 2, luck_gold: 2 },
			{ luck_combat: 2, max_hp_bonus: 25 },
			{ luck_gold: 2, atk: 4 },
			{ atk: 5, def: 5 },
			{ max_hp_bonus: 35, def: 3 }
		]
		,excellent: [
			{ luck_combat: 3 },
			{ luck_gold: 3 },
			{ max_hp_bonus: 45 },
			{ atk: 6, def: 6 }
		],
		legendary: [
			{ luck_combat: 5, luck_gold: 5 },
			{ max_hp_bonus: 80, atk: 10 },
			{ atk: 12, def: 12, luck_combat: 3 }
		]
	}
};

// Θçæσ¡ùσíöΦú¥σéÖσ¡ùτ╢┤τ│╗τ╡▒∩╝êσâàΘçæσ¡ùσíöµÄëΦÉ╜Φú¥σéÖµôüµ£ë∩╝ë
const PYRAMID_AFFIXES = [
	{ id: 'ra', name: 'σñ¬ΘÖ╜τÑ₧µïëΣ╣ï', color: '#FFD700', bonus: { atk: 3, crit_rate: 8 } },
	{ id: 'anubis', name: 'µ¡╗τÑ₧Θÿ┐σè¬µ»öµû»Σ╣ï', color: '#8B4513', bonus: { def: 3, max_hp_bonus: 30 } },
	{ id: 'osiris', name: 'σåÑτÄïµ¡ÉΦÑ┐Θçîµû»Σ╣ï', color: '#4B0082', bonus: { max_hp_bonus: 40, stamina_bonus: 20 } },
	{ id: 'horus', name: 'Φì╖Θ¡»µû»Σ╣ï', color: '#1E90FF', bonus: { atk: 4, combo_rate: 12 } },
	{ id: 'isis', name: 'σÑ│τÑ₧Σ╝èΦÑ┐µû»Σ╣ï', color: '#FF69B4', bonus: { luck_combat: 2, luck_gold: 2 } },
	{ id: 'thoth', name: 'µÖ║µàºτÑ₧µëÿτë╣Σ╣ï', color: '#00CED1', bonus: { skill_power: 20, dodge_rate: 10 } }
];

// σÑùΦú¥µòêµ₧£∩╝êΘ£ÇΦªüµ¡ªσÖ¿+Φ¡╖τö▓+Φ¡╖τ¼ªΣ╕ëΣ╗╢τ¢╕σÉîσ¡ùτ╢┤∩╝îΣ╕öσÉîσôüΦ│¬∩╝ë
const SET_BONUSES = {
	'ra': { name: 'σñ¬ΘÖ╜τÑ₧τÜäµª«ΦÇÇ', effects: { atk: 10, crit_rate: 15, skill_power: 25 } },
	'anubis': { name: 'µ¡╗τÑ₧τÜäσ║çΦ¡╖', effects: { def: 10, max_hp_bonus: 80, dodge_rate: 15 } },
	'osiris': { name: 'σåÑτòîτÜäσè¢ΘçÅ', effects: { max_hp_bonus: 100, stamina_bonus: 50, def: 8 } },
	'horus': { name: 'σñ⌐τ⌐║Σ╣ïτÑ₧τÜäτÑ¥τªÅ', effects: { atk: 12, combo_rate: 20, crit_rate: 12 } },
	'isis': { name: 'Θ¡öµ│òσÑ│τÑ₧τÜäµü⌐Φ│£', effects: { luck_combat: 4, luck_gold: 4, max_hp_bonus: 50 } },
	'thoth': { name: 'µÖ║µàºτÜäσòƒΦ┐¬', effects: { skill_power: 40, dodge_rate: 20, stamina_bonus: 30 } }
};

function genEnemyName(type) {
	const prefixes = ['σÅñσñ½', 'Θÿ┐σè¬', 'Φ│╜τë╣', 'µïë', 'µóàτë╣'];
	const suffixes = ['σ«êΦí¢', 'µê░σú½', 'τÑ¡σÅ╕', 'µÄáσÑ¬ΦÇà', 'σ«êΦ¡╖ΦÇà'];
	const p = prefixes[Math.floor(Math.random()*prefixes.length)];
	const s = suffixes[Math.floor(Math.random()*suffixes.length)];
	let title = '';
	if (type === 'elite') title = 'τ▓╛Φï▒';
	else if (type === 'mini_boss') title = 'σ░ÅΘá¡τ¢«';
	else title = 'µò╡Σ║║';
	return `${p}${s} ${title}`;
}

	// µ»ÅΦ╗╕σ╗║τ½ïΘò╖µó¥∩╝êΘçìΦñçτ¼ªΦÖƒΣ╗ÑΣ╛┐σ╣│µ╗æµùïΦ╜ë∩╝ë
	function populateReels() {
		for (let r = 0; r < reels.length; r++) {
			const strip = document.createElement('div');
			strip.className = 'strip';
			// ΘçìΦñç SYMBOLS Σ╗Ñµû╣Σ╛┐ΘÇúτ║îµì▓σïò
			const repeats = 8;
			for (let i = 0; i < repeats; i++) {
				for (const s of SYMBOLS) {
					const el = document.createElement('div');
					el.className = 'symbol';
					el.textContent = s;
					strip.appendChild(el);
				}
			}
		reels[r].innerHTML = '';
		reels[r].appendChild(strip);
		// σê¥σºïΣ╜ìτ╜«∩╝Üσ╛₧Σ╕¡Θûôτ╡äΘûïσºï
		// Θ½ÿΣ║«µíåσ£¿ top: 30px (Σ╕¡σ┐âσ£¿ 60px)∩╝îΦªüΦ«ôτ¼ªΦÖƒσ░ìΘ╜è∩╝îΘ£ÇΦªüΦ«ôµƒÉσÇïτ¼ªΦÖƒτÜäΣ╕¡σ┐âσ░ìΘ╜èσê░ 60px
		// strip σ╛ÇΣ╕èτº╗σïòσê░Φ«ôτ¼¼ N σÇïτ¼ªΦÖƒτÜäΘáéΘâ¿σ£¿ 30px ΦÖò
		const initialOffset = SYMBOL_HEIGHT * SYMBOLS.length * 2;
		strip.style.transform = `translateY(-${initialOffset}px)`;
		}
	}

	populateReels();

	// τ░íσû«Θüèµê▓τïÇµàï∩╝êτÄ⌐σ«╢Φêçµò╡Σ║║∩╝ë
	class Game {
		constructor() {
			this.player = { hp: 100, max_hp: 100, shield: 0, stamina: 50, max_stamina: 50, potions: 2, gold: 500, luck_combat: 0, luck_gold: 0, level: 1, xp: 0, inventory: [], equipment: { weapon: null, armor: null, amulet: null } };
			this.enemy = { hp: 100, max_hp: 100, baseAttack: 10, turnsToAttack: 3 };
			this.inBattle = false;
			this.consecutivePrimarySymbol = null;
			this.consecutivePrimaryCount = 0;
			this.map_steps = 0;
			this.map_goal = 30;
			this.difficulty = 1;
			// Θçæσ¡ùσíöσë»µ£¼τ¢╕Θù£τïÇµàï
			this.inPyramid = false;
			this.pyramidSteps = 0;
			this.pyramidMaxSteps = 8;
			this.normalMapSteps = 0; // σä▓σ¡ÿΘÇ▓σàÑΘçæσ¡ùσíöσëìτÜäµ¡Ñµò╕
		}

		// µ¬óµ╕¼σÑùΦú¥µòêµ₧£∩╝êΘ£ÇΦªüµ¡ªσÖ¿+Φ¡╖τö▓+Φ¡╖τ¼ªΣ╕ëΣ╗╢τ¢╕σÉîσ¡ùτ╢┤Σ╕öσÉîσôüΦ│¬∩╝ë
		getActiveSetBonus() {
			const weapon = this.player.equipment.weapon;
			const armor = this.player.equipment.armor;
			const amulet = this.player.equipment.amulet;
			
			// µ¬óµƒÑµÿ»σÉªΘâ╜µÿ»Θçæσ¡ùσíöΦú¥σéÖ
			if (!weapon || !armor || !amulet) return null;
			if (!weapon.isPyramid || !armor.isPyramid || !amulet.isPyramid) return null;
			
			// µ¬óµƒÑσ¡ùτ╢┤µÿ»σÉªτ¢╕σÉî
			if (weapon.affix !== armor.affix || weapon.affix !== amulet.affix) return null;
			
			// µ¬óµƒÑσôüΦ│¬µÿ»σÉªτ¢╕σÉî∩╝êΣ╕ìΦâ╜µ╖╖µÉ¡∩╝ë
			if (weapon.rarity !== armor.rarity || weapon.rarity !== amulet.rarity) return null;
			
			// Φ┐öσ¢₧σÑùΦú¥µòêµ₧£
			const setBonus = SET_BONUSES[weapon.affix];
			if (setBonus) {
				return { ...setBonus, affix: weapon.affix, affixName: weapon.affixName, rarity: weapon.rarity };
			}
			return null;
		}

		// τ╢ôΘ⌐ùµ¢▓τ╖Ü∩╝Üσé│σ¢₧σìçσê░Σ╕ïΣ╕Çτ¡ëτ┤ÜµëÇΘ£ÇτÜäτ╢ôΘ⌐ùσÇ╝∩╝êτ░íσû«µîçµò╕σó₧Θò╖∩╝îσÅ»µô┤σ▒òΦç│τ¡ëτ┤Ü99∩╝ë
		xpForNext(level) {
			// level Φ╡╖σºïµû╝ 1∩╝îΦªüσìçσê░ level+1 µëÇΘ£Ç
			if (level >= 99) return Infinity;
			return Math.floor(100 * level * Math.pow(1.06, level-1));
		}

		addXP(amount) {
			this.player.xp += amount;
			showMessage(`${t('gainedExp')} ${amount}πÇé`);
			// Φç¬σïòσìçτ┤ÜΦ┐┤σ£ê∩╝êµö»µÅ┤σñÜτ¡ëτ┤Üσìçτ┤Ü∩╝ë
			while (this.player.level < 99 && this.player.xp >= this.xpForNext(this.player.level)) {
				const need = this.xpForNext(this.player.level);
				this.player.xp -= need;
				this.player.level += 1;
				// τ¡ëτ┤Üσ╕╢Σ╛åτÜäτìÄσï╡∩╝ÜµÅÉσìçµ£Çσñºτöƒσæ╜ΦêçΘ½öσè¢∩╝îΣ╕ªσ«îσà¿µüóσ╛⌐
				this.player.max_hp += 10;
				this.player.max_stamina += 5;
				this.player.hp = this.player.max_hp; // σ«îσà¿µüóσ╛⌐ΦíÇΘçÅ
				this.player.stamina = this.player.max_stamina; // σ«îσà¿µüóσ╛⌐Θ½öσè¢
				showMessage(`${t('levelUp')} ${this.player.level} ${t('hpStaminaRecovered')}`);
			}
		}

		// µ¬óµ╕¼σÑùΦú¥µòêµ₧£∩╝êΘ£ÇΦªüµ¡ªσÖ¿+Φ¡╖τö▓+Φ¡╖τ¼ªΣ╕ëΣ╗╢τ¢╕σÉîσ¡ùτ╢┤Σ╕öσÉîσôüΦ│¬∩╝ë
		getActiveSetBonus() {
			const weapon = this.player.equipment.weapon;
			const armor = this.player.equipment.armor;
			const amulet = this.player.equipment.amulet;
			
			// µ¬óµƒÑµÿ»σÉªΘâ╜µÿ»Θçæσ¡ùσíöΦú¥σéÖ
			if (!weapon || !armor || !amulet) return null;
			if (!weapon.isPyramid || !armor.isPyramid || !amulet.isPyramid) return null;
			
			// µ¬óµƒÑσ¡ùτ╢┤µÿ»σÉªτ¢╕σÉî
			if (weapon.affix !== armor.affix || weapon.affix !== amulet.affix) return null;
			
			// µ¬óµƒÑσôüΦ│¬µÿ»σÉªτ¢╕σÉî∩╝êΣ╕ìΦâ╜µ╖╖µÉ¡∩╝ë
			if (weapon.rarity !== armor.rarity || weapon.rarity !== amulet.rarity) return null;
			
			// Φ┐öσ¢₧σÑùΦú¥µòêµ₧£
			const setBonus = SET_BONUSES[weapon.affix];
			if (setBonus) {
				return { ...setBonus, affix: weapon.affix, affixName: weapon.affixName, rarity: weapon.rarity };
			}
			return null;
		}

		// τì▓σÅûσÑùΦú¥µòêµ₧£σ▒¼µÇºσèáµêÉσÇ╝
		getSetBonusValue(attrName) {
			const setBonus = this.getActiveSetBonus();
			if (!setBonus || !setBonus.effects) return 0;
			return setBonus.effects[attrName] || 0;
		}

		// Helper: µá╝σ╝Åσîûτë⌐σôüσ▒¼µÇºΘí»τñ║
		formatItem(it) {
				if (!it) return '';
				const parts = [];
				if (it.atk) parts.push(`µö╗+${it.atk}`);
				if (it.def) parts.push(`Θÿ▓+${it.def}`);
				if (it.luck_gold) parts.push(`ΘçæΘüï+${it.luck_gold}`);
				if (it.luck_combat) parts.push(`µê░Θüï+${it.luck_combat}`);
				if (it.max_hp_bonus) parts.push(`HP+${it.max_hp_bonus}`);
				if (it.stamina_bonus) parts.push(`Θ½öσè¢+${it.stamina_bonus}`);
				if (it.crit_rate) parts.push(`µÜ┤µôè+${it.crit_rate}%`);
				if (it.combo_rate) parts.push(`ΘÇúµôè+${it.combo_rate}%`);
				if (it.skill_power) parts.push(`µèÇΦâ╜+${it.skill_power}%`);
				if (it.dodge_rate) parts.push(`ΘûâΘü┐+${it.dodge_rate}%`);
				const attr = parts.length ? ` (${parts.join(' ')})` : '';
				// µá╣µôÜτ¿Çµ£ëσ║ªΦ¿¡σ«ÜΘíÅΦë▓
				let color = '#333'; // common fallback
				if (it.rarity === 'legendary') color = '#e67e22';
				else if (it.rarity === 'epic') color = '#9b59b6';
				else if (it.rarity === 'excellent') color = '#2ecc71';
				else if (it.rarity === 'rare') color = '#3498db'; // rare -> blue
				else if (it.rarity === 'excellent') color = '#2ecc71'; // excellent -> green
				else if (it.rarity === 'epic') color = '#9b59b6'; // epic -> purple
				else if (it.rarity === 'legendary') color = '#e67e22'; // legendary -> orange
				
				// Θçæσ¡ùσíöΦú¥σéÖΘí»τñ║σ¡ùτ╢┤
				let displayName = it.name;
				if (it.isPyramid && it.affixName) {
					displayName = `<span style="color: ${it.affixColor};">${it.affixName}</span>${it.name}`;
				}
				
				return `<span style="color: ${color}; font-weight: bold;">${displayName}</span>${attr}`;
		}

		// Θí»τñ║/µ¢┤µû░Φú¥σéÖΘ¥óµ¥┐∩╝êτ░íµÿôΣ╗ïΘ¥ó∩╝ë∩╝îσÅ»Θü╕ filterSlot: 'weapon'|'armor'|'amulet' µêû null
		showEquipmentPanel(filterSlot = null) {
			const panel = document.getElementById('equipment-panel');
			const content = document.getElementById('equip-content');
			if (!panel || !content) return;
			// σêùσç║τ¢«σëìΦú¥σéÖΦêçΦâîσîà
			let html = `<div><strong>${t('equipped')}</strong></div>`;
			const noneText = t('none');
			const weapText = this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : noneText;
			const armText = this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : noneText;
			const amuText = this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : noneText;
			html += `<div>${t('weapon')}: ${weapText} <button class="unequip-inline" data-slot="weapon">${t('unequip')}</button> <button class="open-equip-inline" data-slot="weapon">${t('equip')}</button></div>`;
			html += `<div>${t('armor')}: ${armText} <button class="unequip-inline" data-slot="armor">${t('unequip')}</button> <button class="open-equip-inline" data-slot="armor">${t('equip')}</button></div>`;
			html += `<div>${t('amulet')}: ${amuText} <button class="unequip-inline" data-slot="amulet">${t('unequip')}</button> <button class="open-equip-inline" data-slot="amulet">${t('equip')}</button></div>`;
			
			// Θí»τñ║σÑùΦú¥µòêµ₧£
			const setBonus = this.getActiveSetBonus();
			if (setBonus) {
				const setParts = [];
				const atkLabel = currentLanguage === 'zh-TW' ? 'µö╗' : currentLanguage === 'fr' ? 'ATT' : 'ATK';
				const defLabel = currentLanguage === 'zh-TW' ? 'Θÿ▓' : currentLanguage === 'fr' ? 'D├ëF' : 'DEF';
				const staminaLabel = currentLanguage === 'zh-TW' ? 'Θ½öσè¢' : currentLanguage === 'fr' ? 'End' : 'Stam';
				const combatLuckLabel = currentLanguage === 'zh-TW' ? 'µê░Θüï' : currentLanguage === 'fr' ? 'Chance C' : 'Luck C';
				const goldLuckLabel = currentLanguage === 'zh-TW' ? 'ΘçæΘüï' : currentLanguage === 'fr' ? 'Chance O' : 'Luck G';
				const critLabel = currentLanguage === 'zh-TW' ? 'µÜ┤µôè' : currentLanguage === 'fr' ? 'Crit' : 'Crit';
				const comboLabel = currentLanguage === 'zh-TW' ? 'ΘÇúµôè' : currentLanguage === 'fr' ? 'Combo' : 'Combo';
				const skillLabel = currentLanguage === 'zh-TW' ? 'µèÇΦâ╜' : currentLanguage === 'fr' ? 'Comp' : 'Skill';
				const dodgeLabel = currentLanguage === 'zh-TW' ? 'ΘûâΘü┐' : currentLanguage === 'fr' ? '├ëvit' : 'Dodge';
				
				if (setBonus.effects.atk) setParts.push(`${atkLabel}+${setBonus.effects.atk}`);
				if (setBonus.effects.def) setParts.push(`${defLabel}+${setBonus.effects.def}`);
				if (setBonus.effects.max_hp_bonus) setParts.push(`${t('hp')}+${setBonus.effects.max_hp_bonus}`);
				if (setBonus.effects.stamina_bonus) setParts.push(`${staminaLabel}+${setBonus.effects.stamina_bonus}`);
				if (setBonus.effects.luck_combat) setParts.push(`${combatLuckLabel}+${setBonus.effects.luck_combat}`);
				if (setBonus.effects.luck_gold) setParts.push(`${goldLuckLabel}+${setBonus.effects.luck_gold}`);
				if (setBonus.effects.crit_rate) setParts.push(`${critLabel}+${setBonus.effects.crit_rate}%`);
				if (setBonus.effects.combo_rate) setParts.push(`${comboLabel}+${setBonus.effects.combo_rate}%`);
				if (setBonus.effects.skill_power) setParts.push(`${skillLabel}+${setBonus.effects.skill_power}%`);
				if (setBonus.effects.dodge_rate) setParts.push(`${dodgeLabel}+${setBonus.effects.dodge_rate}%`);
				const rarityText = setBonus.rarity === 'rare' ? (currentLanguage === 'zh-TW' ? 'τ▓╛Φë»' : currentLanguage === 'fr' ? 'Rare' : 'Rare') : setBonus.rarity === 'epic' ? (currentLanguage === 'zh-TW' ? 'σÅ▓Φ⌐⌐' : currentLanguage === 'fr' ? '├ëpique' : 'Epic') : '';
				html += `<hr/><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 10px; border-radius: 6px; color: white; margin: 8px 0;"><strong>ΓÜí ${t('setBonus')}: ${setBonus.name} (${rarityText})</strong><br/>${setParts.join(' ')}</div>`;
			}
			html += `<hr/><div><strong>${t('inventory')}</strong></div>`;
			const inv = this.player.inventory;
			let shown = 0;
			for (let i=0;i<inv.length;i++){
				const it = inv[i];
				if (filterSlot && it.slot !== filterSlot) continue;
				shown++;
				const disp = this.formatItem(it) || `${it.name}`;
				html += `<div>${i+1}. ${disp} (${it.rarity}) <button data-idx="${i}" class="equip-now">${t('equip')}</button></div>`;
			}
			if (shown === 0) html += `<div>${t('noMatchingItems')}</div>`;
			content.innerHTML = html;
			panel.style.display = 'block';
			// ΘÇúτ╡ÉΦú¥σéÖµîëΘêò
			Array.from(content.querySelectorAll('.equip-now')).forEach(b=>{
				b.addEventListener('click', (e)=>{
					const idx = parseInt(e.target.getAttribute('data-idx'));
					this.equipItem(idx);
					this.showEquipmentPanel(filterSlot);
				});
			});
			// σàºσ╡îσì╕Σ╕ï/Φú¥σéÖµîëΘêò∩╝êσ£¿Θ¥óµ¥┐σàº∩╝ë
			Array.from(content.querySelectorAll('.unequip-inline')).forEach(b=>{
				b.addEventListener('click', (e)=>{
					const slot = e.target.getAttribute('data-slot');
					this.unequipItem(slot);
					this.showEquipmentPanel(filterSlot);
				});
			});
			Array.from(content.querySelectorAll('.open-equip-inline')).forEach(b=>{
				b.addEventListener('click', (e)=>{
					const slot = e.target.getAttribute('data-slot');
					this.showEquipmentPanel(slot);
				});
			});
		}

	equipItem(index) {
		const it = this.player.inventory[index];
		if (!it) return;
		if (it.slot && this.player.equipment.hasOwnProperty(it.slot)) {
			// µ¬óµƒÑΦ⌐▓µº╜Σ╜ìµÿ»σÉªσ╖▓µ£ëΦú¥σéÖ∩╝îσªéµ₧£µ£ëσëçσàêσì╕Σ╕ïµö╛σ¢₧Φâîσîà
			const oldEquipment = this.player.equipment[it.slot];
			if (oldEquipment) {
				// τº╗ΘÖñΦêèΦú¥σéÖτÜäσ▒¼µÇºσèáµêÉ
				if (oldEquipment.luck_gold) {
					this.player.luck_gold = Math.max(0, this.player.luck_gold - (oldEquipment.luck_gold || 0));
				}
				if (oldEquipment.max_hp_bonus) {
					this.player.max_hp = Math.max(1, this.player.max_hp - oldEquipment.max_hp_bonus);
					this.player.hp = Math.min(this.player.max_hp, this.player.hp);
				}
				if (oldEquipment.stamina_bonus) {
					this.player.max_stamina = Math.max(1, this.player.max_stamina - oldEquipment.stamina_bonus);
					this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina);
				}
				// σ░çΦêèΦú¥σéÖµö╛σ¢₧Φâîσîà
				this.player.inventory.push(oldEquipment);
				showMessage(`${t('unequipped')} ${oldEquipment.name}, ${t('addedToInventory')}.`);
			}
			
			// Φú¥σéÖµû░τë⌐σôü
			this.player.equipment[it.slot] = it;
			showMessage(`${t('equipTo')} ${it.name} ${t('to')} ${it.slot}`);
			
			// µçëτö¿µû░Φú¥σéÖσ▒¼µÇºσèáµêÉ
			if (it.luck_gold) {
				this.player.luck_gold += it.luck_gold;
				showMessage(`${t('gainedGoldLuck')} +${it.luck_gold}`);
			}
			if (it.max_hp_bonus) {
				this.player.max_hp += it.max_hp_bonus;
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + it.max_hp_bonus);
				showMessage(`${t('maxHpBonus')} +${it.max_hp_bonus}`);
			}
			if (it.stamina_bonus) {
				this.player.max_stamina += it.stamina_bonus;
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + it.stamina_bonus);
				showMessage(`${t('maxStaminaBonus')} +${it.stamina_bonus}`);
			}
			// σ╛₧ΦâîσîàΣ╕¡τº╗ΘÖñµû░Φú¥σéÖ
			this.player.inventory.splice(index,1);
			this.updateStatus();
		} else {
			showMessage(t('cannotEquip'));
		}
	}		unequipItem(slot) {
			if (!this.player.equipment || !this.player.equipment[slot]) { showMessage(t('noEquipmentInSlot')); return; }
		const it = this.player.equipment[slot];
		this.player.inventory.push(it);
		this.player.equipment[slot] = null;
		showMessage(`${t('unequipped')} ${it.name}, ${t('addedToInventory')}.`);
		// τº╗ΘÖñΦú¥σéÖσ▒¼µÇºσèáµêÉ
		if (it.luck_gold) {
			this.player.luck_gold = Math.max(0, this.player.luck_gold - (it.luck_gold||0));
			showMessage(`${t('goldLuckRemaining')} -${it.luck_gold}∩╝ê${t('remaining')} ${this.player.luck_gold}∩╝ëπÇé`);
		}
		if (it.max_hp_bonus) {
			this.player.max_hp = Math.max(1, this.player.max_hp - it.max_hp_bonus);
			this.player.hp = Math.min(this.player.max_hp, this.player.hp);
			showMessage(`${t('maxHpBonus')} -${it.max_hp_bonus}`);
		}
		if (it.stamina_bonus) {
			this.player.max_stamina = Math.max(1, this.player.max_stamina - it.stamina_bonus);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina);
			showMessage(`${t('maxStaminaBonus')} -${it.stamina_bonus}`);
		}
		this.updateStatus();
	}		updateStatus() {
			// µ¢┤µû░τÄ⌐σ«╢τïÇµàïσê░σ╖ªσü┤Θ¥óµ¥┐
			const playerStatusEl = document.getElementById('player-status');
			const enemyStatusEl = document.getElementById('enemy-status');
			
			if (playerStatusEl) {
				// Φ¿êτ«ù combo Θí»τñ║µûçσ¡ù∩╝êΦïÑσ£¿µê░Θ¼ÑΣ╕¡∩╝ë
				let comboText = 'τäí';
			if (this.inBattle) {
				const sym = this.consecutivePrimarySymbol || '-';
				const count = this.consecutivePrimaryCount || 0;
				const mult = Math.max(1, count);
				comboText = `${sym} x${count} (x${mult})`;
			}				const playerPct = Math.max(0, Math.min(100, Math.floor((this.player.hp / this.player.max_hp) * 100)));
				
				// Φ¿êτ«ùτ╢ôΘ⌐ùσÇ╝ΘÇ▓σ║ª
				const xpNeeded = this.xpForNext(this.player.level);
				const xpPct = this.player.level >= 99 ? 100 : Math.max(0, Math.min(100, Math.floor((this.player.xp / xpNeeded) * 100)));
				
				// µ¬óµƒÑσÑùΦú¥µòêµ₧£
				const setBonus = this.getActiveSetBonus();
				let setBonusHtml = '';
				if (setBonus) {
					const rarityText = setBonus.rarity === 'rare' ? 'τ▓╛Φë»' : setBonus.rarity === 'epic' ? 'σÅ▓Φ⌐⌐' : '';
					setBonusHtml = `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4px 8px; border-radius: 4px; color: white; font-size: 11px; margin: 4px 0;">ΓÜí ${setBonus.name} (${rarityText})</div>`;
				}
				
				playerStatusEl.innerHTML = `
					<div class="stat-label">${currentLanguage === 'zh-TW' ? 'τÄ⌐σ«╢' : currentLanguage === 'fr' ? 'Joueur' : 'Player'} Lv.${this.player.level}</div>
					<div class="hp-row">${t('hp')}: <span class="hp-text">${this.player.hp}/${this.player.max_hp}</span></div>
					<div class="hp-bar"><div class="hp-inner" style="width:${playerPct}%"></div></div>
					<div class="xp-row">${currentLanguage === 'zh-TW' ? 'τ╢ôΘ⌐ù' : currentLanguage === 'fr' ? 'XP' : 'XP'}: <span class="xp-text">${this.player.xp}/${xpNeeded === Infinity ? 'MAX' : xpNeeded}</span></div>
					<div class="xp-bar"><div class="xp-inner" style="width:${xpPct}%"></div></div>
                    <div class="stats-row">
                    	<div>${t('stamina')}: ${this.player.stamina}/${this.player.max_stamina}</div>
                    	<div>${currentLanguage === 'zh-TW' ? 'Φ¡╖τ¢╛' : currentLanguage === 'fr' ? 'Bouclier' : 'Shield'}: ${this.player.shield}</div>
                    	<div>${currentLanguage === 'zh-TW' ? 'ΦùÑµ░┤' : currentLanguage === 'fr' ? 'Potions' : 'Potions'}: ${this.player.potions}</div>
                    	<div>${currentLanguage === 'zh-TW' ? 'Θçæσ╣ú' : currentLanguage === 'fr' ? 'Or' : 'Gold'}: ${this.player.gold}</div>
                    	<div>${currentLanguage === 'zh-TW' ? 'σ╣╕Θüï(µê░)' : currentLanguage === 'fr' ? 'Chance(C)' : 'Luck(C)'}: ${this.player.luck_combat}</div>
                    	<div>${currentLanguage === 'zh-TW' ? 'σ╣╕Θüï(Θçæ)' : currentLanguage === 'fr' ? 'Chance(O)' : 'Luck(G)'}: ${this.player.luck_gold}</div>
                	</div>
					${setBonusHtml}
					<div class="combo-row ${ (this.inBattle && (this.consecutivePrimaryCount||0) > 1) ? 'combo-active' : '' }">Combo: ${comboText}</div>
					<div class="equip-row">
						<div>${currentLanguage === 'zh-TW' ? 'µ¡ªσÖ¿' : currentLanguage === 'fr' ? 'Arme' : 'Weapon'}: ${this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : (currentLanguage === 'zh-TW' ? 'τäí' : currentLanguage === 'fr' ? 'Aucun' : 'None')} <button class="open-equip-btn" data-slot="weapon">${currentLanguage === 'zh-TW' ? 'Φú¥σéÖ' : currentLanguage === 'fr' ? '├ëquiper' : 'Equip'}</button> <button class="unequip-btn" data-slot="weapon">${currentLanguage === 'zh-TW' ? 'σì╕Σ╕ï' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button></div>
						<div>${currentLanguage === 'zh-TW' ? 'Θÿ▓σà╖' : currentLanguage === 'fr' ? 'Armure' : 'Armor'}: ${this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : (currentLanguage === 'zh-TW' ? 'τäí' : currentLanguage === 'fr' ? 'Aucun' : 'None')} <button class="open-equip-btn" data-slot="armor">${currentLanguage === 'zh-TW' ? 'Φú¥σéÖ' : currentLanguage === 'fr' ? '├ëquiper' : 'Equip'}</button> <button class="unequip-btn" data-slot="armor">${currentLanguage === 'zh-TW' ? 'σì╕Σ╕ï' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button></div>
						<div>${currentLanguage === 'zh-TW' ? 'Φ¡╖τ¼ª' : currentLanguage === 'fr' ? 'Amulette' : 'Amulet'}: ${this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : (currentLanguage === 'zh-TW' ? 'τäí' : currentLanguage === 'fr' ? 'Aucun' : 'None')} <button class="open-equip-btn" data-slot="amulet">${currentLanguage === 'zh-TW' ? 'Φú¥σéÖ' : currentLanguage === 'fr' ? '├ëquiper' : 'Equip'}</button> <button class="unequip-btn" data-slot="amulet">${currentLanguage === 'zh-TW' ? 'σì╕Σ╕ï' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button></div>
					</div>
				`;
			}
			
			// µ¢┤µû░µò╡Σ║║τïÇµàïσê░σÅ│σü┤Θ¥óµ¥┐
			if (enemyStatusEl) {
				const enemyPct = this.enemy && this.enemy.max_hp ? Math.max(0, Math.min(100, Math.floor((this.enemy.hp / this.enemy.max_hp) * 100))) : 0;
				const enemyLabel = currentLanguage === 'zh-TW' ? 'µò╡Σ║║' : currentLanguage === 'fr' ? 'Ennemi' : 'Enemy';
				const noneLabel = currentLanguage === 'zh-TW' ? 'τäí' : currentLanguage === 'fr' ? 'Aucun' : 'None';
				const attackCountdown = currentLanguage === 'zh-TW' ? 'µÖ«µö╗σÇÆµò╕' : currentLanguage === 'fr' ? 'Attaque dans' : 'Attack in';
				const strength = currentLanguage === 'zh-TW' ? 'σ╝╖σ║ª' : currentLanguage === 'fr' ? 'Force' : 'Strength';
				
				// µá╣µôÜµò╡Σ║║Θí₧σ₧ïΘü╕µôçσ░ìµçëσ£ûτëç
				let enemyImage = '';
				if (this.inBattle && this.enemy.type) {
					if (this.enemy.type === 'monster') {
						enemyImage = '<div style="text-align: center; margin-top: 10px;"><img src="m1.png" alt="µÖ«ΘÇÜµò╡Σ║║" style="width: 150px; opacity: 0.9; mix-blend-mode: multiply;"></div>';
					} else if (this.enemy.type === 'elite') {
						enemyImage = '<div style="text-align: center; margin-top: 10px;"><img src="m3.png" alt="ΦÅüΦï▒µò╡Σ║║" style="width: 150px; opacity: 0.9; mix-blend-mode: multiply;"></div>';
					} else if (this.enemy.type === 'mini_boss') {
						enemyImage = '<div style="text-align: center; margin-top: 10px;"><img src="m4.png" alt="σ░ÅΘá¡τ¢«" style="width: 150px; opacity: 0.9; mix-blend-mode: multiply;"></div>';
					}
				}
				
				enemyStatusEl.innerHTML = `
					<div class="stat-label">${enemyLabel}</div>
					${this.inBattle ? `
						<div class="hp-row">${this.enemy.name || enemyLabel}  ${t('hp')}: <span class="hp-text">${this.enemy.hp}/${this.enemy.max_hp}</span></div>
						<div class="hp-bar"><div class="hp-inner enemy-hp" style="width:${enemyPct}%"></div></div>
						${enemyImage}
						<div class="stats-row"><div>${attackCountdown}: ${this.enemy.turnsToAttack}</div><div>${strength}: x${(this.enemy.strength||1).toFixed(2)}</div></div>
					` : `
						<div class="hp-row">${noneLabel}</div>
						<div class="hp-bar"><div class="hp-inner enemy-hp" style="width:0%"></div></div>
					`}
				`;
			}
			// σÉîµ¡Ñµ¢┤µû░σü┤ΘéèτÜäτ░íτƒ¡τïÇµàïµæÿΦªü∩╝êΣ╜£τé║σéÖµÅ┤Θí»τñ║∩╝ë
				const summary = document.getElementById('status-summary');
				if (summary) {
					summary.textContent = `HP:${this.player.hp}/${this.player.max_hp}  Θ½öσè¢:${this.player.stamina}/${this.player.max_stamina}  Θçæσ╣ú:${this.player.gold}  σ╣╕Θüï(µê░Θ¼Ñ):${this.player.luck_combat} Θçæσ╣úσ╣╕Θüï:${this.player.luck_gold}`;
				}
			// τ╢üσ«ÜτïÇµàïΘ¥óµ¥┐Σ╕èτÜäΦú¥σéÖµîëΘêò∩╝êµ»Åµ¼íµ¢┤µû░Θâ╜Θçìµû░τ╢üσ«Ü∩╝ë
			setTimeout(()=>{
				Array.from(document.querySelectorAll('.unequip-btn')).forEach(b=>{ b.addEventListener('click', ()=>{ const slot = b.getAttribute('data-slot'); this.unequipItem(slot); }); });
				Array.from(document.querySelectorAll('.open-equip-btn')).forEach(b=>{ b.addEventListener('click', ()=>{ const slot = b.getAttribute('data-slot'); this.showEquipmentPanel(slot); }); });
		}, 10);
		const mapEl = document.getElementById('map-steps');
		if (mapEl) {
			if (this.inPyramid) {
				mapEl.textContent = `≡ƒö║ ${this.pyramidSteps}/${this.pyramidMaxSteps}`;
			} else {
				mapEl.textContent = Math.max(0, this.map_goal - this.map_steps);
			}
		}
	}
	
	// τöƒµêÉµû╣σÉæµÅÉτñ║∩╝êσñÜµö»τ╖Üτëêµ£¼∩╝ë
	generateDirectionHints() {
		// τé║µ»ÅσÇïµû╣σÉæΘáÉσàêµ▒║σ«ÜΣ║ïΣ╗╢σÆîσÅ»Φâ╜τÜäµö»τ╖Ü
		const directions = {
			'σëì': this.generateBranchPath(),
			'σ╖ª': this.generateBranchPath(),
			'σÅ│': this.generateBranchPath()
		};
		
		// Θçæσ¡ùσíöσë»µ£¼σ£¿σëì10µ¡ÑΣ╕ìσç║τÅ╛
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
		
		// σä▓σ¡ÿτò╢σëìµû╣σÉæΣ║ïΣ╗╢µÿáσ░ä
		this.currentDirections = directions;
		
		// τöƒµêÉµÅÉτñ║µûçσ¡ù∩╝êΣ╜┐τö¿σñÜΦ¬₧Φ¿Ç∩╝ë
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
			'empty': [t('hintCalm'), t('hintNothing'), t('hintOnlyDesert'), t('hintPeaceful'), t('hintSilent')]
		};
		
		const directionTexts = {
			'σëì': t('dirFront'),
			'σ╖ª': t('dirLeft'),
			'σÅ│': t('dirRight')
		};
		
		let message = this.inPyramid 
			? `${t('pyramidPassage')}\n` 
			: `${t('desertJourney')}\n`;
		
		Object.keys(directions).forEach(dir => {
			const eventPath = directions[dir];
			const event = eventPath.main;
			const hintPool = hints[event] || hints['empty'];
			const hint = hintPool[Math.floor(Math.random() * hintPool.length)];
			
			// σªéµ₧£µ£ëµö»τ╖Ü∩╝îµ╖╗σèáΘíìσñûµÅÉτñ║
			let branchHint = '';
			if (eventPath.branches && eventPath.branches.length > 0) {
				branchHint = ' Γ£¿';
				if (eventPath.branches.length > 1) branchHint = ' Γ¡É';
			}
			
			// µá╣µôÜΦ¬₧Φ¿ÇΦ¬┐µò┤µá╝σ╝Å
			if (currentLanguage === 'zh-TW') {
				message += `${directionTexts[dir]} ${hint}${branchHint}πÇé\n`;
			} else {
				// Φï▒µûçσÆîµ│òµûç∩╝Üµû╣σÉæΦ⌐₧Θªûσ¡ùµ»ìσñºσ»½∩╝îµÅÉτñ║σ╖▓σîàσÉ½σ«îµò┤σÅÑσ¡É
				message += `${directionTexts[dir]} ${hint}${branchHint}.\n`;
			}
		});
		
		message += `\n${t('chooseDirection')}`;
		showMessage(message);
	}
	
	// τöƒµêÉµö»τ╖ÜΦ╖»σ╛æ∩╝êσîàσÉ½Σ╕╗Σ║ïΣ╗╢σÆîσÅ»Φâ╜τÜäσêåµö»∩╝ë
	generateBranchPath() {
		const mainEvent = this.inPyramid ? this.choosePyramidEvent() : chooseEvent();
		const branches = [];
		
		// 30%µ⌐ƒτÄçΦº╕τÖ╝µö»τ╖Ü
		if (Math.random() < 0.3) {
			const branchType = this.chooseBranchType(mainEvent);
			branches.push(branchType);
		}
		
		// 10%µ⌐ƒτÄçΦº╕τÖ╝Θ¢ÖΘçìµö»τ╖Ü
		if (Math.random() < 0.1 && branches.length > 0) {
			const secondBranch = this.chooseBranchType(mainEvent);
			if (secondBranch !== branches[0]) {
				branches.push(secondBranch);
			}
		}
		
		return { main: mainEvent, branches: branches };
	}
	
	// µá╣µôÜΣ╕╗Σ║ïΣ╗╢Θü╕µôçσÉêΘü⌐τÜäµö»τ╖ÜΘí₧σ₧ï
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
	}
	
	moveStep(direction) {
		// σªéµ₧£µ▓Æµ£ëΘáÉΦ¿¡µû╣σÉæµÅÉτñ║∩╝îτöƒµêÉµû░τÜä
		if (!this.currentDirections) {
			this.generateDirectionHints();
			return; // τ¡ëσ╛àτÄ⌐σ«╢Θü╕µôç
		}
		
		// µá╣µôÜΘü╕µôçτÜäµû╣σÉæτì▓σÅûσ░ìµçëΣ║ïΣ╗╢Φ╖»σ╛æ
		const eventPath = this.currentDirections[direction];
		
		if (this.inPyramid) {
			// Θçæσ¡ùσíöσë»µ£¼µ¿íσ╝Å
			this.pyramidSteps += 1;
			showMessage(`${t('youChose')} ${direction} ${t('direction')}≡ƒö║ ${t('pyramidExploration')}: ${this.pyramidSteps}/${this.pyramidMaxSteps} ${t('steps')}`);
		} else {
			// µ¡úσ╕╕σ£░σ£ûµ¿íσ╝Å
			this.map_steps += 1;
			showMessage(`${t('youChose')} ${direction} ${t('direction')}${t('movedSteps')} ${this.map_steps}/${this.map_goal} ${t('steps')}`);
		}
		
		// µ╕àΘÖñτò╢σëìµû╣σÉæµÿáσ░ä
		this.currentDirections = null;
		
		// ΦÖòτÉåΣ╕╗Σ║ïΣ╗╢
		this.handleEvent(eventPath.main);
		
		// ΦÖòτÉåµö»τ╖ÜΣ║ïΣ╗╢
		if (eventPath.branches && eventPath.branches.length > 0) {
			this.handleBranchEvents(eventPath.branches);
		}
			
			// µ¬óµƒÑµÿ»σÉªσ«îµêÉΘçæσ¡ùσíöµêûµ¡úσ╕╕σ£░σ£û
			if (this.inPyramid && this.pyramidSteps >= this.pyramidMaxSteps) {
				this.exitPyramid();
			} else if (!this.inPyramid && this.map_steps >= this.map_goal) {
				this.nextMap();
			}
			
			this.updateStatus();
			
			// σªéµ₧£Σ╕ìµÿ»µê░Θ¼ÑΣ║ïΣ╗╢Σ╕öΣ╕ìσ£¿σòåσ║ùΣ╕¡∩╝îτ½ïσì│τöƒµêÉΣ╕ïΣ╕Çτ╡äµû╣σÉæµÅÉτñ║
			if (!this.inBattle && !this.inShop) {
				this.generateDirectionHints();
			}
		}

		// ΦÖòτÉåµö»τ╖ÜΣ║ïΣ╗╢
		handleBranchEvents(branches) {
			branches.forEach(branch => {
				switch(branch) {
					case 'ambush':
						showMessage(t('branchAmbush'));
						if (!this.inBattle) this.battle('monster');
						break;
					case 'treasure_drop':
						showMessage(t('branchTreasureDrop'));
						this.gainGold(Math.floor(50 * this.difficulty * (1 + Math.random())));
						break;
					case 'ally_join':
						showMessage(t('branchAllyJoin'));
						this.tempAllyBonus = 0.2;
						break;
					case 'escape_route':
						showMessage(t('branchEscapeRoute'));
						this.canEscape = true;
						break;
					case 'epic_loot':
						showMessage(t('branchEpicLoot'));
						const epicItem = generateItem('epic', this.difficulty);
						this.inventory.push(epicItem);
						break;
					case 'curse':
						showMessage(t('branchCurse'));
						this.max_hp = Math.floor(this.max_hp * 0.9);
						this.hp = Math.min(this.hp, this.max_hp);
						break;
					case 'power_surge':
						showMessage(t('branchPowerSurge'));
						this.powerSurge = 3;
						break;
					case 'boss_insight':
						showMessage(t('branchBossInsight'));
						this.bossInsight = true;
						break;
					case 'legendary_loot':
						showMessage(t('branchLegendaryLoot'));
						const legendItem = generateItem('epic', this.difficulty + 2);
						this.inventory.push(legendItem);
						this.gainGold(200 * this.difficulty);
						break;
					case 'god_blessing':
						showMessage(t('branchGodBlessing'));
						this.godBlessing = true;
						this.calculateStats();
						break;
					case 'ancient_power':
						showMessage(t('branchAncientPower'));
						this.base_atk += 5;
						break;
					case 'hidden_passage':
						showMessage(t('branchHiddenPassage'));
						if (this.inPyramid) this.pyramidSteps += 3;
						else this.map_steps += 3;
						break;
					case 'discount':
						showMessage(t('branchDiscount'));
						this.merchantDiscount = 0.8;
						break;
					case 'rare_item':
						showMessage(t('branchRareItem'));
						// σòåΣ║║Σ║ïΣ╗╢µ£âΘí»τñ║Θíìσñûτ¿Çµ£ëτë⌐σôü
						break;
					case 'healing_spring':
						showMessage(t('branchHealingSpring'));
						this.hp = this.max_hp;
						break;
					case 'hidden_treasure':
						showMessage(t('branchHiddenTreasure'));
						this.gainGold(100 * this.difficulty);
						const treasure = generateItem('rare', this.difficulty);
						this.inventory.push(treasure);
						break;
					case 'desert_guide':
						showMessage(t('branchDesertGuide'));
						this.hasGuide = 5;
						break;
					case 'oasis_blessing':
						showMessage(t('branchOasisBlessing'));
						this.oasisBlessing = true;
						break;
					case 'secret_chamber':
						showMessage(t('branchSecretChamber'));
						this.gainGold(300 * this.difficulty);
						break;
					case 'divine_trial':
						showMessage(t('branchDivineTrial'));
						this.divineTrial = true;
						break;
					case 'double_loot':
						showMessage(t('branchDoubleLoot'));
						this.gainGold(200 * this.difficulty);
						break;
					case 'curse_item':
						showMessage(t('branchCurseItem'));
						const cursedItem = generateItem('epic', this.difficulty);
						cursedItem.name = 'Φ⌐¢σÆÆτÜä' + cursedItem.name;
						cursedItem.cursed = true;
						this.inventory.push(cursedItem);
						break;
					case 'revenge_quest':
						showMessage(t('branchRevengeQuest'));
						this.revengeQuest = true;
						break;
					case 'quicksand':
						showMessage(t('branchQuicksand'));
						this.gold = Math.max(0, this.gold - 50 * this.difficulty);
						break;
					default:
						showMessage(`${t('branchSpecialEvent')}: ${branch}`);
				}
			});
		}

		choosePyramidEvent() {
			// Θçæσ¡ùσíöσàºΣ║ïΣ╗╢∩╝Üµ¢┤Θ½ÿτÜäµÇ¬τë⌐Θü¡ΘüçτÄç
			const pyramidEvents = ['monster', 'elite', 'mini_boss', 'oasis', 'empty'];
			const pyramidWeights = [35, 25, 15, 10, 15]; // 75% µê░Θ¼ÑτÄç
			const total = pyramidWeights.reduce((a,b)=>a+b,0);
			let r = Math.random() * total;
			for (let i=0,acc=0;i<pyramidWeights.length;i++){
				acc += pyramidWeights[i];
				if (r < acc) return pyramidEvents[i];
			}
			return 'monster';
		}

		nextMap() {
			showMessage(t('desertCleared'));
			this.map_steps = 0;
			this.difficulty += 1;
			this.map_goal += 5;
			this.updateStatus();
		}

		handleEvent(event) {
			if (event === 'monster' || event === 'elite' || event === 'mini_boss') {
				this.battle(event);
			} else if (event === 'merchant') {
				this.merchant();
			} else if (event === 'black_market') {
				this.blackMarket();
			} else if (event === 'oasis') {
				this.oasis();
			} else if (event === 'sandstorm') {
				this.sandstorm();
			} else if (event === 'egyptian_god') {
				this.godEvent();
			} else if (event === 'pyramid') {
				this.pyramid();
			} else if (event === 'buried_treasure') {
				this.buriedTreasure();
			} else if (event === 'dead_traveler') {
				this.deadTraveler();
			} else if (event === 'ancient_shrine') {
				this.ancientShrine();
			} else if (event === 'caravan_rest') {
				this.caravanRest();
			} else if (event === 'mirage') {
				this.mirage();
			} else if (event === 'nomad_camp') {
				this.nomadCamp();
			} else if (event === 'quicksand') {
				this.quicksand();
			} else if (event === 'scorpion_nest') {
				this.scorpionNest();
			} else if (event === 'ancient_ruins') {
				this.ancientRuins();
			} else if (event === 'mysterious_stranger') {
				this.mysteriousStranger();
			} else if (event === 'trading_post') {
				this.tradingPost();
			} else if (event === 'empty') {
				this.emptyEvent();
			} else {
				showMessage(t('nothingHappened'));
			}
		}

		battle(type) {
			// ΘÇ▓σàÑµê░Θ¼ÑµÖéσ╝╖σê╢σü£µ¡óΦç¬σïòµùïΦ╜ëΦêçτªüτö¿ auto µîëΘêò
			try { stopAutoSpinLoop(); } catch(e) {}
			showMessage(`${t('encounterEnemy')} ${type}∩╝î${t('enterBattle')}`);
			// Φ¿¡σ«Üµê░Θ¼ÑτïÇµàïΦêçµò╡Σ║║σ▒¼µÇº
			this.inBattle = true;
			// σä▓σ¡ÿµò╡Σ║║Θí₧σ₧ï∩╝êτö¿µû╝Θí»τñ║σ░ìµçëσ£ûτëç∩╝ë
			this.enemy.type = type;
			// τöóτöƒµò╡Σ║║σÉìτ¿▒
			this.enemy.name = genEnemyName(type);
			showMessage(`${t('encounterEnemyName')}${this.enemy.name}`);
			// µê░Θ¼ÑΘûïσºïµÖéσü£τö¿τº╗σïòµîëΘêò
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			// µá╣µôÜΘí₧σ₧ïΦ¬┐µò┤µò╡Σ║║ΦíÇΘçÅΦêçµÖ«µö╗σè¢
			// Θçæσ¡ùσíöσàºµò╡Σ║║ΘÜ¿σ£░σ£ûΘ¢úσ║ªσó₧σ╝╖∩╝ÜHP x(3+Θ¢úσ║ª*0.5), ATK x(2.5+Θ¢úσ║ª*0.3), σ╝╖σ║ªx(1.5+Θ¢úσ║ª*0.2)
			let hpMultiplier = this.inPyramid ? (3.0 + this.difficulty * 0.5) : 2.0;
			let atkMultiplier = this.inPyramid ? (2.5 + this.difficulty * 0.3) : 1.0;
			let strengthBonus = this.inPyramid ? (1.5 + this.difficulty * 0.2) : 1.0;
			
		if (type === 'elite') {
			this.enemy.max_hp = Math.floor((150 + 20 * this.difficulty) * hpMultiplier);
			this.enemy.baseAttack = Math.floor((15 + 5 * this.difficulty) * atkMultiplier);
			this.enemy.strength = 1.6 * strengthBonus;
		} else if (type === 'mini_boss') {
			// Θçæσ¡ùσíöσ░ÅΘá¡τ¢«Θ¢úσ║ªΘÖìΣ╜Ä20%
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
		}			if (this.inPyramid) {
				this.enemy.name += ` (Θçæσ¡ùσíö-σ£░σ£û${this.difficulty})`;
				showMessage(`${t('pyramidEnemyStrong')}${hpMultiplier.toFixed(1)}πÇü${t('attackX')}${atkMultiplier.toFixed(1)}πÇü${t('strengthX')}${strengthBonus.toFixed(1)}`);
			}
			this.enemy.hp = this.enemy.max_hp;
		this.enemy.turnsToAttack = 3;
		this.consecutivePrimarySymbol = null;
		this.consecutivePrimaryCount = 0;
		this.updateStatus();
		// µê░Θ¼ÑΘûïσºïµÖéσòƒτö¿µùïΦ╜ëµîëΘêòσÆîΦç¬σïòµùïΦ╜ëµîëΘêò
		spinBtn.disabled = false;
		const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = false;
		// Φç¬σïòσòƒσïòµÅÆµº╜Σ╕ªσ£¿τƒ¡σ╗╢Θü▓σ╛îσü£µ¡ó∩╝êµ¿íµô¼Φç¬σïòµê░Θ¼Ñ∩╝ë
		startSpin();
		setTimeout(()=> stopSequentially(), 900);
	}		attemptFlee() {
			if (!this.inBattle) { showMessage('τ¢«σëìΣ╕ìσ£¿µê░Θ¼ÑΣ╕¡πÇé'); return; }
			// σÅûµ╢êΦç¬σïòµùïΦ╜ë
			stopAutoSpinLoop();
			const fleeChance = Math.min(0.9, 0.4 + 0.02 * this.player.luck_combat);
			if (Math.random() < fleeChance) {
				showMessage('Σ╜áµêÉσèƒΘÇâΘ¢óµê░Θ¼Ñ∩╝ü');
				this.inBattle = false;
				spinBtn.disabled = true;
				stopBtn.disabled = true;
				// σü£µ¡óΦç¬σïòµùïΦ╜ëΣ╕ªτªüτö¿Φç¬σïòµùïΦ╜ëµîëΘêò
				try { stopAutoSpinLoop(); } catch(e) {}
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
				this.enemy.hp = 0;
				this.updateStatus();
			} else {
				showMessage('ΘÇâΦ╖æσñ▒µòù∩╝üµò╡Σ║║τì▓σ╛ùΣ╕Çµ¼íµö╗µôèµ⌐ƒµ£â∩╝ü');
				setTimeout(()=>{ if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack(); }, 300);
			}
		}

		// µò╡Σ║║Φç¬σïòµÖ«µö╗
		enemyAutoAttack() {
			// Φ¿êτ«ùσƒ║µ£¼µö╗µôèΣ╕ªΘÖìΣ╜Äσƒ║τñÄσé╖σ«│∩╝êΦ╝âΘü⌐σÉêµû░µëï∩╝ë
			const raw = this.enemy.baseAttack; // baseAttack σ╖▓Σ╛¥Θ¢úσ║ªΦ¬┐µò┤
			// ΦïÑτÄ⌐σ«╢ΘÇúτ║îτ¢╕σÉîτ¼ªΦÖƒµ¼íµò╕Φ╝âσñÜ∩╝îµò╡Σ║║µ£âτòÑσ╛«µÅÉσìçσ¢₧µôè∩╝êΘó¿ΘÜ¬∩╝ë∩╝îΦ¬┐µò┤τé║τ╖ÜµÇºσÇìτÄç
			const extra = Math.max(0, this.consecutivePrimaryCount - 1) * 0.3; // µ»ÅΘÇúµôèσèá30%σ¢₧µôè
			let dmg = Math.floor(raw * (1 + extra));
			// τÄ⌐σ«╢µ£ëΘûâΘü┐µ⌐ƒµ£â∩╝êτö▒σ╣╕ΘüïσÇ╝σÆîΦ¡╖τö▓µÅÉΣ╛¢Φó½σïòΘûâΘü┐∩╝ë
			const armorDodge = this.player.equipment.armor ? (this.player.equipment.armor.dodge_rate || 0) : 0;
			const dodgeChance = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodge / 100); // µ£ÇσñÜ 50% ΘûâΘü┐
			if (Math.random() < dodgeChance) {
				showMessage(`Σ╜áΘûâΘü┐Σ║åµò╡Σ║║τÜäΦç¬σïòµÖ«µö╗∩╝ü(µê░Θ¼Ñσ╣╕Θüï ${this.player.luck_combat})`);
				if (this.player.luck_combat && this.player.luck_combat > 0) {
					this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
					showMessage(`戰鬥幸運 -1（剩餘 ${this.player.luck_combat}）。`);
				}
			} else {
				const consumedShield = Math.min(this.player.shield, dmg);
				const mitigated = Math.max(0, dmg - this.player.shield);
				this.player.shield -= consumedShield;
				this.player.hp -= mitigated;
				showMessage(`µò╡Σ║║Φç¬σïòµÖ«µö╗∩╝îΘÇáµêÉ ${dmg} σé╖σ«│∩╝êΦ¡╖τ¢╛σÉ╕µö╢ ${consumedShield}∩╝ë∩╝îτÄ⌐σ«╢ HP -${mitigated}πÇé`);
			}
			// Θçìτ╜«µö╗µôèσÇÆµò╕
			this.enemy.turnsToAttack = 3;
			this.updateStatus();
		}

		merchant() {
			showMessage('Θüçσê░σòåΘÜè∩╝ÜΦïÑΦ│çΘçæΦ╢│σñáσÅ»Φú£τ╡ªΦùÑµ░┤∩╝ê50Θçæ/τô╢∩╝ëπÇé');
			if (this.player.gold >= 50) {
				this.player.gold -= 50;
				this.player.potions += 1;
				showMessage('Φú£τ╡ªµêÉσèƒ∩╝îΦùÑµ░┤+1');
			} else {
				showMessage('Θçæσ╣úΣ╕ìΦ╢│∩╝îτäíµ│òΦ│╝Φ▓╖Φú£τ╡ªπÇé');
			}
		}

		blackMarket() {
			// Θ╗æσ╕éσòåΣ║║∩╝ÜσÅ»Φ│╝Φ▓╖Φú¥σéÖ∩╝êµÖ«ΘÇÜσê░σÅ▓Φ⌐⌐∩╝ë∩╝îσ▒¼µû╝Φ│¡σìÜΣ║ñµÿô∩╝îµ£ÇσñÜΦ│╝Φ▓╖σà⌐Σ╗╢
			this.inShop = true; // µ¿ÖΦ¿ÿτÄ⌐σ«╢ΘÇ▓σàÑσòåσ║ù
			showMessage('Θüçσê░Θ╗æσ╕éσòåΣ║║∩╝ÜΦâ╜σ£¿Θ╗æσ╕éΣ╕¡τì▓σ╛ùµÖ«ΘÇÜσê░σÅ▓Φ⌐⌐τ┤ÜΦú¥σéÖ∩╝îµ¡ñτé║Φ│¡σìÜΣ║ñµÿô∩╝îµ£ÇσñÜΦ│╝Φ▓╖σà⌐Σ╗╢πÇé');
			const panel = document.getElementById('blackmarket-panel');
			const itemsDiv = document.getElementById('blackmarket-items');
			if (!panel || !itemsDiv) {
				showMessage('∩╝êτ│╗τ╡▒Θî»Φ¬ñ∩╝ÜΘ╗æσ╕éΣ╗ïΘ¥óµ£¬Φ╝ëσàÑ∩╝ë');
				return;
			}
			// τöóτöƒ 3 σÇïΘÜ¿µ⌐ƒΣ╛¢σôü∩╝êτö▒µÖ«ΘÇÜσê░σÅ▓Φ⌐⌐∩╝ë
			const rarityWeights = [{r:'common',w:40},{r:'rare',w:30},{r:'excellent',w:20},{r:'epic',w:8},{r:'legendary',w:2}];
			function pickRarity(){
				let total = rarityWeights.reduce((s,i)=>s+i.w,0);
				let r = Math.random()*total; let acc=0;
				for (const rw of rarityWeights){ acc+=rw.w; if (r<acc) return rw.r; }
				return 'common';
			}
			function cloneItem(base, rarity, isPyramid = false){
				const it = Object.assign({}, base);
				it.rarity = rarity;
				// Φ¬┐µò┤σ▒¼µÇºσ╣àσ║ª∩╝Ürare +~1.5, epic +~2.2
					const _scale = rarity === 'rare' ? 1.8 : (rarity === 'excellent' ? 1.5 : (rarity === 'epic' ? 2.2 : (rarity === 'legendary' ? 3.0 : 1)));
					if (it.atk) it.atk = Math.max(1, Math.round(it.atk * _scale));
					if (it.def) it.def = Math.max(1, Math.round(it.def * _scale));
					if (it.luck_gold) it.luck_gold = Math.max(1, Math.round(it.luck_gold * _scale));
					if (it.luck_combat) it.luck_combat = Math.max(1, Math.round(it.luck_combat * _scale));
					if (it.max_hp_bonus) it.max_hp_bonus = Math.max(1, Math.round(it.max_hp_bonus * _scale));
				
				// µá╣µôÜσôüΦ│¬µ╖╗σèáΘíìσñûσ▒¼µÇº（依稀有度抽多個不重複加成）
				const bonusCountByRarity = { common: 0, rare: 2, excellent: 1, epic: 3, legendary: 4 };
				const bonusCount = bonusCountByRarity[rarity] || 0;
				if (bonusCount > 0 && QUALITY_BONUS[it.slot] && QUALITY_BONUS[it.slot][rarity]) {
					const pool = QUALITY_BONUS[it.slot][rarity].slice();
					for (let n = 0; n < bonusCount && pool.length > 0; n++) {
						const idx = Math.floor(Math.random() * pool.length);
						const bonus = pool.splice(idx, 1)[0];
						Object.assign(it, bonus);
					}
				}
				
				// Θçæσ¡ùσíöΦú¥σéÖµ╖╗σèáσ¡ùτ╢┤
				if (isPyramid && rarity !== 'common') {
					const affix = PYRAMID_AFFIXES[Math.floor(Math.random() * PYRAMID_AFFIXES.length)];
					it.affix = affix.id;
					it.affixName = affix.name;
					it.affixColor = affix.color;
					// µ╖╗σèáσ¡ùτ╢┤σ▒¼µÇºσèáµêÉ
					for (const key in affix.bonus) {
						if (it[key]) {
							it[key] += affix.bonus[key];
						} else {
							it[key] = affix.bonus[key];
						}
					}
					it.isPyramid = true;
				}
				return it;
			}
			const offers = [];
			for (let i=0;i<3;i++){
				const base = ITEMS[Math.floor(Math.random()*ITEMS.length)];
				const r = pickRarity();
				const o = cloneItem(base, r);
				// ΘÜ¿µ⌐ƒσîûσâ╣µá╝∩╝Üσ«îσà¿ΘÜ¿µ⌐ƒ∩╝îΣ╕ìΘÇÅΘ£▓σôüΦ│¬
				o.price = 149 + Math.floor(Math.random() * 880); // 149..1028 ΘÜ¿µ⌐ƒΘçæΘíì
				offers.push(o);
			}
			// Θí»τñ║Θ¥óµ¥┐
			itemsDiv.innerHTML = '';
			panel._purchased = 0;
			offers.forEach((it, idx)=>{
				const el = document.createElement('div');
				// Θ╗æσ╕éσòåσôü∩╝ÜΣ╕ìΘí»τñ║σôüΦ│¬∩╝îσÅ¬Θí»τñ║σÉìτ¿▒σÆîΘÜ¿µ⌐ƒσâ╣µá╝
				const goldText = currentLanguage === 'zh-TW' ? 'Θçæσ╣ú' : currentLanguage === 'fr' ? 'd\'or' : 'gold';
				el.innerHTML = `<div style="margin-bottom:6px;"><strong>${it.name}</strong> (?) <br/>`+
					`${t('price')}: ${it.price} ${goldText} <button class="bm-buy" data-idx="${idx}">${t('buy')}</button></div>`;
				itemsDiv.appendChild(el);
			});
			panel.style.display = 'block';
			// τ╢üσ«ÜΦ│╝Φ▓╖
			Array.from(itemsDiv.querySelectorAll('.bm-buy')).forEach(b=>{
				b.addEventListener('click', (e)=>{
					const idx = parseInt(e.target.getAttribute('data-idx'));
					if (panel._purchased >= 2) { showMessage(t('blackMarketLimit')); return; }
					const offer = offers[idx];
					if (!offer) return;
					if (game.player.gold < offer.price) { showMessage(t('notEnoughGold')); return; }
					// µëúµ¼╛Σ╕ªσèáσàÑΦâîσîà
					game.player.gold -= offer.price;
					// σ░çτ£ƒσ»ªτë⌐Σ╗╢σèáσàÑΦâîσîà∩╝îΣ╕ªµÅ¡Θ£▓σà╢σ▒¼µÇºτ╡ªτÄ⌐σ«╢τƒÑµ¢ë
					game.player.inventory.push(Object.assign({}, offer));
					const goldText = currentLanguage === 'zh-TW' ? 'Θçæσ╣ú' : currentLanguage === 'fr' ? 'd\'or' : 'gold';
					showMessage(`${t('blackMarketBought')}: ${offer.name} (${offer.rarity}), ${t('spent')} ${offer.price} ${goldText}.`);
					// µÅ¡Θ£▓σ▒¼µÇº
					let attrs = [];
					const atkLabel = currentLanguage === 'zh-TW' ? 'µö╗' : currentLanguage === 'fr' ? 'ATT' : 'ATK';
					const defLabel = currentLanguage === 'zh-TW' ? 'Θÿ▓' : currentLanguage === 'fr' ? 'D├ëF' : 'DEF';
					const luckLabel = currentLanguage === 'zh-TW' ? 'ΘçæΘüï' : currentLanguage === 'fr' ? 'Chance Or' : 'Gold Luck';
					if (offer.atk) attrs.push(`${atkLabel}+${offer.atk}`);
					if (offer.def) attrs.push(`${defLabel}+${offer.def}`);
					if (offer.luck_gold) attrs.push(`${luckLabel}+${offer.luck_gold}`);
					if (attrs.length === 0) attrs.push(t('noSpecialAttributes'));
					showMessage(`${t('revealAttributes')}: ${attrs.join('  ')}`);
					panel._purchased += 1;
					// µ¿ÖΦ¿ÿµîëΘêòτé║σ╖▓Φ│╝Φ▓╖
					e.target.textContent = t('purchased');
					e.target.disabled = true;
					game.updateStatus();
					if (panel._purchased >= 2) {
						showMessage(`${t('blackMarketLimit')} ${t('blackMarketEnd')}`);
						Array.from(itemsDiv.querySelectorAll('.bm-buy')).forEach(bb=>{ bb.disabled = true; });
					}
				});
			});
			// Θù£ΘûëµîëΘêò
			const close = document.getElementById('close-blackmarket');
			if (close) close.onclick = ()=>{ 
				panel.style.display = 'none'; 
				this.inShop = false; // µ╕àΘÖñσòåσ║ùµ¿ÖΦ¿ÿ
				showMessage(t('leaveBlackMarket')); 
				// µüóσ╛⌐τº╗σïòµîëΘêò
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
				// Θ¢óΘûïΘ╗æσ╕éσ╛îτöƒµêÉµû╣σÉæµÅÉτñ║
				this.generateDirectionHints();
			};
			// σü£τö¿τº╗σïòΣ╗ÑΘü┐σàìσêçµÅ¢µâàσóâ
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			this.updateStatus();
		}

		oasis() {
			showMessage(t('oasisFound'));
			this.player.hp = Math.min(this.player.max_hp, this.player.hp + 20);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 10);
		}

	sandstorm() {
		showMessage(t('sandstormEncounter'));
		this.player.hp = Math.max(0, this.player.hp - 10);
		showMessage(`${t('sandstormDamage')} -10πÇé`);
	}

	buriedTreasure() {
		showMessage(t('buriedTreasureFound'));
		const outcomes = [
			{ type: 'jackpot', weight: 25, name: 'µ╗┐Φ╝ëΘ╗âΘçæ' },
			{ type: 'good', weight: 35, name: 'Σ╕ìΘî»τÜäµö╢τ⌐½' },
			{ type: 'poor', weight: 30, name: 'σ░æΘçÅΘçæσ╣ú' },
			{ type: 'nothing', weight: 10, name: 'τ⌐║τ╜ÉµêûΘó¿σîû' }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}
		
		if (result.type === 'jackpot') {
			const baseGold = 200 + Math.floor(Math.random() * 300);
			const finalGold = Math.floor(baseGold * (1 + 0.15 * this.player.luck_gold));
			this.player.gold += finalGold;
			showMessage(`${t('treasureJackpot')} ${finalGold} ${t('goldCoins')}`);
			if (this.player.luck_gold > 0) {
				showMessage(`${t('goldLuckBonus')} +${Math.floor(baseGold * 0.15 * this.player.luck_gold)}∩╝ë`);
			}
		} else if (result.type === 'good') {
			const baseGold = 80 + Math.floor(Math.random() * 120);
			const finalGold = Math.floor(baseGold * (1 + 0.15 * this.player.luck_gold));
			this.player.gold += finalGold;
			showMessage(`${t('treasureGood')} ${finalGold} ${t('goldCoins')}`);
		} else if (result.type === 'poor') {
			const gold = 20 + Math.floor(Math.random() * 40);
			this.player.gold += gold;
			showMessage(`${t('treasurePoor')} ${gold} ${t('goldCoins')}`);
		} else {
			const rnd = Math.random();
			if (rnd < 0.5) {
				showMessage(t('treasureEmpty'));
			} else {
				showMessage(t('treasureDecayed'));
			}
		}
	}

	deadTraveler() {
		showMessage(t('deadTravelerFound'));
		const outcomes = [
			{ type: 'equipment', weight: 40, name: 'Φú¥σéÖ' },
			{ type: 'gold_and_item', weight: 20, name: 'Θçæσ╣úΦêçτë⌐σôü' },
			{ type: 'gold', weight: 25, name: 'Θçæσ╣ú' },
			{ type: 'nothing', weight: 15, name: 'Σ╕ÇτäíµëÇτì▓' }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}
		
		if (result.type === 'equipment') {
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const rarities = ['common', 'rare', 'excellent', 'epic', 'legendary'];
			const rarityWeights = [70, 20, 6, 3, 1];
			// pick rarity by weights (robust to weight sums)
			let totalW = rarityWeights.reduce((s,w) => s + w, 0);
			let rr = Math.random() * totalW;
			let acc = 0;
			let rarity = 'common';
			for (let i = 0; i < rarities.length; i++) {
				acc += rarityWeights[i];
				if (rr < acc) { rarity = rarities[i]; break; }
			}
			const newItem = Object.assign({}, item, { rarity });
			this.player.inventory.push(newItem);
			showMessage(`ΓÜö∩╕Å Σ╜áσ£¿Θü║Θ½öµùüµë╛σê░Σ║å ${this.formatItem(newItem)}∩╝ü`);
			showMessage('∩╝êσ╖▓σèáσàÑΦâîσîà∩╝ë');
		} else if (result.type === 'gold_and_item') {
			const gold = 50 + Math.floor(Math.random() * 100);
			this.player.gold += gold;
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const newItem = Object.assign({}, item, { rarity: 'common' });
			this.player.inventory.push(newItem);
			showMessage(`≡ƒÆ░ Σ╜áµë╛σê░Σ║å ${gold} Θçæσ╣úσÆî ${newItem.name}∩╝ü`);
		} else if (result.type === 'gold') {
			const gold = 30 + Math.floor(Math.random() * 70);
			this.player.gold += gold;
			showMessage(`≡ƒÆ░ Σ╜áσ£¿Θü║Θ½öµùüµë╛σê░Σ║å ${gold} Θçæσ╣úπÇé`);
		} else {
			const rnd = Math.random();
			if (rnd < 0.4) {
				showMessage('≡ƒòè∩╕Å Σ╜áτé║µùàΣ║║Θ╗ÿσôÇ∩╝îΣ╜åΦ║½Σ╕èσ╖▓τ╢ôµ▓Æµ£ëΣ╗╗Σ╜òµ£ëσâ╣σÇ╝τÜäµ¥▒ΦÑ┐Σ║åπÇé');
			} else if (rnd < 0.7) {
				showMessage('≡ƒÆ¿ Θü║Θ½öσÆîΦú¥σéÖΘâ╜σ╖▓Φó½Θó¿µ▓ÖΣ╛╡Φ¥ò∩╝îτäíµ│òΣ╜┐τö¿πÇé');
			} else {
				showMessage('≡ƒªé Θü║Θ½öσæ¿σ£ìµ£ëµ»ÆΦáìτÜäτùòΦ╖í∩╝îΣ╜áΦ¼╣µàÄσ£░Θ¢óΘûïΣ║å∩╝îΣ╗ÇΘ║╝Σ╣ƒµ▓Æµï┐πÇé');
				const damage = 5;
				this.player.hp = Math.max(1, this.player.hp - damage);
				showMessage(`∩╝êσ░Åσ┐âΘ¢óΘûïµÖéσÅùσê░Φ╝òσé╖ -${damage} HP∩╝ë`);
			}
		}
	}

	emptyEvent() {
		const messages = [
			'Σ╜áτ╣╝τ║îσëìΦíî∩╝îµ▓Æµ£ëΘüçσê░Σ╗╗Σ╜òτë╣σêÑτÜäΣ║ïµâàπÇé',
			'Σ╕ÇΘÖúΘó¿σÉ╣ΘüÄµ▓ÖΣ╕ÿ∩╝îµ▓ÆΣ╗ÇΘ║╝τë╣σêÑτÜäπÇé',
			'Σ╜áσ░Åσ┐âτ┐╝τ┐╝σ£░σëìΘÇ▓∩╝îΘÇÖµ«╡Φ╖»τ¿ïσ╛êσ╣│Θ¥£πÇé',
			'ΘüáΦÖòσé│Σ╛åΘº▒Θº¥τÜäσÅ½Φü▓∩╝îΣ╜åσæ¿σ£ìτ⌐║τäíΣ╕Çτë⌐πÇé',
			'Σ╜áσ£¿µ▓Öσ£░Σ╕èτ£ïσê░Σ╕ÇΣ║¢Φà│σì░∩╝îΣ╜åΣ╕╗Σ║║µù⌐σ╖▓Σ╕ìΦªïΦ╣ñσ╜▒πÇé'
		];
		showMessage(messages[Math.floor(Math.random() * messages.length)]);
	}

	ancientShrine() {
		showMessage('≡ƒ¢ò Σ╜áτÖ╝τÅ╛Σ║åΣ╕Çσ║ºσÅñΦÇüτÜäτÑ₧µ«┐σ╗óσóƒ...');
		const outcomes = [
			{ type: 'blessing', weight: 35 },
			{ type: 'treasure', weight: 25 },
			{ type: 'curse', weight: 20 },
			{ type: 'trap', weight: 20 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'blessing') {
			const blessings = [
				{ type: 'hp', value: 30 },
				{ type: 'stamina', value: 20 },
				{ type: 'luck_combat', value: 2 },
				{ type: 'luck_gold', value: 2 }
			];
			const blessing = blessings[Math.floor(Math.random() * blessings.length)];
			
			if (blessing.type === 'hp') {
				this.player.max_hp += blessing.value;
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + blessing.value);
				showMessage(`Γ£¿ τÑ₧µ«┐τÜäτÑ¥τªÅΘÖìΦç¿∩╝üµ£ÇσñºHP +${blessing.value}`);
			} else if (blessing.type === 'stamina') {
				this.player.max_stamina += blessing.value;
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + blessing.value);
				showMessage(`${t('shrineBlessing')} +${blessing.value}`);
			} else if (blessing.type === 'luck_combat') {
				this.player.luck_combat += blessing.value;
				showMessage(`Γ£¿ τÑ₧µ«┐τÜäτÑ¥τªÅΘÖìΦç¿∩╝üµê░Θ¼Ñσ╣╕Θüï +${blessing.value}`);
			} else if (blessing.type === 'luck_gold') {
				this.player.luck_gold += blessing.value;
				showMessage(`Γ£¿ τÑ₧µ«┐τÜäτÑ¥τªÅΘÖìΦç¿∩╝üΘçæσ╣úσ╣╕Θüï +${blessing.value}`);
			}
		} else if (result.type === 'treasure') {
			const gold = 100 + Math.floor(Math.random() * 200);
			this.player.gold += gold;
			showMessage(`≡ƒÆÄ Σ╜áσ£¿τÑ₧µ«┐Σ╕¡µë╛σê░Σ║åσÅñΦÇüτÜäσ»╢ΦùÅ∩╝üτì▓σ╛ù ${gold} Θçæσ╣úπÇé`);
		} else if (result.type === 'curse') {
			const curses = [
				'Σ╜áΦº╕τó░Σ║åΦ⌐¢σÆÆτÜäΘ¢òσâÅ∩╝îµäƒσê░Φ║½Θ½öΦÖ¢σ╝▒πÇé',
				'τÑ₧µ«┐τÜäΦ⌐¢σÆÆτ║Åτ╣₧ΦæùΣ╜á...',
				'Σ╜áΣ╕ìσ░Åσ┐âµëôµô╛Σ║åΣ║íΘ¥êτÜäσ«ëµü»πÇé'
			];
			showMessage(`ΓÜá∩╕Å ${curses[Math.floor(Math.random() * curses.length)]}`);
			const damage = 15 + Math.floor(Math.random() * 15);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`σÅùσê░Φ⌐¢σÆÆσé╖σ«│ -${damage} HP`);
		} else {
			showMessage('≡ƒÆÑ Σ╜áΦº╕τÖ╝Σ║åσÅñΦÇüτÜäΘÖ╖Θÿ▒∩╝ü');
			const damage = 20 + Math.floor(Math.random() * 20);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`ΘÖ╖Θÿ▒ΘÇáµêÉ ${damage} Θ╗₧σé╖σ«│∩╝ü`);
		}
	}

	caravanRest() {
		showMessage('≡ƒÉ¬ Σ╜áΘüçσê░Σ║åΣ╕Çµö»σòåΘÜèµ¡úσ£¿Σ╝æµü»...');
		const outcomes = [
			{ type: 'trade', weight: 40 },
			{ type: 'gift', weight: 30 },
			{ type: 'info', weight: 20 },
			{ type: 'ambush', weight: 10 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'trade') {
			if (this.player.gold >= 60) {
				const choice = Math.random();
				if (choice < 0.5) {
					this.player.gold -= 60;
					this.player.potions += 2;
					showMessage('≡ƒº¬ Σ╜áσÉæσòåΘÜèΦ│╝Φ▓╖Σ║å2τô╢ΦùÑµ░┤∩╝êΦè▒Φ▓╗60Θçæσ╣ú∩╝ë');
				} else {
					this.player.gold -= 60;
					this.player.hp = this.player.max_hp;
					this.player.stamina = this.player.max_stamina;
					showMessage(t('caravanBuyFood'));
				}
			} else {
				showMessage('σòåΘÜèΘíÿµäÅΣ║ñµÿô∩╝îΣ╜åΣ╜áτÜäΘçæσ╣úΣ╕ìΦ╢│∩╝êΘ£ÇΦªü60Θçæσ╣ú∩╝ëπÇé');
			}
		} else if (result.type === 'gift') {
			const gifts = [
				{ type: 'gold', value: 50 },
				{ type: 'potion', value: 1 },
				{ type: 'food', hp: 30, stamina: 15 }
			];
			const gift = gifts[Math.floor(Math.random() * gifts.length)];
			
			if (gift.type === 'gold') {
				this.player.gold += gift.value;
				showMessage(`≡ƒÆ░ σòåΘÜèΘÜèΘò╖Φ┤êΘÇüΣ╜áΣ╕ÇΣ║¢Θçæσ╣ú∩╝ê+${gift.value}∩╝ëΣ╗Ñτ¡öΦ¼¥Σ╜áτÜäσê░Σ╛åπÇé`);
			} else if (gift.type === 'potion') {
				this.player.potions += gift.value;
				showMessage('≡ƒº¬ σòåΘÜèΦ┤êΘÇüΣ╜áΣ╕Çτô╢ΦùÑµ░┤Σ╗ÑΦí¿σûäµäÅπÇé');
			} else if (gift.type === 'food') {
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + gift.hp);
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + gift.stamina);
				showMessage(`${t('caravanGift')} +${gift.hp}, ${t('stamina')} +${gift.stamina}`);
			}
		} else if (result.type === 'info') {
			const xp = 20 + Math.floor(Math.random() * 30);
			this.addXP(xp);
			showMessage('≡ƒô£ σòåΘÜèσêåΣ║½Σ║åµ▓Öµ╝áΣ╕¡τÜäτöƒσ¡ÿτ╢ôΘ⌐ùσÆîσ£░σ£ûµâàσá▒πÇé');
		} else {
			showMessage('ΓÜö∩╕Å ΘÇÖµÿ»Σ╕Çτ╛ñσü╜Φú¥τÜäτ¢£Φ│è∩╝ü');
			this.battle('monster');
		}
	}

	mirage() {
		showMessage(t('mirageAppear'));
		const outcomes = [
			{ type: 'oasis_real', weight: 25 },
			{ type: 'hallucination', weight: 40 },
			{ type: 'treasure_real', weight: 20 },
			{ type: 'danger', weight: 15 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'oasis_real') {
			showMessage(t('mirageReal'));
			this.player.hp = this.player.max_hp;
			this.player.stamina = this.player.max_stamina;
			const gold = 30 + Math.floor(Math.random() * 50);
			this.player.gold += gold;
			showMessage(`${t('mirageRecovery')} ${gold} ${t('goldCoins')}`);
		} else if (result.type === 'hallucination') {
			showMessage(t('mirageHallucination'));
			const staminaLoss = 10 + Math.floor(Math.random() * 10);
			this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
			showMessage(`${t('staminaLoss')} -${staminaLoss}`);
		} else if (result.type === 'treasure_real') {
			showMessage(t('mirageTreasure'));
			const gold = 80 + Math.floor(Math.random() * 120);
			this.player.gold += gold;
			showMessage(`${t('obtained')} ${gold} ${t('goldCoins')}`);
		} else {
			showMessage(t('mirageDanger'));
			const damage = 15 + Math.floor(Math.random() * 15);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`${t('damageTaken')} -${damage} ${t('hp')}`);
		}
	}

	nomadCamp() {
		showMessage('Γ¢║ Σ╜áΘüçσê░Σ║åΣ╕ÇσÇïΘüèτëºµ░æµùÅτÜäτçƒσ£░...');
		const outcomes = [
			{ type: 'healing', weight: 35 },
			{ type: 'trade_items', weight: 30 },
			{ type: 'quest', weight: 25 },
			{ type: 'hostile', weight: 10 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'healing') {
			showMessage('≡ƒÅò∩╕Å Θüèτëºµ░æτå▒µâàσ£░µÄÑσ╛àΣ║åΣ╜á∩╝îµÅÉΣ╛¢Θúƒτë⌐σÆîΣ╝æµü»πÇé');
			this.player.hp = Math.min(this.player.max_hp, this.player.hp + 40);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 25);
			showMessage('HP +40∩╝îΘ½öσè¢ +25');
		} else if (result.type === 'trade_items') {
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const newItem = Object.assign({}, item, { rarity: 'common' });
			this.player.inventory.push(newItem);
			showMessage(`≡ƒÄü Θüèτëºµ░æΦ┤êΘÇüΣ╜áΣ╕ÇΣ╗╢ ${newItem.name}∩╝êσ╖▓σèáσàÑΦâîσîà∩╝ë`);
		} else if (result.type === 'quest') {
			const xp = 30 + Math.floor(Math.random() * 40);
			const gold = 40 + Math.floor(Math.random() * 60);
			this.addXP(xp);
			this.player.gold += gold;
			showMessage('≡ƒôû Θüèτëºµ░æσæèΦ¿┤Σ╜áΘù£µû╝µ▓Öµ╝áτÜäσÅñΦÇüσé│Φ¬¬σÆîτºÿσ»åπÇé');
			showMessage(`τì▓σ╛ùτ╢ôΘ⌐ùσÇ╝σÆî ${gold} Θçæσ╣úπÇé`);
		} else {
			showMessage('ΓÜö∩╕Å ΘÇÖσÇïΘâ¿ΦÉ╜σ░ìσñûΣ╛åΦÇàΣ╕ìσÅïσûä∩╝ü');
			this.battle('monster');
		}
	}

	quicksand() {
		showMessage('ΓÜá∩╕Å Σ╜áΦ╕⌐σê░Σ║åµ╡üµ▓Ö∩╝ü');
		const outcomes = [
			{ type: 'escape', weight: 50 },
			{ type: 'struggle', weight: 30 },
			{ type: 'sink', weight: 20 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'escape') {
			showMessage('≡ƒÆ¿ Σ╜áΦ┐àΘÇƒΦä½Θ¢óΣ║åµ╡üµ▓ÖσìÇσƒƒ∩╝ü');
			const staminaLoss = 5 + Math.floor(Math.random() * 10);
			this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
			showMessage(`µ╢êΦÇùΘ½öσè¢ -${staminaLoss}`);
		} else if (result.type === 'struggle') {
			showMessage(t('quicksandStruggle'));
			const hpLoss = 10 + Math.floor(Math.random() * 15);
			const staminaLoss = 15 + Math.floor(Math.random() * 15);
			this.player.hp = Math.max(1, this.player.hp - hpLoss);
			this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
			showMessage(`${t('hp')} -${hpLoss}, ${t('stamina')} -${staminaLoss}`);
		} else {
			showMessage('≡ƒÆÇ Σ╜áΘÖ╖σàÑµ╡üµ▓Öµ╖▒ΦÖò∩╝îσ╣╛Σ╣ÄΦªüτ¬Æµü»∩╝ü');
			const hpLoss = 25 + Math.floor(Math.random() * 25);
			this.player.hp = Math.max(1, this.player.hp - hpLoss);
			showMessage(`HP -${hpLoss}`);
			if (this.player.potions > 0 && Math.random() < 0.5) {
				this.player.potions -= 1;
				showMessage('≡ƒº¬ σ£¿µÄÖµëÄΣ╕¡Σ╕ìσ░Åσ┐âµëôτá┤Σ║åΣ╕Çτô╢ΦùÑµ░┤∩╝ê-1ΦùÑµ░┤∩╝ë');
			}
		}
	}

	scorpionNest() {
		showMessage('≡ƒªé Σ╜áτäíµäÅΣ╕¡ΘùûσàÑΣ║åµ»ÆΦáìτÜäσ╖óτ⌐┤∩╝ü');
		const outcomes = [
			{ type: 'avoid', weight: 35 },
			{ type: 'minor_sting', weight: 35 },
			{ type: 'serious_sting', weight: 20 },
			{ type: 'treasure', weight: 10 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'avoid') {
			showMessage('≡ƒÅâ Σ╜áσ░Åσ┐âσ£░τ╣₧ΘüÄµ»ÆΦáì∩╝îµêÉσèƒΘü┐ΘûïΣ║åσì▒ΘÜ¬∩╝ü');
		} else if (result.type === 'minor_sting') {
			showMessage('≡ƒÿú Σ╜áΦó½µ»ÆΦáìΦ£çΣ║åΣ╕ÇΣ╕ï∩╝ü');
			const damage = 8 + Math.floor(Math.random() * 12);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`σÅùσê░µ»Æτ┤áσé╖σ«│ -${damage} HP`);
		} else if (result.type === 'serious_sting') {
			showMessage('≡ƒÆÇ σñÜΘÜ╗µ»ÆΦáìµö╗µôèΣ║åΣ╜á∩╝ü');
			const damage = 20 + Math.floor(Math.random() * 20);
			this.player.hp = Math.max(1, this.player.hp - damage);
			const staminaLoss = 10 + Math.floor(Math.random() * 10);
			this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
			showMessage(`HP -${damage}∩╝îΘ½öσè¢ -${staminaLoss}`);
		} else {
			showMessage('Γ£¿ σ£¿Φ║▓Θü┐µ»ÆΦáìµÖé∩╝îΣ╜áτÖ╝τÅ╛Σ║åτëáσÇæσ«êΦ¡╖τÜäσ»╢ΦùÅ∩╝ü');
			const gold = 100 + Math.floor(Math.random() * 150);
			this.player.gold += gold;
			showMessage(`τì▓σ╛ù ${gold} Θçæσ╣ú∩╝ü`);
		}
	}

	ancientRuins() {
		showMessage('≡ƒÅ¢∩╕Å Σ╜áτÖ╝τÅ╛Σ║åΣ╕ÇΦÖòσÅñΣ╗úΘü║Φ╖í...');
		const outcomes = [
			{ type: 'artifact', weight: 25 },
			{ type: 'inscription', weight: 30 },
			{ type: 'trap', weight: 25 },
			{ type: 'guardian', weight: 20 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'artifact') {
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const rarityRoll = Math.random();
			let rarity = 'common';
			if (rarityRoll < 0.15) rarity = 'epic';
			else if (rarityRoll < 0.45) rarity = 'rare';
			const newItem = Object.assign({}, item, { rarity });
			this.player.inventory.push(newItem);
			showMessage(`ΓÜ▒∩╕Å Σ╜áσ£¿Θü║Φ╖íΣ╕¡µë╛σê░Σ║åσÅñΣ╗úτÑ₧σÖ¿ ${this.formatItem(newItem)}∩╝ü`);
		} else if (result.type === 'inscription') {
			const xp = 40 + Math.floor(Math.random() * 60);
			this.addXP(xp);
			showMessage('≡ƒô£ Σ╜áτáöτ⌐╢Σ║åΘü║Φ╖íΣ╕èτÜäΘèÿµûç∩╝îτì▓σ╛ùΣ║åσÅñΦÇüτÜäτƒÑΦ¡ÿπÇé');
		} else if (result.type === 'trap') {
			showMessage('≡ƒÆÑ Σ╜áΦº╕τÖ╝Σ║åΘü║Φ╖íτÜäσ«êΦ¡╖µ⌐ƒΘù£∩╝ü');
			const damage = 15 + Math.floor(Math.random() * 25);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`σÅùσê░ ${damage} Θ╗₧σé╖σ«│∩╝ü`);
		} else {
			showMessage('≡ƒæ╣ Θü║Φ╖íτÜäσ«êΦ¡╖ΦÇàΦó½σûÜΘåÆΣ║å∩╝ü');
			this.battle('elite');
		}
	}

	mysteriousStranger() {
		showMessage(t('strangerMet'));
		const outcomes = [
			{ type: 'gamble', weight: 30 },
			{ type: 'gift', weight: 25 },
			{ type: 'prophecy', weight: 20 },
			{ type: 'curse', weight: 15 },
			{ type: 'merchant', weight: 10 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'gamble') {
			if (this.player.gold >= 100) {
				showMessage(t('strangerGamble'));
				if (Math.random() < 0.5) {
					this.player.gold -= 100;
					showMessage(t('strangerGambleLost'));
				} else {
					this.player.gold += 100;
					showMessage(t('strangerGambleWon'));
				}
			} else {
				showMessage(t('strangerNoGold'));
				showMessage(t('strangerLeaves'));
			}
		} else if (result.type === 'gift') {
			const giftType = Math.random();
			if (giftType < 0.4) {
				const gold = 80 + Math.floor(Math.random() * 120);
				this.player.gold += gold;
				showMessage(`${t('strangerGiftGold')} ${gold} ${t('strangerDisappear')}`);
			} else if (giftType < 0.7) {
				this.player.potions += 2;
				showMessage(t('strangerGiftPotions'));
			} else {
				const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
				const newItem = Object.assign({}, item, { rarity: 'rare' });
				this.player.inventory.push(newItem);
				showMessage(`${t('strangerGiftItem')} ${this.formatItem(newItem)} ${t('strangerSmoke')}`);
			}
		} else if (result.type === 'prophecy') {
			showMessage(t('strangerProphecy'));
			const prophecies = [
				{ text: t('prophecyCombat'), buff: 'combat' },
				{ text: t('prophecyGold'), buff: 'gold' },
				{ text: t('prophecyDefense'), buff: 'defense' }
			];
			const prophecy = prophecies[Math.floor(Math.random() * prophecies.length)];
			showMessage(prophecy.text);
			
			if (prophecy.buff === 'combat') {
				this.player.luck_combat += 3;
				showMessage(`${t('combatLuck')} +3`);
			} else if (prophecy.buff === 'gold') {
				this.player.luck_gold += 3;
				showMessage(`${t('goldLuck')} +3`);
			} else if (prophecy.buff === 'defense') {
				this.player.shield += 30;
				showMessage(t('gainShield'));
			}
		} else if (result.type === 'curse') {
			showMessage(t('strangerCurse'));
			const curseType = Math.random();
			if (curseType < 0.5) {
				const goldLoss = Math.min(this.player.gold, 50 + Math.floor(Math.random() * 100));
				this.player.gold -= goldLoss;
				showMessage(`${t('curseGoldLoss')} -${goldLoss}∩╝ü`);
			} else {
				const damage = 20 + Math.floor(Math.random() * 20);
				this.player.hp = Math.max(1, this.player.hp - damage);
				showMessage(`${t('curseHpLoss')} -${damage} HP∩╝ü`);
			}
		} else {
			showMessage('≡ƒÅ¬ ΘÖîτöƒΣ║║σÄƒΣ╛åµÿ»σÇïτë╣µ«èσòåΣ║║∩╝ü');
			this.merchant();
		}
	}

	tradingPost() {
		showMessage('≡ƒÅ¬ Σ╜áτÖ╝τÅ╛Σ║åΣ╕ÇσÇïµ▓Öµ╝áΘ⌐¢τ½Ö∩╝ü');
		showMessage('ΘÇÖΦúíσÅ»Σ╗ÑΦú£τ╡ªτë⌐Φ│ç∩╝îΣ╣ƒσÅ»Σ╗Ñσç║σö«Σ╜áΣ╕ìΘ£ÇΦªüτÜäΦú¥σéÖπÇé');
		
		// τªüτö¿τº╗σïòµîëΘêò
		const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
		const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
		const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
		
		// σë╡σ╗║Θ⌐¢τ½ÖΘ¥óµ¥┐
		const panel = document.createElement('div');
		panel.id = 'trading-post-panel';
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
			min-width: 450px;
			max-width: 600px;
			max-height: 80vh;
			overflow-y: auto;
		`;
		
		panel.innerHTML = `
			<h2 style="color: #8b4513; margin-top: 0; text-align: center;">≡ƒÅ¬ µ▓Öµ╝áΘ⌐¢τ½Ö</h2>
			
			<div style="background: #fff; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
				<h3 style="margin-top: 0; color: #d4a855;">≡ƒÆ░ Σ╜áτÜäΘçæσ╣ú: <span id="tp-gold">${this.player.gold}</span></h3>
			</div>
			
			<div style="background: #fff; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
				<h3 style="margin-top: 0; color: #2ecc71;">≡ƒ¢Æ Φú£τ╡ªτë⌐Φ│ç</h3>
				<div style="display: flex; flex-direction: column; gap: 8px;">
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f8f8f8; border-radius: 4px;">
						<span>≡ƒº¬ ΦùÑµ░┤ x1</span>
						<button class="tp-buy-btn" data-item="potion" data-price="200" style="padding: 6px 12px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer;">200金幣</button>
					</div>
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f8f8f8; border-radius: 4px;">
						<span>≡ƒìû Θúƒτë⌐∩╝êµüóσ╛⌐30HP+15Θ½öσè¢∩╝ë</span>
						<button class="tp-buy-btn" data-item="food" data-price="40" style="padding: 6px 12px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer;">40Θçæσ╣ú</button>
					</div>
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f8f8f8; border-radius: 4px;">
						<span>≡ƒÆè σ«îσà¿µüóσ╛⌐∩╝êHP+Θ½öσè¢σà¿µ╗┐∩╝ë</span>
						<button class="tp-buy-btn" data-item="fullheal" data-price="80" style="padding: 6px 12px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer;">80Θçæσ╣ú</button>
					</div>
				</div>
			</div>
			
			<div style="background: #fff; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
				<h3 style="margin-top: 0; color: #e74c3c;">≡ƒÆ╝ σç║σö«Φú¥σéÖ</h3>
				<div id="tp-inventory" style="max-height: 250px; overflow-y: auto;">
					<!-- Φú¥σéÖσêùΦí¿σ░çσïòµàïτöƒµêÉ -->
				</div>
			</div>
			
			<div style="text-align: center; margin-top: 16px;">
				<button id="tp-close" style="padding: 10px 24px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1.1em;">Θ¢óΘûïΘ⌐¢τ½Ö</button>
			</div>
		`;
		
		document.body.appendChild(panel);
		
		// τöƒµêÉΦâîσîàΦú¥σéÖσêùΦí¿
		const updateInventory = () => {
			const invDiv = document.getElementById('tp-inventory');
			if (!invDiv) return;
			
			if (this.player.inventory.length === 0) {
				invDiv.innerHTML = `<div style="text-align: center; color: #999; padding: 20px;">${t('inventoryEmpty')}</div>`;
				return;
			}
			
			let html = '';
			this.player.inventory.forEach((item, idx) => {
				// Φ¿êτ«ùσç║σö«σâ╣µá╝∩╝Üµá╣µôÜτ¿Çµ£ëσ║ª
				let basePrice = 20;
				if (item.rarity === 'rare') basePrice = 80;
				else if (item.rarity === 'epic') basePrice = 200;
				
				// µá╣µôÜσ▒¼µÇºσèáµêÉΦ¬┐µò┤σâ╣µá╝
				if (item.atk) basePrice += item.atk * 5;
				if (item.def) basePrice += item.def * 5;
				if (item.max_hp_bonus) basePrice += item.max_hp_bonus * 2;
				
				const rarityColor = item.rarity === 'legendary' ? '#e67e22' : (item.rarity === 'epic' ? '#9b59b6' : (item.rarity === 'excellent' ? '#2ecc71' : (item.rarity === 'rare' ? '#3498db' : '#95a5a6')));
				
				html += `
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f8f8f8; border-radius: 4px; margin-bottom: 6px; border-left: 4px solid ${rarityColor};">
						<div style="flex: 1;">
							<div style="font-weight: bold;">${item.name}</div>
							<div style="font-size: 0.85em; color: #666;">${item.rarity}</div>
						</div>
						<button class="tp-sell-btn" data-idx="${idx}" data-price="${basePrice}" style="padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">Φ│úσç║ ${basePrice}Θçæ</button>
					</div>
				`;
			});
			invDiv.innerHTML = html;
			
			// τ╢üσ«Üσç║σö«µîëΘêò
			Array.from(invDiv.querySelectorAll('.tp-sell-btn')).forEach(btn => {
				btn.addEventListener('click', (e) => {
					const idx = parseInt(e.target.getAttribute('data-idx'));
					const price = parseInt(e.target.getAttribute('data-price'));
					const item = this.player.inventory[idx];
					
					if (item) {
						this.player.inventory.splice(idx, 1);
						this.player.gold += price;
						showMessage(`≡ƒÆ░ Φ│úσç║ ${item.name}∩╝îτì▓σ╛ù ${price} Θçæσ╣úπÇé`);
						document.getElementById('tp-gold').textContent = this.player.gold;
						updateInventory();
						this.updateStatus();
					}
				});
			});
		};
		
		updateInventory();
		
		// τ╢üσ«ÜΦ│╝Φ▓╖µîëΘêò
		Array.from(panel.querySelectorAll('.tp-buy-btn')).forEach(btn => {
			btn.addEventListener('click', (e) => {
				const item = e.target.getAttribute('data-item');
				const price = parseInt(e.target.getAttribute('data-price'));
				
				if (this.player.gold >= price) {
					this.player.gold -= price;
					
					if (item === 'potion') {
						this.player.potions += 1;
						showMessage('≡ƒº¬ Φ│╝Φ▓╖ΦùÑµ░┤ x1');
					} else if (item === 'food') {
						this.player.hp = Math.min(this.player.max_hp, this.player.hp + 30);
						this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 15);
						showMessage('≡ƒìû Φ│╝Φ▓╖Θúƒτë⌐∩╝îHP +30∩╝îΘ½öσè¢ +15');
					} else if (item === 'fullheal') {
						this.player.hp = this.player.max_hp;
						this.player.stamina = this.player.max_stamina;
						showMessage('≡ƒÆè σ«îσà¿µüóσ╛⌐∩╝üHPσÆîΘ½öσè¢σà¿µ╗┐∩╝ü');
					}
					
					document.getElementById('tp-gold').textContent = this.player.gold;
					this.updateStatus();
				} else {
					showMessage('Γ¥î Θçæσ╣úΣ╕ìΦ╢│∩╝ü');
				}
			});
		});
		
		// Θù£ΘûëµîëΘêò
		document.getElementById('tp-close').addEventListener('click', () => {
			document.body.removeChild(panel);
			showMessage('Σ╜áΘ¢óΘûïΣ║åΘ⌐¢τ½Ö∩╝îτ╣╝τ║îΦ╕ÅΣ╕èµùàτ¿ïπÇé');
			// µüóσ╛⌐τº╗σïòµîëΘêò
			if (mf) mf.disabled = false;
			if (ml) ml.disabled = false;
			if (mr) mr.disabled = false;
		});
	}

	godEvent() {
			showMessage('Θüçσê░σÅñσƒâσÅèτÑ₧τÑç∩╝îτì▓σ╛ùτÑ¥τªÅµêûΦ⌐¢σÆÆ∩╝êΘÜ¿µ⌐ƒ∩╝ëπÇé');
			if (Math.random() < 0.5) {
				let g = 50;
				if (this.player.luck_gold > 0) {
					const finalG = Math.floor(g * (1 + 0.1 * this.player.luck_gold));
					this.player.gold += finalG;
					showMessage(`τì▓σ╛ùτÑ¥τªÅ∩╝ÜΘçæσ╣ú +${finalG}∩╝êσÉ½Θçæσ╣úσ╣╕ΘüïσèáµêÉ x${this.player.luck_gold}∩╝ëπÇé`);
					this.player.luck_gold = Math.max(0, this.player.luck_gold - 1);
					showMessage(`Θçæσ╣úσ╣╕Θüï -1∩╝êσë⌐Θñÿ ${this.player.luck_gold}∩╝ëπÇé`);
				} else {
					this.player.gold += g;
					showMessage('τì▓σ╛ùτÑ¥τªÅ∩╝ÜΘçæσ╣ú +50');
				}
			} else { this.player.hp = Math.max(1, this.player.hp - 15); showMessage('σÅùσê░Φ⌐¢σÆÆ∩╝ÜHP -15'); }
		}

	pyramid() {
		showMessage('≡ƒö║ Σ╜áτÖ╝τÅ╛Σ║åΣ╕Çσ║ºσÅñΦÇüτÜäΘçæσ¡ùσíö∩╝ü');
		showMessage('ΘÇÖΦúíσààµ╗┐σì▒ΘÜ¬∩╝îΣ╜åΣ╣ƒΦÿèΦùÅΦæùσ╖¿σñºτÜäσ»╢ΦùÅ...');
		showMessage('Θçæσ¡ùσíöσë»µ£¼∩╝Ü8µ¡ÑµÄóΘÜ¬∩╝îµò╡Σ║║σ╝╖σ║ªµÑ╡Θ½ÿ∩╝êΘÜ¿σ£░σ£ûµÅÉσìç∩╝ë∩╝îτìÄσï╡Φ▒ÉσÄÜ∩╝ê15σÇìτ╢ôΘ⌐ù/Θçæσ╣ú∩╝ë∩╝îΣ┐¥Φ¡ëµÄëΦÉ╜σä¬Φë»Σ╗ÑΣ╕èΦú¥σéÖ∩╝ü');
		// σë╡σ╗║Θü╕µôçΘ¥óµ¥┐
		this.showPyramidChoice();
	}		showPyramidChoice() {
			// τªüτö¿τº╗σïòµîëΘêò
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;

			// σë╡σ╗║Θü╕µôçσ░ìΦ⌐▒µíå
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
				<h2 style="color: #8b4513; margin-top: 0;">≡ƒö║ Θçæσ¡ùσíöσë»µ£¼</h2>
				<p style="font-size: 1.1em; line-height: 1.6;">
					µÿ»σÉªΘÇ▓σàÑΘçæσ¡ùσíöµÄóΘÜ¬∩╝ƒ
				</p>
				<div style="background: #fff; padding: 12px; border-radius: 6px; margin: 12px 0; border: 1px solid #ddd;">
					<strong>σë»µ£¼τë╣µÇº∩╝êσ£░σ£û${this.difficulty}∩╝ë∩╝Ü</strong><br>
					Γ£ª 8µ¡ÑµÄóΘÜ¬µùàτ¿ï<br>
					Γ£ª µò╡Σ║║σ╝╖σ║ªµÑ╡Θ½ÿ∩╝êHP x${(3 + this.difficulty * 0.5).toFixed(1)}, ATK x${(2.5 + this.difficulty * 0.3).toFixed(1)}∩╝ë<br>
					Γ£ª τ╢ôΘ⌐ùσÇ╝ x15 σÇì<br>
					Γ£ª Θçæσ╣ú x15 σÇì<br>
					Γ£ª Σ┐¥Φ¡ëµÄëΦÉ╜σä¬Φë»Σ╗ÑΣ╕èΦú¥σéÖ<br>
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
					">ΓÜö∩╕Å ΘÇ▓σàÑµÄóΘÜ¬</button>
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
					">≡ƒÜ╢ Θ¢óΘûï</button>
				</div>
			`;

			document.body.appendChild(panel);

			// τ╢üσ«ÜµîëΘêòΣ║ïΣ╗╢
			document.getElementById('pyramid-enter-btn').addEventListener('click', () => {
				this.enterPyramid();
				document.body.removeChild(panel);
			});

			document.getElementById('pyramid-decline-btn').addEventListener('click', () => {
				showMessage('Σ╜áµ▒║σ«ÜΣ╕ìΘÇ▓σàÑΘçæσ¡ùσíö∩╝îτ╣╝τ║îσëìΦíîπÇé');
				document.body.removeChild(panel);
				// µüóσ╛⌐τº╗σïòµîëΘêò
				if (mf) mf.disabled = false;
				if (ml) ml.disabled = false;
				if (mr) mr.disabled = false;
			});
		}

		enterPyramid() {
			showMessage('ΓÜí Σ╜áΦ╕ÅσàÑΣ║åΘçæσ¡ùσíöµ╖▒ΦÖò...');
			showMessage('≡ƒö║ Θçæσ¡ùσíöσë»µ£¼Θûïσºï∩╝üΣ╜áµ£ë 8 µ¡ÑµÄóΘÜ¬µ⌐ƒµ£âπÇé');
			this.inPyramid = true;
			this.pyramidSteps = 0;
			this.normalMapSteps = this.map_steps; // σä▓σ¡ÿτò╢σëìµ¡Ñµò╕
			this.updateStatus();
			// µüóσ╛⌐τº╗σïòµîëΘêò
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
		}

		exitPyramid() {
			showMessage('≡ƒîà Σ╜áΦ╡░σç║Σ║åΘçæσ¡ùσíö∩╝îσ¢₧σê░Σ║åµ▓Öµ╝áΣ╕¡πÇé');
			showMessage(`Θçæσ¡ùσíöσë»µ£¼σ«îµêÉ∩╝üµÄóτ┤óΣ║å ${this.pyramidSteps}/${this.pyramidMaxSteps} µ¡ÑπÇé`);
			this.inPyramid = false;
			this.pyramidSteps = 0;
			this.map_steps = this.normalMapSteps; // µüóσ╛⌐µ¡úσ╕╕σ£░σ£ûµ¡Ñµò╕
			this.updateStatus();
		}

		applySlotResults(results) {
			// µ¬óµƒÑµê░Θ¼Ñµÿ»σÉªσ╖▓τ╡Éµ¥ƒ∩╝îσªéµ₧£σ╖▓τ╡Éµ¥ƒσëçΣ╕ìΦÖòτÉåτ╡Éµ₧£
			if (!this.inBattle) {
				return;
			}
			// Σ╗Ñσ╖ªΘéèτ¼¼Σ╕Çµá╝∩╝êresults[0]∩╝ëτé║Σ╕╗Φªüτ¼ªΦÖƒ∩╝îσÅ¬Φ¿êτ«ùσ╛₧σ╖ªΘéèΘûïσºïτÜäΘÇúτ║îτ¢╕σÉîτ¼ªΦÖƒµò╕
			const primary = results[0];
			let matchCount = 1; // Φç│σ░æµ£ëτ¼¼Σ╕Çµá╝
			if (results[1] === primary) {
				matchCount = 2;
				if (results[2] === primary) {
					matchCount = 3;
				}
			}
			// Σ╕ëµá╝τ¢╕σÉîµÖéΘíìσñû2.5σÇìσèáµêÉ∩╝êτ¢╕τò╢µû╝2µá╝µòêµ₧£τÜä2.5σÇì∩╝ë
			const tripleBonus = matchCount === 3 ? 2.5 : 1;
			// Φ¿êτ«ùµ£¼σ¢₧σÉêτÜäΘÇúτ║î combo∩╝êσîàσÉ½τò╢σëìµá╝∩╝ëΣ╕ªΘí»τñ║
			// ΦïÑΣ╕èΣ╕Çσ¢₧σÉêΣ╕╗τ¼ªΦÖƒΦêçµ£¼σ¢₧σÉêτ¢╕σÉî∩╝îpreviousCombo τé║σàêσëìΦ¿êµò╕∩╝îeffectiveCombo = previousCombo + 1
			const previousCombo = (this.inBattle && this.consecutivePrimarySymbol === primary) ? this.consecutivePrimaryCount : 0;
			const effectiveCombo = previousCombo + 1; // σîàσÉ½τò╢σëìΘÇÖΣ╕Çσ¢₧σÉê
			// Combo µòêµ₧£µö╣τé║τ╖ÜµÇºσÇìτÄç∩╝Ü2µ¼íx2∩╝î3µ¼íx3∩╝î4µ¼íx4
			const comboMultiplier = effectiveCombo;
			// τ░íτƒ¡µÅÉτñ║Σ╕╗Φªüτ¼ªΦÖƒπÇüσî╣Θàìµò╕Φêçτò╢σëì combo
			const bonusMsg = matchCount === 3 ? 'πÇÉΣ╕ëΘÇúσèáµêÉ x2.5πÇæ' : '';
			showMessage(`Σ╕╗Φªüτ¼ªΦÖƒ∩╝Ü${primary}∩╝îσî╣Θàìµò╕∩╝Ü${matchCount}${bonusMsg}∩╝îΘÇúτ║î x${effectiveCombo}∩╝êΣ╣ÿµò╕ x${comboMultiplier}∩╝ë`);

			switch (primary) {
				case 'ΓÜö∩╕Å': {
					// Φ¿êτ«ùµÜ┤µôèµ⌐ƒτÄç∩╝êσÅùµê░Θ¼Ñσ╣╕Θüïσ╜▒Θƒ┐∩╝ë∩╝îΣ╕ªσÑùτö¿µÜ┤µôèσÇìτÄç
					let baseDmg = 15 * matchCount; // µ»Åµá╝σƒ║τñÄ 15
					// σÑùτö¿Σ╕ëΘÇúσèáµêÉ
					baseDmg = Math.round(baseDmg * tripleBonus);
					// σÑùτö¿ combo Σ╣ÿµò╕
					baseDmg = Math.max(1, Math.round(baseDmg * comboMultiplier));
					const weaponAtk = this.player.equipment.weapon ? (this.player.equipment.weapon.atk || 0) : 0;
					baseDmg += weaponAtk;
					// µçëτö¿µ¡ªσÖ¿τÜäµÜ┤µôèτÄçσèáµêÉ
					const weaponCritRate = this.player.equipment.weapon ? (this.player.equipment.weapon.crit_rate || 0) : 0;
					const critChance = Math.min(0.75, 0.08 + 0.05 * this.player.luck_combat + weaponCritRate / 100); // cap 75%, base 8%, per-luck 5%
					let isCrit = Math.random() < critChance;
					let finalDmg = isCrit ? Math.floor(baseDmg * 2.0) : baseDmg;
					this.enemy.hp -= finalDmg;
					showMessage(`Σ╜áτÖ╝σïòµÖ«ΘÇÜµö╗µôè x${matchCount}${isCrit? '∩╝êµÜ┤µôè∩╝ë':''}∩╝îσ░ìµò╡Σ║║ΘÇáµêÉ ${finalDmg} σé╖σ«│πÇé`);
					break;
				}
				case 'ΓÜí∩╕Å': {
					let baseDmg = 25 * matchCount; // µ»Åµá╝σƒ║τñÄ 25
					// σÑùτö¿Σ╕ëΘÇúσèáµêÉ
					baseDmg = Math.round(baseDmg * tripleBonus);
					// σÑùτö¿ combo Σ╣ÿµò╕
					baseDmg = Math.max(1, Math.round(baseDmg * comboMultiplier));
					const weaponAtk2 = this.player.equipment.weapon ? (this.player.equipment.weapon.atk || 0) : 0;
					baseDmg += weaponAtk2;
					// µçëτö¿µ¡ªσÖ¿τÜäµèÇΦâ╜σ¿üσè¢σèáµêÉ
					const weaponSkillPower = this.player.equipment.weapon ? (this.player.equipment.weapon.skill_power || 0) : 0;
					baseDmg = Math.floor(baseDmg * (1 + weaponSkillPower / 100));
					// µçëτö¿µ¡ªσÖ¿τÜäµÜ┤µôèτÄçσèáµêÉ
					const weaponCritRate2 = this.player.equipment.weapon ? (this.player.equipment.weapon.crit_rate || 0) : 0;
					const critChance2 = Math.min(0.75, 0.08 + 0.05 * this.player.luck_combat + weaponCritRate2 / 100); // cap 75%, base 8%, per-luck 5%
					let isCrit2 = Math.random() < critChance2;
					let finalDmg2 = isCrit2 ? Math.floor(baseDmg * 2.2) : baseDmg;
					this.enemy.hp -= finalDmg2;
					// µèÇΦâ╜µ╢êΦÇùΘ½öσè¢
					const staminaCost = 5 * matchCount;
					this.player.stamina = Math.max(0, this.player.stamina - staminaCost);
					showMessage(`Σ╜áΣ╜┐τö¿µèÇΦâ╜ x${matchCount}${isCrit2? '∩╝êµÜ┤µôè∩╝ë':''}∩╝îσ░ìµò╡Σ║║ΘÇáµêÉ ${finalDmg2} σé╖σ«│∩╝îµ╢êΦÇùΘ½öσè¢ ${staminaCost}πÇé`);
					break;
				}
				case '≡ƒ¢í∩╕Å': {
					let shieldGain = 10 * matchCount; // µ»Åµá╝ +10 Φ¡╖τ¢╛
					// σÑùτö¿Σ╕ëΘÇúσèáµêÉ
					shieldGain = Math.round(shieldGain * tripleBonus);
					shieldGain = Math.max(1, Math.round(shieldGain * comboMultiplier));
					this.player.shield += shieldGain;
					showMessage(`Σ╜áτì▓σ╛ùΘÿ▓τªª x${matchCount}∩╝êΘÇúµôè x${effectiveCombo}∩╝ë∩╝îΦ¡╖τ¢╛ +${shieldGain}πÇé`);
					break;
				}
				case '≡ƒº¬': {
					let hpGain = 30 * matchCount; // µ»Åµá╝ +30 HP
					// σÑùτö¿Σ╕ëΘÇúσèáµêÉ
					hpGain = Math.round(hpGain * tripleBonus);
					hpGain = Math.max(1, Math.round(hpGain * comboMultiplier));
					this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
					// σÉîµÖéµüóσ╛⌐Θ½öσè¢∩╝êµ»Åµá╝ +15 Θ½öσè¢∩╝ë
					let staminaGain = 15 * matchCount;
					// σÑùτö¿Σ╕ëΘÇúσèáµêÉ
					staminaGain = Math.round(staminaGain * tripleBonus);
					staminaGain = Math.max(1, Math.round(staminaGain * comboMultiplier));
					this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
					showMessage(`Σ╜┐τö¿τ┤àΦë▓µ░┤τô╢ x${matchCount}∩╝êΘÇúµôè x${effectiveCombo}∩╝ë∩╝îσ¢₧σ╛⌐ HP ${hpGain}πÇüΘ½öσè¢ ${staminaGain}πÇé`);
					break;
				}
				case 'Γ¡É': {
					let luckGain = matchCount * tripleBonus; // µ»Åµá╝ +1 µê░Θ¼Ñσ╣╕Θüï∩╝îΣ╕ëΘÇúx5
					this.player.luck_combat += luckGain;
					showMessage(`τì▓σ╛ùµê░Θ¼Ñσ╣╕Θüï +${luckGain}∩╝îµÅÉΘ½ÿµÜ┤µôèΦêçΘûâΘü┐µ⌐ƒτÄçπÇé`);
					break;
				}
				case '≡ƒÆÇ': {
					// ΘÖìΣ╜Äτ¼ªΦÖƒΘÇáµêÉτÜäτ¢┤µÄÑσé╖σ«│Σ╗Ñσê⌐σàÑΘûÇτÄ⌐σ«╢
					let rawDmg = 10 * matchCount; // Φ¬┐µò┤τé║µ»Åµá╝ 10 σé╖σ«│
					// σÑùτö¿Σ╕ëΘÇúσèáµêÉ
					rawDmg = Math.round(rawDmg * tripleBonus);
					// τÄ⌐σ«╢µ£ëΘûâΘü┐µ⌐ƒτÄç∩╝êσÅùσ╣╕ΘüïσÆîΦ¡╖τö▓σ╜▒Θƒ┐∩╝ë
					const armorDodgeSkull = this.player.equipment.armor ? (this.player.equipment.armor.dodge_rate || 0) : 0;
					const dodgeChanceSkull = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodgeSkull / 100);
					if (Math.random() < dodgeChanceSkull) {
						showMessage(`Σ╜áΘûâΘü┐Σ║åµò╡Σ║║τ¼ªΦÖƒµö╗µôè∩╝êµê░Θ¼Ñσ╣╕Θüï ${this.player.luck_combat}∩╝ë∩╝ü`);
						if (this.player.luck_combat && this.player.luck_combat > 0) {
							this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
							showMessage(`戰鬥幸運 -1（剩餘 ${this.player.luck_combat}）。`);
						}
					} else {
						const consumedShield = Math.min(this.player.shield, rawDmg);
						const mitigated = Math.max(0, rawDmg - this.player.shield);
						this.player.shield -= consumedShield;
						this.player.hp -= mitigated;
						showMessage(`µò╡Σ║║µö╗µôè x${matchCount}∩╝îσÄƒσºïσé╖σ«│ ${rawDmg}∩╝îΦ¡╖τ¢╛σÉ╕µö╢ ${consumedShield}∩╝îσ»ªΘÜ¢σÅùµÉì ${mitigated}πÇé`);
					}
					break;
				}
				case '≡ƒÆ░': {
					// µ»Åµá╝τ╡ªΣ║êσ¢║σ«ÜΘçæσ╣ú∩╝êσÅ»σåìΦ¬┐µò┤∩╝ë
					const coinValue = 20;
					let got = coinValue * matchCount;
					// σÑùτö¿Σ╕ëΘÇúσèáµêÉ
					got = Math.round(got * tripleBonus);
					got = Math.max(1, Math.round(got * comboMultiplier));
					this.player.gold += got;
					showMessage(`τì▓σ╛ùΘçæσ╣ú ${got}∩╝ê≡ƒÆ░ x${matchCount}∩╝îΘÇúµôè x${effectiveCombo}∩╝ëπÇé`);
					break;
				}
				default: {
					// σà╢Σ╗ûτ¼ªΦÖƒµÜ½τäíτë╣µ«èΣ╕╗σ░Äµòêµ₧£
					showMessage('µ¡ñτ¼ªΦÖƒµ▓Æµ£ëΣ╕╗Φªüµòêµ₧£πÇé');
					break;
				}
			}

				// µê░Θ¼Ñτ¢╕Θù£∩╝ÜΦ┐╜Φ╣ñΘÇúτ║îτÜäΣ╕╗τ¼ªΦÖƒ∩╝êcombo∩╝ë
				if (this.inBattle) {
					if (this.consecutivePrimarySymbol === primary) {
						this.consecutivePrimaryCount += 1;
					} else {
						this.consecutivePrimarySymbol = primary;
						this.consecutivePrimaryCount = 1;
					}
					showMessage(`τ¢«σëìΘÇúτ║îΣ╕╗τ¼ªΦÖƒ∩╝Ü${this.consecutivePrimarySymbol} x${this.consecutivePrimaryCount}`);

					// σàêµ¢┤µû░τïÇµàïΦêçΦ¿èµü»Θí»τñ║∩╝îτó║Σ┐¥µÅÆµº╜µòêµ₧£σàêσæêτÅ╛
					this.updateStatus();

					// µò╡Σ║║σ¢₧σÉêσÇÆµò╕∩╝êΦïÑµò╡Σ║║σ░Üµ£¬µ¡╗Σ║í∩╝ë
					this.enemy.turnsToAttack -= 1;
					if (this.enemy.turnsToAttack <= 0 && this.enemy.hp > 0) {
						// σ╗╢Θü▓Φº╕τÖ╝µò╡Σ║║µÖ«µö╗∩╝îΦ«ôµÅÆµº╜µòêµ₧£ΦêçΦ¿èµü»σàêσ«îµò┤σæêτÅ╛
						setTimeout(() => {
							// µ¬óµƒÑµê░Θ¼ÑΣ╗ìσ£¿ΘÇ▓ΦíîΣ╕öµò╡Σ║║µ£¬µ¡╗Σ║í
							if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack();
						}, 300);
					}

					// ΦïÑµò╡Σ║║µ¡╗Σ║í∩╝îτ╡Éµ¥ƒµê░Θ¼Ñ∩╝êτ½ïσì│ΦÖòτÉå∩╝ë
					if (this.enemy.hp <= 0) {
						showMessage('Σ╜áµôèµòùΣ║åµò╡Σ║║∩╝üµê░Θ¼Ñτ╡Éµ¥ƒ∩╝îτì▓σ╛ùτìÄσï╡πÇé');
						
					// σ«Üτ╛⌐ cloneItem σç╜µò╕Σ╛åµ¡úτó║ΦÖòτÉåΦú¥σéÖσ▒¼µÇºσèáµêÉ
					const cloneItem = (base, rarity, isPyramid = false) => {
						const it = Object.assign({}, base);
						it.rarity = rarity;
						// Φ¬┐µò┤σ▒¼µÇºσ╣àσ║ª∩╝Ürare +~1.5, epic +~2.2
							const _scale = rarity === 'rare' ? 1.8 : (rarity === 'excellent' ? 1.5 : (rarity === 'epic' ? 2.2 : (rarity === 'legendary' ? 3.0 : 1)));
							if (it.atk) it.atk = Math.max(1, Math.round(it.atk * _scale));
							if (it.def) it.def = Math.max(1, Math.round(it.def * _scale));
							if (it.luck_gold) it.luck_gold = Math.max(1, Math.round(it.luck_gold * _scale));
							if (it.luck_combat) it.luck_combat = Math.max(1, Math.round(it.luck_combat * _scale));
							if (it.max_hp_bonus) it.max_hp_bonus = Math.max(1, Math.round(it.max_hp_bonus * _scale));
						
						// µá╣µôÜσôüΦ│¬µ╖╗σèáΘíìσñûσ▒¼µÇº（依稀有度抽多個不重複加成）
						const bonusCountByRarity_inner = { common: 0, rare: 2, excellent: 1, epic: 3, legendary: 4 };
						const bonusCount_inner = bonusCountByRarity_inner[rarity] || 0;
						if (bonusCount_inner > 0 && QUALITY_BONUS[it.slot] && QUALITY_BONUS[it.slot][rarity]) {
							const pool2 = QUALITY_BONUS[it.slot][rarity].slice();
							for (let n = 0; n < bonusCount_inner && pool2.length > 0; n++) {
								const idx2 = Math.floor(Math.random() * pool2.length);
								const bonus2 = pool2.splice(idx2, 1)[0];
								Object.assign(it, bonus2);
							}
						}
						
						// Θçæσ¡ùσíöΦú¥σéÖµ╖╗σèáσ¡ùτ╢┤
						if (isPyramid && rarity !== 'common') {
							const affix = PYRAMID_AFFIXES[Math.floor(Math.random() * PYRAMID_AFFIXES.length)];
							it.affix = affix.id;
							it.affixName = affix.name;
							it.affixColor = affix.color;
							// µ╖╗σèáσ¡ùτ╢┤σ▒¼µÇºσèáµêÉ
							for (const key in affix.bonus) {
								if (it[key]) {
									it[key] += affix.bonus[key];
								} else {
									it[key] = affix.bonus[key];
								}
							}
							it.isPyramid = true;
						}
						
						return it;
					};						// Θçæσ¡ùσíöσë»µ£¼τìÄσï╡σÇìτÄç∩╝êµö╣τé║15σÇì∩╝ë
						const pyramidMultiplier = this.inPyramid ? 15 : 1;
						
						// µò╡Σ║║Θí₧σ₧ïτìÄσï╡σÇìτÄç∩╝êτ▓╛Φï▒x2∩╝îσ░ÅΘá¡τ¢«x3∩╝ë
						let enemyTypeMultiplier = 1;
						if (this.enemy.strength >= 2.4) { // mini_boss
							enemyTypeMultiplier = 3;
						} else if (this.enemy.strength >= 1.6) { // elite
							enemyTypeMultiplier = 2;
						}
						
						// τìÄσï╡∩╝Üµá╣µôÜΘ¢úσ║ªτ╡ªΣ║êΘçæσ╣úΦêçτ╢ôΘ⌐ùσÇ╝
						const baseReward = 20 * this.difficulty;
						const reward = baseReward * pyramidMultiplier * enemyTypeMultiplier;
						this.player.gold += reward;
						
					let rewardMsg = `τì▓σ╛ùΘçæσ╣ú ${reward}`;
					if (this.inPyramid) {
						rewardMsg = `≡ƒö║ Θçæσ¡ùσíöτìÄσï╡ x${pyramidMultiplier}∩╝üτì▓σ╛ùΘçæσ╣ú ${reward} (σƒ║τñÄ ${baseReward} x${pyramidMultiplier}`;
						if (enemyTypeMultiplier > 1) {
							rewardMsg += ` x${enemyTypeMultiplier}`;
						}
						rewardMsg += ')';
					} else if (enemyTypeMultiplier > 1) {
						rewardMsg += ` (σƒ║τñÄ ${baseReward} x${enemyTypeMultiplier})`;
					}
					showMessage(rewardMsg);						// τ╢ôΘ⌐ùσÇ╝Σ╗ÑΘ¢úσ║ªΦêçµò╡Σ║║σ╝╖σ║ªΦ¿êτ«ù
					const baseXP = Math.floor(15 * this.difficulty * (this.enemy.strength || 1));
					const xpGain = baseXP * pyramidMultiplier * enemyTypeMultiplier;
					if (this.inPyramid) {
						showMessage(`≡ƒö║ Θçæσ¡ùσíöτ╢ôΘ⌐ùσÇ╝ x${pyramidMultiplier}∩╝ü`);
					}
					this.addXP(xpGain);						// µÄëΦÉ╜µ⌐ƒσê╢
						let dropped = null;
						if (this.inPyramid) {
							// Θçæσ¡ùσíöΣ┐¥Φ¡ëµÄëΦÉ╜1-2Σ╗╢τ¿Çµ£ë/σÅ▓Φ⌐⌐Φú¥σéÖ
							const dropCount = 1 + Math.floor(Math.random() * 2);
							showMessage(`≡ƒö║ Θçæσ¡ùσíöσ»╢ΦùÅ∩╝üµÄëΦÉ╜ ${dropCount} Σ╗╢Φú¥σéÖ`);
							for (let i = 0; i < dropCount; i++) {
								// 70% rare, 30% epic
								const rarityRoll = Math.random();
								let targetRarity = rarityRoll < 0.3 ? 'epic' : 'rare';
								const candidateItems = ITEMS.filter(it => it.slot); // σÅ¬Φªüµ£ëslotτÜä
								if (candidateItems.length > 0) {
									const baseItem = candidateItems[Math.floor(Math.random() * candidateItems.length)];
									dropped = cloneItem(baseItem, targetRarity, true); // isPyramid=true
									this.player.inventory.push(dropped);
									showMessage(`  Γ£¿ τì▓σ╛ù ${this.formatItem(dropped)}`);
								}
							}
						} else {
							// µ¡úσ╕╕σ£░σ£ûµÄëΦÉ╜∩╝êτ▓╛Φï▒σÆîσ░ÅΘá¡τ¢«µÅÉΘ½ÿµÄëΦÉ╜τÄç∩╝ë
							let dropChance = 50; // σƒ║τñÄ50%µÄëΦÉ╜τÄç
							let epicChance = 5;
							let rareChance = 15;
							
							if (enemyTypeMultiplier === 3) { // mini_boss
								dropChance = 100; // 100%µÄëΦÉ╜
								epicChance = 40; // 40% σÅ▓Φ⌐⌐
								rareChance = 50; // 50% τ¿Çµ£ë
								// σ░ÅΘá¡τ¢«µÄëΦÉ╜1-2Σ╗╢
								const dropCount = 1 + Math.floor(Math.random() * 2);
								showMessage(`≡ƒÆÄ σ░ÅΘá¡τ¢«µÄëΦÉ╜ ${dropCount} Σ╗╢Φú¥σéÖ∩╝ü`);
								for (let i = 0; i < dropCount; i++) {
									const roll = Math.random() * 100;
									let rarity = 'common';
									if (roll < epicChance) rarity = 'epic';
									else if (roll < epicChance + rareChance) rarity = 'rare';
									
									const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
									dropped = cloneItem(baseItem, rarity);
									this.player.inventory.push(dropped);
									showMessage(`  τì▓σ╛ù ${this.formatItem(dropped)}`);
								}
							} else if (enemyTypeMultiplier === 2) { // elite
								dropChance = 85; // 85%µÄëΦÉ╜
								epicChance = 20; // 20% σÅ▓Φ⌐⌐
								rareChance = 40; // 40% τ¿Çµ£ë
								// τ▓╛Φï▒µÄëΦÉ╜1-2Σ╗╢
								const dropCount = 1 + Math.floor(Math.random() * 2);
								const dropRoll = Math.random() * 100;
								console.log(`Elite drop check: roll=${dropRoll}, chance=${dropChance}, count=${dropCount}`);
								if (dropRoll < dropChance) {
									showMessage(`ΓÜö∩╕Å τ▓╛Φï▒µÄëΦÉ╜ ${dropCount} Σ╗╢Φú¥σéÖ∩╝ü`);
									for (let i = 0; i < dropCount; i++) {
										const roll = Math.random() * 100;
										let rarity = 'common';
										if (roll < epicChance) rarity = 'epic';
										else if (roll < epicChance + rareChance) rarity = 'rare';
										
										const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
										dropped = cloneItem(baseItem, rarity);
										this.player.inventory.push(dropped);
										console.log(`Elite dropped item ${i+1}:`, dropped.name, rarity);
										showMessage(`  τì▓σ╛ù ${this.formatItem(dropped)}`);
									}
								} else {
									console.log('Elite drop failed:', dropRoll, '>=', dropChance);
								}
							} else {
								// µÖ«ΘÇÜµò╡Σ║║µÄëΦÉ╜
								const roll = Math.random() * 100;
								let rarity = null;
								if (roll < epicChance) {
									rarity = 'epic';
								} else if (roll < epicChance + rareChance) {
									rarity = 'rare';
								} else if (roll < dropChance) {
									rarity = 'common';
								}
								if (rarity) {
									const baseItem = ITEMS[Math.floor(Math.random()*ITEMS.length)];
									dropped = cloneItem(baseItem, rarity);
									this.player.inventory.push(dropped);
									showMessage(`µò╡Σ║║µÄëΦÉ╜∩╝Ü${this.formatItem(dropped)}`);
								}
							}
						}
						// µê░Θ¼Ñτ╡Éµ¥ƒΦÖòτÉå
						// σàêσü£µ¡óΦç¬σïòµùïΦ╜ë∩╝îµ╕àΘÖñµëÇµ£ë timeout
						try { stopAutoSpinLoop(); } catch(e) {}
						
						// Φ¿¡τ╜«µê░Θ¼ÑτïÇµàïτé║ false
						this.inBattle = false;
						
						// τªüτö¿µê░Θ¼Ñτ¢╕Θù£µîëΘêò
						spinBtn.disabled = true;
						stopBtn.disabled = true;
						
						// τªüτö¿Σ╕ªΘçìτ╜«Φç¬σïòµùïΦ╜ëµîëΘêò
						const autoBtn = document.getElementById('auto-spin-btn'); 
						if (autoBtn) {
							autoBtn.disabled = true;
							autoBtn.textContent = 'Φç¬σïòµùïΦ╜ë'; // τó║Σ┐¥µûçσ¡ùΘçìτ╜«
							autoBtn.style.background = ''; // Θçìτ╜«ΦâîµÖ»Φë▓
						}
						
						// σòƒτö¿τº╗σïòµîëΘêò
						const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
						const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
						const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
						
						this.enemy.turnsToAttack = 3;
						
						// µê░Θ¼Ñτ╡Éµ¥ƒσ╛îτöƒµêÉµû░τÜäµû╣σÉæµÅÉτñ║
						this.generateDirectionHints();
					}
				}

		// µ¬óµƒÑµò╡Σ║║µêûτÄ⌐σ«╢µ¡╗Σ║í
		// σ╖▓σ£¿µê░Θ¼Ñµ╡üτ¿ïΣ╕¡ΦÖòτÉåµò╡Σ║║µ¡╗Σ║íΦêçτìÄσï╡
		// ΦïÑτÄ⌐σ«╢ HP µ¡╕Θ¢╢∩╝îσÿùΦ⌐ªΣ╜┐τö¿ΦâîσîàΦùÑµ░┤σ╛⌐µ┤╗∩╝¢ΦïÑτäíΦùÑµ░┤σëçµ¡╗Σ║í
		if (this.player.hp <= 0) {
			if (this.player.potions > 0) {
				this.player.potions -= 1;
				this.player.hp = this.player.max_hp;
				this.player.stamina = this.player.max_stamina;
				showMessage(`HP µ¡╕Θ¢╢∩╝îµ╢êΦÇùΣ╕Çτô╢ΦùÑµ░┤Φç¬σïòσ╛⌐µ┤╗Σ╕ªσ¢₧µ╗┐ HP/Θ½öσè¢πÇéσë⌐ΘñÿΦùÑµ░┤∩╝Ü${this.player.potions}`);
			} else {
				showMessage('Σ╜áσÇÆΣ╕ïΣ║å∩╝îΘüèµê▓τ╡Éµ¥ƒπÇéµ▓Æµ£ëΦùÑµ░┤σÅ»τö¿πÇéΦ½ïΘçìµû░µò┤τÉåΘáüΘ¥óΣ╗ÑΘçìτÄ⌐πÇé');
				// σü£µ¡óΦç¬σïòµùïΦ╜ë
				try { stopAutoSpinLoop(); } catch(e) {}
				// Φ¿¡τ╜«µê░Θ¼ÑτïÇµàïτé║ false
				this.inBattle = false;
				// τªüτö¿µîëΘêò
				spinBtn.disabled = true;
				stopBtn.disabled = true;
				// τªüτö¿Σ╕ªΘçìτ╜«Φç¬σïòµùïΦ╜ëµîëΘêò
				const autoBtn = document.getElementById('auto-spin-btn'); 
				if (autoBtn) {
					autoBtn.disabled = true;
					autoBtn.textContent = 'Φç¬σïòµùïΦ╜ë';
					autoBtn.style.background = '';
				}
			}
		}			this.updateStatus();
			
			// σ£¿updateStatusσ╛îσåìµ¼íµ¬óµƒÑµê░Θ¼ÑτïÇµàï∩╝îτó║Σ┐¥Φç¬σïòµùïΦ╜ëµ¡úτó║σü£µ¡ó
			if (!this.inBattle && typeof stopAutoSpinLoop === 'function') {
				try { 
					stopAutoSpinLoop(); 
					// σ╝╖σê╢τªüτö¿µùïΦ╜ëµîëΘêò
					if (typeof spinBtn !== 'undefined') spinBtn.disabled = true;
					if (typeof stopBtn !== 'undefined') stopBtn.disabled = true;
				} catch(e) {
					console.error('σ╝╖σê╢σü£µ¡óΦç¬σïòµùïΦ╜ëσñ▒µòù:', e);
				}
			}
		}
	}

	const game = new Game();
	game.updateStatus();
	
	// Θí»τñ║σê¥σºïµû╣σÉæµÅÉτñ║
	game.generateDirectionHints();

	// 新增事件處理方法（附加到 Game.prototype）
Game.prototype.lostMerchant = function() {
	showMessage('你遇到了一位迷路的商人，他似乎丟失了一些貨物。');
	const roll = Math.random();
	if (roll < 0.45) {
		const gold = 60 + Math.floor(Math.random() * 90);
		this.player.gold += gold;
		showMessage(`幫助商人取回貨品，商人感激地給你 ${gold} 金幣作為回報。`);
	} else if (roll < 0.8) {
		this.player.potions += 1;
		showMessage('商人送你一瓶藥水作為謝禮。');
	} else {
		showMessage('商人希望與你交易：他願意用一件普通物品交換 120 金幣。');
		if (this.player.inventory.length > 0 && this.player.gold < 120) {
			const idx = Math.floor(Math.random() * this.player.inventory.length);
			const it = this.player.inventory.splice(idx, 1)[0];
			this.player.gold += 120;
			showMessage(`你出售 ${it.name} 給商人，獲得 120 金幣。`);
		} else {
			showMessage('你覺得交易條件不划算，商人離開了。');
		}
	}
	this.updateStatus();
};

Game.prototype.cursedShrine = function() {
	showMessage('你發現了一座帶有詭異符文的祭壇。');
	if (Math.random() < 0.6) {
		const hpLoss = 10 + Math.floor(Math.random() * 20);
		this.player.hp = Math.max(1, this.player.hp - hpLoss);
		showMessage(`祭壇釋放詛咒，失去 ${hpLoss} 點 HP。`);
		if (Math.random() < 0.4) {
			this.player.luck_combat += 1;
			showMessage('你找到方法削弱了詛咒，獲得 戰鬥幸運 +1 作為補償。');
		}
	} else {
		const shieldGain = 20 + Math.floor(Math.random() * 30);
		this.player.shield += shieldGain;
		showMessage(`祭壇反而祝福了你：護盾 +${shieldGain}。`);
	}
	this.updateStatus();
};

Game.prototype.banditAmbush = function() {
	showMessage('一群強盜突然跳出來攔截你！你被迫戰鬥或逃跑。');
	if (Math.random() < 0.5) {
		showMessage('你成功躲過一部分攻擊，但仍受些傷。');
		const dmg = 8 + Math.floor(Math.random() * 12);
		this.player.hp = Math.max(1, this.player.hp - dmg);
		this.player.gold = Math.max(0, this.player.gold - 20);
		showMessage(`HP -${dmg}，被搶走 20 金幣。`);
	} else {
		showMessage('你被迫進入戰鬥（立即觸發一場小型戰鬥）。');
		this.battle('bandit');
	}
	this.updateStatus();
};

Game.prototype.ancientPuzzle = function() {
	showMessage('你發現了一個古老的機關謎題。解開它可能有豐厚獎勵。');
	const choice = Math.random();
	if (choice < 0.5) {
		const xp = 20 + Math.floor(Math.random() * 40);
		this.addXP(xp);
		showMessage(`你巧妙解開了謎題：獲得經驗值 +${xp}。`);
	} else if (choice < 0.85) {
		this.player.potions += 2;
		showMessage('謎題吐出了一些補給：藥水 x2。');
	} else {
		const dmg = 12 + Math.floor(Math.random() * 18);
		this.player.hp = Math.max(1, this.player.hp - dmg);
		showMessage(`機關反噬：受到 ${dmg} 點傷害。`);
	}
	this.updateStatus();
};

Game.prototype.desertOasis = function() {
	showMessage('你發現了一處綠洲，短暫休息可以恢復狀態或遇到旅人。');
	if (Math.random() < 0.5) {
		const hpGain = Math.floor(this.player.max_hp * 0.3);
		const stamGain = Math.floor(this.player.max_stamina * 0.3);
		this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
		this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + stamGain);
		showMessage(`短暫休息：HP +${hpGain}，體力 +${stamGain}。`);
	} else {
		const gold = 30 + Math.floor(Math.random() * 60);
		this.player.gold += gold;
		showMessage(`你在綠洲救助一名旅人，他感謝你並給予 ${gold} 金幣。`);
	}
	this.updateStatus();
};

	// µÄºσê╢µùïΦ╜ëτÜä interval
	const reelState = reels.map(()=>({interval:null, spinning:false}));

// Φç¬σïòµùïΦ╜ëµÄºσê╢
let autoSpin = false;
let autoSpinTimer = null;
let autoSpinTimer2 = null; // τö¿µû╝Φ┐╜Φ╣ñσ╡îσÑùτÜäτ¼¼Σ║îσÇï timeout
let autoSpinActive = false;

function stopAutoSpinLoop() {
	autoSpin = false;
	// µ╕àΘÖñµëÇµ£ëσÅ»Φâ╜τÜä timeout
	if (autoSpinTimer) { clearTimeout(autoSpinTimer); autoSpinTimer = null; }
	if (autoSpinTimer2) { clearTimeout(autoSpinTimer2); autoSpinTimer2 = null; }
	autoSpinActive = false;
	const btn = document.getElementById('auto-spin-btn'); 
	if (btn) {
		btn.textContent = 'Φç¬σïòµùïΦ╜ë';
		// σ╝╖σê╢τº╗ΘÖñσÅ»Φâ╜τÜäσòƒτö¿τïÇµàïµ¿úσ╝Å
		btn.style.background = '';
		btn.classList.remove('active');
	}
}

function runAutoCycle() {
	// µ»Åµ¼íσƒ╖Φíîσëìσàêµ¬óµƒÑµê░Θ¼ÑτïÇµàïσÆî autoSpin µ¿ÖΦ¿ÿ
	if (!autoSpin || !game.inBattle) { 
		autoSpinActive = false; 
		stopAutoSpinLoop();
		return; 
	}
	if (stopBtn && !stopBtn.disabled) {
		// currently stopping; schedule next attempt
		autoSpinTimer = setTimeout(runAutoCycle, 300);
		return;
	}
	if (!spinBtn.disabled && game.inBattle) {
		// ΘûïσºïΣ╕Çµ¼íµëïσïòΘ╗₧µôèµ╡üτ¿ï∩╝êσåìµ¼íτó║Φ¬ìµê░Θ¼ÑτïÇµàï∩╝ë
		spinBtn.click();
		const delay = 800 + Math.floor(Math.random()*600);
		autoSpinTimer = setTimeout(()=>{
			// σåìµ¼íµ¬óµƒÑµÿ»σÉªΘ£ÇΦªüσü£µ¡ó
			if (!autoSpin || !game.inBattle) {
				stopAutoSpinLoop();
				return;
			}
			// τó║Σ┐¥Θéäσ£¿µê░Θ¼ÑΣ╕¡µëìΘ╗₧µôèσü£µ¡ó
			if (!stopBtn.disabled && game.inBattle) stopBtn.click();
			// schedule next cycle after slight pause to allow results
			autoSpinTimer2 = setTimeout(()=>{
				// τ¼¼Σ╕ëµ¼íµ¬óµƒÑ
				if (!autoSpin || !game.inBattle) {
					stopAutoSpinLoop();
					return;
				}
				runAutoCycle();
			}, 400);
		}, delay);
	} else {
		// τäíµ│òµùïΦ╜ëµêûΣ╕ìσ£¿µê░Θ¼ÑΣ╕¡∩╝îσü£µ¡óΦç¬σïòµùïΦ╜ë
		if (!game.inBattle) {
			stopAutoSpinLoop();
		} else {
			// τ¿ìσ╛îΘçìΦ⌐ª
			autoSpinTimer = setTimeout(runAutoCycle, 500);
		}
	}
}

function startAutoSpinLoop() {
	if (autoSpinActive) return;
	autoSpinActive = true;
	runAutoCycle();
}

	function startSpin() {
		// Σ╗Ñσ┐½ΘÇƒµö╣Φ«è translateY Σ╛åµ¿íµô¼ΘÇúτ║îµùïΦ╜ë
		for (let i = 0; i < reels.length; i++) {
			const strip = reels[i].querySelector('.strip');
			if (!strip) continue;
			reelState[i].spinning = true;
			// Σ╜┐τö¿ requestAnimationFrame loop Σ╛åµö╣Φ«èΣ╜ìτ╜«
			let speed = 30 + Math.random()*20; // px per frame-ish
			reelState[i].anim = {pos: parseFloat(strip.style.transform.replace(/[^-0-9.]/g,'')) || 0, speed};
			const loop = () => {
				if (!reelState[i].spinning) return;
				reelState[i].anim.pos += reelState[i].anim.speed;
				// τò╢ pos Φ╢àΘüÄΣ╕Çµò┤τ╡äΘò╖σ║ª∩╝îσ¢₧τ╣₧
				const totalHeight = SYMBOLS.length * SYMBOL_HEIGHT * 8; // repeats
				if (reelState[i].anim.pos >= totalHeight) reelState[i].anim.pos -= totalHeight;
				strip.style.transform = `translateY(-${reelState[i].anim.pos}px)`;
				reelState[i].raf = requestAnimationFrame(loop);
			};
			reelState[i].raf = requestAnimationFrame(loop);
		}
	}

	function stopSequentially() {
		// τªüτö¿ stop µîëΘêò∩╝îΣ╛¥σ║Åσü£µ¡óµ»ÅΣ╕ÇΦ╗╕
		stopBtn.disabled = true;
		const results = [];
		const stopOne = (index) => {
			return new Promise((resolve) => {
				// ΘÜ¿µ⌐ƒΘü╕µôçΣ╕ÇσÇïτ¼ªΦÖƒΣ╜£τé║τ¢«µ¿Ö
				const targetSymbol = pickWeightedSymbol();
				const strip = reels[index].querySelector('.strip');
				// σü£µ¡ó spinning loop
				reelState[index].spinning = false;
				if (reelState[index].raf) cancelAnimationFrame(reelState[index].raf);

				// Φ¿êτ«ùτ¢«σëì pos
				let currentPos = reelState[index].anim ? reelState[index].anim.pos : 0;
				const repeats = 8;
				const totalHeight = SYMBOLS.length * SYMBOL_HEIGHT * repeats;
				const singleBlock = SYMBOLS.length * SYMBOL_HEIGHT; // one cycle height

				// Θü╕µôçτ¢«µ¿Öτ¼ªΦÖƒ
				const targetIdx = SYMBOLS.indexOf(targetSymbol);
				const symbolIndex = targetIdx >= 0 ? targetIdx : Math.floor(Math.random()*SYMBOLS.length);

				const extraRounds = Math.floor(Math.random()*3) + 1;

				// Θ½ÿΣ║«µíåσ£¿ top: 30px∩╝îΘ½ÿσ║ª 60px∩╝êΦªåΦôï 30-90px∩╝ë
				// ΦªüΦ«ôτ¼ªΦÖƒ N τÜäΘáéΘâ¿σ░ìΘ╜èσê░ 30px∩╝ÜtranslateY(-(N * 60 + 30))
				// σì│∩╝Üstrip Σ╜ìτ╜« = N * 60 + 30
				const baseCycle = Math.floor(currentPos / singleBlock);
				
				// τ¢«µ¿ÖΣ╜ìτ╜«∩╝Üτ¼ªΦÖƒτ┤óσ╝ò * 60 + 30∩╝êσüÅτº╗σê░Θ½ÿΣ║«µíåΣ╜ìτ╜«∩╝ë
				let candidate = baseCycle * singleBlock + symbolIndex * SYMBOL_HEIGHT + 30;
				
				// σªéµ₧£σ╖▓τ╢ôΘüÄΣ║å∩╝îτº╗σê░Σ╕ïΣ╕ÇσÇïσ╛¬τÆ░
				if (candidate <= currentPos) {
					candidate += singleBlock;
				}
				
				// σèáΣ╕èΘíìσñûτÜäµùïΦ╜ëσ£êµò╕
				const targetPos = candidate + extraRounds * singleBlock;

				// σ╣│µ╗æΦ╜ëσê░ targetPos
				const duration = 1000 + Math.random()*800; // ms
				const start = performance.now();
				const from = currentPos;
				const to = targetPos;

				const animateStop = (now) => {
					const t = Math.min(1, (now - start) / duration);
					const ease = 1 - Math.pow(1 - t, 3);
					const pos = from + (to - from) * ease;
					// Σ╗Ñ totalHeight σüÜµ¿íσ╛¬τÆ░
					strip.style.transform = `translateY(-${pos % totalHeight}px)`;
					if (t < 1) requestAnimationFrame(animateStop);
					else {
						// τó║Σ┐¥µ£Çτ╡éΣ╜ìτ╜«τ▓╛τó║σ░ìΘ╜è
						const finalPos = to % totalHeight;
						strip.style.transform = `translateY(-${finalPos}px)`;
						
						// τ¡ëσ╛àµ╕▓µƒôσ«îµêÉσ╛îΦ«ÇσÅûτ¼ªΦÖƒ
						setTimeout(() => {
							try {
								// Σ╜┐τö¿τò½Θ¥óσÅûµ¿úΣ╛åσêñσ«ÜΣ╕¡ΘûôτÜäτ¼ªΦÖƒ
								const rect = reels[index].getBoundingClientRect();
								const cx = rect.left + rect.width / 2;
								const cy = rect.top + rect.height / 2;
								let el = document.elementFromPoint(cx, cy);
								// σ╛ÇΣ╕èµë╛τê╢τ»ÇΘ╗₧∩╝îτ¢┤σê░µë╛σê░ .symbol
								while (el && !el.classList.contains('symbol')) {
									el = el.parentElement;
								}
								const landedSymbol = el ? el.textContent.trim() : targetSymbol;
								// τó║Σ┐¥τ¼ªΦÖƒΣ╕ìτé║τ⌐║∩╝îΣ╕öσ£¿µ£ëµòêτ¼ªΦÖƒσêùΦí¿Σ╕¡
								if (landedSymbol && SYMBOLS.includes(landedSymbol)) {
									results[index] = landedSymbol;
								} else {
									results[index] = targetSymbol;
								}
							} catch (e) {
								// σªéµ₧£σç║Θî»∩╝îτ¢┤µÄÑΣ╜┐τö¿τ¢«µ¿Öτ¼ªΦÖƒ
								results[index] = targetSymbol;
							}
							resolve();
						}, 50);
					}
				};
				requestAnimationFrame(animateStop);
			});
		};

		// σü£τ¼¼Σ╕ÇΦ╗╕∩╝îτ¼¼Σ╕ÇσÇïσü£µ¡óσ╛î∩╝îτ¼¼Σ║îτ¼¼Σ╕ëΦ╗╕τ¢┤µÄÑσü£µ¡ó∩╝êτäíσïòτò½∩╝ë
		stopOne(0).then(()=> {
			// τ¼¼Σ║îσÆîτ¼¼Σ╕ëΦ╗╕τ¢┤µÄÑσü£µ¡ó∩╝îτäíσ╗╢Θü▓σïòτò½
			const stopInstantly = (index) => {
				return new Promise((resolve) => {
					const targetSymbol = pickWeightedSymbol();
					const strip = reels[index].querySelector('.strip');
					reelState[index].spinning = false;
					if (reelState[index].raf) cancelAnimationFrame(reelState[index].raf);
					
					const targetIdx = SYMBOLS.indexOf(targetSymbol);
					const symbolIndex = targetIdx >= 0 ? targetIdx : 0;
					
					// Σ╜┐τö¿σ¢║σ«ÜτÜäσ╛¬τÆ░Σ╜ìτ╜«∩╝êτ¼¼2σÇïσ╛¬τÆ░∩╝ë∩╝îτó║Σ┐¥τ¼ªΦÖƒσ£¿σÅ»Φªûτ»äσ£ìσàº
					const repeats = 8;
					const singleBlock = SYMBOLS.length * SYMBOL_HEIGHT;
					const baseCycle = 2; // σ¢║σ«ÜΣ╜┐τö¿τ¼¼2σÇïσ╛¬τÆ░
					
					// τ¢«µ¿ÖΣ╜ìτ╜«∩╝Üτ¼ªΦÖƒΘáéΘâ¿σ░ìΘ╜èσê░Θ½ÿΣ║«µíåΣ╜ìτ╜«∩╝ê30px∩╝ë
					const finalPos = baseCycle * singleBlock + symbolIndex * SYMBOL_HEIGHT + 30;
					
					strip.style.transition = 'transform 0.15s ease-out';
					strip.style.transform = `translateY(-${finalPos}px)`;
					
					// τ¡ëσ╛àσïòτò½σ«îµêÉσ╛îΦ«ÇσÅûσ»ªΘÜ¢Θí»τñ║τÜäτ¼ªΦÖƒ
					setTimeout(() => {
						strip.style.transition = '';
						
						// σ╛₧τò½Θ¥óΦ«ÇσÅûσ»ªΘÜ¢Θí»τñ║τÜäτ¼ªΦÖƒ
						try {
							const rect = reels[index].getBoundingClientRect();
							const cx = rect.left + rect.width / 2;
							const cy = rect.top + rect.height / 2;
							let el = document.elementFromPoint(cx, cy);
							let attempts = 0;
							while (el && !el.classList.contains('symbol') && attempts < 10) {
								el = el.parentElement;
								attempts++;
							}
							if (el && el.classList.contains('symbol')) {
								const landedSymbol = el.textContent.trim();
								if (landedSymbol && SYMBOLS.includes(landedSymbol)) {
									results[index] = landedSymbol;
								} else {
									results[index] = targetSymbol;
								}
							} else {
								results[index] = targetSymbol;
							}
						} catch (e) {
							console.error('Error reading symbol:', e);
							results[index] = targetSymbol;
						}
						resolve();
					}, 250);
				});
			};
			
			return Promise.all([stopInstantly(1), stopInstantly(2)]);
		}).then(()=> {
			// σåìµ¼íτ¡ëσ╛àτó║Σ┐¥µëÇµ£ëσïòτò½σ«îµêÉ
			return new Promise(resolve => setTimeout(resolve, 50));
		}).then(()=> {
			showMessage(`µÅÆµº╜τ╡Éµ₧£∩╝Ü ${results.join(' | ')}`);
			// µèèτ╡Éµ₧£σé│τ╡ªΘüèµê▓ΘéÅΦ╝»ΘÇ▓ΦíîΦÖòτÉå∩╝êattack/skill/defend/enemy∩╝ë
			try {
				game.applySlotResults(results);
			} catch (e) {
				console.error(e);
			}
			
			// µ¬óµƒÑµê░Θ¼Ñµÿ»σÉªσ╖▓τ╡Éµ¥ƒ∩╝îσªéµ₧£σ╖▓τ╡Éµ¥ƒσëçσü£µ¡óΦç¬σïòµùïΦ╜ë
			if (!game.inBattle) {
				try { stopAutoSpinLoop(); } catch(e) {}
			}
			
			// σòƒτö¿ spin∩╝êσªéµ₧£Θéäσ£¿µê░Θ¼ÑΣ╕¡∩╝ë
			if (game.inBattle) {
				spinBtn.disabled = false;
			}
			stopBtn.disabled = true;
		});
	}

	// Σ║ïΣ╗╢
	spinBtn.addEventListener('click', ()=>{
		if (!game.inBattle) {
			showMessage('τ¢«σëìΣ╕ìσ£¿µê░Θ¼ÑΣ╕¡∩╝îτäíµ│òΣ╜┐τö¿µùïΦ╜ëπÇé');
			return;
		}
		spinBtn.disabled = true;
		stopBtn.disabled = false;
		showMessage('ΘûïσºïµùïΦ╜ë...');
		startSpin();
	});

	stopBtn.addEventListener('click', ()=>{
		stopSequentially();
	});

	// τ░íσû«τÜäΦ╝╕σàÑΦÖòτÉå∩╝êΣ┐¥τòÖτö¿µê╢σÄƒµ£¼τÜäµîçΣ╗ñΦ╝╕σàÑµíåσèƒΦâ╜∩╝ë
	button.addEventListener('click', function() {
		const cmd = input.value.trim();
		if (!cmd) { showMessage('Φ½ïΦ╝╕σàÑµîçΣ╗ñπÇé'); return; }
		showMessage(`Σ╜áΦ╝╕σàÑΣ║å∩╝Ü${cmd}`);
		input.value = '';
	});

	input.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') button.click();
	});

	// τº╗σïòµîëΘêò
	const moveFront = document.getElementById('move-front');
	const moveLeft = document.getElementById('move-left');
	const moveRight = document.getElementById('move-right');
	if (moveFront) moveFront.addEventListener('click', ()=> { if (game.inBattle) { showMessage('τ¢«σëìσ£¿µê░Θ¼ÑΣ╕¡∩╝îτäíµ│òτº╗σïòπÇé'); return; } game.moveStep('σëì'); });
	if (moveLeft) moveLeft.addEventListener('click', ()=> { if (game.inBattle) { showMessage('τ¢«σëìσ£¿µê░Θ¼ÑΣ╕¡∩╝îτäíµ│òτº╗σïòπÇé'); return; } game.moveStep('σ╖ª'); });
	if (moveRight) moveRight.addEventListener('click', ()=> { if (game.inBattle) { showMessage('τ¢«σëìσ£¿µê░Θ¼ÑΣ╕¡∩╝îτäíµ│òτº╗σïòπÇé'); return; } game.moveStep('σÅ│'); });

	// Φú¥σéÖµîëΘêòΦíîτé║
	const equipBtn = document.getElementById('equip-btn');
	const closeEquip = document.getElementById('close-equip');
	if (equipBtn) equipBtn.addEventListener('click', ()=> { game.showEquipmentPanel(); });
	if (closeEquip) closeEquip.addEventListener('click', ()=> { const p = document.getElementById('equipment-panel'); if (p) p.style.display = 'none'; });

		// µ»Åµ¼íµ¢┤µû░τïÇµàïσ╛îµ£âσ£¿ updateStatus() σàºτ╢üσ«ÜΘÇÖΣ║¢µîëΘêò∩╝îΣ╜åσê¥σºïΣ╣ƒτ╢üΣ╕Çµ¼íΣ┐¥ΘÜ¬
		function bindStatusEquipButtons() {
			// panels generated in updateStatus -> look for these classes
			Array.from(document.querySelectorAll('.unequip-btn')).forEach(b=>{
				if (b._bound) return; b._bound = true;
				b.addEventListener('click', ()=>{ const slot = b.getAttribute('data-slot'); game.unequipItem(slot); });
			});
			Array.from(document.querySelectorAll('.open-equip-btn')).forEach(b=>{
				if (b._bound) return; b._bound = true;
				b.addEventListener('click', ()=>{ const slot = b.getAttribute('data-slot'); game.showEquipmentPanel(slot); });
			});
		}
		bindStatusEquipButtons();

	// Φç¬σïòµùïΦ╜ëΦêçΘÇâΦ╖æµîëΘêòτ╢üσ«Ü
	const autoBtn = document.getElementById('auto-spin-btn');
	if (autoBtn) autoBtn.addEventListener('click', ()=>{
		if (!game.inBattle) {
			showMessage('τ¢«σëìΣ╕ìσ£¿µê░Θ¼ÑΣ╕¡∩╝îτäíµ│òΣ╜┐τö¿Φç¬σïòµùïΦ╜ëπÇé');
			return;
		}
		autoSpin = !autoSpin;
		autoBtn.textContent = autoSpin ? 'σü£µ¡óΦç¬σïò' : 'Φç¬σïòµùïΦ╜ë';
		if (autoSpin) startAutoSpinLoop(); else stopAutoSpinLoop();
	});
	const fleeBtn = document.getElementById('flee-btn');
	if (fleeBtn) fleeBtn.addEventListener('click', ()=>{ game.attemptFlee(); });

	// σ«Üµ£ƒµ¬óµƒÑµê░Θ¼ÑτïÇµàï∩╝îτó║Σ┐¥Φç¬σïòµùïΦ╜ëσ£¿µê░Θ¼Ñτ╡Éµ¥ƒµÖéσü£µ¡ó
	setInterval(() => {
		if (!game.inBattle && autoSpin) {
			console.log('µ¬óµ╕¼σê░µê░Θ¼Ñσ╖▓τ╡Éµ¥ƒΣ╜åΦç¬σïòµùïΦ╜ëµ£¬σü£µ¡ó∩╝îσ╝╖σê╢σü£µ¡ó');
			stopAutoSpinLoop();
		}
	}, 500); // µ»Å500msµ¬óµƒÑΣ╕Çµ¼í	// σä▓σ¡ÿ/Φ«ÇσÅûσèƒΦâ╜
	const saveBtn = document.getElementById('save-btn');
	const loadBtn = document.getElementById('load-btn');

	if (saveBtn) saveBtn.addEventListener('click', ()=>{
		try {
			const saveData = {
				player: game.player,
				enemy: game.enemy,
				inBattle: game.inBattle,
				consecutivePrimarySymbol: game.consecutivePrimarySymbol,
				consecutivePrimaryCount: game.consecutivePrimaryCount,
				map_steps: game.map_steps,
				map_goal: game.map_goal,
				difficulty: game.difficulty,
				inPyramid: game.inPyramid,
				pyramidSteps: game.pyramidSteps,
				pyramidMaxSteps: game.pyramidMaxSteps,
				normalMapSteps: game.normalMapSteps,
				timestamp: Date.now()
			};
			const saveString = JSON.stringify(saveData);
			localStorage.setItem('egypt_adventures_save', saveString);
			
			// Θ⌐ùΦ¡ëσä▓σ¡ÿµÿ»σÉªµêÉσèƒ
			const verify = localStorage.getItem('egypt_adventures_save');
			if (verify && verify === saveString) {
				const saveDate = new Date(saveData.timestamp);
				showMessage(`≡ƒÆ╛ Θüèµê▓σ╖▓σä▓σ¡ÿ∩╝ü(τ¡ëτ┤Ü ${game.player.level}, Θçæσ╣ú ${game.player.gold}, µÖéΘûô ${saveDate.toLocaleTimeString('zh-TW')})`);
			} else {
				showMessage('ΓÜá∩╕Å σä▓σ¡ÿσÅ»Φâ╜σñ▒µòù∩╝îΦ½ïµ¬óµƒÑτÇÅΦª╜σÖ¿Φ¿¡σ«Üµÿ»σÉªσàüΦ¿▒ localStorage');
			}
		} catch (e) {
			showMessage('Γ¥î σä▓σ¡ÿσñ▒µòù∩╝Ü' + e.message);
			console.error('Save error:', e);
		}
	});

	if (loadBtn) loadBtn.addEventListener('click', ()=>{
		try {
			const saveData = localStorage.getItem('egypt_adventures_save');
			if (!saveData) {
				showMessage('Γ¥î µë╛Σ╕ìσê░σ¡ÿµ¬ö∩╝üΦ½ïσàêΘ╗₧µôèπÇîσä▓σ¡ÿπÇìµîëΘêòσ╗║τ½ïσ¡ÿµ¬öπÇé');
				return;
			}
			console.log('Load data length:', saveData.length);
			const data = JSON.parse(saveData);
			
			// ΘéäσÄƒτÄ⌐σ«╢τïÇµàï
			game.player = data.player;
			game.enemy = data.enemy;
			game.inBattle = data.inBattle;
			game.consecutivePrimarySymbol = data.consecutivePrimarySymbol;
			game.consecutivePrimaryCount = data.consecutivePrimaryCount;
			game.map_steps = data.map_steps;
			game.map_goal = data.map_goal;
			game.difficulty = data.difficulty;
			game.inPyramid = data.inPyramid || false;
			game.pyramidSteps = data.pyramidSteps || 0;
			game.pyramidMaxSteps = data.pyramidMaxSteps || 8;
			game.normalMapSteps = data.normalMapSteps || 0;
			
			// µ¢┤µû░UIτïÇµàï
			if (game.inBattle) {
				spinBtn.disabled = false;
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = false;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			} else {
				spinBtn.disabled = true;
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
			}
			
			game.updateStatus();
			const saveDate = new Date(data.timestamp);
			showMessage(`≡ƒôé Φ«ÇσÅûµêÉσèƒ∩╝üσ¡ÿµ¬öµÖéΘûô∩╝Ü${saveDate.toLocaleString('zh-TW')}`);
		} catch (e) {
			showMessage('Γ¥î Φ«ÇσÅûσñ▒µòù∩╝Ü' + e.message);
		}
	});

	// σê¥σºïµ¡íΦ┐ÄΦ¿èµü»σ╖▓µö╛σ£¿ΘáüΘ¥óΣ╕èµû╣∩╝ê#welcome-panel∩╝ë∩╝îΣ╕ìΘçìΦñçΘí»τñ║σ£¿Φ¿èµü»σìÇπÇé

	// ============================================
	// DEBUG MODE - Press Ctrl+D to toggle
	// ============================================
	let debugMode = false;
	const debugPanel = createDebugPanel();

	function createDebugPanel() {
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
			<h2 style="margin-top: 0; color: #0f0; text-align: center; text-shadow: 0 0 10px #0f0;">≡ƒ¢á∩╕Å DEBUG MODE ≡ƒ¢á∩╕Å</h2>
			<div style="margin-bottom: 16px; padding: 8px; background: rgba(0, 255, 0, 0.1); border-radius: 4px;">
				<div style="margin-bottom: 4px;">σ┐½µì╖Θì╡: <strong>Ctrl+Shift+D</strong> ΘûïΘù£ΘÖñΘî»Θ¥óµ¥┐</div>
				<div>Σ┐«µö╣µò╕σÇ╝σ╛îµ£âτ½ïσì│σÑùτö¿σê░Θüèµê▓τïÇµàï</div>
			</div>
			
			<div class="debug-section">
				<h3>τÄ⌐σ«╢τïÇµàï</h3>
				<div class="debug-input-row">
					<label>HP: <input type="number" id="debug-hp" /></label>
					<label>µ£ÇσñºHP: <input type="number" id="debug-max-hp" /></label>
				</div>
				<div class="debug-input-row">
					<label>Θ½öσè¢: <input type="number" id="debug-stamina" /></label>
					<label>µ£ÇσñºΘ½öσè¢: <input type="number" id="debug-max-stamina" /></label>
				</div>
				<div class="debug-input-row">
					<label>Φ¡╖τ¢╛: <input type="number" id="debug-shield" /></label>
					<label>ΦùÑµ░┤: <input type="number" id="debug-potions" /></label>
				</div>
				<div class="debug-input-row">
					<label>Θçæσ╣ú: <input type="number" id="debug-gold" /></label>
					<label>τ¡ëτ┤Ü: <input type="number" id="debug-level" /></label>
				</div>
				<div class="debug-input-row">
					<label>τ╢ôΘ⌐ùσÇ╝: <input type="number" id="debug-xp" /></label>
					<label>µê░Θ¼Ñσ╣╕Θüï: <input type="number" id="debug-luck-combat" /></label>
				</div>
				<div class="debug-input-row">
					<label>Θçæσ╣úσ╣╕Θüï: <input type="number" id="debug-luck-gold" /></label>
				</div>
			</div>

			<div class="debug-section">
				<h3>σ£░σ£ûτïÇµàï</h3>
				<div class="debug-input-row">
					<label>σ╖▓τº╗σïòµ¡Ñµò╕: <input type="number" id="debug-map-steps" /></label>
					<label>τ¢«µ¿Öµ¡Ñµò╕: <input type="number" id="debug-map-goal" /></label>
				</div>
				<div class="debug-input-row">
					<label>Θ¢úσ║ª: <input type="number" id="debug-difficulty" /></label>
					<label>
						Θçæσ¡ùσíöµ¿íσ╝Å: 
						<input type="checkbox" id="debug-in-pyramid" />
					</label>
				</div>
				<div class="debug-input-row">
					<label>Θçæσ¡ùσíöµ¡Ñµò╕: <input type="number" id="debug-pyramid-steps" /></label>
				</div>
			</div>

			<div class="debug-section">
				<h3>µê░Θ¼ÑτïÇµàï</h3>
				<div class="debug-input-row">
					<label>
						ΘÇ▓ΦíîΣ╕¡: 
						<input type="checkbox" id="debug-in-battle" />
					</label>
				</div>
				<div id="debug-enemy-section">
					<div class="debug-input-row">
						<label>µò╡Σ║║HP: <input type="number" id="debug-enemy-hp" /></label>
						<label>µò╡Σ║║µ£ÇσñºHP: <input type="number" id="debug-enemy-max-hp" /></label>
					</div>
					<div class="debug-input-row">
						<label>µò╡Σ║║µö╗µôè: <input type="number" id="debug-enemy-attack" /></label>
						<label>µö╗µôèσÇÆµò╕: <input type="number" id="debug-enemy-turns" /></label>
					</div>
					<div class="debug-input-row">
						<label>µò╡Σ║║σ╝╖σ║ª: <input type="number" step="0.1" id="debug-enemy-strength" /></label>
					</div>
				</div>
			</div>

			<div class="debug-section">
				<h3>σ┐½ΘÇƒµôìΣ╜£</h3>
				<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
					<button class="debug-btn" id="debug-heal-full">σ«îσà¿µüóσ╛⌐</button>
					<button class="debug-btn" id="debug-add-gold">+1000Θçæσ╣ú</button>
					<button class="debug-btn" id="debug-level-up">σìçτ┤Ü</button>
					<button class="debug-btn" id="debug-kill-enemy">τºÆµ«║µò╡Σ║║</button>
					<button class="debug-btn" id="debug-add-item">ΘÜ¿µ⌐ƒΦú¥σéÖ</button>
					<button class="debug-btn" id="debug-start-battle">Θûïσºïµê░Θ¼Ñ</button>
					<button class="debug-btn" id="debug-end-battle">τ╡Éµ¥ƒµê░Θ¼Ñ</button>
					<button class="debug-btn" id="debug-enter-pyramid">ΘÇ▓σàÑΘçæσ¡ùσíö</button>
				</div>
			</div>

			<div style="margin-top: 16px; text-align: center;">
				<button class="debug-btn" id="debug-apply" style="background: #0a0; font-size: 1.1em; padding: 10px 20px;">σÑùτö¿Φ«èµ¢┤</button>
				<button class="debug-btn" id="debug-close" style="background: #a00; font-size: 1.1em; padding: 10px 20px;">Θù£Θûë</button>
			</div>
		`;

		// Add styles for debug panel elements
		const style = document.createElement('style');
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

		document.body.appendChild(panel);
		return panel;
	}

	function loadDebugValues() {
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
	}

	function applyDebugChanges() {
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
				spinBtn.disabled = false;
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = false;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			}
		} else if (wasBattle && !game.inBattle) {
			// Disable battle controls
			spinBtn.disabled = true;
			const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
		}
		
		game.updateStatus();
		showMessage('≡ƒ¢á∩╕Å Debug: Θüèµê▓τïÇµàïσ╖▓µ¢┤µû░');
	}

	// Debug quick actions
	document.getElementById('debug-heal-full').addEventListener('click', () => {
		game.player.hp = game.player.max_hp;
		game.player.stamina = game.player.max_stamina;
		game.player.shield = 0;
		loadDebugValues();
		game.updateStatus();
		showMessage('≡ƒ¢á∩╕Å Debug: σ«îσà¿µüóσ╛⌐');
	});

	document.getElementById('debug-add-gold').addEventListener('click', () => {
		game.player.gold += 1000;
		loadDebugValues();
		game.updateStatus();
		showMessage('≡ƒ¢á∩╕Å Debug: +1000 Θçæσ╣ú');
	});

	document.getElementById('debug-level-up').addEventListener('click', () => {
		game.player.level += 1;
		game.player.max_hp += 10;
		game.player.max_stamina += 5;
		game.player.hp = Math.min(game.player.max_hp, game.player.hp + 10);
		game.player.stamina = Math.min(game.player.max_stamina, game.player.stamina + 5);
		loadDebugValues();
		game.updateStatus();
		showMessage('≡ƒ¢á∩╕Å Debug: σìçτ┤Ü');
	});

	document.getElementById('debug-kill-enemy').addEventListener('click', () => {
		if (game.inBattle) {
			game.enemy.hp = 0;
			loadDebugValues();
			game.updateStatus();
			showMessage('≡ƒ¢á∩╕Å Debug: µò╡Σ║║HPµ¡╕Θ¢╢');
		} else {
			showMessage('≡ƒ¢á∩╕Å Debug: τ¢«σëìΣ╕ìσ£¿µê░Θ¼ÑΣ╕¡');
		}
	});

	document.getElementById('debug-add-item').addEventListener('click', () => {
		const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
		const rarities = ['common', 'rare', 'excellent', 'epic', 'legendary'];
		const rarity = rarities[Math.floor(Math.random() * rarities.length)];
		const newItem = Object.assign({}, item, { rarity });
		game.player.inventory.push(newItem);
		showMessage(`≡ƒ¢á∩╕Å Debug: τì▓σ╛ù ${game.formatItem(newItem)}`);
	});

	document.getElementById('debug-start-battle').addEventListener('click', () => {
		if (!game.inBattle) {
			game.battle('monster');
			loadDebugValues();
			showMessage('≡ƒ¢á∩╕Å Debug: σ╝╖σê╢Θûïσºïµê░Θ¼Ñ');
		} else {
			showMessage('≡ƒ¢á∩╕Å Debug: σ╖▓σ£¿µê░Θ¼ÑΣ╕¡');
		}
	});

	document.getElementById('debug-end-battle').addEventListener('click', () => {
		if (game.inBattle) {
			game.inBattle = false;
			spinBtn.disabled = true;
			stopBtn.disabled = true;
			try { stopAutoSpinLoop(); } catch(e) {}
			const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
			loadDebugValues();
			game.updateStatus();
			showMessage('≡ƒ¢á∩╕Å Debug: σ╝╖σê╢τ╡Éµ¥ƒµê░Θ¼Ñ');
		} else {
			showMessage('≡ƒ¢á∩╕Å Debug: τ¢«σëìΣ╕ìσ£¿µê░Θ¼ÑΣ╕¡');
		}
	});

	document.getElementById('debug-enter-pyramid').addEventListener('click', () => {
		if (!game.inPyramid) {
			game.enterPyramid();
			loadDebugValues();
			showMessage('≡ƒ¢á∩╕Å Debug: ΘÇ▓σàÑΘçæσ¡ùσíö');
		} else {
			showMessage('≡ƒ¢á∩╕Å Debug: σ╖▓σ£¿Θçæσ¡ùσíöΣ╕¡');
		}
	});

	document.getElementById('debug-apply').addEventListener('click', () => {
		applyDebugChanges();
	});

	document.getElementById('debug-close').addEventListener('click', () => {
		debugPanel.style.display = 'none';
	});

	// Keyboard shortcut: Ctrl+Shift+D to toggle debug panel
	document.addEventListener('keydown', (e) => {
		if (e.ctrlKey && e.shiftKey && e.key === 'D') {
			e.preventDefault();
			debugMode = !debugMode;
			if (debugMode) {
				loadDebugValues();
				debugPanel.style.display = 'block';
				showMessage('≡ƒ¢á∩╕Å Debugµ¿íσ╝Åσ╖▓σòƒσïò (Ctrl+Shift+D Θù£Θûë)');
			} else {
				debugPanel.style.display = 'none';
				showMessage('≡ƒ¢á∩╕Å Debugµ¿íσ╝Åσ╖▓Θù£Θûë');
			}
		}
	});

	// Initial message about debug mode
	console.log('%c≡ƒ¢á∩╕Å DEBUG MODE AVAILABLE', 'color: #0f0; font-size: 16px; font-weight: bold;');
	console.log('%cPress Ctrl+Shift+D to toggle debug panel', 'color: #0ff; font-size: 14px;');
});


