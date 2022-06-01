import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../UseCase/Customer/Create/create.customer.usecase';
import FindCustomerUserCase from '../../../UseCase/Customer/Find/find.customer.usecase';
import ListCustomerUseCase from '../../../UseCase/Customer/List/list.customer.usecase';
import UpdateCustomerUseCase from '../../../UseCase/Customer/Update/update.customer.usecase';
import CustomerRepository from '../../Customer/Repository/Sequelize/customer.repository';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customertDTO = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zip
            },
        };
        const output = await useCase.execute(customertDTO);
        res.status(200).send(output);
    }catch(err){
        res.status(500).send(err);
    }
});

customerRoute.get('/', async (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await useCase.execute({});
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.get('/:id', async (req: Request, res: Response) => {
    const useCase = new FindCustomerUserCase(new CustomerRepository());
    try {
        const output = await useCase.execute({ id: req.params.id });
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

customerRoute.put('/:id', async (req: Request, res: Response) => {
    const useCase = new UpdateCustomerUseCase(new CustomerRepository());
    try {
        const output = await useCase.execute({ id: req.params.id, name: req.body.name, address: req.body.address });
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});