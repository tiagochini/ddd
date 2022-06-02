import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../UseCase/Customer/List/list.customer.dto";

export default class CustomerPresenter {
    public static listXML(data: OutputListCustomerDto): string {

        const xmlOptions = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        };

        return toXML({
            customers: {
                customer: data.customers.map((customer) => ({
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            number: customer.address.number,
                            zip: customer.address.zip,
                            city: customer.address.city,
                        },
                })),
            },
        }, xmlOptions);
    }
}