// Branch Event Handlers - All branch handlers called with Game instance as `this`
// Usage: BranchHandlers.branchName.call(gameInstance)

const BranchHandlers = {
    ambush() {
        showMessage(t('branchAmbush'));
        if (!this.inBattle) this.battle('monster');
    },

    treasure_drop() {
        showMessage(t('branchTreasureDrop'));
        const gold = Math.floor(50 * this.difficulty * (1 + Math.random()));
        this.player.gold += gold;
    },

    ally_join() {
        showMessage(t('branchAllyJoin'));
        this.tempAllyBonus = 0.2;
    },

    escape_route() {
        showMessage(t('branchEscapeRoute'));
        this.canEscape = true;
    },

    epic_loot() {
        showMessage(t('branchEpicLoot'));
        const epicItem = generateItem('epic', this.difficulty);
        this.player.inventory.push(epicItem);
    },

    curse() {
        showMessage(t('branchCurse'));
        this.player.max_hp = Math.floor(this.player.max_hp * 0.9);
        this.player.hp = Math.min(this.player.hp, this.player.max_hp);
    },

    power_surge() {
        showMessage(t('branchPowerSurge'));
        this.powerSurge = 3;
    },

    boss_insight() {
        showMessage(t('branchBossInsight'));
        this.bossInsight = true;
    },

    legendary_loot() {
        showMessage(t('branchLegendaryLoot'));
        const legendItem = generateItem('epic', this.difficulty + 2);
        this.player.inventory.push(legendItem);
        this.player.gold += 200 * this.difficulty;
    },

    god_blessing() {
        showMessage(t('branchGodBlessing'));
        this.godBlessing = true;
        this.calculateStats();
    },

    ancient_power() {
        showMessage(t('branchAncientPower'));
        this.player.base_atk += 5;
    },

    hidden_passage() {
        showMessage(t('branchHiddenPassage'));
        if (this.inPyramid) this.pyramidSteps += 3;
        else this.map_steps += 3;
    },

    discount() {
        showMessage(t('branchDiscount'));
        this.merchantDiscount = 0.8;
    },

    rare_item() {
        showMessage(t('branchRareItem'));
        // 商人事件會顯示額外稀有物品
    },

    healing_spring() {
        showMessage(t('branchHealingSpring'));
        this.player.hp = this.player.max_hp;
    },

    hidden_treasure() {
        showMessage(t('branchHiddenTreasure'));
        this.player.gold += 100 * this.difficulty;
        const treasure = generateItem('rare', this.difficulty);
        this.player.inventory.push(treasure);
    },

    desert_guide() {
        showMessage(t('branchDesertGuide'));
        this.hasGuide = 5;
    },

    oasis_blessing() {
        showMessage(t('branchOasisBlessing'));
        this.oasisBlessing = true;
    },

    secret_chamber() {
        showMessage(t('branchSecretChamber'));
        this.player.gold += 300 * this.difficulty;
    },

    divine_trial() {
        showMessage(t('branchDivineTrial'));
        this.divineTrial = true;
    },

    double_loot() {
        showMessage(t('branchDoubleLoot'));
        this.player.gold += 200 * this.difficulty;
    },

    curse_item() {
        showMessage(t('branchCurseItem'));
        const cursedItem = generateItem('epic', this.difficulty);
        cursedItem.name = '詛咒的' + cursedItem.name;
        cursedItem.cursed = true;
        this.player.inventory.push(cursedItem);
    },

    revenge_quest() {
        showMessage(t('branchRevengeQuest'));
        this.revengeQuest = true;
    },

    quicksand() {
        showMessage(t('branchQuicksand'));
        this.player.gold = Math.max(0, this.player.gold - 50 * this.difficulty);
    }
};
