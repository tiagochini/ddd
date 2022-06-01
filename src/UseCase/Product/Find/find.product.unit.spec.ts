import Product from "../../../Domain/Product/Entity/product";
import ProductFactory from "../../../Domain/Product/Factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = new Product('a', 'Product 1', 13.20);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};

describe('Unit Test Find Product Use Case', () => {

    it('should return product', async () => {
            
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);
    
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

    it('should not found a product', async () => {

        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const useCase = new FindProductUseCase(customerRepository);

        const input = {
            id: '123',
        }

        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});