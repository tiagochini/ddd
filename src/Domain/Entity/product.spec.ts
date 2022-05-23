import Product from "./product";

describe("Product unit test", () => {

    it("should throw error whe id is empty", () => {
        expect(() => {
            const product = new Product("", "Product", 100);
        }).toThrowError("Id is required");
    });

    it("should throw error whe name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error whe price is less than zero", () => {
        expect(() => {
            const product = new Product("123", "Item 1", -100);
        }).toThrowError("Price must be greater than zero");
    });

    it("should change name", () => {
        const product = new Product("123", "Item 1", 100);
        product.changeName("product 2");
        expect(product.name).toBe("product 2");
    });

    it("should change price", () => {
        const product = new Product("123", "Item 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });

});

