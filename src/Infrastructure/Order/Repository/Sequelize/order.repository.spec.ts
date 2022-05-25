import { Sequelize } from "sequelize-typescript";

import Customer from "../../../../Domain/Customer/Entity/customer";
import CustomerModel from "../../../Customer/Repository/Sequelize/customer.model";
import CustumerRepository from "../../../Customer/Repository/Sequelize/customer.repository";

import Order from "../../../../Domain/Checkout/Entity/order";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

import OrderItem from "../../../../Domain/Checkout/Entity/orderItem";
import OrderItemModel from "./order-item.model";

import Product from "../../../../Domain/Product/Entity/product";
import ProductModel from "../../../Product/Repository/Sequelize/product.model";
import ProductRepository from "../../../Product/Repository/Sequelize/product.repository";

import Address from "../../../../Domain/Customer/ValueObject/address";

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
                    product_id: "123",
                    price_un: orderItem.price_un,
                }
            ]
        });
    });

    it("should update a new order", async () => {
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

        const product2 = new Product('1234', "Product 2", 30);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            5
        );

        order.addItem(orderItem2);

        await orderRepository.update(order);

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
                    product_id: orderItem.productId,
                    price_un: orderItem.price_un,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    quantity: orderItem2.quantity,
                    price: orderItem2.price,
                    order_id: "a1",
                    product_id: orderItem2.productId,
                    price_un: orderItem2.price_un,
                },
            ]
        });
    });

    it("should find a order", async () => {
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

        const orderModel = await orderRepository.find('a1');

        expect(orderModel).toStrictEqual(order);
    });

    it('should throw and error when order is not found', async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("456ABC");
        }).rejects.toThrow("Order not found");

    });

    it("should find all a order", async () => {
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

        const orderItem2 = new OrderItem(
            "12",
            product.name,
            product.price,
            product.id,
            3
        );

        const order2 = new Order('a2', "123", [orderItem2]);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();
        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
    });
});