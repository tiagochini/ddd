import Product from "../Entity/product";
import ProductService from "./product.service";

describe('Product service unit test', () => {
   
    it("shoul change the prices of all products", () => {
        const product1 = new Product('product1', 'Product 1', 10);
        const product2 = new Product('product1', 'Product 1', 20);
        const product3 = new Product('product1', 'Product 1', 30);

        const products = [product1, product2, product3];

        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);
        expect(product3.price).toBe(60);

    });
});