export default class Address {

    _street: string = '';
    _city: string = '';
    _zipcode: string = '';
    _number: string = '';

    constructor(street: string, city: string, zipcode: string, number: string) {

        this._street = street;
        this._city = city;
        this._zipcode = zipcode;
        this._number = number;
        this.validate();
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }

        if (this._number.length === 0) {
            throw new Error("Number is required");
        }

        if (this._city.length === 0) {
            throw new Error("City is required");
        }

        if (this._zipcode.length === 0) {
            throw new Error("Zip code is required");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zipcode}, ${this._city}`;
    }
}