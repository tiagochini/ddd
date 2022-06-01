import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../Domain/Customer/Factory/customer.factory";
import Address from "../../../Domain/Customer/ValueObject/address";
import CustomerModel from "../../../Infrastructure/Customer/Repository/Sequelize/customer.model";
import CustomerRepository from "../../../Infrastructure/Customer/Repository/Sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

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
        const useCase = new CreateCustomerUseCase(customerRepository);
        
        const input = {
            name: "John",
            address: {
                street: "Street",
                city: "City",
                zip: "Zip",
                number: "Number",
            },
        }

        const result = await useCase.execute(input);

        expect(result).toEqual({
            id: expect.any(String),
            name: 'John',
            address: {
                street: 'Street',
                city: 'City',
                zip: 'Zip',
                number: 'Number',
            }
        });
    });

    it('shold throw an error when name is missing', async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "",
            address: {
                street: "Street",
                city: "City",
                zip: "Zip",
                number: "Number",
            },
        }
        await expect(useCase.execute(input)).rejects.toThrow('Name is required');

    });

    it('shold throw an error when street is missing', async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "John",
            address: {
                street: "",
                city: "City",
                zip: "Zip",
                number: "Number",
            },
        }
        await expect(useCase.execute(input)).rejects.toThrow('Street is required');

    });

});