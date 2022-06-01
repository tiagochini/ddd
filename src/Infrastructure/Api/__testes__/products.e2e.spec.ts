import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for products", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(100);

    });

    it("should not create product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "",
                price: 100
            });
        expect(response.status).toBe(500);
    });

    it("should get all products", async () => {
        const product1 = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100
            });
        expect(product1.status).toBe(200);
        const product2 = await request(app)
            .post("/products")
            .send({
                name: "Product 2",
                price: 200
            });
        expect(product2.status).toBe(200);
        const response = await request(app)
            .get("/products");
        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
        expect(response.body.products[0].name).toBe("Product 1");
        expect(response.body.products[0].price).toBe(100);
        expect(response.body.products[1].name).toBe("Product 2");
        expect(response.body.products[1].price).toBe(200);

    });

    it("should get a product", async () => {
        const product1 = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100
            });
        expect(product1.status).toBe(200);
        const response = await request(app)
            .get("/products/" + product1.body.id);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(100);

    });

    it("should not get a product", async () => {
        const response = await request(app)
            .get("/products/1");
        expect(response.status).toBe(500);
    });

    it("should update a product", async () => {
        const product1 = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100
            });
        expect(product1.status).toBe(200);
        const response = await request(app)
            .put("/products/" + product1.body.id)
            .send({
                name: "Product 1 Updated",
                price: 200
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1 Updated");
        expect(response.body.price).toBe(200);

    });

    it("should not update a product", async () => {
        const product1 = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100
            });
        expect(product1.status).toBe(200);
        const response = await request(app)
            .put("/products/" + product1.body.id)
            .send({
                name: "",
                price: 200
            });
        expect(response.status).toBe(500);
    });


});