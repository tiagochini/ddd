import { Sequelize } from "sequelize-typescript";
import Product from "../../../Domain/Product/Entity/product"
import ProductModel from "../../../Infrastructure/Product/Repository/Sequelize/product.model";
import ProductRepository from "../../../Infrastructure/Product/Repository/Sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product('a1', 'Product 1', 10);
const product2 = new Product('a3', 'Product 2', 20);



describe('Unit test for listing product use case', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list a product", async () => {
        const repository = new ProductRepository();
        repository.create(product1);
        repository.create(product2);
        const useCase = new ListProductUseCase(repository);
        const input = {};
        const output = await useCase.execute(input);

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);

    });

    it("should list empty product", async () => {
        const repository = new ProductRepository();
    
        const useCase = new ListProductUseCase(repository);
        const input = {};
        const output = await useCase.execute(input);

        expect(output.products.length).toBe(0);
     });
});