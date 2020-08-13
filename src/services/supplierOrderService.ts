import { mockSupplierOrders } from "../mock-data/supplierOrders.mock";
import { SupplierOrder } from "../models/supplierOrder";
import mockItems from "../mock-data/items.mock";

export function getOrders() {
    return mockSupplierOrders;
}

export function addToSupplierOrders(supplierOrder: SupplierOrder) {
    console.log(supplierOrder);
}

export function getSelectedSupplierItems(supplierId: number) {
    return mockItems.filter(item =>
        item.supplier.supplierId === supplierId
    );
}
