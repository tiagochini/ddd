import Address from "../ValueObject/address";

export default interface CustomerInterface {
    get id(): string;
    get name(): string;
    get Address(): Address;
    get isActive(): boolean;
    get rewardPoints(): number;
    activate(): void
    deactivate(): void
}