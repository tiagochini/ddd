import ValidatorInterface from "../../@shared/Validator/validator.interface";
import Customer from "../Entity/customer";
import CustomerYupValidator from "../Validator/customer.yup.validator";

export default class CustomerValidatorFactory {
    static create(): ValidatorInterface<Customer> {
        return new CustomerYupValidator();
    }
}