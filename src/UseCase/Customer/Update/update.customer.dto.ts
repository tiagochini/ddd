export interface InputUpdateCustomerDto { 
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        zip: string;
        number: string;
    };
}

export interface OutputUpdateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        zip: string;
        number: string;
    };
}