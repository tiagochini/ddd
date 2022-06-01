import Address from "../ValueObject/address";
import Customer from "./customer";

describe("Customer unit test", () => {

    it("should throw error whe id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Tiago");
        }).toThrowError("customer: Id is required");
    });

    it("should throw error whe name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("customer: Name is required, ");
    });

    it("should throw error whe name the minimum number", () => {
        expect(() => {
            let customer = new Customer("123", "a");
        }).toThrowError("customer: Name must be at least 3 characters");
    });

    it("should change name", () => {

        const customer = new Customer("123", "Jhonatan");

        customer.changeName('Jane');

        expect(customer.name).toBe("Jane");
    });

    it("should throw error when address is undefined when you actuvate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to acticate a customer");

    });

    it("should activate customer", () => {

        const customer = new Customer("1", "Customer 1");
        const address = new Address('Street 1', "São Paulo", '13330-250', '255');
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive).toBe(true);
    });

    it("should deactivate customer", () => {

        const customer = new Customer("1", "Customer 1");
        customer.deactivate();

        expect(customer.isActive).toBe(false);
    });

    it('should add reward points', () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});