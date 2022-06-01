export interface InputFindCustomerDto {
    id: string;
}

export interface OutputFindCustomerDto {
    id: string;
    name: string;
    addresses: {
        street: string;
        city: string;
        zip: string;
        number: string;
    }
}