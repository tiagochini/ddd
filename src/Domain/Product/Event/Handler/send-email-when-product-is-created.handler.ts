import EventHandlerInteface from "../../../@shared/Event/event-gandler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreateHandler implements EventHandlerInteface<ProductCreatedEvent>{
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email to ......`);
    }

}