import Customer from "../../Domain/Entity/customer";
import CustomerRepositoryInteface from "../../Domain/Repository/customer-repository.interface";
import Address from "../../Domain/ValueObject/address";
import CustomerModel from "../Db/Sequelize/Model/customer.model";

export default class CustumerRepository implements CustomerRepositoryInteface {
    async create(entity: Customer): Promise<void> {

        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zipcode,
            city: entity.Address.city,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zipcode,
            city: entity.Address.city,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints,
        }, {
            where: {
                id: entity.id
            },
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id
                },
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Customer not found");
        }


        const customer = new Customer(customerModel.id, customerModel.name);
        const address = new Address(customerModel.street, customerModel.city, customerModel.zipcode, customerModel.number);
        customer.changeAddress(address);
        customer.addRewardPoints(customerModel.rewardPoints);
        if (customerModel.active) {
            customer.activate();
        }
        
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModel = await CustomerModel.findAll();
        const customers = customerModel.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);
            const address = new Address(customerModel.street, customerModel.city, customerModel.zipcode, customerModel.number)
            customer.changeAddress(address);
            customer.addRewardPoints(customerModel.rewardPoints);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });

        return customers;
    }
}