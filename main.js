document.addEventListener('DOMContentLoaded', function() {
	const output = document.getElementById('game-output');
	const input = document.getElementById('game-input');
	const button = document.getElementById('submit-btn');
	const spinBtn = document.getElementById('spin-btn');
	const stopBtn = document.getElementById('stop-btn');

	// 初始不允許旋轉，直到玩家選擇移動方向
	spinBtn.disabled = true;
	const reels = [document.getElementById('reel-0'), document.getElementById('reel-1'), document.getElementById('reel-2')];

// 事件列表與權重（對應原 Python）
const EVENTS = ['monster', 'elite', 'mini_boss', 'merchant', 'black_market', 'oasis', 'sandstorm', 'egyptian_god', 'pyramid', 'empty'];
const EVENT_WEIGHTS = [30,10,5,10,5,5,10,5,2,18];

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
		// 新增一個訊息節點，並確保只保留最新20條
		const node = document.createElement('div');
		node.textContent = msg;
		output.appendChild(node);
		// 若超過20則，移除最舊的
		while (output.children.length > 20) {
			output.removeChild(output.firstChild);
		}
		// 自動捲動到最底
		output.scrollTop = output.scrollHeight;
	}

	// 插槽機符號（目前實裝的符號）
	// 我們使用加權方法讓攻擊符號出現機率較高
	const SYMBOLS = ['⚔️','⚡️','🛡️','💀','🧪','⭐','💰'];
	// 權重設定（可調）：攻擊較常出現
	const SYMBOL_WEIGHTS = {
		'⚔️': 6,
		'⚡️': 3,
		'🛡️': 3,
		'💀': 2,
		'🧪': 2,
		'⭐': 4,
		'💰': 2
	};

	function pickWeightedSymbol() {
		const pool = [];
		for (const s of SYMBOLS) {
			const w = SYMBOL_WEIGHTS[s] || 1;
			for (let i=0;i<w;i++) pool.push(s);
		}
		return pool[Math.floor(Math.random() * pool.length)];
	}
	const VISIBLE = 2; // 中間顯示1個，實作上每個 symbol 高度為 60px，reel 高度 120px
	const SYMBOL_HEIGHT = 60; // 與 CSS 同步

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
		rare: [ // 稀有：1個額外屬性
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
		]
	},
	armor: {
		common: [],
		rare: [ // 稀有：1個額外屬性
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
		]
	},
	amulet: {
		common: [],
		rare: [ // 稀有：1個額外屬性
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
		]
	}
};

