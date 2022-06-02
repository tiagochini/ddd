import * as yup from "yup";
import ValidatorInterface from "../../@shared/Validator/validator.interface";
import Product from "../Entity/product";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(enity: Product): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
                    price: yup.number().required("Price is required").min(0.0001, "Price must be greater than 0"),
                }).validateSync(
                    {
                        id: enity.id,
                        name: enity.name,
                        price: enity.price,
                    }, {
                    abortEarly: false,
                });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                enity.notification.addError({
                    message: error,
                    context: "product",
                });
            });
        }
    }
}