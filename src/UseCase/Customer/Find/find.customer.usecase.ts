import CustomerRepositoryInteface from "../../../Domain/Customer/Repository/customer-repository.interface";
import CustomerRepository from "../../../Infrastructure/Customer/Repository/Sequelize/customer.repository";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUserCase {
    private _Repository: CustomerRepositoryInteface;

    constructor(customerRepository: CustomerRepositoryInteface) {
        this._Repository = customerRepository;
    }
    
    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        return await this._Repository.find(input.id)
            .then((customer) => {
                return {
                    id: customer.id,
                    name: customer.name,
                    addresses: {
                        street: customer.Address.street,
                        city: customer.Address.city,
                        zip: customer.Address.zipcode,
                        number: customer.Address.number,
                    }
                }
            });
    }
}