function genEnemyName(type) {
	const prefixes = ['古夫', '阿努', '賽特', '拉', '梅特'];
	const suffixes = ['守衛', '戰士', '祭司', '掠奪者', '守護者'];
	const p = prefixes[Math.floor(Math.random()*prefixes.length)];
	const s = suffixes[Math.floor(Math.random()*suffixes.length)];
	let title = '';
	if (type === 'elite') title = '精英';
	else if (type === 'mini_boss') title = '小頭目';
	else title = '敵人';
	return `${p}${s} ${title}`;
}

	// 每軸建立長條（重複符號以便平滑旋轉）
	function populateReels() {
		for (let r = 0; r < reels.length; r++) {
			const strip = document.createElement('div');
			strip.className = 'strip';
			// 重複 SYMBOLS 以方便連續捲動
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
		// 初始位置：從中間組開始
		// 高亮框在 top: 30px (中心在 60px)，要讓符號對齊，需要讓某個符號的中心對齊到 60px
		// strip 往上移動到讓第 N 個符號的頂部在 30px 處
		const initialOffset = SYMBOL_HEIGHT * SYMBOLS.length * 2;
		strip.style.transform = `translateY(-${initialOffset}px)`;
		}
	}

	populateReels();

	// 簡單遊戲狀態（玩家與敵人）
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
			// 金字塔副本相關狀態
			this.inPyramid = false;
			this.pyramidSteps = 0;
			this.pyramidMaxSteps = 8;
			this.normalMapSteps = 0; // 儲存進入金字塔前的步數
		}

		// 經驗曲線：傳回升到下一等級所需的經驗值（簡單指數增長，可擴展至等級99）
		xpForNext(level) {
			// level 起始於 1，要升到 level+1 所需
			if (level >= 99) return Infinity;
			return Math.floor(100 * level * Math.pow(1.06, level-1));
		}

		addXP(amount) {
			this.player.xp += amount;
			showMessage(`獲得經驗值 ${amount}。`);
			// 自動升級迴圈（支援多等級升級）
			while (this.player.level < 99 && this.player.xp >= this.xpForNext(this.player.level)) {
				const need = this.xpForNext(this.player.level);
				this.player.xp -= need;
				this.player.level += 1;
				// 等級帶來的獎勵：提升最大生命與體力
				this.player.max_hp += 10;
				this.player.max_stamina += 5;
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + 10);
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 5);
				showMessage(`升級！你現在等級 ${this.player.level}（HP/體力上升）`);
			}
		}

		// 顯示/更新裝備面板（簡易介面），可選 filterSlot: 'weapon'|'armor'|'amulet' 或 null
		showEquipmentPanel(filterSlot = null) {
			// Helper: 格式化物品屬性顯示
			// 例：青銅劍 (攻+3)
			this.formatItem = function(it){
				if (!it) return '';
				const parts = [];
				if (it.atk) parts.push(`攻+${it.atk}`);
				if (it.def) parts.push(`防+${it.def}`);
				if (it.luck_gold) parts.push(`金運+${it.luck_gold}`);
				if (it.luck_combat) parts.push(`戰運+${it.luck_combat}`);
				if (it.max_hp_bonus) parts.push(`HP+${it.max_hp_bonus}`);
				if (it.stamina_bonus) parts.push(`體力+${it.stamina_bonus}`);
				if (it.crit_rate) parts.push(`暴擊+${it.crit_rate}%`);
				if (it.combo_rate) parts.push(`連擊+${it.combo_rate}%`);
				if (it.skill_power) parts.push(`技能+${it.skill_power}%`);
				if (it.dodge_rate) parts.push(`閃避+${it.dodge_rate}%`);
				const attr = parts.length ? ` (${parts.join(' ')})` : '';
				return `${it.name}${attr}`;
			};
			const panel = document.getElementById('equipment-panel');
			const content = document.getElementById('equip-content');
			if (!panel || !content) return;
			// 列出目前裝備與背包
			let html = `<div><strong>已裝備</strong></div>`;
			const weapText = this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : '無';
			const armText = this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : '無';
			const amuText = this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : '無';
			html += `<div>武器: ${weapText} <button class="unequip-inline" data-slot="weapon">卸下</button> <button class="open-equip-inline" data-slot="weapon">裝備</button></div>`;
			html += `<div>防具: ${armText} <button class="unequip-inline" data-slot="armor">卸下</button> <button class="open-equip-inline" data-slot="armor">裝備</button></div>`;
			html += `<div>護符: ${amuText} <button class="unequip-inline" data-slot="amulet">卸下</button> <button class="open-equip-inline" data-slot="amulet">裝備</button></div>`;
			html += `<hr/><div><strong>背包</strong></div>`;
			const inv = this.player.inventory;
			let shown = 0;
			for (let i=0;i<inv.length;i++){
				const it = inv[i];
				if (filterSlot && it.slot !== filterSlot) continue;
				shown++;
				const disp = this.formatItem(it) || `${it.name}`;
				html += `<div>${i+1}. ${disp} (${it.rarity}) <button data-idx="${i}" class="equip-now">裝備</button></div>`;
			}
			if (shown === 0) html += '<div>（無對應物品）</div>';
			content.innerHTML = html;
			panel.style.display = 'block';
			// 連結裝備按鈕
			Array.from(content.querySelectorAll('.equip-now')).forEach(b=>{
				b.addEventListener('click', (e)=>{
					const idx = parseInt(e.target.getAttribute('data-idx'));
					this.equipItem(idx);
					this.showEquipmentPanel(filterSlot);
				});
			});
			// 內嵌卸下/裝備按鈕（在面板內）
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
			this.player.equipment[it.slot] = it;
			showMessage(`裝備 ${it.name} 到 ${it.slot}`);
			// 應用裝備屬性加成
			if (it.luck_gold) {
				this.player.luck_gold += it.luck_gold;
				showMessage(`獲得金幣幸運 +${it.luck_gold}`);
			}
			if (it.max_hp_bonus) {
				this.player.max_hp += it.max_hp_bonus;
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + it.max_hp_bonus);
				showMessage(`最大生命 +${it.max_hp_bonus}`);
			}
			if (it.stamina_bonus) {
				this.player.max_stamina += it.stamina_bonus;
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + it.stamina_bonus);
				showMessage(`最大體力 +${it.stamina_bonus}`);
			}
			// 從背包中移除（簡單處理）
			this.player.inventory.splice(index,1);
			this.updateStatus();
		} else {
			showMessage('此物品無法裝備。');
		}
	}		unequipItem(slot) {
			if (!this.player.equipment || !this.player.equipment[slot]) { showMessage('此欄位沒有裝備。'); return; }
		const it = this.player.equipment[slot];
		this.player.inventory.push(it);
		this.player.equipment[slot] = null;
		showMessage(`卸下 ${it.name}，已放入背包。`);
		// 移除裝備屬性加成
		if (it.luck_gold) {
			this.player.luck_gold = Math.max(0, this.player.luck_gold - (it.luck_gold||0));
			showMessage(`金幣幸運 -${it.luck_gold}（剩餘 ${this.player.luck_gold}）。`);
		}
		if (it.max_hp_bonus) {
			this.player.max_hp = Math.max(1, this.player.max_hp - it.max_hp_bonus);
			this.player.hp = Math.min(this.player.max_hp, this.player.hp);
			showMessage(`最大生命 -${it.max_hp_bonus}`);
		}
		if (it.stamina_bonus) {
			this.player.max_stamina = Math.max(1, this.player.max_stamina - it.stamina_bonus);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina);
			showMessage(`最大體力 -${it.stamina_bonus}`);
		}
		this.updateStatus();
	}		updateStatus() {
			// 更新玩家狀態到左側面板
			const playerStatusEl = document.getElementById('player-status');
			const enemyStatusEl = document.getElementById('enemy-status');
			
			if (playerStatusEl) {
				// 計算 combo 顯示文字（若在戰鬥中）
				let comboText = '無';
				if (this.inBattle) {
					const sym = this.consecutivePrimarySymbol || '-';
					const count = this.consecutivePrimaryCount || 0;
					const mult = (1 + 0.12 * Math.max(0, count - 1)).toFixed(2);
					comboText = `${sym} x${count} (x${mult})`;
				}

				const playerPct = Math.max(0, Math.min(100, Math.floor((this.player.hp / this.player.max_hp) * 100)));
				playerStatusEl.innerHTML = `
					<div class="stat-label">玩家</div>
					<div class="hp-row">HP: <span class="hp-text">${this.player.hp}/${this.player.max_hp}</span></div>
					<div class="hp-bar"><div class="hp-inner" style="width:${playerPct}%"></div></div>
                    <div class="stats-row">
                    	<div>體力: ${this.player.stamina}/${this.player.max_stamina}</div>
                    	<div>護盾: ${this.player.shield}</div>
                    	<div>藥水: ${this.player.potions}</div>
                    	<div>金幣: ${this.player.gold}</div>
                    	<div>幸運(戰): ${this.player.luck_combat}</div>
                    	<div>幸運(金): ${this.player.luck_gold}</div>
                	</div>
					<div class="combo-row ${ (this.inBattle && (this.consecutivePrimaryCount||0) > 1) ? 'combo-active' : '' }">Combo: ${comboText}</div>
					<div class="equip-row">
						<div>武器: ${this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : '無'} <button class="open-equip-btn" data-slot="weapon">裝備</button> <button class="unequip-btn" data-slot="weapon">卸下</button></div>
						<div>防具: ${this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : '無'} <button class="open-equip-btn" data-slot="armor">裝備</button> <button class="unequip-btn" data-slot="armor">卸下</button></div>
						<div>護符: ${this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : '無'} <button class="open-equip-btn" data-slot="amulet">裝備</button> <button class="unequip-btn" data-slot="amulet">卸下</button></div>
					</div>
				`;
			}
			
			// 更新敵人狀態到右側面板
			if (enemyStatusEl) {
				const enemyPct = this.enemy && this.enemy.max_hp ? Math.max(0, Math.min(100, Math.floor((this.enemy.hp / this.enemy.max_hp) * 100))) : 0;
				enemyStatusEl.innerHTML = `
					<div class="stat-label">敵人</div>
					${this.inBattle ? `
						<div class="hp-row">${this.enemy.name || '敵人'}  HP: <span class="hp-text">${this.enemy.hp}/${this.enemy.max_hp}</span></div>
						<div class="hp-bar"><div class="hp-inner enemy-hp" style="width:${enemyPct}%"></div></div>
						<div class="stats-row"><div>普攻倒數: ${this.enemy.turnsToAttack}</div><div>強度: x${(this.enemy.strength||1).toFixed(2)}</div></div>
					` : `
						<div class="hp-row">無</div>
						<div class="hp-bar"><div class="hp-inner enemy-hp" style="width:0%"></div></div>
					`}
				`;
			}
			// 同步更新側邊的簡短狀態摘要（作為備援顯示）
				const summary = document.getElementById('status-summary');
				if (summary) {
					summary.textContent = `HP:${this.player.hp}/${this.player.max_hp}  體力:${this.player.stamina}/${this.player.max_stamina}  金幣:${this.player.gold}  幸運(戰鬥):${this.player.luck_combat} 金幣幸運:${this.player.luck_gold}`;
				}
			// 綁定狀態面板上的裝備按鈕（每次更新都重新綁定）
			setTimeout(()=>{
				Array.from(document.querySelectorAll('.unequip-btn')).forEach(b=>{ b.addEventListener('click', ()=>{ const slot = b.getAttribute('data-slot'); this.unequipItem(slot); }); });
				Array.from(document.querySelectorAll('.open-equip-btn')).forEach(b=>{ b.addEventListener('click', ()=>{ const slot = b.getAttribute('data-slot'); this.showEquipmentPanel(slot); }); });
		}, 10);
		const mapEl = document.getElementById('map-steps');
		if (mapEl) {
			if (this.inPyramid) {
				mapEl.textContent = `🔺 ${this.pyramidSteps}/${this.pyramidMaxSteps}`;
			} else {
				mapEl.textContent = Math.max(0, this.map_goal - this.map_steps);
			}
		}
	}		moveStep(direction) {
			if (this.inPyramid) {
				// 金字塔副本模式
				this.pyramidSteps += 1;
				showMessage(`你在金字塔中往${direction}走。🔺 金字塔探險: ${this.pyramidSteps}/${this.pyramidMaxSteps} 步。`);
		} else {
			// 正常地圖模式
			this.map_steps += 1;
			showMessage(`你往${direction}走。 已移動 ${this.map_steps}/${this.map_goal} 步。`);
		}			// 選擇地圖事件並處理
			const event = this.inPyramid ? this.choosePyramidEvent() : chooseEvent();
			showMessage(`遇到事件：${event}`);
			this.handleEvent(event);
			
			// 檢查是否完成金字塔或正常地圖
			if (this.inPyramid && this.pyramidSteps >= this.pyramidMaxSteps) {
				this.exitPyramid();
			} else if (!this.inPyramid && this.map_steps >= this.map_goal) {
				this.nextMap();
			}
			
			this.updateStatus();
		}

		choosePyramidEvent() {
			// 金字塔內事件：更高的怪物遭遇率
			const pyramidEvents = ['monster', 'elite', 'mini_boss', 'oasis', 'empty'];
			const pyramidWeights = [35, 25, 15, 10, 15]; // 75% 戰鬥率
			const total = pyramidWeights.reduce((a,b)=>a+b,0);
			let r = Math.random() * total;
			for (let i=0,acc=0;i<pyramidWeights.length;i++){
				acc += pyramidWeights[i];
				if (r < acc) return pyramidEvents[i];
			}
			return 'monster';
		}

		nextMap() {
			showMessage('成功走出沙漠，進入下一張地圖，難度提升！');
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
			} else {
				showMessage('什麼都沒發生。');
			}
		}

		battle(type) {
			// 進入戰鬥時強制停止自動旋轉與禁用 auto 按鈕
			try { stopAutoSpinLoop(); } catch(e) {}
			showMessage(`遭遇 ${type}，進入插槽戰鬥！`);
			// 設定戰鬥狀態與敵人屬性
			this.inBattle = true;
			// 產生敵人名稱與強度
			this.enemy.name = genEnemyName(type);
			if (type === 'elite') this.enemy.strength = 1.6;
			else if (type === 'mini_boss') this.enemy.strength = 2.4;
			else this.enemy.strength = 1.0;
			showMessage(`遭遇敵人：${this.enemy.name}`);
			// 戰鬥開始時停用移動按鈕
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			// 根據類型調整敵人血量與普攻力
			let hpMultiplier = this.inPyramid ? 2.0 : 1.0;
			let atkMultiplier = this.inPyramid ? 1.8 : 1.0;
			
			if (type === 'elite') {
				this.enemy.max_hp = Math.floor((150 + 20 * this.difficulty) * hpMultiplier);
				this.enemy.baseAttack = Math.floor((15 + 5 * this.difficulty) * atkMultiplier);
			} else if (type === 'mini_boss') {
				this.enemy.max_hp = Math.floor((250 + 40 * this.difficulty) * hpMultiplier);
				this.enemy.baseAttack = Math.floor((25 + 8 * this.difficulty) * atkMultiplier);
			} else {
				this.enemy.max_hp = Math.floor((100 + 10 * this.difficulty) * hpMultiplier);
				this.enemy.baseAttack = Math.floor((10 + 2 * this.difficulty) * atkMultiplier);
			}
			
			if (this.inPyramid) {
				this.enemy.name += ' (金字塔)';
				showMessage('⚠️ 金字塔敵人實力強大！');
			}
			this.enemy.hp = this.enemy.max_hp;
		this.enemy.turnsToAttack = 3;
		this.consecutivePrimarySymbol = null;
		this.consecutivePrimaryCount = 0;
		this.updateStatus();
		// 戰鬥開始時啟用旋轉按鈕和自動旋轉按鈕
		spinBtn.disabled = false;
		const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = false;
		// 自動啟動插槽並在短延遲後停止（模擬自動戰鬥）
		startSpin();
		setTimeout(()=> stopSequentially(), 900);
	}		attemptFlee() {
			if (!this.inBattle) { showMessage('目前不在戰鬥中。'); return; }
			// 取消自動旋轉
			stopAutoSpinLoop();
			const fleeChance = Math.min(0.9, 0.4 + 0.02 * this.player.luck_combat);
			if (Math.random() < fleeChance) {
				showMessage('你成功逃離戰鬥！');
				this.inBattle = false;
				spinBtn.disabled = true;
				stopBtn.disabled = true;
				// 停止自動旋轉並禁用自動旋轉按鈕
				try { stopAutoSpinLoop(); } catch(e) {}
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
				this.enemy.hp = 0;
				this.updateStatus();
			} else {
				showMessage('逃跑失敗！敵人獲得一次攻擊機會！');
				setTimeout(()=>{ if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack(); }, 300);
			}
		}

		// 敵人自動普攻
		enemyAutoAttack() {
			// 計算基本攻擊並降低基礎傷害（較適合新手）
			const raw = this.enemy.baseAttack; // baseAttack 已依難度調整
			// 若玩家連續相同符號次數較多，敵人會略微提升回擊（風險），但幅度較小
			const extra = Math.max(0, this.consecutivePrimaryCount - 1) * 0.12; // 每連擊加12%回擊
			let dmg = Math.floor(raw * (1 + extra));
			// 玩家有閃避機會（由幸運值和護甲提供被動閃避）
			const armorDodge = this.player.equipment.armor ? (this.player.equipment.armor.dodge_rate || 0) : 0;
			const dodgeChance = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodge / 100); // 最多 50% 閃避
			if (Math.random() < dodgeChance) {
				showMessage(`你閃避了敵人的自動普攻！(戰鬥幸運 ${this.player.luck_combat})`);
			} else {
				const consumedShield = Math.min(this.player.shield, dmg);
				const mitigated = Math.max(0, dmg - this.player.shield);
				this.player.shield -= consumedShield;
				this.player.hp -= mitigated;
				showMessage(`敵人自動普攻，造成 ${dmg} 傷害（護盾吸收 ${consumedShield}），玩家 HP -${mitigated}。`);
			}
			// 重置攻擊倒數
			this.enemy.turnsToAttack = 3;
			this.updateStatus();
		}

		merchant() {
			showMessage('遇到商隊：若資金足夠可補給藥水（50金/瓶）。');
			if (this.player.gold >= 50) {
				this.player.gold -= 50;
				this.player.potions += 1;
				showMessage('補給成功，藥水+1');
			} else {
				showMessage('金幣不足，無法購買補給。');
			}
		}

		blackMarket() {
			// 黑市商人：可購買裝備（普通到史詩），屬於賭博交易，最多購買兩件
			showMessage('遇到黑市商人：能在黑市中獲得普通到史詩級裝備，此為賭博交易，最多購買兩件。');
			const panel = document.getElementById('blackmarket-panel');
			const itemsDiv = document.getElementById('blackmarket-items');
			if (!panel || !itemsDiv) {
				showMessage('（系統錯誤：黑市介面未載入）');
				return;
			}
			// 產生 3 個隨機供品（由普通到史詩）
			const rarityWeights = [{r:'common',w:60},{r:'rare',w:30},{r:'epic',w:10}];
			function pickRarity(){
				let total = rarityWeights.reduce((s,i)=>s+i.w,0);
				let r = Math.random()*total; let acc=0;
				for (const rw of rarityWeights){ acc+=rw.w; if (r<acc) return rw.r; }
				return 'common';
			}
			function cloneItem(base, rarity){
				const it = Object.assign({}, base);
				it.rarity = rarity;
				// 調整屬性幅度：rare +~1.5, epic +~2.2
				if (it.atk) it.atk = Math.max(1, Math.round(it.atk * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				if (it.def) it.def = Math.max(1, Math.round(it.def * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				if (it.luck_gold) it.luck_gold = Math.max(1, Math.round(it.luck_gold * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				if (it.luck_combat) it.luck_combat = Math.max(1, Math.round(it.luck_combat * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				if (it.max_hp_bonus) it.max_hp_bonus = Math.max(1, Math.round(it.max_hp_bonus * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				
				// 根據品質添加額外屬性
				if (rarity !== 'common' && QUALITY_BONUS[it.slot] && QUALITY_BONUS[it.slot][rarity]) {
					const bonusPool = QUALITY_BONUS[it.slot][rarity];
					if (bonusPool.length > 0) {
						const bonus = bonusPool[Math.floor(Math.random() * bonusPool.length)];
						Object.assign(it, bonus);
					}
				}
				return it;
			}
			const offers = [];
			for (let i=0;i<3;i++){
				const base = ITEMS[Math.floor(Math.random()*ITEMS.length)];
				const r = pickRarity();
				const o = cloneItem(base, r);
				// 隨機化價格：完全隨機，不透露品質
				o.price = 149 + Math.floor(Math.random() * 880); // 149..1028 隨機金額
				offers.push(o);
			}
			// 顯示面板
			itemsDiv.innerHTML = '';
			panel._purchased = 0;
			offers.forEach((it, idx)=>{
				const el = document.createElement('div');
				// 黑市商品：不顯示品質，只顯示名稱和隨機價格
				el.innerHTML = `<div style="margin-bottom:6px;"><strong>${it.name}</strong> (?) <br/>`+
					`價格: ${it.price} 金幣 <button class="bm-buy" data-idx="${idx}">購買</button></div>`;
				itemsDiv.appendChild(el);
			});
			panel.style.display = 'block';
			// 綁定購買
			Array.from(itemsDiv.querySelectorAll('.bm-buy')).forEach(b=>{
				b.addEventListener('click', (e)=>{
					const idx = parseInt(e.target.getAttribute('data-idx'));
					if (panel._purchased >= 2) { showMessage('已達黑市購買上限（2 件）。'); return; }
					const offer = offers[idx];
					if (!offer) return;
					if (game.player.gold < offer.price) { showMessage('金幣不足，無法購買此物品。'); return; }
					// 扣款並加入背包
					game.player.gold -= offer.price;
					// 將真實物件加入背包，並揭露其屬性給玩家知曉
					game.player.inventory.push(Object.assign({}, offer));
					showMessage(`在黑市購買：${offer.name} (${offer.rarity})，花費 ${offer.price} 金幣。`);
					// 揭露屬性
					let attrs = [];
					if (offer.atk) attrs.push(`攻+${offer.atk}`);
					if (offer.def) attrs.push(`防+${offer.def}`);
					if (offer.luck_gold) attrs.push(`金運+${offer.luck_gold}`);
					if (attrs.length === 0) attrs.push('無特殊屬性');
					showMessage(`揭露裝備屬性：${attrs.join('  ')}`);
					panel._purchased += 1;
					// 標記按鈕為已購買
					e.target.textContent = '已購買';
					e.target.disabled = true;
					game.updateStatus();
					if (panel._purchased >= 2) {
						showMessage('已達黑市購買上限（2 件）。黑市交易結束。');
						Array.from(itemsDiv.querySelectorAll('.bm-buy')).forEach(bb=>{ bb.disabled = true; });
					}
				});
			});
			// 關閉按鈕
			const close = document.getElementById('close-blackmarket');
			if (close) close.onclick = ()=>{ panel.style.display = 'none'; showMessage('離開黑市。'); 
				// 恢復移動按鈕
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
			};
			// 停用移動以避免切換情境
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			this.updateStatus();
		}

		oasis() {
			showMessage('發現綠洲，恢復生命與體力。');
			this.player.hp = Math.min(this.player.max_hp, this.player.hp + 20);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 10);
		}

	sandstorm() {
		showMessage('遭遇沙漠風暴，受到些微損傷。');
		this.player.hp = Math.max(0, this.player.hp - 10);
		showMessage('風暴造成生命損失 -10。');
	}		godEvent() {
			showMessage('遇到古埃及神祇，獲得祝福或詛咒（隨機）。');
			if (Math.random() < 0.5) {
				let g = 50;
				if (this.player.luck_gold > 0) {
					const finalG = Math.floor(g * (1 + 0.1 * this.player.luck_gold));
					this.player.gold += finalG;
					showMessage(`獲得祝福：金幣 +${finalG}（含金幣幸運加成 x${this.player.luck_gold}）。`);
					this.player.luck_gold = Math.max(0, this.player.luck_gold - 1);
					showMessage(`金幣幸運 -1（剩餘 ${this.player.luck_gold}）。`);
				} else {
					this.player.gold += g;
					showMessage('獲得祝福：金幣 +50');
				}
			} else { this.player.hp = Math.max(1, this.player.hp - 15); showMessage('受到詛咒：HP -15'); }
		}

		pyramid() {
			showMessage('🔺 你發現了一座古老的金字塔！');
			showMessage('這裡充滿危險，但也蘊藏著巨大的寶藏...');
			showMessage('金字塔副本：8步探險，敵人強度高、獎勵豐厚（3倍經驗/金幣），保證掉落優良以上裝備！');
			// 創建選擇面板
			this.showPyramidChoice();
		}

		showPyramidChoice() {
			// 禁用移動按鈕
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;

			// 創建選擇對話框
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
				<h2 style="color: #8b4513; margin-top: 0;">🔺 金字塔副本</h2>
				<p style="font-size: 1.1em; line-height: 1.6;">
					是否進入金字塔探險？
				</p>
				<div style="background: #fff; padding: 12px; border-radius: 6px; margin: 12px 0; border: 1px solid #ddd;">
					<strong>副本特性：</strong><br>
					✦ 8步探險旅程<br>
					✦ 敵人強度極高<br>
					✦ 經驗值 x3 倍<br>
					✦ 金幣 x3 倍<br>
					✦ 保證掉落優良以上裝備<br>
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
					">⚔️ 進入探險</button>
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
					">🚶 離開</button>
				</div>
			`;

			document.body.appendChild(panel);

			// 綁定按鈕事件
			document.getElementById('pyramid-enter-btn').addEventListener('click', () => {
				this.enterPyramid();
				document.body.removeChild(panel);
			});

			document.getElementById('pyramid-decline-btn').addEventListener('click', () => {
				showMessage('你決定不進入金字塔，繼續前行。');
				document.body.removeChild(panel);
				// 恢復移動按鈕
				if (mf) mf.disabled = false;
				if (ml) ml.disabled = false;
				if (mr) mr.disabled = false;
			});
		}

		enterPyramid() {
			showMessage('⚡ 你踏入了金字塔深處...');
			showMessage('🔺 金字塔副本開始！你有 8 步探險機會。');
			this.inPyramid = true;
			this.pyramidSteps = 0;
			this.normalMapSteps = this.map_steps; // 儲存當前步數
			this.updateStatus();
			// 恢復移動按鈕
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
		}

		exitPyramid() {
			showMessage('🌅 你走出了金字塔，回到了沙漠中。');
			showMessage(`金字塔副本完成！探索了 ${this.pyramidSteps}/${this.pyramidMaxSteps} 步。`);
			this.inPyramid = false;
			this.pyramidSteps = 0;
			this.map_steps = this.normalMapSteps; // 恢復正常地圖步數
			this.updateStatus();
		}

		applySlotResults(results) {
			// 以左邊第一格（results[0]）為主要符號，第二與第三格若相同則放大效果
			const primary = results[0];
			const matchCount = results.filter(s => s === primary).length; // 1..3
			// 計算本回合的連續 combo（包含當前格）並顯示
			// 若上一回合主符號與本回合相同，previousCombo 為先前計數，effectiveCombo = previousCombo + 1
			const previousCombo = (this.inBattle && this.consecutivePrimarySymbol === primary) ? this.consecutivePrimaryCount : 0;
			const effectiveCombo = previousCombo + 1; // 包含當前這一回合
			// 每多一層 combo (effectiveCombo-1) 增加 12% 效果（可調）
			const comboMultiplier = 1 + 0.12 * (effectiveCombo - 1);
			// 簡短提示主要符號、匹配數與當前 combo
			showMessage(`主要符號：${primary}，匹配數：${matchCount}，連續 x${effectiveCombo}（乘數 x${comboMultiplier.toFixed(2)}）`);

			switch (primary) {
				case '⚔️': {
					// 計算暴擊機率（受戰鬥幸運影響），並套用暴擊倍率
					let baseDmg = 15 * matchCount; // 每格基礎 15
					// 套用 combo 乘數
					baseDmg = Math.max(1, Math.round(baseDmg * comboMultiplier));
					const weaponAtk = this.player.equipment.weapon ? (this.player.equipment.weapon.atk || 0) : 0;
					baseDmg += weaponAtk;
					// 應用武器的暴擊率加成
					const weaponCritRate = this.player.equipment.weapon ? (this.player.equipment.weapon.crit_rate || 0) : 0;
					const critChance = Math.min(0.5, 0.05 + 0.03 * this.player.luck_combat + weaponCritRate / 100); // 上限 50%
					let isCrit = Math.random() < critChance;
					let finalDmg = isCrit ? Math.floor(baseDmg * 1.5) : baseDmg;
					this.enemy.hp -= finalDmg;
					showMessage(`你發動普通攻擊 x${matchCount}${isCrit? '（暴擊）':''}，對敵人造成 ${finalDmg} 傷害。`);
					break;
				}
				case '⚡️': {
					let baseDmg = 25 * matchCount; // 每格基礎 25
					// 套用 combo 乘數
					baseDmg = Math.max(1, Math.round(baseDmg * comboMultiplier));
					const weaponAtk2 = this.player.equipment.weapon ? (this.player.equipment.weapon.atk || 0) : 0;
					baseDmg += weaponAtk2;
					// 應用武器的技能威力加成
					const weaponSkillPower = this.player.equipment.weapon ? (this.player.equipment.weapon.skill_power || 0) : 0;
					baseDmg = Math.floor(baseDmg * (1 + weaponSkillPower / 100));
					// 應用武器的暴擊率加成
					const weaponCritRate2 = this.player.equipment.weapon ? (this.player.equipment.weapon.crit_rate || 0) : 0;
					const critChance2 = Math.min(0.5, 0.04 + 0.03 * this.player.luck_combat + weaponCritRate2 / 100); // 技能略低基礎暴擊
					let isCrit2 = Math.random() < critChance2;
					let finalDmg2 = isCrit2 ? Math.floor(baseDmg * 1.6) : baseDmg;
					this.enemy.hp -= finalDmg2;
					// 技能消耗體力
					const staminaCost = 5 * matchCount;
					this.player.stamina = Math.max(0, this.player.stamina - staminaCost);
					showMessage(`你使用技能 x${matchCount}${isCrit2? '（暴擊）':''}，對敵人造成 ${finalDmg2} 傷害，消耗體力 ${staminaCost}。`);
					break;
				}
				case '🛡️': {
					let shieldGain = 10 * matchCount; // 每格 +10 護盾
					shieldGain = Math.max(1, Math.round(shieldGain * comboMultiplier));
					this.player.shield += shieldGain;
					showMessage(`你獲得防禦 x${matchCount}（連擊 x${effectiveCombo}），護盾 +${shieldGain}。`);
					break;
				}
				case '🧪': {
					let hpGain = 30 * matchCount; // 每格 +30 HP
					hpGain = Math.max(1, Math.round(hpGain * comboMultiplier));
					this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
					showMessage(`使用紅色水瓶 x${matchCount}（連擊 x${effectiveCombo}），回復 HP ${hpGain}。`);
					break;
				}
				case '⭐': {
					this.player.luck_combat += matchCount; // 每格 +1 戰鬥幸運
					showMessage(`獲得戰鬥幸運 +${matchCount}，提高暴擊與閃避機率。`);
					break;
				}
				case '💀': {
					// 降低符號造成的直接傷害以利入門玩家
					const rawDmg = 10 * matchCount; // 調整為每格 10 傷害
					// 玩家有閃避機率（受幸運和護甲影響）
					const armorDodgeSkull = this.player.equipment.armor ? (this.player.equipment.armor.dodge_rate || 0) : 0;
					const dodgeChanceSkull = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodgeSkull / 100);
					if (Math.random() < dodgeChanceSkull) {
						showMessage(`你閃避了敵人符號攻擊（戰鬥幸運 ${this.player.luck_combat}）！`);
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
					// 每格給予固定金幣（可再調整）
					const coinValue = 20;
					let got = coinValue * matchCount;
					got = Math.max(1, Math.round(got * comboMultiplier));
					this.player.gold += got;
					showMessage(`獲得金幣 ${got}（💰 x${matchCount}，連擊 x${effectiveCombo}）。`);
					break;
				}
				default: {
					// 其他符號暫無特殊主導效果
					showMessage('此符號沒有主要效果。');
					break;
				}
			}

				// 戰鬥相關：追蹤連續的主符號（combo）
				if (this.inBattle) {
					if (this.consecutivePrimarySymbol === primary) {
						this.consecutivePrimaryCount += 1;
					} else {
						this.consecutivePrimarySymbol = primary;
						this.consecutivePrimaryCount = 1;
					}
					showMessage(`目前連續主符號：${this.consecutivePrimarySymbol} x${this.consecutivePrimaryCount}`);

					// 先更新狀態與訊息顯示，確保插槽效果先呈現
					this.updateStatus();

					// 敵人回合倒數（若敵人尚未死亡）
					this.enemy.turnsToAttack -= 1;
					if (this.enemy.turnsToAttack <= 0 && this.enemy.hp > 0) {
						// 延遲觸發敵人普攻，讓插槽效果與訊息先完整呈現
						setTimeout(() => {
							// 檢查戰鬥仍在進行且敵人未死亡
							if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack();
						}, 300);
					}

					// 若敵人死亡，結束戰鬥（立即處理）
					if (this.enemy.hp <= 0) {
						showMessage('你擊敗了敵人！戰鬥結束，獲得獎勵。');
						
						// 金字塔副本獎勵倍率
						const pyramidMultiplier = this.inPyramid ? 3 : 1;
						
						// 獎勵：根據難度給予金幣與經驗值
						const baseReward = 20 * this.difficulty;
						const reward = baseReward * pyramidMultiplier;
						this.player.gold += reward;
						if (this.inPyramid) {
							showMessage(`🔺 金字塔獎勵 x3！獲得金幣 ${reward} (基礎 ${baseReward} x3)。`);
						} else {
							showMessage(`獲得金幣 ${reward}。`);
						}
						
						// 經驗值以難度與敵人強度計算
						const baseXP = Math.floor(15 * this.difficulty * (this.enemy.strength || 1));
						const xpGain = baseXP * pyramidMultiplier;
						if (this.inPyramid) {
							showMessage(`🔺 金字塔獎勵 x3！`);
						}
						this.addXP(xpGain);
						
						// 掉落機制
						let dropped = null;
						if (this.inPyramid) {
							// 金字塔保證掉落優良(rare)以上裝備
							const rareItems = ITEMS.filter(i => i.rarity === 'rare');
							if (rareItems.length > 0) {
								dropped = rareItems[Math.floor(Math.random() * rareItems.length)];
							} else {
								dropped = ITEMS[Math.floor(Math.random() * ITEMS.length)];
							}
							this.player.inventory.push(Object.assign({}, dropped));
							showMessage(`🔺 金字塔寶藏！敵人掉落：${dropped.name}（${dropped.rarity}）`);
						} else {
							// 正常地圖掉落
							const roll = Math.random() * 100;
							if (roll < 5) { // 5% 幾率史詩
								dropped = ITEMS[Math.floor(Math.random()*ITEMS.length)].rarity === 'rare' ? ITEMS[Math.floor(Math.random()*ITEMS.length)] : ITEMS[1];
							} else if (roll < 20) { // 15% 稀有
								dropped = ITEMS.find(i=>i.rarity === 'rare') || ITEMS[0];
							} else if (roll < 50) { // 30% 普通
								dropped = ITEMS.find(i=>i.rarity === 'common') || ITEMS[0];
							}
							if (dropped) {
								this.player.inventory.push(Object.assign({}, dropped));
								showMessage(`敵人掉落：${dropped.name}（${dropped.rarity}）`);
							}
						}
						this.inBattle = false;
						// 戰鬥結束後，停用旋轉按鈕並允許移動按鈕
						spinBtn.disabled = true;
						stopBtn.disabled = true;
						// 停止自動旋轉並禁用自動旋轉按鈕
						try { stopAutoSpinLoop(); } catch(e) {}
						const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
						const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
						const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
						const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
						this.enemy.turnsToAttack = 3;
					}
				}

			// 檢查敵人或玩家死亡
			// 已在戰鬥流程中處理敵人死亡與獎勵
			// 若玩家 HP 歸零，嘗試使用背包藥水復活；若無藥水則死亡
			if (this.player.hp <= 0) {
				if (this.player.potions > 0) {
					this.player.potions -= 1;
					this.player.hp = this.player.max_hp;
					this.player.stamina = this.player.max_stamina;
					showMessage(`HP 歸零，消耗一瓶藥水自動復活並回滿 HP/體力。剩餘藥水：${this.player.potions}`);
				} else {
					showMessage('你倒下了，遊戲結束。沒有藥水可用。請重新整理頁面以重玩。');
					// 禁用按鈕
					spinBtn.disabled = true;
					stopBtn.disabled = true;
				}
			}

			this.updateStatus();
		}
	}

	const game = new Game();
	game.updateStatus();

	// 控制旋轉的 interval
	const reelState = reels.map(()=>({interval:null, spinning:false}));

// 自動旋轉控制
let autoSpin = false;
let autoSpinTimer = null;
let autoSpinActive = false;

function stopAutoSpinLoop() {
	autoSpin = false;
	if (autoSpinTimer) { clearTimeout(autoSpinTimer); autoSpinTimer = null; }
	autoSpinActive = false;
	const btn = document.getElementById('auto-spin-btn'); if (btn) btn.textContent = '自動旋轉';
}

function runAutoCycle() {
	if (!autoSpin) { autoSpinActive = false; return; }
	if (stopBtn && !stopBtn.disabled) {
		// currently stopping; schedule next attempt
		autoSpinTimer = setTimeout(runAutoCycle, 300);
		return;
	}
	if (!spinBtn.disabled) {
		// 開始一次手動點擊流程
		spinBtn.click();
		const delay = 800 + Math.floor(Math.random()*600);
		autoSpinTimer = setTimeout(()=>{
			if (!stopBtn.disabled) stopBtn.click();
			// schedule next cycle after slight pause to allow results
			autoSpinTimer = setTimeout(runAutoCycle, 400);
		}, delay);
	} else {
		// 無法旋轉時稍後重試
		autoSpinTimer = setTimeout(runAutoCycle, 500);
	}
}

function startAutoSpinLoop() {
	if (autoSpinActive) return;
	autoSpinActive = true;
	runAutoCycle();
}

	function startSpin() {
		// 以快速改變 translateY 來模擬連續旋轉
		for (let i = 0; i < reels.length; i++) {
			const strip = reels[i].querySelector('.strip');
			if (!strip) continue;
			reelState[i].spinning = true;
			// 使用 requestAnimationFrame loop 來改變位置
			let speed = 30 + Math.random()*20; // px per frame-ish
			reelState[i].anim = {pos: parseFloat(strip.style.transform.replace(/[^-0-9.]/g,'')) || 0, speed};
			const loop = () => {
				if (!reelState[i].spinning) return;
				reelState[i].anim.pos += reelState[i].anim.speed;
				// 當 pos 超過一整組長度，回繞
				const totalHeight = SYMBOLS.length * SYMBOL_HEIGHT * 8; // repeats
				if (reelState[i].anim.pos >= totalHeight) reelState[i].anim.pos -= totalHeight;
				strip.style.transform = `translateY(-${reelState[i].anim.pos}px)`;
				reelState[i].raf = requestAnimationFrame(loop);
			};
			reelState[i].raf = requestAnimationFrame(loop);
		}
	}

	function stopSequentially() {
		// 禁用 stop 按鈕，依序停止每一軸
		stopBtn.disabled = true;
		const results = [];
		const stopOne = (index) => {
			return new Promise((resolve) => {
				// 隨機選擇一個符號作為目標
				const targetSymbol = pickWeightedSymbol();
				const strip = reels[index].querySelector('.strip');
				// 停止 spinning loop
				reelState[index].spinning = false;
				if (reelState[index].raf) cancelAnimationFrame(reelState[index].raf);

				// 計算目前 pos
				let currentPos = reelState[index].anim ? reelState[index].anim.pos : 0;
				const repeats = 8;
				const totalHeight = SYMBOLS.length * SYMBOL_HEIGHT * repeats;
				const singleBlock = SYMBOLS.length * SYMBOL_HEIGHT; // one cycle height

				// 選擇目標符號
				const targetIdx = SYMBOLS.indexOf(targetSymbol);
				const symbolIndex = targetIdx >= 0 ? targetIdx : Math.floor(Math.random()*SYMBOLS.length);

				const extraRounds = Math.floor(Math.random()*3) + 1;

				// 高亮框在 top: 30px，高度 60px（覆蓋 30-90px）
				// 要讓符號 N 的頂部對齊到 30px：translateY(-(N * 60 + 30))
				// 即：strip 位置 = N * 60 + 30
				const baseCycle = Math.floor(currentPos / singleBlock);
				
				// 目標位置：符號索引 * 60 + 30（偏移到高亮框位置）
				let candidate = baseCycle * singleBlock + symbolIndex * SYMBOL_HEIGHT + 30;
				
				// 如果已經過了，移到下一個循環
				if (candidate <= currentPos) {
					candidate += singleBlock;
				}
				
				// 加上額外的旋轉圈數
				const targetPos = candidate + extraRounds * singleBlock;

				// 平滑轉到 targetPos
				const duration = 1000 + Math.random()*800; // ms
				const start = performance.now();
				const from = currentPos;
				const to = targetPos;

				const animateStop = (now) => {
					const t = Math.min(1, (now - start) / duration);
					const ease = 1 - Math.pow(1 - t, 3);
					const pos = from + (to - from) * ease;
					// 以 totalHeight 做模循環
					strip.style.transform = `translateY(-${pos % totalHeight}px)`;
					if (t < 1) requestAnimationFrame(animateStop);
					else {
						// 確保最終位置精確對齊
						const finalPos = to % totalHeight;
						strip.style.transform = `translateY(-${finalPos}px)`;
						
						// 等待渲染完成後讀取符號
						setTimeout(() => {
							try {
								// 使用畫面取樣來判定中間的符號
								const rect = reels[index].getBoundingClientRect();
								const cx = rect.left + rect.width / 2;
								const cy = rect.top + rect.height / 2;
								let el = document.elementFromPoint(cx, cy);
								// 往上找父節點，直到找到 .symbol
								while (el && !el.classList.contains('symbol')) {
									el = el.parentElement;
								}
								const landedSymbol = el ? el.textContent.trim() : targetSymbol;
								// 確保符號不為空，且在有效符號列表中
								if (landedSymbol && SYMBOLS.includes(landedSymbol)) {
									results[index] = landedSymbol;
								} else {
									results[index] = targetSymbol;
								}
							} catch (e) {
								// 如果出錯，直接使用目標符號
								results[index] = targetSymbol;
							}
							resolve();
						}, 50);
					}
				};
				requestAnimationFrame(animateStop);
			});
		};

		// 停 0,1,2 軸
		stopOne(0).then(()=> stopOne(1)).then(()=> stopOne(2)).then(()=> {
			showMessage(`插槽結果： ${results.join(' | ')}`);
			// 把結果傳給遊戲邏輯進行處理（attack/skill/defend/enemy）
			try {
				game.applySlotResults(results);
			} catch (e) {
				console.error(e);
			}
			// 啟用 spin
			spinBtn.disabled = false;
			stopBtn.disabled = true;
		});
	}

	// 事件
	spinBtn.addEventListener('click', ()=>{
		if (!game.inBattle) {
			showMessage('目前不在戰鬥中，無法使用旋轉。');
			return;
		}
		spinBtn.disabled = true;
		stopBtn.disabled = false;
		showMessage('開始旋轉...');
		startSpin();
	});

	stopBtn.addEventListener('click', ()=>{
		stopSequentially();
	});

	// 簡單的輸入處理（保留用戶原本的指令輸入框功能）
	button.addEventListener('click', function() {
		const cmd = input.value.trim();
		if (!cmd) { showMessage('請輸入指令。'); return; }
		showMessage(`你輸入了：${cmd}`);
		input.value = '';
	});

	input.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') button.click();
	});

	// 移動按鈕
	const moveFront = document.getElementById('move-front');
	const moveLeft = document.getElementById('move-left');
	const moveRight = document.getElementById('move-right');
	if (moveFront) moveFront.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('前'); });
	if (moveLeft) moveLeft.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('左'); });
	if (moveRight) moveRight.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('右'); });

	// 裝備按鈕行為
	const equipBtn = document.getElementById('equip-btn');
	const closeEquip = document.getElementById('close-equip');
	if (equipBtn) equipBtn.addEventListener('click', ()=> { game.showEquipmentPanel(); });
	if (closeEquip) closeEquip.addEventListener('click', ()=> { const p = document.getElementById('equipment-panel'); if (p) p.style.display = 'none'; });

		// 每次更新狀態後會在 updateStatus() 內綁定這些按鈕，但初始也綁一次保險
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

		// 自動旋轉與逃跑按鈕綁定
		const autoBtn = document.getElementById('auto-spin-btn');
		if (autoBtn) autoBtn.addEventListener('click', ()=>{
			if (!game.inBattle) {
				showMessage('目前不在戰鬥中，無法使用自動旋轉。');
				return;
			}
			autoSpin = !autoSpin;
			autoBtn.textContent = autoSpin ? '停止自動' : '自動旋轉';
			if (autoSpin) startAutoSpinLoop(); else stopAutoSpinLoop();
		});
		const fleeBtn = document.getElementById('flee-btn');
		if (fleeBtn) fleeBtn.addEventListener('click', ()=>{ game.attemptFlee(); });

	// 初始歡迎訊息已放在頁面上方（#welcome-panel），不重複顯示在訊息區。
});

