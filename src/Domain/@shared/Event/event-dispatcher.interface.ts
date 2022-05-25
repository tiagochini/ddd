import EventHandlerInteface from "./event-gandler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInteface): void;
    unregister(eventName: string, eventHandler: EventHandlerInteface): void;
    unregisterAll(): void;
}