import CustomerRepositoryInterface from '../../../Domain/Customer/Repository/customer-repository.interface';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { v4 as uuid } from 'uuid';
import CustomerFactory from '../../../Domain/Customer/Factory/customer.factory';
import Address from '../../../Domain/Customer/ValueObject/address';

export default class CreateCustomerUseCase {
    private _Repository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this._Repository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {

        const customer = CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.city, input.address.zip, input.address.number));

        await this._Repository.create(customer);
         
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                zip: customer.Address.zipcode,
                number: customer.Address.number,
            }
        }
    }
}