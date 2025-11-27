// Simple Events - Basic events without complex UI or choices
// Called with Game instance as `this`

const SimpleEvents = {
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
    }
};
