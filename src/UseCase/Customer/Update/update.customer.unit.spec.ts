import CustomerFactory from "../../../Domain/Customer/Factory/customer.factory";
import Address from "../../../Domain/Customer/ValueObject/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John', new Address('Street', 'City', 'Zip', 'Number'));

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street Updated",
        city: "City Updated",
        zip: "Zip Updated",
        number: "Number Updated",
    },
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test update customer use case", () => {

    it("should update customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);
        
        input.name = 'mariana';
        input.address.street = "";

        await expect(useCase.execute(input)).rejects.toThrow("Street is required");
    });
});