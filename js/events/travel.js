// Travel Events - Environmental hazards and simple travel encounters
// Called with Game instance as `this`

const TravelEvents = {
    empty: {
        weight: 2,
        handler() {
            const messages = [
                '你繼續前行，沒有遇到任何特別的事情。',
                '一陣風吹過沙丘，沒什麼特別的。',
                '你小心翼翼地前進，這段路程很平靜。',
                '遠處傳來駱駝的叫聲，但周圍空無一物。',
                '你在沙地上看到一些腳印，但主人早已不見蹤影。'
            ];
            showMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
    },

    oasis: {
        weight: 6,
        handler() {
            const mapMultiplier = getMapMultiplier(this.difficulty);
            const hpGain = Math.floor(20 * mapMultiplier);
            const staminaGain = Math.floor(10 * mapMultiplier);
            showMessage(t('oasisFound'));
            this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
            this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
            showMessage(`HP +${hpGain}，體力 +${staminaGain}`);
        }
    },

    sandstorm: {
        weight: 8,
        handler() {
            showMessage(t('sandstormEncounter'));
            this.player.hp = Math.max(0, this.player.hp - 10);
            showMessage(`${t('sandstormDamage')} -10。`);
        }
    },

    mirage: {
        weight: 4,
        handler() {
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
        }
    },

    quicksand: {
        weight: 5,
        handler() {
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
        }
    },

    scorpion_nest: {
        weight: 4,
        handler() {
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
        }
    }
};

// Register with EventRegistry
EventRegistry.register(TravelEvents);
