import EventHandlerInteface from "../../../@shared/Event/event-gandler.interface";
import CustomerCreatedEvent from "../customer-created.event";


export default class SendEmailToTheCustomerConfirmingTheRegistrationHandler implements EventHandlerInteface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }

}