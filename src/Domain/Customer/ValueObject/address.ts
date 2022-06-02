import Entity from "../../@shared/Entity/entity.abstract";
import NotificationError from "../../@shared/Notification/notification.error";
import AddressValidatorFactory from "./Factory/address.validator.factory";

export default class Address extends Entity {

    _street: string = '';
    _city: string = '';
    _zipcode: string = '';
    _number: string = '';

    constructor(street: string, city: string, zipcode: string, number: string) {
        super();
        this._street = street;
        this._city = city;
        this._zipcode = zipcode;
        this._number = number;
        this.validate();
    }

    get street() {
        return this._street;
    }

    get number() {
        return this._number;
    }

    get zipcode() {
        return this._zipcode;
    }

    get city() {
        return this._city;
    }

    validate() {
        AddressValidatorFactory.create().validate(this);

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }   
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zipcode}, ${this._city}`;
    }
}