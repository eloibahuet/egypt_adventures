// Story Events - Narrative encounters with gods, strangers, and complex scenarios
// Called with Game instance as `this`

const StoryEvents = {
    egyptian_god: {
        weight: 4,
        handler() {
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
        }
    },

    mysterious_stranger: {
        weight: 4,
        handler() {
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
    },

    lost_merchant: {
        weight: 4,
        handler() {
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
        }
    },

    cursed_shrine: {
        weight: 4,
        handler() {
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
        }
    },

    bandit_ambush: {
        weight: 6,
        handler() {
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
        }
    },

    ancient_puzzle: {
        weight: 5,
        handler() {
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
        }
    },

    desert_oasis: {
        weight: 5,
        handler() {
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
        }
    }
};

// Register with EventRegistry
EventRegistry.register(StoryEvents);
