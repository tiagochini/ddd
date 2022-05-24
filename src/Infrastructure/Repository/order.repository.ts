import Customer from "../../Domain/Entity/customer";
import Address from "../../Domain/ValueObject/address";
import CustomerModel from "../Db/Sequelize/Model/customer.model";
import OrderRepositoryInteface from "../../Domain/Repository/order-repository.interface";
import OrderModel from "../Db/Sequelize/Model/order.model";
import OrderItemModel from "../Db/Sequelize/Model/order-item.model";
import Order from "../../Domain/Entity/order";

export default class OrderRepository implements OrderRepositoryInteface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.custumerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                prodcut_id: item.productId,
                quantity: item.quantity,
            })),
        }, {
            include: [{ model: OrderItemModel }],
        });
    }


    async update(entity: Order): Promise<void> {
        // throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<Order> {
        return new Order('','',[]);
    }
    async findAll(): Promise<Order[]> {
        return [new Order('', '', [])];
    }

}