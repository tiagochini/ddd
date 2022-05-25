import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../Domain/Customer/Entity/customer";
import Address from "../../../../Domain/Customer/ValueObject/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Product repository test", () => {
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

    it('should create a custumer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', "Fulano 1");
        const address = new Address("rua a","rondonopolis",'78710-165','200');
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customertModel = await CustomerModel.findOne({ where: { id: '123' } });

        expect(customertModel.toJSON()).toStrictEqual({
            id: '123',
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city
        });
    });

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', "Product 1");
        const address = new Address("rua a", "rondonopolis", '78710-165', '200');
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customertModel = await CustomerModel.findOne({ where: { id: '123' } });

        expect(customertModel.toJSON()).toStrictEqual({
            id: '123',
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city
        });

        customer.changeName("Fulano 2");

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: '123' } });

        expect(customerModel2.toJSON()).toStrictEqual({
            id: '123',
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city
        });
    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('123', "Fulano 1");
        const address = new Address("rua a", "rondonopolis", '78710-165', '200');
        customer.changeAddress(address);

        await customerRepository.create(customer);
        const foundCustomer = await customerRepository.find("123");
        expect(customer).toStrictEqual(foundCustomer);
    });

    it('should throw and error when customer is not found', async () => {
        const customerRepository = new CustomerRepository();
       
        expect(async () => {
            await customerRepository.find("456ABC");
        }).rejects.toThrow("Customer not found");
        
    });

    it('should findAll a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', "Product 1");
        const address = new Address("rua a", "rondonopolis", '78710-165', '200');
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        await customerRepository.create(customer);

        const customer2 = new Customer('2', "Product 2");
        const address2 = new Address("rua b", "rondonopolis", '78710-165', '200b');
        customer2.changeAddress(address2);
        customer2.addRewardPoints(20);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();
    
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer2);
    });
});