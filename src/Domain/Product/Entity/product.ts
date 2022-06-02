import Entity from "../../@shared/Entity/entity.abstract";
import NotificationError from "../../@shared/Notification/notification.error";
import ProductValidatorFactory from "../Factory/procut.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }

    validate(): boolean {
        ProductValidatorFactory.create().validate(this);

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }

        return true;
    }
}