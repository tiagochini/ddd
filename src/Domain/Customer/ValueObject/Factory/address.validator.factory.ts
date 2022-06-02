import ValidatorInterface from "../../../@shared/Validator/validator.interface";
import Address from "../address";
import AddressYupValidator from "../Validator/address.yup.validator";

export default class AddressValidatorFactory {
    static create(): ValidatorInterface<Address> {
        return new AddressYupValidator();
    }
}