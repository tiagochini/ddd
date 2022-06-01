export interface InputListProductDTO {
}

type Products = {
    id: string;
    name: string;
    price: number;
};

export interface OutputListProductDTO {
    products: Products[];
}
