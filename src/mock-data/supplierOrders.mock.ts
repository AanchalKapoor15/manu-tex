import { PaymentStatus } from "../models/enums/paymentStatus";
import { SupplierOrderStatus } from "../models/enums/supplierOrderStatus";
import { SupplierOrder } from "../models/supplierOrder";

export const mockSupplierOrders: SupplierOrder[] = [
    {
        orderId: 1,
        orderNumber: '12345',
        orderItems: [
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
                    costPricePerMetre: '100',
                },
                quantityInMetre: 50,
                isSelected: false,
            },
            {
                orderItemId: 2,
                orderId: 1,
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
                    costPricePerMetre: '145',
                },
                quantityInMetre: 65,
                isSelected: false,
            }
        ],
        supplier: {
            supplierId: 1,
            firstName: 'Ramesh',
            lastName: 'Kumar',
            address: 'Ludhiana',
            phoneNumber: '0987654321',
            description: 'Supplier of cotton',
            gstNumber: 'GSTIN123'
        },
        orderDate: new Date('2020/1/23'),
        paymentStatus: PaymentStatus.UNPAID,
        orderStatus: SupplierOrderStatus.IN_PROCESS,
        totalBillAmount: 50000,
    },
    {
        orderId: 2,
        orderNumber: '23456',
        orderItems: [
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
                    costPricePerMetre: '75',
                },
                quantityInMetre: 200,
                isSelected: false,
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
                        supplierId: 2,
                        firstName: 'Sunil',
                        lastName: 'Bajaj',
                        address: 'Patiala',
                        phoneNumber: '0987654321',
                        description: 'Supplier of synthetics',
                        gstNumber: 'GSTIN456'
                    },
                    costPricePerMetre: '82',
                },
                quantityInMetre: 300,
                isSelected: false
            },

        ],
        supplier: {
            supplierId: 2,
            firstName: 'Sunil',
            lastName: 'Bajaj',
            address: 'Patiala',
            phoneNumber: '0987654321',
            description: 'Supplier of synthetics',
            gstNumber: 'GSTIN456'
        },
        orderDate: new Date('2020/1/23'),
        paymentStatus: PaymentStatus.PARTIALLY_PAID,
        orderStatus: SupplierOrderStatus.IN_PROCESS,
        totalBillAmount: 64000,
    },
    {
        orderId: 3,
        orderNumber: '34567',
        orderItems: [
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
                    costPricePerMetre: '89',
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
                    costPricePerMetre: '95',
                },
                quantityInMetre: 150,
                isSelected: false
            },

        ],
        supplier: {
            supplierId: 3,
            firstName: 'Naveen',
            lastName: 'Malhotra',
            address: 'Chandigarh',
            phoneNumber: '0987654321',
            description: 'Supplier of embroidered fabric',
            gstNumber: 'GSTIN678'
        },
        orderDate: new Date('2020/1/23'),
        paymentStatus: PaymentStatus.OVERDUE,
        orderStatus: SupplierOrderStatus.IN_PROCESS,
        totalBillAmount: 145000,
    },
    {
        orderId: 4,
        orderNumber: '45678',
        orderItems: [
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
                    costPricePerMetre: '101',
                },
                quantityInMetre: 75,
                isSelected: false
            },
        ],
        supplier: {
            supplierId: 2,
            firstName: 'Sunil',
            lastName: 'Bajaj',
            address: 'Patiala',
            phoneNumber: '0987654321',
            description: 'Supplier of synthetics',
            gstNumber: 'GSTIN456'
        },
        orderDate: new Date('2020/1/23'),
        paymentStatus: PaymentStatus.PAID,
        orderStatus: SupplierOrderStatus.RECEIVED,
        totalBillAmount: 9750,
    }
];