// ===== 遊戲資料常數 =====

// 事件列表與權重
const EVENTS = ['monster', 'elite', 'mini_boss', 'merchant', 'black_market', 'oasis', 'sandstorm', 'egyptian_god', 'pyramid', 'buried_treasure', 'dead_traveler', 'ancient_shrine', 'caravan_rest', 'mirage', 'nomad_camp', 'quicksand', 'scorpion_nest', 'ancient_ruins', 'mysterious_stranger', 'trading_post', 'empty', 'lost_merchant', 'cursed_shrine', 'bandit_ambush', 'ancient_puzzle', 'desert_oasis', 'sandstorm_shelter', 'wandering_alchemist', 'ancient_tablet', 'beast_pack', 'moonlight_altar', 'caravan_wreckage'];
const EVENT_WEIGHTS = [22,8,4,7,4,6,8,4,6,6,6,5,8,4,5,5,4,5,4,6,2,4,4,6,5,5,5,5,4,6,4,5];

// 敵人圖片 Mapping
const ENEMY_IMAGE_MAP = {
	monster: 'images/enemies/monster.png',
	elite: 'images/enemies/elite.png',
	mini_boss: 'images/enemies/mini_boss.png',
	default: 'images/enemies/monster.png'
};

// 裝備與掉落樣本（基礎屬性，品質會在生成時添加）
const ITEMS = [
	// 武器類
	{ name: '青銅劍', slot: 'weapon', atk: 3, rarity: 'common' },
	{ name: '鋼鐵劍', slot: 'weapon', atk: 6, rarity: 'common' },
	{ name: '法老彎刀', slot: 'weapon', atk: 8, rarity: 'common' },
	{ name: '聖甲蟲戰斧', slot: 'weapon', atk: 10, rarity: 'common' },
	{ name: '荷魯斯之劍', slot: 'weapon', atk: 12, rarity: 'common' },
	{ name: '阿努比斯之鎌', slot: 'weapon', atk: 15, rarity: 'common' },
	{ name: '太陽神之矛', slot: 'weapon', atk: 18, rarity: 'common' },

	// 防具類
	{ name: '皮甲', slot: 'armor', def: 2, rarity: 'common' },
	{ name: '鋼鐵鎧甲', slot: 'armor', def: 5, rarity: 'common' },
	{ name: '沙漠長袍', slot: 'armor', def: 3, rarity: 'common' },
	{ name: '法老護胸', slot: 'armor', def: 7, rarity: 'common' },
	{ name: '聖甲蟲鎧甲', slot: 'armor', def: 9, rarity: 'common' },
	{ name: '黃金戰甲', slot: 'armor', def: 12, rarity: 'common' },
	{ name: '神殿守護甲', slot: 'armor', def: 15, rarity: 'common' },

	// 護符類
	{ name: '幸運護符', slot: 'amulet', luck_gold: 1, rarity: 'common' },
	{ name: '戰鬥護符', slot: 'amulet', luck_combat: 1, rarity: 'common' },
	{ name: '聖甲蟲墜飾', slot: 'amulet', luck_gold: 2, rarity: 'common' },
	{ name: '荷魯斯之眼', slot: 'amulet', luck_combat: 2, rarity: 'common' },
	{ name: '生命之符', slot: 'amulet', max_hp_bonus: 20, rarity: 'common' },
	{ name: '力量之符', slot: 'amulet', atk: 3, rarity: 'common' },
	{ name: '守護之符', slot: 'amulet', def: 3, rarity: 'common' }
];

// 品質額外屬性池
const QUALITY_BONUS = {
	weapon: {
		// 武器額外屬性：暴擊率、連擊率、技能增幅
		common: [], // 普通無額外屬性
		rare: [ // 稀有：2個額外屬性
			{ crit_rate: 5 }, // +5% 暴擊率
			{ crit_rate: 8 },
			{ combo_rate: 8 }, // +8% 連擊維持率
			{ combo_rate: 12 },
			{ skill_power: 10 }, // +10% 技能傷害
			{ skill_power: 15 }
		],
		epic: [ // 史詩：2個額外屬性
			{ crit_rate: 10, combo_rate: 15 },
			{ crit_rate: 12, skill_power: 20 },
			{ combo_rate: 18, skill_power: 25 },
			{ crit_rate: 15, combo_rate: 20 },
			{ skill_power: 30, combo_rate: 15 }
		],
		legendary: [ // 傳說：4個額外屬性
			{ crit_rate: 20, combo_rate: 25, skill_power: 35, atk: 8 },
			{ crit_rate: 25, combo_rate: 30, skill_power: 40, dodge_rate: 10 },
			{ crit_rate: 22, combo_rate: 28, atk: 10, max_hp_bonus: 30 },
			{ skill_power: 50, crit_rate: 18, combo_rate: 22, luck_combat: 3 },
			{ combo_rate: 35, crit_rate: 20, skill_power: 30, stamina_bonus: 25 }
		]
	},
	armor: {
		common: [],
		rare: [ // 稀有：2個額外屬性
			{ max_hp_bonus: 15 }, // +15 最大生命
			{ max_hp_bonus: 20 },
			{ stamina_bonus: 10 }, // +10 最大體力
			{ stamina_bonus: 15 },
			{ dodge_rate: 5 }, // +5% 閃避率
			{ dodge_rate: 8 }
		],
		epic: [ // 史詩：2個額外屬性
			{ max_hp_bonus: 30, stamina_bonus: 20 },
			{ max_hp_bonus: 25, dodge_rate: 10 },
			{ stamina_bonus: 25, dodge_rate: 12 },
			{ max_hp_bonus: 40, dodge_rate: 8 },
			{ dodge_rate: 15, stamina_bonus: 30 }
		],
		legendary: [ // 傳說：4個額外屬性
			{ max_hp_bonus: 60, stamina_bonus: 40, dodge_rate: 18, def: 8 },
			{ max_hp_bonus: 50, dodge_rate: 20, stamina_bonus: 35, luck_combat: 2 },
			{ dodge_rate: 25, max_hp_bonus: 45, def: 10, stamina_bonus: 30 },
			{ stamina_bonus: 50, max_hp_bonus: 55, dodge_rate: 15, atk: 5 },
			{ max_hp_bonus: 70, dodge_rate: 18, stamina_bonus: 35, skill_power: 15 }
		]
	},
	amulet: {
		common: [],
		rare: [ // 稀有：2個額外屬性
			{ luck_combat: 1 },
			{ luck_gold: 1 },
			{ max_hp_bonus: 15 },
			{ atk: 2 },
			{ def: 2 }
		],
		epic: [ // 史詩：2個額外屬性
			{ luck_combat: 2, luck_gold: 2 },
			{ luck_combat: 2, max_hp_bonus: 25 },
			{ luck_gold: 2, atk: 4 },
			{ atk: 5, def: 5 },
			{ max_hp_bonus: 35, def: 3 }
		],
		legendary: [ // 傳說：4個額外屬性
			{ luck_combat: 4, luck_gold: 4, atk: 6, def: 6 },
			{ luck_combat: 3, max_hp_bonus: 50, atk: 8, crit_rate: 12 },
			{ luck_gold: 4, atk: 10, def: 8, skill_power: 20 },
			{ atk: 12, def: 10, max_hp_bonus: 40, dodge_rate: 12 },
			{ max_hp_bonus: 60, luck_combat: 3, luck_gold: 3, stamina_bonus: 30 }
		]
	}
};

