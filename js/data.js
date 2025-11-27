// ===== 遊戲資料常數 =====

// Note: Event definitions moved to js/events/ modules (registry.js, travel.js, etc.)
// Events are now registered via EventRegistry.register() in each domain file

// Standard rarities in order (used by item generation)
const RARITIES = ['common', 'rare', 'excellent', 'epic', 'legendary'];

// Rarity scale multipliers for attribute scaling
const RARITY_SCALE = {
    common: 1,
    rare: 1.5,
    excellent: 1.8,
    epic: 2.2,
    legendary: 3.0
};

// Bonus count by rarity for quality bonuses
const BONUS_COUNT_BY_RARITY = {
    common: 0,
    rare: 2,
    excellent: 1,
    epic: 3,
    legendary: 4
};

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

// Note: chooseEvent() is now provided by EventRegistry in js/events/registry.js
// Note: pickWeightedSymbol, getSymbolHeight, getHighlightTop moved to js/core/Utils.js
