// Commerce Events - Trading, rest, and shop encounters
// Called with Game instance as `this`

const CommerceEvents = {
    merchant: {
        weight: 7,
        handler() {
            showMessage('遇到商隊：若資金足夠可補給藥水（50金/瓶）。');
            if (this.player.gold >= 50) {
                this.player.gold -= 50;
                this.player.potions += 1;
                showMessage('補給成功，藥水+1');
            } else {
                showMessage('金幣不足，無法購買補給。');
            }
        }
    },

    black_market: {
        weight: 4,
        handler() {
            // Delegates to ShopsMixin.blackMarket
            this.blackMarket();
        }
    },

    trading_post: {
        weight: 6,
        handler() {
            // Delegates to ShopsMixin.tradingPost
            this.tradingPost();
        }
    },

    caravan_rest: {
        weight: 8,
        handler() {
            // Delegates to ShopsMixin.tradingPost (caravan rest is the same)
            this.tradingPost();
        }
    }
};

// Register with EventRegistry
EventRegistry.register(CommerceEvents);
