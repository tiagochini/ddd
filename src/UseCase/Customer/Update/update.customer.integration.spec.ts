import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../Domain/Customer/Factory/customer.factory";
import Address from "../../../Domain/Customer/ValueObject/address";
import CustomerModel from "../../../Infrastructure/Customer/Repository/Sequelize/customer.model";
import CustomerRepository from "../../../Infrastructure/Customer/Repository/Sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John', new Address('Street', 'City', 'Zip', 'Number'));

describe("Test update customer use case", () => {

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


    it("should update customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        customerRepository.create(customer);
        
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

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);
        customerRepository.create(customer);

        const input = {
            id: customer.id,
            name: "",
            address: {
                street: "Street Updated",
                city: "City Updated",
                zip: "Zip Updated",
                number: "Number Updated",
            },
        }

        await expect(useCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when street is missing", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);
        customerRepository.create(customer);

        const input = {
            id: customer.id,
            name: "John Updated",
            address: {
                street: "",
                city: "City Updated",
                zip: "Zip Updated",
                number: "Number Updated",
            },
        }

        await expect(useCase.execute(input)).rejects.toThrow("Street is required");
    });
});