import { CustomerOrderItem } from "../models/customerOrderItem";
import { Supplier } from "../models/supplier";

export const mockCustomerOrderItems: CustomerOrderItem[] = [
    {
        orderItemId: 1,
        orderId: 1,
        item: {
            itemId: 1,
            itemCode: 'abc',
            base: 'cotton',
            description: 'pure cotton',
            supplier: {
                supplierId: 1,
                firstName: 'Ramesh',
                lastName: 'Kumar',
                address: 'Ludhiana',
                phoneNumber: '0987654321',
                description: 'Supplier of cotton',
                gstNumber: 'GSTIN123'
            },
            costPricePerMetre: '57',

        },
        quantityInMetre: 100,
        costPricePerMetre: 100,
        sellingPricePerMetre: 110,
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
                supplierId: 2,
                firstName: 'Sunil',
                lastName: 'Bajaj',
                address: 'Patiala',
                phoneNumber: '0987654321',
                description: 'Supplier of synthetics',
                gstNumber: 'GSTIN456'
            },
            costPricePerMetre: '45',
        },
        quantityInMetre: 150,
        costPricePerMetre: 140,
        sellingPricePerMetre: 150,
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
                supplierId: 1,
                firstName: 'Ramesh',
                lastName: 'Kumar',
                address: 'Ludhiana',
                phoneNumber: '0987654321',
                description: 'Supplier of cotton',
                gstNumber: 'GSTIN123'
            },
            costPricePerMetre: '33',
        },
        quantityInMetre: 200,
        costPricePerMetre: 50,
        sellingPricePerMetre: 55,
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
            costPricePerMetre: '55',
        },
        quantityInMetre: 300,
        costPricePerMetre: 180,
        sellingPricePerMetre: 200,
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
                supplierId: 1,
                firstName: 'Ramesh',
                lastName: 'Kumar',
                address: 'Ludhiana',
                phoneNumber: '0987654321',
                description: 'Supplier of cotton',
                gstNumber: 'GSTIN123'
            },
            costPricePerMetre: '44',
        },
        quantityInMetre: 500,
        costPricePerMetre: 210,
        sellingPricePerMetre: 230,
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
            costPricePerMetre: '79',
        },
        quantityInMetre: 150,
        costPricePerMetre: 180,
        sellingPricePerMetre: 200,
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
            costPricePerMetre: '36',
        },
        quantityInMetre: 75,
        costPricePerMetre: 115,
        sellingPricePerMetre: 0,
        isSelected: false
    }
];