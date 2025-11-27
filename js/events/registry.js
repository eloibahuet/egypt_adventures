// Event Registry - Central event system
// All events are registered here with their weights and handlers

const EventRegistry = {
    events: {},

    // Register events from a domain module
    register(domainEvents) {
        Object.assign(this.events, domainEvents);
    },

    // Get total weight of all events
    getTotalWeight() {
        return Object.values(this.events).reduce((sum, e) => sum + e.weight, 0);
    },

    // Choose a random event based on weights
    chooseEvent() {
        const total = this.getTotalWeight();
        let r = Math.random() * total;
        for (const [name, event] of Object.entries(this.events)) {
            r -= event.weight;
            if (r <= 0) return name;
        }
        return 'empty';
    },

    // Trigger an event by name, with game instance as context
    triggerEvent(game, eventName) {
        const event = this.events[eventName];
        if (event && typeof event.handler === 'function') {
            event.handler.call(game);
            return true;
        }
        return false;
    },

    // Check if an event exists
    hasEvent(name) {
        return name in this.events;
    },

    // Get event info
    getEvent(name) {
        return this.events[name];
    }
};

// Backwards compatibility: chooseEvent() global function
function chooseEvent() {
    return EventRegistry.chooseEvent();
}
