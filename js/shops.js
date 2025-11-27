// ===== Shops Module =====
// Handles shop-related functionality: black market, trading post

/**
 * Shops mixin - methods to be attached to Game prototype
 * Dependencies: showMessage (global), t (global - i18n),
 *               ITEMS, QUALITY_BONUS, PYRAMID_AFFIXES (from data.js),
 *               cloneItem, pickWeightedRarity (from EnemyGenerator.js),
 *               Config (from Config.js), DOMRefs (from DOMRefs.js)
 */
const ShopsMixin = {
	/**
	 * Black market shop - gambling-style equipment purchases
	 */
	blackMarket() {
		this.inShop = true;
		showMessage(t('blackMarketMet'));

		const panel = DOMRefs.blackmarketPanel;
		const itemsDiv = DOMRefs.blackmarketItems;
		if (!panel || !itemsDiv) {
			showMessage(t('blackMarketError'));
			return;
		}

		// Generate random offerings using centralized config
		const offers = [];
		for (let i = 0; i < Config.SHOP.BLACK_MARKET_ITEMS_COUNT; i++) {
			const base = ITEMS[Math.floor(Math.random()*ITEMS.length)];
			const r = pickWeightedRarity(Config.SHOP.RARITY_WEIGHTS);
			const o = cloneItem(base, r);
			// Randomize price: completely random, doesn't reveal quality
			o.price = Config.SHOP.BLACK_MARKET_PRICE_MIN + Math.floor(Math.random() * Config.SHOP.BLACK_MARKET_PRICE_RANGE);
			offers.push(o);
		}

		// Display panel
		itemsDiv.innerHTML = '';
		panel._purchased = 0;

		const game = this;

		offers.forEach((it, idx) => {
			const el = document.createElement('div');
			el.innerHTML = `<div style="margin-bottom:6px;"><strong>${it.name}</strong> (?) <br/>`+
				`${t('price')}: ${it.price} ${t('gold')} <button class="bm-buy" data-idx="${idx}">${t('buy')}</button></div>`;
			itemsDiv.appendChild(el);
		});

		panel.style.display = 'block';

		// Bind purchase buttons
		Array.from(itemsDiv.querySelectorAll('.bm-buy')).forEach(b => {
			b.addEventListener('click', () => {
				const idx = parseInt(b.getAttribute('data-idx'));
				if (panel._purchased >= Config.SHOP.BLACK_MARKET_MAX_PURCHASES) {
					showMessage(t('blackMarketLimit'));
					return;
				}
				const offer = offers[idx];
				if (!offer) return;
				if (game.player.gold < offer.price) {
					showMessage(t('notEnoughGold'));
					return;
				}

				// Deduct gold and add to inventory
				game.player.gold -= offer.price;
				game.player.inventory.push(Object.assign({}, offer));

				showMessage(`${t('blackMarketBought')}: ${offer.name} (${offer.rarity}), ${t('spent')} ${offer.price} ${t('gold')}.`);

				// Reveal attributes
				let attrs = [];
				if (offer.atk) attrs.push(`${t('atkShort')}+${offer.atk}`);
				if (offer.def) attrs.push(`${t('defShort')}+${offer.def}`);
				if (offer.luck_gold) attrs.push(`${t('goldLuck')}+${offer.luck_gold}`);
				if (attrs.length === 0) attrs.push(t('noSpecialAttributes'));
				showMessage(`${t('revealAttributes')}: ${attrs.join('  ')}`);

				panel._purchased += 1;
				b.textContent = t('purchased');
				b.disabled = true;
				game.updateStatus();

				if (panel._purchased >= Config.SHOP.BLACK_MARKET_MAX_PURCHASES) {
					showMessage(`${t('blackMarketLimit')} ${t('blackMarketEnd')}`);
					Array.from(itemsDiv.querySelectorAll('.bm-buy')).forEach(bb => { bb.disabled = true; });
				}
			});
		});

		// Close button
		const close = DOMRefs.closeBlackmarketBtn;
		if (close && !close._bmBound) {
			close._bmBound = true;
			close.addEventListener('click', () => {
				panel.style.display = 'none';
				game.inShop = false;
				showMessage(t('leaveBlackMarket'));
				DOMRefs.enableMovement();
				game.generateDirectionHints();
			});
		}

		// Disable movement to prevent context switching
		DOMRefs.disableMovement();
		this.updateStatus();
	},

	/**
	 * Trading post - buy supplies and sell equipment
	 */
	tradingPost() {
		showMessage(t('tradingPostFound'));
		showMessage(t('tradingPostDesc'));

		// Disable movement buttons
		DOMRefs.disableMovement();

		const game = this;

		// Create trading post panel
		const panel = document.createElement('div');
		panel.id = 'trading-post-panel';
		panel.className = 'trading-post-panel';
		panel.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: linear-gradient(180deg, #fff9e6, #ffe4b3);
			border: 3px solid #d4a855;
			border-radius: 8px;
			padding: 12px;
			box-shadow: 0 8px 24px rgba(0,0,0,0.3);
			z-index: 100;
			width: 90vw;
			max-width: 450px;
			max-height: 85vh;
			overflow-y: auto;
		`;

		panel.innerHTML = `
			<h2 style="color: #8b4513; margin: 0 0 12px 0; text-align: center; font-size: 1.3em;">🏪 ${t('tradingPostTitle')}</h2>

			<div style="background: #fff; padding: 8px; border-radius: 6px; margin-bottom: 10px;">
				<h3 style="margin: 0; color: #d4a855; font-size: 1em;">💰 ${t('yourGold')}: <span id="tp-gold">${this.player.gold}</span></h3>
			</div>

			<div style="background: #fff; padding: 8px; border-radius: 6px; margin-bottom: 10px;">
				<h3 style="margin: 0 0 8px 0; color: #2ecc71; font-size: 1em;">🛒 ${t('supplies')}</h3>
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: #f8f8f8; border-radius: 4px; font-size: 0.9em;">
						<span>🧪 ${t('potionItem')}</span>
						<button class="tp-buy-btn" data-item="potion" data-price="200" style="padding: 5px 10px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; white-space: nowrap;">200 ${t('gold')}</button>
					</div>
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: #f8f8f8; border-radius: 4px; font-size: 0.85em;">
						<span>🍖 ${t('foodItem')}</span>
						<button class="tp-buy-btn" data-item="food" data-price="40" style="padding: 5px 10px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; white-space: nowrap;">40 ${t('gold')}</button>
					</div>
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: #f8f8f8; border-radius: 4px; font-size: 0.85em;">
						<span>💊 ${t('fullHealItem')}</span>
						<button class="tp-buy-btn" data-item="fullheal" data-price="80" style="padding: 5px 10px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; white-space: nowrap;">80 ${t('gold')}</button>
					</div>
				</div>
			</div>

			<div style="background: #fff; padding: 8px; border-radius: 6px; margin-bottom: 10px;">
				<h3 style="margin: 0 0 8px 0; color: #e74c3c; font-size: 1em;">💼 ${t('equipmentManagement')}</h3>
				<div id="tp-inventory" style="max-height: 180px; overflow-y: auto;">
					<!-- Equipment list will be dynamically generated -->
				</div>
			</div>

			<div style="text-align: center; margin-top: 10px;">
				<button id="tp-close" style="padding: 8px 20px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1em;">${t('leaveStation')}</button>
			</div>
		`;

		document.body.appendChild(panel);

		// Generate inventory list
		const updateInventory = () => {
			const invDiv = document.getElementById('tp-inventory');
			if (!invDiv) return;

			// Build complete list including equipped and inventory items
			const equippedSlots = ['weapon', 'armor', 'amulet'];
			const equippedItems = [];
			equippedSlots.forEach(slot => {
				if (game.player.equipment[slot]) {
					equippedItems.push({ item: game.player.equipment[slot], slot: slot, isEquipped: true });
				}
			});

			const inventoryItems = game.player.inventory.map((item, idx) => ({ item, idx, isEquipped: false }));
			const allItems = [...equippedItems, ...inventoryItems];

			if (allItems.length === 0) {
				invDiv.innerHTML = `<div style="text-align: center; color: #999; padding: 20px;">${t('inventoryEmpty')}</div>`;
				return;
			}

			let html = '';
			allItems.forEach((entry) => {
				const item = entry.item;
				const isEquipped = entry.isEquipped;

				// Calculate sell price based on rarity
				let basePrice = 20;
				if (item.rarity === 'rare') basePrice = 80;
				else if (item.rarity === 'excellent') basePrice = 130;
				else if (item.rarity === 'epic') basePrice = 200;
				else if (item.rarity === 'legendary') basePrice = 500;

				// Adjust price based on attributes
				if (item.atk) basePrice += item.atk * 5;
				if (item.def) basePrice += item.def * 5;
				if (item.max_hp_bonus) basePrice += item.max_hp_bonus * 2;

				const rarityColor = item.rarity === 'legendary' ? '#e67e22' :
					(item.rarity === 'epic' ? '#9b59b6' :
					(item.rarity === 'excellent' ? '#2ecc71' :
					(item.rarity === 'rare' ? '#3498db' : '#95a5a6')));

				// Equipped indicator
				const equippedBadge = isEquipped ?
					`<span style="background: #27ae60; color: white; padding: 1px 5px; border-radius: 3px; font-size: 0.7em; margin-left: 5px;">${t('equipped')}</span>` : '';

				// Data attribute: use slot for equipped, idx for inventory
				const dataAttr = isEquipped ? `data-slot="${entry.slot}"` : `data-idx="${entry.idx}"`;

				html += `
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: ${isEquipped ? '#e8f6e8' : '#f8f8f8'}; border-radius: 4px; margin-bottom: 5px; border-left: 3px solid ${rarityColor};">
						<div style="flex: 1; min-width: 0;">
							<div style="font-weight: bold; font-size: 0.9em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}${item.enhanceLevel ? ' +' + item.enhanceLevel : ''}${equippedBadge}</div>
							<div style="font-size: 0.75em; color: #666;">${item.rarity}${item.isPyramid ? ' 🔺' : ''}</div>
						</div>
						<div style="display:flex; gap:6px; align-items:center;">
							<button class="tp-enhance-btn" ${dataAttr} style="padding: 5px 10px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85em; white-space: nowrap;">${t('enhanceBtn')}</button>
							${isEquipped ? '' : `<button class="tp-sell-btn" data-idx="${entry.idx}" data-price="${basePrice}" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85em; white-space: nowrap;">${t('sellBtn')} ${basePrice}</button>`}
						</div>
					</div>
				`;
			});
			invDiv.innerHTML = html;

			// Bind sell buttons
			Array.from(invDiv.querySelectorAll('.tp-sell-btn')).forEach(btn => {
				btn.addEventListener('click', () => {
					const idx = parseInt(btn.getAttribute('data-idx'));
					const price = parseInt(btn.getAttribute('data-price'));
					const item = game.player.inventory[idx];

					if (item) {
						game.player.inventory.splice(idx, 1);
						game.player.gold += price;
						showMessage(`${t('soldItem')} ${item.name}, ${t('obtainedGold')} ${price} ${t('gold')}.`);
						document.getElementById('tp-gold').textContent = game.player.gold;
						updateInventory();
						game.updateStatus();
					}
				});
			});

			// Bind enhance buttons
			Array.from(invDiv.querySelectorAll('.tp-enhance-btn')).forEach(btn => {
				btn.addEventListener('click', () => {
					const slot = btn.getAttribute('data-slot');
					const idx = btn.getAttribute('data-idx');
					let item;
					if (slot) {
						item = game.player.equipment[slot];
					} else {
						item = game.player.inventory[parseInt(idx)];
					}
					if (!item) return;

					// Set base attributes for enhancement calculation
					if (typeof item._enhance_base_atk === 'undefined') item._enhance_base_atk = item.atk || 0;
					if (typeof item._enhance_base_def === 'undefined') item._enhance_base_def = item.def || 0;

					const currentLevel = item.enhanceLevel || 0;
					const targetLevel = currentLevel + 1;

					// Calculate cost (grows with level)
					const cost = Math.floor(100 * Math.pow(1.6, currentLevel));
					if (game.player.gold < cost) {
						showMessage(`❌ ${t('enhanceCost')}`);
						return;
					}

					game.player.gold -= cost;
					document.getElementById('tp-gold').textContent = game.player.gold;

					// Success rate: 1-3 guaranteed; 4-12 decreasing (min 5%)
					let success = false;
					if (targetLevel <= 3) {
						success = true;
					} else {
						const prob = Math.max(0.05, 1 - (targetLevel - 3) * 0.12);
						success = Math.random() < prob;
					}

					const atkPer = 2;
					const defPer = 1;

					if (success) {
						item.enhanceLevel = targetLevel;
						item.atk = (item._enhance_base_atk || 0) + item.enhanceLevel * atkPer;
						item.def = (item._enhance_base_def || 0) + item.enhanceLevel * defPer;
						showMessage(`✨ ${t('enhanceSuccess')} ${item.name} ${t('enhanceLevel')} +1 (${t('currentLevel')} +${item.enhanceLevel})`);
					} else {
						item.enhanceLevel = Math.max(0, currentLevel - 1);
						item.atk = (item._enhance_base_atk || 0) + item.enhanceLevel * atkPer;
						item.def = (item._enhance_base_def || 0) + item.enhanceLevel * defPer;
						showMessage(`💥 ${t('enhanceFailed')} ${item.name} ${t('enhanceLevel')} -1 (${t('currentLevel')} +${item.enhanceLevel})`);
					}

					updateInventory();
					game.updateStatus();
				});
			});
		};

		updateInventory();

		// Bind purchase buttons
		Array.from(panel.querySelectorAll('.tp-buy-btn')).forEach(btn => {
			btn.addEventListener('click', () => {
				const item = btn.getAttribute('data-item');
				const price = parseInt(btn.getAttribute('data-price'));

				if (game.player.gold >= price) {
					game.player.gold -= price;

					if (item === 'potion') {
						game.player.potions += 1;
						showMessage(t('boughtPotion'));
					} else if (item === 'food') {
						const mapMultiplier = Math.pow(2, game.difficulty - 1);
						const hpGain = Math.floor(30 * mapMultiplier);
						const staminaGain = Math.floor(15 * mapMultiplier);
						game.player.hp = Math.min(game.player.max_hp, game.player.hp + hpGain);
						game.player.stamina = Math.min(game.player.max_stamina, game.player.stamina + staminaGain);
						showMessage(`🍖 ${t('boughtFood')}, HP +${hpGain}, ${t('stamina')} +${staminaGain}`);
					} else if (item === 'fullheal') {
						game.player.hp = game.player.max_hp;
						game.player.stamina = game.player.max_stamina;
						showMessage(t('fullRestore'));
					}

					document.getElementById('tp-gold').textContent = game.player.gold;
					game.updateStatus();
				} else {
					showMessage(t('notEnoughGoldShop'));
				}
			});
		});

		// Close button
		const closeBtn = document.getElementById('tp-close');
		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				document.body.removeChild(panel);
				showMessage(t('leftStation'));
				DOMRefs.enableMovement();
				game.generateDirectionHints();
			});
		}
	}
};
