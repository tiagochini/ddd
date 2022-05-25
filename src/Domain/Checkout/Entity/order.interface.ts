import OrderItem from "./orderItem";

export default interface OrderInterface {
    get id(): string;
    get custumerId(): string;
    get items(): OrderItem[];
    total(): number;
}