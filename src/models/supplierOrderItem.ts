import { Item } from './item';
import { Supplier } from './supplier';

export class SupplierOrderItem {
    orderItemId: number;
    orderId: number;
    item: Item;
    quantityInMetre: number;
    isSelected: boolean;

    constructor(
        {
            orderItemId = 0,
            orderId = 0,
            item = new Item(),
            quantityInMetre = 0,
            isSelected = false
        } = {}) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.item = item;
        this.quantityInMetre = quantityInMetre;
        this.isSelected = isSelected;
    }
}