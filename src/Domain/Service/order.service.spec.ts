import Customer from "../Entity/customer";
import Order from "../Entity/order";
import OrderItem from "../Entity/orderItem";
import OrderService from "./order.service";

describe('Order service unit test', () => {

    it('should place order', () => {
        const customer = new Customer('c1', "Customer 1");
        const item1 = new OrderItem("i1", "Item 1", 10, 'p1', 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it('should get total of all oirders', () => {
        const item1 = new OrderItem('i1', "Item 1", 100, 'p1', 1);
        const item2 = new OrderItem('i2', "Item 2", 200, 'p1', 2);

        const order1 = new Order('oc1', "c1", [item1]);
        const order2 = new Order('oc1', "c1", [item2]);


        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);

    });
});
