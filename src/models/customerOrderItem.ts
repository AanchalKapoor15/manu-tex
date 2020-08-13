import { Supplier } from './supplier';
import { Item } from './item';

export class CustomerOrderItem {
    orderItemId: number;
    orderId: number;
    item: Item;
    quantityInMetre: number;
    costPricePerMetre: number;
    sellingPricePerMetre: number;
    isSelected: boolean;

    constructor(
        {
            orderItemId = 0,
            orderId = 0,
            item = new Item(),
            quantityInMetre = 0,
            costPricePerMetre = 0,
            sellingPricePerMetre = 0,
            isSelected = false
        } = {}) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.item = item;
        this.quantityInMetre = quantityInMetre;
        this.costPricePerMetre = costPricePerMetre;
        this.sellingPricePerMetre = sellingPricePerMetre;
        this.isSelected = isSelected;
    }
}