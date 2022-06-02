import ValidatorInterface from "../../../@shared/Validator/validator.interface";
import * as yup from "yup";
import Address from "../address";

export default class AddressYupValidator implements ValidatorInterface<Address> {
    validate(enity: Address): void {
        try {
            yup
                .object()
                .shape({
                    street: yup.string().required("Street is required"),
                    city: yup.string().required("City is required"),
                    number: yup.string().required("Number is required"),
                    zipcode: yup.string().required("Zip code is required"),
                })
                .validateSync({
                    street: enity.street,
                    city: enity.city,
                    number: enity.number,
                    zipcode: enity.zipcode,
                });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                enity.notification.addError({
                    message: error,
                    context: "address",
                });
            });
        }
    }
}