import { SupplierOrderItem } from "../models/supplierOrderItem";

export const mockSupplierOrderItems: SupplierOrderItem[] = [
    {
        orderItemId: 1,
        orderId: 1,
        item: {
            itemId: 1,
            itemCode: 'abc',
            base: 'cotton',
            description: 'pure cotton',
            supplier: {
                supplierId: 2,
                firstName: 'Sunil',
                lastName: 'Bajaj',
                address: 'Patiala',
                phoneNumber: '0987654321',
                description: 'Supplier of synthetics',
                gstNumber: 'GSTIN456'
            },
            costPricePerMetre: '46',
        },
        quantityInMetre: 100,
        isSelected: false
    },
    {
        orderItemId: 2,
        orderId: 1,
        item: {
            itemId: 2,
            itemCode: 'def',
            base: 'chiffon',
            description: 'semi synthetic',
            supplier: {
                supplierId: 3,
                firstName: 'Naveen',
                lastName: 'Malhotra',
                address: 'Chandigarh',
                phoneNumber: '0987654321',
                description: 'Supplier of embroidered fabric',
                gstNumber: 'GSTIN678'
            },
            costPricePerMetre: '56',
        },
        quantityInMetre: 150,
        isSelected: false
    },
    {
        orderItemId: 3,
        orderId: 2,
        item: {
            itemId: 1,
            itemCode: 'abc',
            base: 'cotton',
            description: 'pure cotton',
            supplier: {
                supplierId: 2,
                firstName: 'Sunil',
                lastName: 'Bajaj',
                address: 'Patiala',
                phoneNumber: '0987654321',
                description: 'Supplier of synthetics',
                gstNumber: 'GSTIN456'
            },
            costPricePerMetre: '58',
        },
        quantityInMetre: 200,
        isSelected: false
    },
    {
        orderItemId: 4,
        orderId: 2,
        item: {
            itemId: 2,
            itemCode: 'def',
            base: 'chiffon',
            description: 'semi synthetic',
            supplier: {
                supplierId: 3,
                firstName: 'Naveen',
                lastName: 'Malhotra',
                address: 'Chandigarh',
                phoneNumber: '0987654321',
                description: 'Supplier of embroidered fabric',
                gstNumber: 'GSTIN678'
            },
            costPricePerMetre: '91',
        },
        quantityInMetre: 300,
        isSelected: false
    },
    {
        orderItemId: 5,
        orderId: 3,
        item: {
            itemId: 3,
            itemCode: 'pqr',
            base: 'chanderi',
            description: 'synthetic',
            supplier: {
                supplierId: 3,
                firstName: 'Naveen',
                lastName: 'Malhotra',
                address: 'Chandigarh',
                phoneNumber: '0987654321',
                description: 'Supplier of embroidered fabric',
                gstNumber: 'GSTIN678'
            },
            costPricePerMetre: '56',
        },
        quantityInMetre: 500,
        isSelected: false
    },
    {
        orderItemId: 6,
        orderId: 3,
        item: {
            itemId: 2,
            itemCode: 'def',
            base: 'chiffon',
            description: 'semi synthetic',
            supplier: {
                supplierId: 3,
                firstName: 'Naveen',
                lastName: 'Malhotra',
                address: 'Chandigarh',
                phoneNumber: '0987654321',
                description: 'Supplier of embroidered fabric',
                gstNumber: 'GSTIN678'
            },
            costPricePerMetre: '77',
        },
        quantityInMetre: 150,
        isSelected: false
    },
    {
        orderItemId: 7,
        orderId: 4,
        item: {
            itemId: 1,
            itemCode: 'abc',
            base: 'cotton',
            description: 'pure cotton',
            supplier: {
                supplierId: 2,
                firstName: 'Sunil',
                lastName: 'Bajaj',
                address: 'Patiala',
                phoneNumber: '0987654321',
                description: 'Supplier of synthetics',
                gstNumber: 'GSTIN456'
            },
            costPricePerMetre: '53',
        },
        quantityInMetre: 75,
        isSelected: false
    }
];