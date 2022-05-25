import Address from "../ValueObject/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("shoud create a customer", () => {
        let customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
        expect(customer.constructor.name).toBe("Customer");
    });

    it("shoud create a customer with an address", () => {
        const address = new Address("Rua 13 de maio", "Rondonopolis", "78710-165", "2277");
        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
        expect(customer.constructor.name).toBe("Customer");
    });
});