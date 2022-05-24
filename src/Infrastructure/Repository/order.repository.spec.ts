import { Sequelize } from "sequelize-typescript";

import Customer from "../../Domain/Entity/customer";
import CustomerModel from "../Db/Sequelize/Model/customer.model";
import CustumerRepository from "./customer.repository";

import Order from "../../Domain/Entity/order";
import OrderModel from "../Db/Sequelize/Model/order.model";
import OrderRepository from "./order.repository";

import OrderItem from "../../Domain/Entity/orderItem";
import OrderItemModel from "../Db/Sequelize/Model/order-item.model";

import Product from "../../Domain/Entity/product";
import ProductModel from "../Db/Sequelize/Model/product.model";
import ProductRepository from "./product.repository";

import Address from "../../Domain/ValueObject/address";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustumerRepository();
        const customer = new Customer('123', "Customer 1");
        const address = new Address("Rua 1", "Rondonopolis", "78710165", "2277");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('123', "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order('a1', "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ['items'],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "a1",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    order_id: "a1",
                    prudct_id: "123"
                }
            ]
        });
    });
});