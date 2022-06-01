import { Sequelize } from 'sequelize-typescript';
import Product from '../../../Domain/Product/Entity/product';
import ProductModel from '../../../Infrastructure/Product/Repository/Sequelize/product.model';
import ProductRepository from '../../../Infrastructure/Product/Repository/Sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('a', 'Product 1', 13.20);


describe('Unit test for update product use case', () => {
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

    it('should update product', async () => {
        const productRepository = new ProductRepository();
        productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: 'a',
            name: 'Product update',
            price: 30
        };
        const response = await useCase.execute(input);
        expect(response).toEqual(input);
    });

    it('should throw error product is missing name', async () => {
        const productRepository = new ProductRepository();
        productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);
        const input = {
            id: 'a',
            name: '',
            price: 30
        };
        await expect(useCase.execute(input)).rejects.toThrow('Name is required');
    });

    it('should throw error product is missing price', async () => {
        const productRepository = new ProductRepository();
        productRepository.create(product);
        
        const useCase = new UpdateProductUseCase(productRepository);
        const input = {
            id: 'a',
            name: 'Product update',
            price: -1
        };
        await expect(useCase.execute(input)).rejects.toThrow('Price must be greater than zero');
    });

});