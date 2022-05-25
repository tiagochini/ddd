import CustomerChangeAddressEvent from "../Customer/customer-change-address.event";
import CustomerCreatedEvent from "../Customer/customer-created.event";
import SendEmailToTheCustomerConfirmingTheRegistrationHandler from "../Customer/Handler/send-email-to-the-customer-confirming-the-registation.handler";
import SendEmailWhenCustomerChangeAddressHandler from "../Customer/Handler/send-email-when-customer-change-address.handler";
import SendEmailWhenCustomerIsCreateHandler from "../Customer/Handler/send-email-when-customer-is-created.handler";
import SendEmailWhenProductIsCreateHandler from "../Product/Handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../Product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe('Domain events test', () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    });

    it("shoul unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);

    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
    });

    it("should notify all event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreateHandler();
        const spyEvendHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEvendHandler).toHaveBeenCalled();
    });

    it("should notify event create new customer and changeAddress", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendEmailWhenCustomerIsCreateHandler();
        const spyEvendHandler1 = jest.spyOn(eventHandler1, "handle");
        const eventHandler2 = new SendEmailToTheCustomerConfirmingTheRegistrationHandler();
        const spyEvendHandler2 = jest.spyOn(eventHandler2, "handle");
        const eventHandler3 = new SendEmailWhenCustomerChangeAddressHandler();
        const spyEvendHandler3 = jest.spyOn(eventHandler3, "handle");

        eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
        eventDispatcher.register('CustomerChangeAddressEvent', eventHandler3);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers['CustomerChangeAddressEvent'][0]).toMatchObject(eventHandler3);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: '123',
            name: "Customer 1",
            address: {
                street: "rua 13 de maio",
                number: "2277",
                zipcode: "78710-165",
                city: "Rondonopolis"
            }
        });

        eventDispatcher.notify(customerCreatedEvent);

        const customerChangeAddress = new CustomerChangeAddressEvent({
            id: '123',
            name: "Customer 1",
            address: {
                street: "rua 13 de maio",
                number: "2288",
                zipcode: "78710-165",
                city: "Rondonopolis"
            }
        });

        eventDispatcher.notify(customerChangeAddress);

        expect(spyEvendHandler1).toHaveBeenCalled();
        expect(spyEvendHandler2).toHaveBeenCalled();
        expect(spyEvendHandler3).toHaveBeenCalled();

    });
});