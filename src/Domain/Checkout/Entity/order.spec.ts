import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit test", () => {

    it("should throw error whe id is empty", () => {
        expect(() => {
            let customer = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error whe custumerId is empty", () => {
        expect(() => {
            let customer = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error whe custumerId is empty", () => {
        expect(() => {
            let customer = new Order("123", "123", []);
        }).toThrowError("Item qtd must be freater then 0");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 2);
        const item2 = new OrderItem('i1', 'Item 1', 30, 'p2', 2);
        const order = new Order('o1', 'c1', [item1]);

        const total = order.total();
        expect(total).toBe(200);

        const order2 = new Order('o1', 'c1', [item1, item2]);

        const total2 = order2.total();
        expect(total2).toBe(260);

    });

    it("should throw error if the item qte is less or equal 0", () => {
        expect(() => {
            const item1 = new OrderItem('i1', 'Item 1', 100, 'p1', 0);
            const order = new Order('o1', 'c1', [item1]);
        }).toThrowError("Quantity must be freater then 0");

    });
});

