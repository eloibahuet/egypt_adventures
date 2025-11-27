// Choice Events - Events with showChoicePanel UI for player decisions
// Called with Game instance as `this`

const ChoiceEvents = {
    sandstorm_shelter: {
        weight: 5,
        handler() {
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
        }
    },

    wandering_alchemist: {
        weight: 5,
        handler() {
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
        }
    },

    ancient_tablet: {
        weight: 4,
        handler() {
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
        }
    },

    beast_pack: {
        weight: 6,
        handler() {
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
        }
    },

    moonlight_altar: {
        weight: 4,
        handler() {
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
                    this.updateStatus();
                    this.generateDirectionHints();
                }
            );
        }
    },

    caravan_wreckage: {
        weight: 5,
        handler() {
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
        }
    },

    pyramid: {
        weight: 6,
        handler() {
            showMessage('🔺 你發現了一座古老的金字塔！');
            showMessage('這裡充滿危險，但也蘊藏著巨大的寶藏...');
            showMessage('金字塔副本：8步探險，敵人強度極高（隨地圖提升），獎勵豐厚（15倍經驗/金幣），保證掉落優良以上裝備！');
            this.showPyramidChoice();
        }
    }
};

// Register with EventRegistry
EventRegistry.register(ChoiceEvents);
