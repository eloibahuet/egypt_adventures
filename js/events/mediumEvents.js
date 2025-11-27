// Medium Events - Events with moderate complexity and random outcomes
// Called with Game instance as `this`

const MediumEvents = {
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
    }
};
