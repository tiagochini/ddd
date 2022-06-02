import {app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for customer", () => { 
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });
    
    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street",
                    number: "123",
                    city: "City",
                    zip: "12345"
                }
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.number).toBe("123");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.zip).toBe("12345");

    });

    it("should not create customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Jhon Doe",
                
            });
        expect(response.status).toBe(500);
    });

    it("should get all customers", async () => {
       const customer1=  await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street 1",
                    number: "123",
                    city: "City",
                    zip: "12345"
                }
            });
        expect(customer1.status).toBe(200);
        const customer2 = await request(app)
            .post("/customer")
            .send({
                name: "John 2",
                address: {
                    street: "Street 2",
                    number: "123",
                    city: "City",
                    zip: "12345"
                }
            });
        expect(customer2.status).toBe(200);


        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        
        const resCustomer = listResponse.body.customers[0];
        expect(resCustomer.name).toBe("John Doe");
        expect(resCustomer.address.street).toBe("Street 1");

        const resCustomer2 = listResponse.body.customers[1];
        expect(resCustomer2.name).toBe("John 2");
        expect(resCustomer2.address.street).toBe("Street 2");

        const listResponseXML = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send();
        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>John Doe</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Street 1</street>`);
        expect(listResponseXML.text).toContain(`<number>123</number>`);
        expect(listResponseXML.text).toContain(`<city>City</city>`);
        expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>John 2</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Street 2</street>`);
        expect(listResponseXML.text).toContain(`<number>123</number>`);
        expect(listResponseXML.text).toContain(`<city>City</city>`);
        expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`</customers>`);

    });

    it("should get customer by id", async () => {
        const customer = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street 1",
                    number: "123",
                    city: "City",
                    zip: "12345"
                }
            });
        expect(customer.status).toBe(200);
        const response = await request(app).get(`/customer/${customer.body.id}`).send();
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("Street 1");
    });

    it("should not get customer by id", async () => {
        const response = await request(app).get("/customer/123").send();
        expect(response.status).toBe(500);
    });

    it("should update customer", async () => {
        const customer = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street 1",
                    number: "123",
                    city: "City",
                    zip: "12345"
                }
            });
        expect(customer.status).toBe(200);
        const response = await request(app)
            .put(`/customer/${customer.body.id}`)
            .send({
                name: "John Doe 2",
                address: {
                    street: "Street 2",
                    number: "123",
                    city: "City",
                    zip: "12345"
                }
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe 2");
        expect(response.body.address.street).toBe("Street 2");
    });

    it("should not update customer", async () => {
        const response = await request(app).put("/customer/123").send();
        expect(response.status).toBe(500);
    });
});