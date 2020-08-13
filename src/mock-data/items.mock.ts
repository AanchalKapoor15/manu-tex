import { Item } from "../models/item";

const mockItems: Item[] =
    [
        {
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
            costPricePerMetre: '100',
        },
        {
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
            costPricePerMetre: '175',
        },
        {
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
            costPricePerMetre: '145',
        },
    ];

export default mockItems;