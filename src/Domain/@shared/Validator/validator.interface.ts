export default interface ValidatorInterface<T> {
    validate(enity: T): void;
}