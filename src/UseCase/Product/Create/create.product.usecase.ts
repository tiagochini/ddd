import SendEmailToTheCustomerConfirmingTheRegistrationHandler from "../../../Domain/Customer/Event/Handler/send-email-to-the-customer-confirming-the-registation.handler";
import Product from "../../../Domain/Product/Entity/product";
import ProductFactory from "../../../Domain/Product/Factory/product.factory";
import ProductRepositoryInteface from "../../../Domain/Product/Repository/product-repository.interface";
import { InputProductDTO, OutputProductDTO } from "./create.product.dto";

export default class CreateProductUseCase {

    private productRepository: ProductRepositoryInteface;

    constructor(productRepository: ProductRepositoryInteface) {
        this.productRepository = productRepository;
    };

    async execute(inputProductDTO: InputProductDTO): Promise<OutputProductDTO> {
        const productFactory = ProductFactory.create('a', inputProductDTO.name, inputProductDTO.price);
        const product = new Product(productFactory.id, productFactory.name, productFactory.price);
        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        };

    }
}