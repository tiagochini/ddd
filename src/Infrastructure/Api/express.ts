import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../Customer/Repository/Sequelize/customer.model';
import ProductModel from '../Product/Repository/Sequelize/product.model';
import { customerRoute } from './Routes/customer.route';
import { productRoute } from './Routes/products.route';

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use('/products', productRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });

    await sequelize.addModels([CustomerModel,ProductModel]);
    await sequelize.sync();

}

setupDb();