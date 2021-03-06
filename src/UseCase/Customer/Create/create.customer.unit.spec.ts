import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: 'John',
    address: {
        street: 'Street',
        city: 'City',
        zip: 'Zip',
        number: 'Number',
    },
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit Test create customer use case', () => {

    it('should create a customer', async () => {

        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                zip: input.address.zip,
                number: input.address.number,
            }
        });
    });

    it('shold throw an error when name is missing', async () => { 
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        input.name = '';
         await expect(useCase.execute(input)).rejects.toThrow('Name is required');
        
    });

    it('shold throw an error when street is missing', async () => {
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = '';
        await expect(useCase.execute(input)).rejects.toThrow('Street is required');

    });
});