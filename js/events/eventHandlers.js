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

// Generate an item with specified rarity and difficulty scaling
function generateItem(rarity, difficulty = 1, isPyramid = false) {
    const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const item = Object.assign({}, baseItem);
    item.rarity = rarity;

    // Scale attributes based on rarity
    const scaleMap = { common: 1, rare: 1.5, excellent: 1.8, epic: 2.2, legendary: 3.0 };
    const scale = scaleMap[rarity] || 1;

    if (item.atk) item.atk = Math.max(1, Math.round(item.atk * scale));
    if (item.def) item.def = Math.max(1, Math.round(item.def * scale));
    if (item.luck_gold) item.luck_gold = Math.max(1, Math.round(item.luck_gold * scale));
    if (item.luck_combat) item.luck_combat = Math.max(1, Math.round(item.luck_combat * scale));
    if (item.max_hp_bonus) item.max_hp_bonus = Math.max(1, Math.round(item.max_hp_bonus * scale));

    // Add quality bonuses based on rarity
    const bonusCountMap = { common: 0, rare: 2, excellent: 1, epic: 3, legendary: 4 };
    const bonusCount = bonusCountMap[rarity] || 0;

    if (bonusCount > 0 && QUALITY_BONUS[item.slot] && QUALITY_BONUS[item.slot][rarity]) {
        const pool = QUALITY_BONUS[item.slot][rarity].slice();
        for (let n = 0; n < bonusCount && pool.length > 0; n++) {
            const idx = Math.floor(Math.random() * pool.length);
            const bonus = pool.splice(idx, 1)[0];
            Object.assign(item, bonus);
        }
    }

    // Add pyramid affixes if applicable
    if (isPyramid && rarity !== 'common') {
        const affix = PYRAMID_AFFIXES[Math.floor(Math.random() * PYRAMID_AFFIXES.length)];
        item.affix = affix.id;
        item.affixName = affix.name;
        item.affixColor = affix.color;
        for (const key in affix.bonus) {
            item[key] = (item[key] || 0) + affix.bonus[key];
        }
        item.isPyramid = true;
    }

    return item;
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

    // === CHOICE-BASED EVENTS (using showChoicePanel) ===

    sandstormShelter() {
        showMessage('🌪️ 巨大的沙塵暴即將來襲！你發現了一個避難所...');
        const choices = [
            { id: 'enter_cave', label: '進入洞穴避難（安全但可能遇到居民）', weight: 35 },
            { id: 'ruins_shelter', label: '躲進廢墟（可搜尋物資但不穩固）', weight: 35 },
            { id: 'brave_storm', label: '硬撐沙塵暴繼續前進（消耗體力但節省時間）', weight: 30 }
        ];
        this.showChoicePanel(
            '沙塵暴來襲！',
            choices,
            (choiceId) => {
                let needsDirectionHints = false;

                if (choiceId === 'enter_cave') {
                    const caveRoll = Math.random();
                    if (caveRoll < 0.5) {
                        showMessage('🏔️ 洞穴空無一人，你安全地度過了沙塵暴。');
                        this.player.hp = Math.min(this.player.max_hp, this.player.hp + 30);
                        this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 20);
                        showMessage('💤 趁機休息，恢復 30 HP 和 20 體力。');
                        needsDirectionHints = true;
                    } else if (caveRoll < 0.8) {
                        showMessage('👴 洞穴中住著一位隱士，他分享了食物和故事。');
                        this.player.hp = this.player.max_hp;
                        const xp = 40 + Math.floor(Math.random() * 40);
                        this.addXP(xp);
                        showMessage('📖 你從隱士的故事中學到了很多！');
                        if (Math.random() < 0.4) {
                            const item = generateItem('common', this.difficulty);
                            this.player.inventory.push(item);
                            showMessage(`🎁 隱士送給你一件禮物：${this.formatItem(item)}`);
                        }
                        needsDirectionHints = true;
                    } else {
                        showMessage('🐺 洞穴是野獸的巢穴！你必須戰鬥！');
                        this.battle('elite');
                    }
                } else if (choiceId === 'ruins_shelter') {
                    showMessage('🏛️ 你躲進了古老的廢墟中...');
                    const ruinsRoll = Math.random();
                    if (ruinsRoll < 0.4) {
                        const gold = 60 + Math.floor(Math.random() * 80);
                        this.player.gold += gold;
                        showMessage(`💰 在廢墟中搜尋時，你發現了 ${gold} 金幣！`);
                        if (Math.random() < 0.6) {
                            const item = generateItem(Math.random() < 0.3 ? 'rare' : 'common', this.difficulty);
                            this.player.inventory.push(item);
                            showMessage(`⚔️ 還找到了 ${this.formatItem(item)}！`);
                        }
                    } else if (ruinsRoll < 0.7) {
                        const damage = 15 + Math.floor(Math.random() * 15);
                        this.player.hp = Math.max(1, this.player.hp - damage);
                        showMessage(`💥 廢墟部分坍塌！你受到 ${damage} 點傷害。`);
                        showMessage('🏃 你趕緊逃出廢墟，沙塵暴已經過去。');
                    } else {
                        showMessage('🌪️ 廢墟很穩固，你安全地躲過了沙塵暴。');
                        showMessage('但廢墟中沒有找到任何有價值的東西。');
                    }
                    needsDirectionHints = true;
                } else if (choiceId === 'brave_storm') {
                    showMessage('💪 你決定勇敢面對沙塵暴！');
                    const stormDamage = 20 + Math.floor(Math.random() * 20);
                    const staminaCost = 25 + Math.floor(Math.random() * 15);
                    this.player.hp = Math.max(1, this.player.hp - stormDamage);
                    this.player.stamina = Math.max(0, this.player.stamina - staminaCost);
                    showMessage(`🌪️ 沙塵暴很猛烈！你損失了 ${stormDamage} HP 和 ${staminaCost} 體力。`);
                    if (Math.random() < 0.6) {
                        this.player.luck_combat += 1;
                        showMessage('💎 在暴風中前行鍛鍊了你的意志，戰鬥幸運 +1！');
                    }
                    this.map_steps += 1;
                    showMessage(`🏃 你成功穿越了沙塵暴區域，地圖進度額外 +1（${this.map_steps}/${this.map_goal}）！`);
                    needsDirectionHints = true;
                }

                if (needsDirectionHints) {
                    this.updateStatus();
                    this.generateDirectionHints();
                }
            }
        );
    },

    wanderingAlchemist() {
        showMessage('🧙 你遇到了一位流浪的煉金術師...');
        const choices = [
            { id: 'buy_potion', label: '購買藥水（80 金幣/瓶）', weight: 30 },
            { id: 'trade_gold', label: '用金幣換取特殊藥劑', weight: 35 },
            { id: 'learn_alchemy', label: '學習煉金知識（消耗時間但獲得永久效果）', weight: 35 }
        ];
        this.showChoicePanel(
            '煉金術師的提議',
            choices,
            (choiceId) => {
                if (choiceId === 'buy_potion') {
                    const potionPrice = 80;
                    const maxPotions = Math.floor(this.player.gold / potionPrice);
                    if (maxPotions === 0) {
                        showMessage('💸 你的金幣不夠購買藥水。');
                        showMessage('🧙 煉金術師：「等你有錢了再來吧。」');
                    } else {
                        const buyCount = Math.min(3, maxPotions);
                        const totalCost = buyCount * potionPrice;
                        this.player.gold -= totalCost;
                        this.player.potions += buyCount;
                        showMessage(`🧪 你花費 ${totalCost} 金幣購買了 ${buyCount} 瓶高品質藥水！`);
                    }
                    this.updateStatus();
                    this.generateDirectionHints();
                } else if (choiceId === 'trade_gold') {
                    const elixirCost = 150;
                    if (this.player.gold < elixirCost) {
                        showMessage('💸 你沒有足夠的金幣（需要 150 金幣）。');
                    } else {
                        this.player.gold -= elixirCost;
                        const elixirType = Math.random();
                        if (elixirType < 0.33) {
                            this.player.max_hp += 40;
                            this.player.hp = Math.min(this.player.max_hp, this.player.hp + 40);
                            showMessage('💪 你獲得了力量藥劑！最大HP永久 +40！');
                        } else if (elixirType < 0.66) {
                            this.player.max_stamina += 30;
                            this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 30);
                            showMessage('🏃 你獲得了敏捷藥劑！最大體力永久 +30！');
                        } else {
                            this.player.luck_combat += 3;
                            this.player.luck_gold += 2;
                            showMessage('🍀 你獲得了幸運藥劑！戰鬥幸運 +3，金幣幸運 +2！');
                        }
                    }
                    this.updateStatus();
                    this.generateDirectionHints();
                } else if (choiceId === 'learn_alchemy') {
                    showMessage('📚 煉金術師開始教導你煉金的奧秘...');
                    const xp = 70 + Math.floor(Math.random() * 50);
                    this.addXP(xp);
                    this.player.stamina = Math.max(0, this.player.stamina - 20);
                    showMessage('😓 學習很累人，消耗 20 體力。');
                    if (!this.player.alchemyKnowledge) {
                        this.player.alchemyKnowledge = true;
                        showMessage('✨ 你學會了基礎煉金術！');
                        showMessage('🧪 從現在開始，使用藥水時額外恢復 20% HP！');
                    } else {
                        this.player.potions += 2;
                        showMessage('📖 你的煉金知識更加精進，獲得 2 瓶藥水！');
                    }
                    this.updateStatus();
                    this.generateDirectionHints();
                }
            }
        );
    },

    ancientTablet() {
        showMessage('📜 你發現了一塊刻有古老文字的石碑...');
        const choices = [
            { id: 'study', label: '仔細研讀（獲得大量經驗）', weight: 40 },
            { id: 'touch', label: '觸摸石碑（可能觸發魔法）', weight: 30 },
            { id: 'ignore', label: '無視石碑繼續前進', weight: 30 }
        ];
        this.showChoicePanel(
            '古代石碑',
            choices,
            (choiceId) => {
                if (choiceId === 'study') {
                    showMessage('🔍 你努力解讀石碑上的文字...');
                    const studyRoll = Math.random();
                    if (studyRoll < 0.6) {
                        const xp = 80 + Math.floor(Math.random() * 70);
                        this.addXP(xp);
                        showMessage('💡 你成功解讀了古老的知識！');
                        const bonusType = Math.random();
                        if (bonusType < 0.4) {
                            this.player.max_hp += 25;
                            this.player.hp = Math.min(this.player.max_hp, this.player.hp + 25);
                            showMessage('📖 石碑記載了古老的體能訓練法，最大HP +25！');
                        } else if (bonusType < 0.7) {
                            this.player.luck_combat += 2;
                            showMessage('📖 石碑記載了戰鬥技巧，戰鬥幸運 +2！');
                        } else {
                            this.player.luck_gold += 2;
                            showMessage('📖 石碑記載了寶藏的位置線索，金幣幸運 +2！');
                        }
                    } else {
                        const xp = 30 + Math.floor(Math.random() * 30);
                        this.addXP(xp);
                        showMessage('😕 文字太古老了，你只能理解一小部分。');
                        showMessage('但你仍然學到了一些東西。');
                    }
                } else if (choiceId === 'touch') {
                    showMessage('✋ 你的手觸碰到了石碑...');
                    const touchRoll = Math.random();
                    if (touchRoll < 0.35) {
                        showMessage('✨ 石碑散發出溫暖的光芒！');
                        this.player.hp = this.player.max_hp;
                        this.player.stamina = this.player.max_stamina;
                        this.player.shield += 30;
                        showMessage('💫 你的生命和體力完全恢復，並獲得 30 點護盾！');
                        const xp = 50;
                        this.addXP(xp);
                    } else if (touchRoll < 0.65) {
                        showMessage('🌀 石碑的魔法將你傳送到了另一個地方！');
                        this.map_steps += 2;
                        showMessage(`📍 地圖進度 +2（${this.map_steps}/${this.map_goal}）`);
                        const gold = 50 + Math.floor(Math.random() * 50);
                        this.player.gold += gold;
                        showMessage(`💰 你在新地點發現了 ${gold} 金幣！`);
                    } else {
                        showMessage('⚠️ 石碑是個陷阱！');
                        const damage = 25 + Math.floor(Math.random() * 20);
                        this.player.hp = Math.max(1, this.player.hp - damage);
                        showMessage(`💥 魔法能量爆發，你受到 ${damage} 點傷害！`);
                    }
                } else if (choiceId === 'ignore') {
                    showMessage('🚶 你決定不理會石碑，繼續你的旅程。');
                    showMessage('安全第一總是沒錯的。');
                    this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 10);
                    showMessage('體力恢復 10 點。');
                }
                this.updateStatus();
                this.generateDirectionHints();
            }
        );
    },

    beastPack() {
        showMessage('🐺 你遭遇了一群沙漠野獸！');
        const choices = [
            { id: 'fight', label: '迎戰（正面戰鬥）', weight: 35 },
            { id: 'scare', label: '嚇跑牠們（需要消耗體力）', weight: 30 },
            { id: 'negotiate', label: '用食物安撫（消耗藥水）', weight: 35 }
        ];
        this.showChoicePanel(
            '野獸群來襲！',
            choices,
            (choiceId) => {
                if (choiceId === 'fight') {
                    showMessage('⚔️ 你決定迎擊野獸群！');
                    this.enemy.isBeastPack = true;
                    this.enemy.beastPackRemaining = 2;
                    this.battle('monster');
                } else if (choiceId === 'scare') {
                    const staminaCost = 30;
                    if (this.player.stamina < staminaCost) {
                        showMessage('😓 你的體力不足以嚇跑野獸！');
                        showMessage('🐺 野獸們嗅到了你的虛弱，發起攻擊！');
                        this.battle('elite');
                    } else {
                        const scareRoll = Math.random();
                        if (scareRoll < 0.7) {
                            this.player.stamina -= staminaCost;
                            showMessage(`💪 你展現出強大的氣勢，成功嚇跑了野獸！（消耗 ${staminaCost} 體力）`);
                            if (Math.random() < 0.5) {
                                const gold = 30 + Math.floor(Math.random() * 40);
                                this.player.gold += gold;
                                showMessage(`💰 野獸逃跑時掉落了 ${gold} 金幣！`);
                            }
                            this.updateStatus();
                            this.generateDirectionHints();
                        } else {
                            this.player.stamina -= staminaCost;
                            showMessage(`😰 嚇唬失敗！野獸更加憤怒了！（消耗 ${staminaCost} 體力）`);
                            this.battle('elite');
                        }
                    }
                } else if (choiceId === 'negotiate') {
                    if (this.player.potions < 1) {
                        showMessage('🧪 你沒有藥水可以當作食物！');
                        showMessage('🐺 野獸們向你撲來！');
                        this.battle('monster');
                    } else {
                        this.player.potions -= 1;
                        showMessage('🍖 你用藥水中的草藥安撫了野獸。');
                        showMessage('🐺 野獸們吃飽後滿意地離開了。');
                        const giftRoll = Math.random();
                        if (giftRoll < 0.4) {
                            const item = generateItem(Math.random() < 0.4 ? 'rare' : 'common', this.difficulty);
                            this.player.inventory.push(item);
                            showMessage(`🎁 野獸頭領留下了一件物品：${this.formatItem(item)}！`);
                        } else {
                            const gold = 40 + Math.floor(Math.random() * 60);
                            this.player.gold += gold;
                            showMessage(`💰 野獸離開時留下了 ${gold} 金幣。`);
                        }
                        const xp = 40;
                        this.addXP(xp);
                        this.updateStatus();
                        this.generateDirectionHints();
                    }
                }
            }
        );
    },

    moonlightAltar() {
        showMessage('🌙 在月光下，你發現了一座神秘的祭壇...');
        const choices = [
            { id: 'pray', label: '虔誠祈禱（可能獲得祝福）', weight: 35 },
            { id: 'offer_gold', label: '獻上金幣（100 金幣）', weight: 30 },
            { id: 'take_treasure', label: '拿走祭壇上的寶物（冒險）', weight: 35 }
        ];
        this.showChoicePanel(
            '月光祭壇',
            choices,
            (choiceId) => {
                if (choiceId === 'pray') {
                    showMessage('🙏 你跪在祭壇前虔誠祈禱...');
                    const prayRoll = Math.random();
                    if (prayRoll < 0.5) {
                        showMessage('✨ 月神回應了你的祈禱！');
                        this.player.moonBlessing = 5;
                        showMessage('🌙 你獲得月神祝福，接下來 5 場戰鬥暴擊率大幅提升！');
                        const xp = 60 + Math.floor(Math.random() * 40);
                        this.addXP(xp);
                    } else if (prayRoll < 0.8) {
                        showMessage('🌟 月光照耀著你。');
                        this.player.hp = Math.min(this.player.max_hp, this.player.hp + 40);
                        this.player.luck_combat += 1;
                        showMessage('恢復 40 HP，戰鬥幸運 +1。');
                    } else {
                        showMessage('...');
                        showMessage('月神似乎沒有回應，但祈禱讓你內心平靜。');
                        this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 15);
                    }
                } else if (choiceId === 'offer_gold') {
                    const offerCost = 100;
                    if (this.player.gold < offerCost) {
                        showMessage('💸 你沒有足夠的金幣獻祭。');
                        showMessage('🌙 但月神欣賞你的誠意。');
                        this.player.luck_gold += 1;
                        showMessage('金幣幸運 +1。');
                    } else {
                        this.player.gold -= offerCost;
                        showMessage(`💰 你獻上了 ${offerCost} 金幣。`);
                        showMessage('✨ 祭壇綻放出耀眼的光芒！');
                        const rewardType = Math.random();
                        if (rewardType < 0.4) {
                            const goldReturn = offerCost * 3;
                            this.player.gold += goldReturn;
                            showMessage(`💎 月神慷慨地回饋你 ${goldReturn} 金幣！`);
                        } else if (rewardType < 0.7) {
                            const item = generateItem(Math.random() < 0.5 ? 'epic' : 'rare', this.difficulty);
                            this.player.inventory.push(item);
                            showMessage(`⚔️ 月神賜予你一件珍貴的裝備：${this.formatItem(item)}！`);
                        } else {
                            this.player.max_hp += 35;
                            this.player.max_stamina += 25;
                            this.player.hp = Math.min(this.player.max_hp, this.player.hp + 35);
                            this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 25);
                            showMessage('🌙 月神的力量強化了你的身體！最大HP +35，最大體力 +25！');
                        }
                    }
                } else if (choiceId === 'take_treasure') {
                    showMessage('👁️ 你伸手去拿祭壇上的寶物...');
                    const takeRoll = Math.random();
                    if (takeRoll < 0.3) {
                        showMessage('🎉 沒有觸發任何機關！');
                        const item = generateItem(Math.random() < 0.6 ? 'rare' : 'epic', this.difficulty);
                        this.player.inventory.push(item);
                        const gold = 80 + Math.floor(Math.random() * 120);
                        this.player.gold += gold;
                        showMessage(`💰 你獲得了 ${gold} 金幣和 ${this.formatItem(item)}！`);
                        this.updateStatus();
                        this.generateDirectionHints();
                    } else if (takeRoll < 0.6) {
                        showMessage('⚠️ 祭壇的守護魔法觸發了！');
                        const item = generateItem('rare', this.difficulty);
                        this.player.inventory.push(item);
                        showMessage(`⚔️ 你拿到了 ${this.formatItem(item)}`);
                        const curse = 20 + Math.floor(Math.random() * 15);
                        this.player.hp = Math.max(1, this.player.hp - curse);
                        this.player.max_hp = Math.max(50, this.player.max_hp - 10);
                        showMessage(`😈 但受到詛咒！損失 ${curse} HP 和 10 最大HP！`);
                        this.updateStatus();
                        this.generateDirectionHints();
                    } else {
                        showMessage('👹 祭壇的守護者被喚醒了！');
                        this.battle('mini_boss');
                    }
                    return;
                }
                // pray and offer_gold need direction hints
                this.updateStatus();
                this.generateDirectionHints();
            }
        );
    },

    caravanWreckage() {
        showMessage('🐪 你發現了一處商隊遺骸...');
        const choices = [
            { id: 'search_carefully', label: '仔細搜尋（耗時但安全）', weight: 35 },
            { id: 'quick_loot', label: '快速搜刮（可能遺漏物品）', weight: 30 },
            { id: 'check_survivors', label: '檢查是否有倖存者', weight: 35 }
        ];
        this.showChoicePanel(
            '商隊遺骸',
            choices,
            (choiceId) => {
                if (choiceId === 'search_carefully') {
                    showMessage('🔍 你仔細搜索每一個角落...');
                    this.player.stamina = Math.max(0, this.player.stamina - 15);
                    showMessage('😓 仔細搜索消耗了 15 體力。');
                    const gold = 100 + Math.floor(Math.random() * 150);
                    this.player.gold += gold;
                    showMessage(`💰 你找到了 ${gold} 金幣！`);

                    const itemCount = 1 + (Math.random() < 0.5 ? 1 : 0);
                    for (let i = 0; i < itemCount; i++) {
                        const rarity = Math.random() < 0.3 ? 'rare' : 'common';
                        const item = generateItem(rarity, this.difficulty);
                        this.player.inventory.push(item);
                        showMessage(`⚔️ 找到了 ${this.formatItem(item)}！`);
                    }

                    if (Math.random() < 0.4) {
                        const potions = 1 + Math.floor(Math.random() * 2);
                        this.player.potions += potions;
                        showMessage(`🧪 還找到了 ${potions} 瓶藥水！`);
                    }
                    this.updateStatus();
                    this.generateDirectionHints();
                } else if (choiceId === 'quick_loot') {
                    showMessage('💨 你快速搜刮了一遍...');
                    const quickRoll = Math.random();
                    if (quickRoll < 0.5) {
                        const gold = 50 + Math.floor(Math.random() * 80);
                        this.player.gold += gold;
                        showMessage(`💰 你找到了 ${gold} 金幣。`);
                        if (Math.random() < 0.4) {
                            const item = generateItem('common', this.difficulty);
                            this.player.inventory.push(item);
                            showMessage(`⚔️ 還找到了 ${this.formatItem(item)}。`);
                        }
                        this.updateStatus();
                        this.generateDirectionHints();
                    } else if (quickRoll < 0.8) {
                        showMessage('💥 你觸發了殘留的陷阱！');
                        const damage = 20 + Math.floor(Math.random() * 15);
                        this.player.hp = Math.max(1, this.player.hp - damage);
                        showMessage(`受到 ${damage} 點傷害。`);
                        const gold = 30 + Math.floor(Math.random() * 40);
                        this.player.gold += gold;
                        showMessage(`💰 匆忙中你還是撿到了 ${gold} 金幣。`);
                        this.updateStatus();
                        this.generateDirectionHints();
                    } else {
                        showMessage('⚠️ 其他掠奪者也盯上了這裡！');
                        this.battle('monster');
                    }
                } else if (choiceId === 'check_survivors') {
                    showMessage('🔍 你檢查商隊成員的狀況...');
                    const survivorRoll = Math.random();
                    if (survivorRoll < 0.3) {
                        showMessage('😊 你找到了一位倖存者！');
                        const gold = 150;
                        this.player.gold += gold;
                        showMessage(`💰 倖存者感激地給了你 ${gold} 金幣作為酬謝。`);
                        const item = generateItem(Math.random() < 0.5 ? 'rare' : 'excellent', this.difficulty);
                        this.player.inventory.push(item);
                        showMessage(`🎁 還送給你一件珍貴物品：${this.formatItem(item)}！`);
                        const xp = 80 + Math.floor(Math.random() * 40);
                        this.addXP(xp);
                        showMessage('😌 救人一命讓你心情愉悅。');
                        this.updateStatus();
                        this.generateDirectionHints();
                    } else if (survivorRoll < 0.7) {
                        showMessage('😔 所有人都已經罹難了...');
                        showMessage('📖 你找到了商隊隊長的日記。');
                        const xp = 50 + Math.floor(Math.random() * 50);
                        this.addXP(xp);
                        showMessage('從日記中你學到了一些沙漠生存技巧。');
                        const gold = 60 + Math.floor(Math.random() * 60);
                        this.player.gold += gold;
                        showMessage(`💰 你找到了他們的共同基金 ${gold} 金幣。`);
                        this.updateStatus();
                        this.generateDirectionHints();
                    } else {
                        showMessage('😨 「倖存者」突然站起來攻擊你！');
                        showMessage('原來是盜賊的陷阱！');
                        this.battle('elite');
                    }
                }
            }
        );
    },

    pyramid() {
        showMessage('🔺 你發現了一座古老的金字塔！');
        showMessage('這裡充滿危險，但也蘊藏著巨大的寶藏...');
        showMessage('金字塔副本：8步探險，敵人強度極高（隨地圖提升），獎勵豐厚（15倍經驗/金幣），保證掉落優良以上裝備！');
        this.showPyramidChoice();
    }

    // Note: blackMarket and tradingPost remain in Game class due to complex DOM manipulation
};
