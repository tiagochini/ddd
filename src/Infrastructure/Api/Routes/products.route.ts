import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../UseCase/Product/Create/create.product.usecase';
import FindProductUseCase from '../../../UseCase/Product/Find/find.product.usecase';
import ListProductUseCase from '../../../UseCase/Product/List/list.product.usecase';
import UpdateProductUseCase from '../../../UseCase/Product/Update/update.product.usecase';
import ProductRepository from '../../Product/Repository/Sequelize/product.repository';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
        };
        const output = await useCase.execute(productDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get('/', async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await useCase.execute({});
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get('/:id', async (req: Request, res: Response) => {
    const useCase = new FindProductUseCase(new ProductRepository());
    try {
        const output = await useCase.execute({ id: req.params.id });
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.put('/:id', async (req: Request, res: Response) => {
    const useCase = new UpdateProductUseCase(new ProductRepository());
    try {
        const output = await useCase.execute({ id: req.params.id, name: req.body.name, price: req.body.price });
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});