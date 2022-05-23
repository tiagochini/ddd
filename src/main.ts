import Customer from './Domain/Entity/customer';
import OrderItem from './Domain/Entity/orderItem';
import Order from './Domain/Entity/order';
import Address from './Domain/ValueObject/address';

let customer = new Customer('123', 'Tiago Chini');
const address = new Address('Rua 13 de Maio', 'Rondonopolis', '78710-165', '2277');
customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item1', 10,'asde',2);
const item2 = new OrderItem('2', 'Item2', 15,'p1',1);


const order = new Order('1', '123', [item1, item2]);