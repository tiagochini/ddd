import EventHandlerInteface from "../../@shared/event-gandler.interface";
import CustomerCreatedEvent from "../customer-created.event";


export default class SendEmailWhenCustomerIsCreateHandler implements EventHandlerInteface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }

}