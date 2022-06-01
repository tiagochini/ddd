import { Sequelize } from "sequelize-typescript";
import Customer from "../../../Domain/Customer/Entity/customer";
import Address from "../../../Domain/Customer/ValueObject/address";
import CustomerModel from "../../../Infrastructure/Customer/Repository/Sequelize/customer.model";
import CustomerRepository from "../../../Infrastructure/Customer/Repository/Sequelize/customer.repository";
import FindCustomerUserCase from "./find.customer.usecase";

describe('Test find customer use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should return customer', async () => {

        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUserCase(customerRepository);

        const customer = new Customer('123', 'John');
        const address = new Address('Street', 'City', 'Zip', 'Number');
        customer.changeAddress(address);

        
        await customerRepository.create(customer);

        const input = {
            id: '123',
        }

        const output = {
            id: '123',
            name: 'John',
            address: {
                street: 'Street',
                city: 'City',
                zip: 'Zip',
                number: 'Number',
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });

});