import { Sequelize } from "sequelize-typescript";
import Customer from "../../../Domain/Customer/Entity/customer";
import Address from "../../../Domain/Customer/ValueObject/address";
import CustomerModel from "../../../Infrastructure/Customer/Repository/Sequelize/customer.model";
import CustomerRepository from "../../../Infrastructure/Customer/Repository/Sequelize/customer.repository";
import FindCustomerUserCase from "./find.customer.usecase";

const customer = new Customer('123', 'John');
const address = new Address('Street', 'City', 'Zip', 'Number');
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe('Unit Test find customer use case', () => {

    it('should return customer', async () => {

        const customerRepository = MockRepository();
        const useCase = new FindCustomerUserCase(customerRepository);

        const input = {
            id: '123',
        }

        const output = {
            id: '123',
            name: 'John',
            addresses: {
                street: 'Street',
                city: 'City',
                zip: 'Zip',
                number: 'Number',
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });

    it('should not found a customer', async () => {

        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const useCase = new FindCustomerUserCase(customerRepository);

        const input = {
            id: '123',
        }

        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Customer not found");
    });

});