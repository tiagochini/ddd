import OrderInterface from './order.interface';
import OrderItem from './orderItem';

export default class Order implements OrderInterface {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;


    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();

        this.validate();
    }

    get id() {
        return this._id;
    }

    get custumerId() {
        return this._customerId;
    }

    get items() {
        return this._items;
    }

    addItem(item: OrderItem) {
        this._items.push(item);
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }

        if (this._customerId.length === 0) {
            throw new Error('CustomerId is required');
        }

        if (this._items.length === 0) {
            throw new Error('Item qtd must be freater then 0');
        }

        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity must be freater then 0");
        }

        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }
}