import CustomerFactory from "../../../Domain/Customer/Factory/customer.factory";
import Address from "../../../Domain/Customer/ValueObject/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress('Jhon Do', new Address('Street', 'City','78710-165', '12345'));
const customer2 = CustomerFactory.createWithAddress('Jhon Doe', new Address('Street 2', 'City 2', '78710-165 2', '12345 2'));

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        find: jest.fn(),
        update: jest.fn(),
    };
}

describe('Unit test for listing customer use case', () => {
    
    it("should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new ListCustomerUseCase(repository);
        const input = {};
        const output = await useCase.execute(input);
        
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
        
    });

});