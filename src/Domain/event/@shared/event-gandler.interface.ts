import EventInterface from "./event.interface";
export default interface EventHandlerInteface < T extends EventInterface=EventInterface > {
    handle(event: T): void;
}