import { mockCustomerOrders } from "../mock-data/customerOrders.mock";
import { CustomerOrder } from "../models/customerOrder";

export function getOrders() {
    return mockCustomerOrders;
}

export function addToCustomerOrders(customerOrder: CustomerOrder){
    console.log(customerOrder);
}