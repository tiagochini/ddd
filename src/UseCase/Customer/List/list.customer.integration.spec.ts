import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../Domain/Customer/Factory/customer.factory";
import Address from "../../../Domain/Customer/ValueObject/address";
import CustomerModel from "../../../Infrastructure/Customer/Repository/Sequelize/customer.model";
import CustomerRepository from "../../../Infrastructure/Customer/Repository/Sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress('Jhon Do', new Address('Street', 'City', '78710-165', '12345'));
const customer2 = CustomerFactory.createWithAddress('Jhon Doe', new Address('Street 2', 'City 2', '78710-165 2', '12345 2'));

describe("Test for listing customer use case", () => {
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

    it("should return customer", async () => {
        const repository = new CustomerRepository();
        repository.create(customer1);
        repository.create(customer2);

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

    it("should return empty list", async () => {
        const repository = new CustomerRepository();

        const useCase = new ListCustomerUseCase(repository);

        const input = {};
        const output = await useCase.execute(input);

        expect(output.customers.length).toBe(0);
    });
});