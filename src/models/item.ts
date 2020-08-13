import { Supplier } from "./supplier";

export class Item {
    itemId: number;
    itemCode: string;
    base: string;
    description: string;
    supplier: Supplier;
    costPricePerMetre: string;

    constructor(
        itemId: number = 0,
        itemCode: string = '',
        base: string = '',
        description: string = '',
        supplier: Supplier =  new Supplier(),
        costPricePerMetre = ''
    ) {
        this.itemId = itemId;
        this.itemCode = itemCode;
        this.base = base;
        this.description = description;
        this.supplier = supplier;
        this.costPricePerMetre = costPricePerMetre;
    }
}
