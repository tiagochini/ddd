import ValidatorInterface from "../../@shared/Validator/validator.interface";
import Product from "../Entity/product";
import ProductYupValidator from "../Validator/product.yup.validator";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product> {
        return new ProductYupValidator();
    }
}