import EventHandlerInteface from "../../../@shared/Event/event-gandler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendEmailWhenCustomerChangeAddressHandler implements EventHandlerInteface<CustomerChangeAddressEvent>{
    handle(event: CustomerChangeAddressEvent): void {
        const data = event.eventData;
        console.log(`Endereço do cliente: ${data.id}, ${data.nome} alterado para: {endereco}`);
    }
}