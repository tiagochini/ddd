import Address from "../ValueObject/address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id() {
        return this._id;
    }


    get name(): string {
        return this._name
    }

    get isActive(): boolean {
        return this._active;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('Address is mandatory to acticate a customer');
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(rewardPoints: number) {
        this._rewardPoints += rewardPoints;
    }

    set Address(address: Address) {
        this._address = address;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }

        if (this._name.length === 0) {
            throw new Error('Name is required');
        }

        if (this._name.length < 3) {
            throw new Error('Name the minimum number of characters must be greater than 3');
        }

    }
}
