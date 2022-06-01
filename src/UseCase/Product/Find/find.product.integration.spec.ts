import { Sequelize } from "sequelize-typescript";
import Product from "../../../Domain/Product/Entity/product";
import ProductModel from "../../../Infrastructure/Product/Repository/Sequelize/product.model";
import ProductRepository from "../../../Infrastructure/Product/Repository/Sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";


describe('Test find product use case', () => {
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

    it('should return product', async () => {

        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository)

        const product = new Product('a', 'Product 1', 13.20);
        await productRepository.create(product);

        const input = {
            id: 'a',
        }

        const output = {
            id: 'a',
            name: 'Product 1',
            price: 13.20,
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });

});