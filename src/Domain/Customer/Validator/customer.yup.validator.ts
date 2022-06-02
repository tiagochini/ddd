import ValidatorInterface from "../../@shared/Validator/validator.interface";
import Customer from "../Entity/customer";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer>{
    validate(enity: Customer): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                })
                .validateSync(
                    {
                        id: enity.id,
                        name: enity.name,
                    }, {
                    abortEarly: false,
                }
                );
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                enity.notification.addError({
                    message: error,
                    context: "customer",
                });
            });
        }
    }

}