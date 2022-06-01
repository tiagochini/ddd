import CustomerRepositoryInterface from "../../../Domain/Customer/Repository/customer-repository.interface";
import Address from "../../../Domain/Customer/ValueObject/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase{
    private CustomerRepository: CustomerRepositoryInterface;

    constructor(private customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;    
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto>{
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new Address(input.address.street, input.address.city, input.address.zip, input.address.number));
        await this.customerRepository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                zip: customer.Address.zipcode,
                number: customer.Address.number,
            },
        };
    }
}