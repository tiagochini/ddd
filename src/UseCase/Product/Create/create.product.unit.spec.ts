import CreateProductUseCase from "./create.product.usecase";



const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit Test create product use case', () => {
    
        it('should create a product', async () => {
            const input = {
                name: 'name',
                price: 1
            }

            const productRepository = MockRepository();
            const useCase = new CreateProductUseCase(productRepository);
    
            const output = await useCase.execute(input);
    
            expect(output).toEqual({
                id: expect.any(String),
                name: input.name,
                price: input.price
            });
        });
    
        it('shold throw an error when name is missing', async () => {
            const input = {
                name: '',
                price: 1
            }
           
            const productRepository = MockRepository();
            const useCase = new CreateProductUseCase(productRepository);
    
            await expect(useCase.execute(input)).rejects.toThrow('Name is required');
    
        });
    
        it('shold throw an error when price is missing', async () => {
            const input = {
                name: 'name',
                price: -1
            }
            
            const productRepository = MockRepository();
            const useCase = new CreateProductUseCase(productRepository);
    
            await expect(useCase.execute(input)).rejects.toThrow('Price must be greater than zero');
    
        });
});