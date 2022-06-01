import { Sequelize } from "sequelize-typescript";
import Product from "../../../Domain/Product/Entity/product";
import ProductModel from "../../../Infrastructure/Product/Repository/Sequelize/product.model";
import ProductRepository from "../../../Infrastructure/Product/Repository/Sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe('Test create product use case', () => {
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
        const useCase = new CreateProductUseCase(productRepository)

        const input = {
            name: 'Product 1',
            price: 13.20
        };
        const response =await useCase.execute(input);

        const result = await useCase.execute(input);

        expect(result).toEqual({
            id: expect.any(String),
            name: 'Product 1',
            price: 13.20,
        });
    });

    it('shold throw an error when name is missing', async () => {
        const input = {
            name: '',
            price: 1
        }

        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        await expect(useCase.execute(input)).rejects.toThrow('Name is required');

    });

    it('shold throw an error when price is missing', async () => {
        const input = {
            name: 'name',
            price: -1
        }

        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        await expect(useCase.execute(input)).rejects.toThrow('Price must be greater than zero');

    });

});