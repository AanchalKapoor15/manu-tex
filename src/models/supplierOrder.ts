import { Supplier } from "./supplier";
import { SupplierOrderItem } from './supplierOrderItem';
import { PaymentStatus } from "./enums/paymentStatus";
import { SupplierOrderStatus } from "./enums/supplierOrderStatus";

export class SupplierOrder {
    orderId: number;
    orderNumber: string;
    orderItems: SupplierOrderItem[];
    supplier: Supplier;
    orderDate: Date;
    paymentStatus: PaymentStatus;
    orderStatus: SupplierOrderStatus;
    totalBillAmount: number;

    constructor({
        orderId = 0,
        orderNumber = '',
        orderItems = new Array<SupplierOrderItem>(),
        supplier = new Supplier(),
        orderDate = new Date(),
        paymentStatus = PaymentStatus.UNPAID,
        orderStatus = SupplierOrderStatus.NEW,
        totalBillAmount = 0
    } = {}) {
        this.orderId = orderId;
        this.orderNumber = orderNumber;
        this.orderItems = orderItems;
        this.supplier = supplier;
        this.orderDate = orderDate;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.totalBillAmount = totalBillAmount;
    }
}