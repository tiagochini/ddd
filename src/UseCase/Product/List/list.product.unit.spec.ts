import Product from "../../../Domain/Product/Entity/product"
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product('a1', 'Product 1', 10);
const product2 = new Product('a3', 'Product 2', 20);

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        find: jest.fn(),
        update: jest.fn(),
    };
}

describe('Unit test for listing product use case', () => {

    it("should list a product", async () => {
        const repository = MockRepository();
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


});