import { Customer } from "./customer";
import { CustomerOrderItem } from './customerOrderItem';
import { PaymentStatus } from "./enums/paymentStatus";
import { CustomerOrderStatus } from "./enums/customerOrderStatus";

export class CustomerOrder {
    orderId: number;
    orderNumber: string;
    orderItems: CustomerOrderItem[];
    customer: Customer;
    orderDate: Date;
    paymentStatus: PaymentStatus;
    orderStatus: CustomerOrderStatus;
    totalCostPrice: number;
    totalSellingPrice: number;

    constructor({
        orderId = 0,
        orderNumber = '',
        orderItems = new Array<CustomerOrderItem>(),
        customer = new Customer(),
        orderDate = new Date(),
        paymentStatus = PaymentStatus.UNPAID,
        orderStatus = CustomerOrderStatus.NEW,
        totalCostPrice = 0,
        totalSellingPrice = 0,
    } = {}) {
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.orderItems = orderItems;
        this.customer = customer;
        this.orderDate = orderDate;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.totalCostPrice = totalCostPrice;
        this.totalSellingPrice = totalSellingPrice;
    }
}