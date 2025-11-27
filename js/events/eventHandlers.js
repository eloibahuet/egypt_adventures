// Event Handlers - Combined from all event handler modules
// Called with Game instance as `this`
// Usage: EventHandlers.eventName.call(gameInstance)

// Merge all event handlers into one object
const EventHandlers = Object.assign(
    {},
    SimpleEvents,
    MediumEvents,
    EnhancedEvents,
    ChoiceEvents
);
