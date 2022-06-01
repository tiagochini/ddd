import ProductRepositoryInteface from "../../../Domain/Product/Repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    private productRepository : ProductRepositoryInteface;
    constructor(productRepository: ProductRepositoryInteface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        return await this.productRepository.find(input.id)
            .then((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }
            });
        
    }
}