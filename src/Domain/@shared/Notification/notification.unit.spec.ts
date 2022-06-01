import Notification from "./notification";

describe("Unit test for notification", () => { 

    it("shoud create errors", () => { 
        const notification = new Notification();
        const errors = {
            message: "error message",
            context:"customer",
        }

        notification.addError(errors);

        expect(notification.messages("customer")).toBe("customer: error message, ");

        const error2 = {
            message: "error message 2",
            context: "customer",
        }
        notification.addError(error2);
        expect(notification.messages("customer")).toBe("customer: error message, customer: error message 2, ");

        const error3 = {
            message: "error message 3",
            context: "product",
        }

        notification.addError(error3);
        expect(notification.messages("customer")).toBe("customer: error message, customer: error message 2, ");
        expect(notification.messages()).toBe("customer: error message, customer: error message 2, product: error message 3, ");
    });

    it("should check if notification has errors", () => {
        const notification = new Notification();
        const errors = {
            message: "error message",
            context: "customer",
        }

        notification.addError(errors);

        expect(notification.hasErrors()).toBe(true);

        const error2 = {
            message: "error message 2",
            context: "customer",
        }
        notification.addError(error2);
        expect(notification.hasErrors()).toBe(true);

        const error3 = {
            message: "error message 3",
            context: "product",
        }

        notification.addError(error3);
        expect(notification.hasErrors()).toBe(true);
    });

    it("should get all errors props", () => { 
        const notification = new Notification();
        const errors = {
            message: "error message",
            context: "customer",
        }
        notification.addError(errors);

        expect(notification.getErrors()).toEqual([errors]);
    });

});