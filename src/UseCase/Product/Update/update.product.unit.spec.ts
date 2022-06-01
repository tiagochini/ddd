import Product from '../../../Domain/Product/Entity/product';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('a', 'Product 1', 13.20);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe('Unit test for update product use case', () => {
    it('should update product', async () => {
        const productRepository = MockRepository();
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
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);
        const input = {
            id: 'a',
            name:'',
            price: 30
        };
        await expect(useCase.execute(input)).rejects.toThrow('Name is required');
    });

    it('should throw error product is missing price', async () => {
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);
        const input = {
            id: 'a',
            name: 'Product update',
            price: -1
        };
        await expect(useCase.execute(input)).rejects.toThrow('Price must be greater than zero');
    });

});