// Event Handlers - All event handlers called with Game instance as `this`
// Usage: EventHandlers.eventName.call(gameInstance)

// Shared helper functions
function pickWeightedOutcome(outcomes) {
    const total = outcomes.reduce((s, o) => s + o.weight, 0);
    let r = Math.random() * total;
    for (const o of outcomes) {
        r -= o.weight;
        if (r <= 0) return o;
    }
    return outcomes[outcomes.length - 1];
}

function getMapMultiplier(difficulty) {
    return Math.pow(2, difficulty - 1);
}

// Event Handlers Object
const EventHandlers = {
    // === SIMPLE EVENTS ===

    emptyEvent() {
        const messages = [
            '你繼續前行，沒有遇到任何特別的事情。',
            '一陣風吹過沙丘，沒什麼特別的。',
            '你小心翼翼地前進，這段路程很平靜。',
            '遠處傳來駱駝的叫聲，但周圍空無一物。',
            '你在沙地上看到一些腳印，但主人早已不見蹤影。'
        ];
        showMessage(messages[Math.floor(Math.random() * messages.length)]);
    },

    oasis() {
        const mapMultiplier = getMapMultiplier(this.difficulty);
        const hpGain = Math.floor(20 * mapMultiplier);
        const staminaGain = Math.floor(10 * mapMultiplier);
        showMessage(t('oasisFound'));
        this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
        this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
        showMessage(`HP +${hpGain}，體力 +${staminaGain}`);
    },

    sandstorm() {
        showMessage(t('sandstormEncounter'));
        this.player.hp = Math.max(0, this.player.hp - 10);
        showMessage(`${t('sandstormDamage')} -10。`);
    },

    merchant() {
        showMessage('遇到商隊：若資金足夠可補給藥水（50金/瓶）。');
        if (this.player.gold >= 50) {
            this.player.gold -= 50;
            this.player.potions += 1;
            showMessage('補給成功，藥水+1');
        } else {
            showMessage('金幣不足，無法購買補給。');
        }
    },

    godEvent() {
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
        } else {
            this.player.hp = Math.max(1, this.player.hp - 15);
            showMessage('受到詛咒：HP -15');
        }
    },

    caravanRest() {
        // Delegate to tradingPost on Game class
        this.tradingPost();
    },

    // === MEDIUM EVENTS ===

    buriedTreasure() {
        showMessage(t('buriedTreasureFound'));
        const outcomes = [
            { type: 'jackpot', weight: 25, name: '滿載黃金' },
            { type: 'good', weight: 35, name: '不錯的收穫' },
            { type: 'poor', weight: 30, name: '少量金幣' },
            { type: 'nothing', weight: 10, name: '空罐或風化' }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'jackpot') {
            const baseGold = 200 + Math.floor(Math.random() * 300);
            const finalGold = Math.floor(baseGold * (1 + 0.15 * this.player.luck_gold));
            this.player.gold += finalGold;
            showMessage(`${t('treasureJackpot')} ${finalGold} ${t('goldCoins')}`);
            if (this.player.luck_gold > 0) {
                showMessage(`${t('goldLuckBonus')} +${Math.floor(baseGold * 0.15 * this.player.luck_gold)}）`);
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
    },

    deadTraveler() {
        showMessage(t('deadTravelerFound'));
        const outcomes = [
            { type: 'equipment', weight: 40, name: '裝備' },
            { type: 'gold_and_item', weight: 20, name: '金幣與物品' },
            { type: 'gold', weight: 25, name: '金幣' },
            { type: 'nothing', weight: 15, name: '一無所獲' }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'equipment') {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            const rarities = ['common', 'rare', 'excellent', 'epic', 'legendary'];
            const rarityWeights = [70, 20, 6, 3, 1];
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
            showMessage(`⚔️ 你在遺體旁找到了 ${this.formatItem(newItem)}！`);
            showMessage('（已加入背包）');
        } else if (result.type === 'gold_and_item') {
            const gold = 50 + Math.floor(Math.random() * 100);
            this.player.gold += gold;
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            const newItem = Object.assign({}, item, { rarity: 'common' });
            this.player.inventory.push(newItem);
            showMessage(`💰 你找到了 ${gold} 金幣和 ${newItem.name}！`);
        } else if (result.type === 'gold') {
            const gold = 30 + Math.floor(Math.random() * 70);
            this.player.gold += gold;
            showMessage(`💰 你在遺體旁找到了 ${gold} 金幣。`);
        } else {
            const rnd = Math.random();
            if (rnd < 0.4) {
                showMessage('🕊️ 你為旅人默哀，但身上已經沒有任何有價值的東西了。');
            } else if (rnd < 0.7) {
                showMessage('💨 遺體和裝備都已被風沙侵蝕，無法使用。');
            } else {
                showMessage('🦂 遺體周圍有毒蠍的痕跡，你謹慎地離開了，什麼也沒拿。');
                const damage = 5;
                this.player.hp = Math.max(1, this.player.hp - damage);
                showMessage(`（小心離開時受到輕傷 -${damage} HP）`);
            }
        }
    },

    ancientShrine() {
        showMessage('🛕 你發現了一座古老的神殿廢墟...');
        const outcomes = [
            { type: 'blessing', weight: 35 },
            { type: 'treasure', weight: 25 },
            { type: 'curse', weight: 20 },
            { type: 'trap', weight: 20 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'blessing') {
            const blessings = [
                { type: 'hp', value: 30 },
                { type: 'stamina', value: 20 },
                { type: 'luck_combat', value: 2 },
                { type: 'luck_gold', value: 2 }
            ];
            const blessing = blessings[Math.floor(Math.random() * blessings.length)];

            const mapMultiplier = getMapMultiplier(this.difficulty);
            if (blessing.type === 'hp') {
                const hpValue = Math.floor(blessing.value * mapMultiplier);
                this.player.max_hp += hpValue;
                this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpValue);
                showMessage(`✨ 神殿的祝福降臨！最大HP +${hpValue}`);
            } else if (blessing.type === 'stamina') {
                const staminaValue = Math.floor(blessing.value * mapMultiplier);
                this.player.max_stamina += staminaValue;
                this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaValue);
                showMessage(`${t('shrineBlessing')} +${staminaValue}`);
            } else if (blessing.type === 'luck_combat') {
                const luckValue = Math.floor(blessing.value * mapMultiplier);
                this.player.luck_combat += luckValue;
                showMessage(`✨ 神殿的祝福降臨！戰鬥幸運 +${luckValue}`);
            } else if (blessing.type === 'luck_gold') {
                const luckValue = Math.floor(blessing.value * mapMultiplier);
                this.player.luck_gold += luckValue;
                showMessage(`✨ 神殿的祝福降臨！金幣幸運 +${luckValue}`);
            }
        } else if (result.type === 'treasure') {
            const gold = 100 + Math.floor(Math.random() * 200);
            this.player.gold += gold;
            showMessage(`💎 你在神殿中找到了古老的寶藏！獲得 ${gold} 金幣。`);
        } else if (result.type === 'curse') {
            const curses = [
                '你觸碰了詛咒的雕像，感到身體虛弱。',
                '神殿的詛咒纏繞著你...',
                '你不小心打擾了亡靈的安息。'
            ];
            showMessage(`⚠️ ${curses[Math.floor(Math.random() * curses.length)]}`);
            const damage = 15 + Math.floor(Math.random() * 15);
            this.player.hp = Math.max(1, this.player.hp - damage);
            showMessage(`受到詛咒傷害 -${damage} HP`);
        } else {
            showMessage('💥 你觸發了古老的陷阱！');
            const damage = 20 + Math.floor(Math.random() * 20);
            this.player.hp = Math.max(1, this.player.hp - damage);
            showMessage(`陷阱造成 ${damage} 點傷害！`);
        }
    },

    mirage() {
        showMessage(t('mirageAppear'));
        const outcomes = [
            { type: 'oasis_real', weight: 25 },
            { type: 'hallucination', weight: 40 },
            { type: 'treasure_real', weight: 20 },
            { type: 'danger', weight: 15 }
        ];
        const result = pickWeightedOutcome(outcomes);

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
    },

    nomadCamp() {
        showMessage('⛺ 你遇到了一個遊牧民族的營地...');
        const outcomes = [
            { type: 'healing', weight: 35 },
            { type: 'trade_items', weight: 30 },
            { type: 'quest', weight: 25 },
            { type: 'hostile', weight: 10 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'healing') {
            const mapMultiplier = getMapMultiplier(this.difficulty);
            const hpGain = Math.floor(40 * mapMultiplier);
            const staminaGain = Math.floor(25 * mapMultiplier);
            showMessage('🏕️ 遊牧民熱情地接待了你，提供食物和休息。');
            this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
            this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
            showMessage(`HP +${hpGain}，體力 +${staminaGain}`);
        } else if (result.type === 'trade_items') {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            const newItem = Object.assign({}, item, { rarity: 'common' });
            this.player.inventory.push(newItem);
            showMessage(`🎁 遊牧民贈送你一件 ${newItem.name}（已加入背包）`);
        } else if (result.type === 'quest') {
            const mapMultiplier = getMapMultiplier(this.difficulty);
            const xp = Math.floor((30 + Math.floor(Math.random() * 40)) * mapMultiplier);
            const gold = 40 + Math.floor(Math.random() * 60);
            this.addXP(xp);
            this.player.gold += gold;
            showMessage('📖 遊牧民告訴你關於沙漠的古老傳說和秘密。');
            showMessage(`獲得 ${xp} 經驗值和 ${gold} 金幣。`);
        } else {
            showMessage('⚔️ 這個部落對外來者不友善！');
            this.battle('monster');
        }
    },

    quicksand() {
        showMessage('⚠️ 你踩到了流沙！');
        const outcomes = [
            { type: 'escape', weight: 50 },
            { type: 'struggle', weight: 30 },
            { type: 'sink', weight: 20 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'escape') {
            showMessage('💨 你迅速脫離了流沙區域！');
            const staminaLoss = 5 + Math.floor(Math.random() * 10);
            this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
            showMessage(`消耗體力 -${staminaLoss}`);
        } else if (result.type === 'struggle') {
            showMessage(t('quicksandStruggle'));
            const hpLoss = 10 + Math.floor(Math.random() * 15);
            const staminaLoss = 15 + Math.floor(Math.random() * 15);
            this.player.hp = Math.max(1, this.player.hp - hpLoss);
            this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
            showMessage(`${t('damageTaken')} -${hpLoss} ${t('hp')}, ${t('staminaLoss')} -${staminaLoss}`);
        } else if (result.type === 'sink') {
            showMessage('💀 你陷入流沙越來越深！');
            const hpLoss = 25 + Math.floor(Math.random() * 25);
            const staminaLoss = 20 + Math.floor(Math.random() * 20);
            this.player.hp = Math.max(1, this.player.hp - hpLoss);
            this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
            showMessage(`危急脫困！HP -${hpLoss}，體力 -${staminaLoss}`);
            // Small chance to find something in the sand
            if (Math.random() < 0.3) {
                const gold = 30 + Math.floor(Math.random() * 50);
                this.player.gold += gold;
                showMessage(`✨ 在掙扎中摸到了埋藏的 ${gold} 金幣！`);
            }
        }
    },

    scorpion() {
        showMessage('🦂 你無意中闖入了毒蠍的巢穴！');
        const outcomes = [
            { type: 'avoid', weight: 35 },
            { type: 'minor_sting', weight: 35 },
            { type: 'serious_sting', weight: 20 },
            { type: 'treasure', weight: 10 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'avoid') {
            showMessage('🏃 你小心地繞過毒蠍，成功避開了危險！');
        } else if (result.type === 'minor_sting') {
            showMessage('😣 你被毒蠍蜇了一下！');
            const damage = 8 + Math.floor(Math.random() * 12);
            this.player.hp = Math.max(1, this.player.hp - damage);
            showMessage(`受到毒素傷害 -${damage} HP`);
        } else if (result.type === 'serious_sting') {
            showMessage('💀 多隻毒蠍攻擊了你！');
            const damage = 20 + Math.floor(Math.random() * 20);
            this.player.hp = Math.max(1, this.player.hp - damage);
            const staminaLoss = 10 + Math.floor(Math.random() * 10);
            this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
            showMessage(`HP -${damage}，體力 -${staminaLoss}`);
        } else {
            showMessage('✨ 在躲避毒蠍時，你發現了牠們守護的寶藏！');
            const gold = 100 + Math.floor(Math.random() * 150);
            this.player.gold += gold;
            showMessage(`獲得 ${gold} 金幣！`);
        }
    },

    ancientRuins() {
        showMessage('🏛️ 你發現了一處古代遺跡...');
        const outcomes = [
            { type: 'artifact', weight: 25 },
            { type: 'inscription', weight: 30 },
            { type: 'trap', weight: 25 },
            { type: 'guardian', weight: 20 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'artifact') {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            const rarityRoll = Math.random();
            let rarity = 'common';
            if (rarityRoll < 0.15) rarity = 'epic';
            else if (rarityRoll < 0.45) rarity = 'rare';
            const newItem = Object.assign({}, item, { rarity });
            this.player.inventory.push(newItem);
            showMessage(`⚱️ 你在遺跡中找到了古代神器 ${this.formatItem(newItem)}！`);
        } else if (result.type === 'inscription') {
            const mapMultiplier = getMapMultiplier(this.difficulty);
            const xp = Math.floor((40 + Math.floor(Math.random() * 60)) * mapMultiplier);
            this.addXP(xp);
            showMessage(`📜 你研究了遺跡上的銘文，獲得了古老的知識。經驗值 +${xp}`);
        } else if (result.type === 'trap') {
            showMessage('💥 你觸發了遺跡的守護機關！');
            const damage = 15 + Math.floor(Math.random() * 25);
            this.player.hp = Math.max(1, this.player.hp - damage);
            showMessage(`受到 ${damage} 點傷害！`);
        } else if (result.type === 'guardian') {
            showMessage('⚔️ 遺跡的守護者甦醒了！');
            showMessage('💀 一個強大的精英敵人向你發起攻擊！');
            this.battle('elite');
        }
    },

    mysteriousStranger() {
        showMessage('👤 一個神秘的陌生人從沙丘後出現...');
        const outcomes = [
            { type: 'gamble', weight: 30 },
            { type: 'gift', weight: 30 },
            { type: 'prophecy', weight: 25 },
            { type: 'curse', weight: 15 }
        ];
        const result = pickWeightedOutcome(outcomes);

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
            const mapMultiplier = getMapMultiplier(this.difficulty);
            showMessage(t('strangerProphecy'));
            const prophecies = [
                { text: t('prophecyCombat'), buff: 'combat' },
                { text: t('prophecyGold'), buff: 'gold' },
                { text: t('prophecyDefense'), buff: 'defense' }
            ];
            const prophecy = prophecies[Math.floor(Math.random() * prophecies.length)];
            showMessage(prophecy.text);

            if (prophecy.buff === 'combat') {
                const luckValue = Math.floor(3 * mapMultiplier);
                this.player.luck_combat += luckValue;
                showMessage(`${t('combatLuck')} +${luckValue}`);
            } else if (prophecy.buff === 'gold') {
                const luckValue = Math.floor(3 * mapMultiplier);
                this.player.luck_gold += luckValue;
                showMessage(`${t('goldLuck')} +${luckValue}`);
            } else if (prophecy.buff === 'defense') {
                const shieldValue = Math.floor(30 * mapMultiplier);
                this.player.shield += shieldValue;
                showMessage(`${t('gainShield')} +${shieldValue}`);
            }
        } else if (result.type === 'curse') {
            showMessage(t('strangerCurse'));
            const curseType = Math.random();
            if (curseType < 0.5) {
                const goldLoss = Math.min(this.player.gold, 50 + Math.floor(Math.random() * 100));
                this.player.gold -= goldLoss;
                showMessage(`${t('curseGoldLoss')} -${goldLoss}！`);
            } else {
                const damage = 20 + Math.floor(Math.random() * 20);
                this.player.hp = Math.max(1, this.player.hp - damage);
                showMessage(`${t('curseHpLoss')} -${damage} HP！`);
            }
        }
    },

    // === COMPLEX UI EVENTS ===
    // Note: These events are kept in Game class as they use DOM manipulation
    // and complex closures that need direct access to Game instance.
    // They will be called via the dispatch table which delegates to this.methodName()

    lostMerchant() {
        showMessage('🐪 你遇到一支迷失的商隊！');
        showMessage('商隊領隊焦急地說：「我們在沙漠中迷路了，你能幫助我們找到出路嗎？」');

        const outcomes = [
            { type: 'help', weight: 60 },
            { type: 'trade', weight: 40 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'help') {
            showMessage('📍 你憑藉經驗，為商隊指出正確的方向！');
            showMessage('💡 提示：在沙漠中，向前方通常能找到更多機會...');

            const goldReward = Math.floor(150 * this.difficulty * (1 + Math.random() * 0.5));
            this.player.gold += goldReward;
            this.player.compassEffect = 3;

            showMessage(`✨ 商隊感激不盡！獲得 ${goldReward} 金幣`);
            showMessage('🧭 獲得「沙漠指南針」效果：接下來3次移動將顯示更詳細的方向資訊！');
        } else {
            showMessage('🛒 商隊願意與你進行特殊交易！');
            showMessage('💰 他們以優惠價格出售稀有物品...');

            const rareItem = generateItem('rare', this.difficulty);
            const price = Math.floor(120 * this.difficulty);

            showMessage(`商隊提供：${rareItem.name}（稀有品質）- 只需 ${price} 金幣！`);

            if (this.player.gold >= price) {
                this.player.gold -= price;
                this.player.inventory.push(rareItem);
                showMessage(`✅ 購買成功！獲得 ${rareItem.name}`);
            } else {
                showMessage('❌ 金幣不足，錯過了這次交易機會...');
            }
        }
    },

    cursedShrine() {
        showMessage('⚠️ 你發現一座散發著不祥氣息的神殿！');
        showMessage('神殿內部傳來陣陣低語...這裡可能藏著寶藏，也可能充滿危險。');

        const outcomes = [
            { type: 'treasure', weight: 35 },
            { type: 'battle', weight: 30 },
            { type: 'curse', weight: 20 },
            { type: 'blessing', weight: 15 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'treasure') {
            showMessage('💎 你小心翼翼地探索神殿，找到了一個寶箱！');
            const goldReward = Math.floor(200 * this.difficulty * (1 + Math.random()));
            this.player.gold += goldReward;

            if (Math.random() < 0.7) {
                const quality = Math.random() < 0.3 ? 'epic' : 'rare';
                const item = generateItem(quality, this.difficulty);
                this.player.inventory.push(item);
                showMessage(`✨ 獲得 ${goldReward} 金幣 和 ${item.name}（${item.rarity}）！`);
            } else {
                showMessage(`✨ 獲得 ${goldReward} 金幣！`);
            }
        } else if (result.type === 'battle') {
            showMessage('⚔️ 神殿守護者甦醒了！準備戰鬥！');
            showMessage('💀 這是一個強大的精英敵人...');
            this.battle('elite');
        } else if (result.type === 'curse') {
            showMessage('🌑 你觸發了神殿的詛咒！');
            const curseEffects = [
                { type: 'hp', desc: '生命力流失' },
                { type: 'stamina', desc: '體力虛弱' },
                { type: 'gold', desc: '財富流失' }
            ];
            const curse = curseEffects[Math.floor(Math.random() * curseEffects.length)];

            if (curse.type === 'hp') {
                const hpLoss = Math.floor(this.player.max_hp * 0.2);
                this.player.hp = Math.max(1, this.player.hp - hpLoss);
                showMessage(`⚠️ ${curse.desc}！HP -${hpLoss}`);
            } else if (curse.type === 'stamina') {
                const staminaLoss = Math.floor(this.player.max_stamina * 0.3);
                this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
                showMessage(`⚠️ ${curse.desc}！體力 -${staminaLoss}`);
            } else {
                const goldLoss = Math.floor(this.player.gold * 0.15);
                this.player.gold = Math.max(0, this.player.gold - goldLoss);
                showMessage(`⚠️ ${curse.desc}！失去 ${goldLoss} 金幣`);
            }
            showMessage('💡 建議：前往綠洲或休息站恢復狀態...');
        } else {
            showMessage('✨ 神殿中傳來神秘的光芒...');
            showMessage('🌟 這是古老神祇的祝福！');

            const blessings = [
                { type: 'stats', desc: '力量提升' },
                { type: 'luck', desc: '幸運加持' },
                { type: 'heal', desc: '完全治癒' }
            ];
            const blessing = blessings[Math.floor(Math.random() * blessings.length)];

            if (blessing.type === 'stats') {
                this.player.base_atk += 3;
                this.player.base_def += 2;
                showMessage(`⚡ ${blessing.desc}！攻擊力 +3，防禦力 +2`);
            } else if (blessing.type === 'luck') {
                this.player.luck_combat += 2;
                this.player.luck_gold += 2;
                showMessage(`🍀 ${blessing.desc}！戰鬥幸運 +2，金幣幸運 +2`);
            } else {
                this.player.hp = this.player.max_hp;
                this.player.stamina = this.player.max_stamina;
                const hpBonus = Math.floor(30 * getMapMultiplier(this.difficulty));
                this.player.max_hp += hpBonus;
                this.player.hp = this.player.max_hp;
                showMessage(`💚 ${blessing.desc}！HP和體力完全恢復，最大HP +${hpBonus}`);
            }
        }
    },

    banditAmbush() {
        showMessage('⚔️ 一群沙漠強盜突然出現，包圍了你！');
        showMessage('💰 強盜頭目：「識相的話，留下一半金幣，否則別想活著離開！」');

        const hasGold = this.player.gold >= 100 * this.difficulty;

        if (!hasGold) {
            showMessage('強盜們發現你身無分文，憤怒地發動攻擊！');
            this.battle('elite');
            return;
        }

        const outcomes = [
            { type: 'negotiate', weight: 25 },
            { type: 'fight', weight: 40 },
            { type: 'escape', weight: 20 },
            { type: 'intimidate', weight: 15 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'negotiate') {
            const payment = Math.floor(this.player.gold * 0.4);
            this.player.gold -= payment;
            showMessage(`💰 你決定支付 ${payment} 金幣作為「通行費」...`);
            showMessage('🤝 強盜們拿到錢後滿意地離開了。');
            showMessage('📍 臨走前，強盜頭目指向一個方向：「那邊有個好地方，算是給你的情報。」');
            this.player.banditInfo = 2;
            showMessage('🗺️ 獲得「強盜情報」：接下來2次移動有更高機率遇到好事件！');
        } else if (result.type === 'fight') {
            showMessage('⚔️ 你決定與強盜戰鬥！');
            showMessage('💡 戰鬥提示：擊敗強盜可獲得他們搶奪的財寶！');
            this.banditsLoot = Math.floor(300 * this.difficulty * (1 + Math.random()));
            this.battle('elite');
        } else if (result.type === 'escape') {
            showMessage('💨 你趁強盜不注意，成功逃脫了！');
            const goldLoss = Math.floor(this.player.gold * 0.15);
            this.player.gold -= goldLoss;
            showMessage(`⚠️ 逃跑時掉落了 ${goldLoss} 金幣...`);
            showMessage('💡 提示：繼續向前方探索，尋找安全的地方。');
        } else {
            showMessage('😎 你展示了你的實力和裝備...');
            showMessage('💪 強盜們被你的氣勢震懾，不敢輕舉妄動！');

            if (Math.random() < 0.6) {
                showMessage('🏃 強盜們嚇得落荒而逃！');
                const foundGold = Math.floor(150 * this.difficulty * (1 + Math.random() * 0.5));
                this.player.gold += foundGold;
                showMessage(`✨ 你在強盜營地找到 ${foundGold} 金幣！`);
            } else {
                showMessage('⚔️ 強盜頭目不服，向你發起挑戰！');
                this.battle('elite');
            }
        }
    },

    ancientPuzzle() {
        showMessage('🧩 你發現了一座古老的石碑，上面刻滿了象形文字...');
        showMessage('這似乎是某種謎題，破解它可能會獲得獎勵。');

        const puzzles = [
            {
                question: '「太陽從何處升起？」',
                answers: ['東方', '西方', '南方', '北方'],
                correct: 0,
                hint: '（前方通常代表東方，是太陽升起的方向）'
            },
            {
                question: '「三個神祇守護金字塔，何者掌管冥界？」',
                answers: ['拉（Ra）', '阿努比斯（Anubis）', '荷魯斯（Horus）', '伊西斯（Isis）'],
                correct: 1,
                hint: '（阿努比斯是死神和木乃伊之神）'
            },
            {
                question: '「沙漠中最珍貴的資源是什麼？」',
                answers: ['黃金', '寶石', '水源', '武器'],
                correct: 2,
                hint: '（綠洲是沙漠旅者的救命之地）'
            }
        ];

        const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        showMessage(`📜 石碑上的問題：${puzzle.question}`);
        showMessage(`💡 提示：${puzzle.hint}`);

        const luckBonus = this.player.luck_gold * 0.05;
        const successChance = 0.6 + luckBonus;
        const success = Math.random() < successChance;

        if (success) {
            showMessage(`✅ 你憑藉智慧破解了謎題！答案是：${puzzle.answers[puzzle.correct]}`);
            showMessage('🌟 石碑發出金色光芒，地面出現一個寶箱！');

            const goldReward = Math.floor(250 * this.difficulty * (1 + Math.random()));
            this.player.gold += goldReward;

            const quality = Math.random() < 0.4 ? 'epic' : 'excellent';
            const item = generateItem(quality, this.difficulty);
            this.player.inventory.push(item);

            this.player.luck_combat += 1;
            this.player.luck_gold += 1;

            showMessage(`🎁 獲得：${goldReward} 金幣、${item.name}（${item.rarity}）`);
            showMessage('📚 智慧提升：戰鬥幸運 +1，金幣幸運 +1');
            showMessage('💡 解謎心得：保持探索精神，向不同方向前進會有不同發現！');
        } else {
            showMessage('❌ 謎題太過複雜，你無法解開...');
            showMessage('⚠️ 石碑發出紅光，觸發了防禦機制！');

            const trapDamage = Math.floor(20 + Math.random() * 20);
            this.player.hp = Math.max(1, this.player.hp - trapDamage);

            showMessage(`💥 陷阱造成 ${trapDamage} 點傷害！`);
            showMessage('💡 建議：提升幸運值可以增加解謎成功率。');
        }
    },

    desertOasis() {
        showMessage('🌴 你發現了一片隱藏的沙漠綠洲！');
        showMessage('清澈的泉水、茂密的棕櫚樹...這是沙漠中的奇蹟！');

        const outcomes = [
            { type: 'full_rest', weight: 40 },
            { type: 'explore', weight: 35 },
            { type: 'meditate', weight: 25 }
        ];
        const result = pickWeightedOutcome(outcomes);

        if (result.type === 'full_rest') {
            showMessage('😌 你決定在綠洲充分休息...');

            this.player.hp = this.player.max_hp;
            this.player.stamina = this.player.max_stamina;

            const hpBonus = Math.floor(25 * getMapMultiplier(this.difficulty));
            const staminaBonus = Math.floor(15 * getMapMultiplier(this.difficulty));
            this.player.max_hp += hpBonus;
            this.player.max_stamina += staminaBonus;
            this.player.hp = this.player.max_hp;
            this.player.stamina = this.player.max_stamina;

            this.player.oasisBlessing = 5;

            showMessage('💚 完全恢復！HP和體力全滿！');
            showMessage(`⬆️ 最大HP +${hpBonus}，最大體力 +${staminaBonus}`);
            showMessage('✨ 獲得「綠洲祝福」：接下來5次移動，每次自動恢復少量HP和體力！');
            showMessage('💡 探索提示：休息好後，可以大膽探索更危險的區域！');
        } else if (result.type === 'explore') {
            showMessage('🔍 你決定探索綠洲周圍...');
            showMessage('🌟 在棕櫚樹下，你發現了一個隱藏的寶藏！');

            const hpRecover = Math.floor(this.player.max_hp * 0.6);
            const staminaRecover = Math.floor(this.player.max_stamina * 0.6);
            this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpRecover);
            this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaRecover);

            const goldReward = Math.floor(200 * this.difficulty * (1 + Math.random()));
            this.player.gold += goldReward;

            const quality = Math.random() < 0.3 ? 'epic' : 'excellent';
            const item = generateItem(quality, this.difficulty);
            this.player.inventory.push(item);

            showMessage(`💚 恢復 ${hpRecover} HP 和 ${staminaRecover} 體力`);
            showMessage(`🎁 獲得：${goldReward} 金幣、${item.name}（${item.rarity}）`);
            showMessage('💡 綠洲守護者的話：「勇敢的冒險者，繼續向前吧！」');
        } else {
            showMessage('🧘 你在綠洲邊緣盤坐冥想...');
            showMessage('💫 沙漠的寧靜讓你的心靈得到昇華...');

            const hpRecover = Math.floor(this.player.max_hp * 0.5);
            const staminaRecover = Math.floor(this.player.max_stamina * 0.5);
            this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpRecover);
            this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaRecover);

            this.player.base_atk += 4;
            this.player.base_def += 3;
            this.player.luck_combat += 2;

            showMessage(`💚 恢復 ${hpRecover} HP 和 ${staminaRecover} 體力`);
            showMessage('⚡ 冥想收穫：攻擊力 +4，防禦力 +3，戰鬥幸運 +2');
            showMessage('🌟 你感受到內在力量的成長！');
            showMessage('💡 智者的教誨：「力量來自內心，而非外物。」');
        }

        showMessage('🗺️ 探索建議：綠洲周圍可能還有其他秘密，多探索不同方向！');
    },

    pyramid() {
        showMessage('🔺 你發現了一座古老的金字塔！');
        showMessage('這裡充滿危險，但也蘊藏著巨大的寶藏...');
        showMessage('金字塔副本：8步探險，敵人強度極高（隨地圖提升），獎勵豐厚（15倍經驗/金幣），保證掉落優良以上裝備！');
        this.showPyramidChoice();
    }

    // Note: blackMarket, tradingPost, sandstormShelter, wanderingAlchemist,
    // ancientTablet, beastPack, moonlightAltar, caravanWreckage
    // remain in Game class due to complex DOM manipulation and closures
};
