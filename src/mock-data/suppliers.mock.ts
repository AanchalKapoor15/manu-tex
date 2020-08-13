import { Supplier } from '../models/supplier';

const mockSuppliers: Supplier[] =
    [
        {
            supplierId: 1,
            firstName: 'Ramesh',
            lastName: 'Kumar',
            address: 'Ludhiana',
            phoneNumber: '0987654321',
            description: 'Supplier of cotton',
            gstNumber: 'GSTIN123'
        },
        {
            supplierId: 2,
            firstName: 'Sunil',
            lastName: 'Bajaj',
            address: 'Patiala',
            phoneNumber: '0987654321',
            description: 'Supplier of synthetics',
            gstNumber: 'GSTIN456'
        },
        {
            supplierId: 3,
            firstName: 'Naveen',
            lastName: 'Malhotra',
            address: 'Chandigarh',
            phoneNumber: '0987654321',
            description: 'Supplier of embroidered fabric',
            gstNumber: 'GSTIN678'
        },
    ];

export default mockSuppliers;