import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInteface from "./event-gandler.interface";
import eventGandlerInterface from "./event-gandler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: { [eventName: string]: EventHandlerInteface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInteface[] } {
        return this.eventHandlers;
    }

    notify(event: eventInterface): void {
        const eventName = event.constructor.name;
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }

    register(eventName: string, eventHandler: eventGandlerInterface<eventInterface>): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: eventGandlerInterface<eventInterface>): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

}