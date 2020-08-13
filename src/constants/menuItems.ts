import MenuItem from '../models/menuItem';

export const MenuItems = [
    {
        text: 'Home',
        routeLink: '/',
        index: 1,
    },
    {
        text: 'Add Customer Order',
        routeLink: '/addCustomerOrders',
        index: 2,
    },
    {
        text: 'Customer Orders',
        routeLink: '/customerOrders',
        index: 3,
    },
    {
        text: 'Supplier Orders',
        routeLink: '/supplierOrders',
        index: 4,
    },
    {
        text: 'Items',
        routeLink: '/items',
        index: 5,
    },
    {
        text: 'Customers',
        routeLink: '/customers',
        index: 6,
    },
    {
        text: 'Suppliers',
        routeLink: '/suppliers',
        index: 7
    },
    {
        text: 'Users',
        routeLink: '/users',
        index: 8
    }
] as MenuItem[];

export default MenuItems;