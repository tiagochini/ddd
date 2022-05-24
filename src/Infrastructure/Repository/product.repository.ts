import Product from "../../Domain/Entity/product";
import product from "../../Domain/Entity/product";
import ProductRepositoryInteface from "../../Domain/Repository/product-repository.interface";
import ProductModel from "../Db/Sequelize/Model/product.model";

export default class ProductRepository implements ProductRepositoryInteface {
    async create(entity: product): Promise<void> {

        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: product): Promise<void> {

        await ProductModel.update({
            name: entity.name,
            price: entity.price
        }, {
            where: {
                id: entity.id
            },
        });
    }

    async find(id: string): Promise<product> {
        const productModel = await ProductModel.findOne({
            where: {
                id
            }
        });

        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        );
    }

    async findAll(): Promise<product[]> {
        const productModel = await ProductModel.findAll();
        return productModel.map((productModel) =>
            new Product(productModel.id, productModel.name, productModel.price)
        );
    }

}