// 金字塔裝備字綴系統（僅金字塔掉落裝備擁有）
const PYRAMID_AFFIXES = [
	{ id: 'ra', name: '太陽神拉之', color: '#FFD700', bonus: { atk: 3, crit_rate: 8 } },
	{ id: 'anubis', name: '死神阿努比斯之', color: '#8B4513', bonus: { def: 3, max_hp_bonus: 30 } },
	{ id: 'osiris', name: '冥王歐西里斯之', color: '#4B0082', bonus: { max_hp_bonus: 40, stamina_bonus: 20 } },
	{ id: 'horus', name: '荷魯斯之', color: '#1E90FF', bonus: { atk: 4, combo_rate: 12 } },
	{ id: 'isis', name: '女神伊西斯之', color: '#FF69B4', bonus: { luck_combat: 2, luck_gold: 2 } },
	{ id: 'thoth', name: '智慧神托特之', color: '#00CED1', bonus: { skill_power: 20, dodge_rate: 10 } }
];

// 套裝效果（需要武器+護甲+護符三件相同字綴，且同品質）
const SET_BONUSES = {
	'ra': { name: '太陽神的榮耀', effects: { atk: 10, crit_rate: 15, skill_power: 25 } },
	'anubis': { name: '死神的庇護', effects: { def: 10, max_hp_bonus: 80, dodge_rate: 15 } },
	'osiris': { name: '冥界的力量', effects: { max_hp_bonus: 100, stamina_bonus: 50, def: 8 } },
	'horus': { name: '天空之神的祝福', effects: { atk: 12, combo_rate: 20, crit_rate: 12 } },
	'isis': { name: '魔法女神的恩賜', effects: { luck_combat: 4, luck_gold: 4, max_hp_bonus: 50 } },
	'thoth': { name: '智慧的啟迪', effects: { skill_power: 40, dodge_rate: 20, stamina_bonus: 30 } }
};

// 符號與權重
const SYMBOLS = ['⚔️','⚡️','🛡️','💀','🧪','⭐','💰'];
const SYMBOL_WEIGHTS = {
	'⚔️': 6,
	'⚡️': 3,
	'🛡️': 3,
	'💀': 2,
	'🧪': 2,
	'⭐': 4,
	'💰': 2
};

// 事件選擇函數
function chooseEvent() {
	const total = EVENT_WEIGHTS.reduce((a,b)=>a+b,0);
	let r = Math.random() * total;
	for (let i=0,acc=0;i<EVENT_WEIGHTS.length;i++){
		acc += EVENT_WEIGHTS[i];
		if (r < acc) return EVENTS[i];
	}
	return 'empty';
}

// 加權符號選擇函數
function pickWeightedSymbol() {
	const pool = [];
	for (const s of SYMBOLS) {
		const w = SYMBOL_WEIGHTS[s] || 1;
		for (let i=0;i<w;i++) pool.push(s);
	}
	return pool[Math.floor(Math.random() * pool.length)];
}

// 動態獲取符號高度，根據螢幕寬度適配（與 CSS 同步）
function getSymbolHeight() {
	const width = window.innerWidth;
	// iPhone 15: 390px, iPhone 15 Plus: 428px, iPhone 15 Pro Max: 430px
	// 極小螢幕（<= 400px）使用 41px
	if (width <= 400) return 41;
	// 手機版（<= 600px）使用 60px
	if (width <= 600) return 60;
	// 桌面版使用 60px
	return 60;
}

// 動態獲取高亮框頂部位置（與 CSS 同步）
function getHighlightTop() {
	const width = window.innerWidth;
	// 極小螢幕：41px 符號，高亮框在 20.5px
	if (width <= 400) return 20.5;
	// 其他：60px 符號，高亮框在 30px
	return 30;
}
