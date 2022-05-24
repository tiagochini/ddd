import OrderRepositoryInteface from "../../Domain/Repository/order-repository.interface";
import OrderModel from "../Db/Sequelize/Model/order.model";
import OrderItemModel from "../Db/Sequelize/Model/order-item.model";
import Order from "../../Domain/Entity/order";
import OrderItem from "../../Domain/Entity/orderItem";

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
                product_id: item.productId,
                quantity: item.quantity,
                price_un: item.price_un
            })),
        }, {
            include: [{ model: OrderItemModel }],
        });
    }


    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            });
            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                price_un: item.price_un,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }));
            await OrderItemModel.bulkCreate(items, { transaction: t });
            await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id }, transaction: t }
            );
        });
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: { id },
                include: ['items'],
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        return new Order(orderModel.id, orderModel.customer_id, orderModel.items.map((item) =>
            new OrderItem(item.id, item.name, item.price_un, item.product_id, item.quantity)
        ));

    }

    async findAll(): Promise<Order[]> {
        const orderModel = await OrderModel.findAll({ include: ['items'] });
        const orders = orderModel.map((orderModel) => {
            const items = orderModel.items.map((item) =>
                new OrderItem(item.id, item.name, item.price_un, item.product_id, item.quantity)
            );
            return new Order(orderModel.id, orderModel.customer_id, items);
        })
        return orders;
    }

}