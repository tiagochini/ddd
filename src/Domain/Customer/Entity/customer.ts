import Entity from "../../@shared/Entity/entity.abstract";
import NotificationError from "../../@shared/Notification/notification.error";
import CustomerValidatorFactory from "../Factory/customer.validator.factory";
import Address from "../ValueObject/address";
import CustomerInterface from "./customer.interface";

export default class Customer extends Entity implements CustomerInterface {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name
    }

    get Address() {
        return this._address;
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

    changeAddress(address: Address) {
        this._address = address
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

    validate() {
        CustomerValidatorFactory.create().validate(this);

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }
}
