import { User } from '../models/user';
import { Roles } from '../models/enums/roles';

const mockUsers: User[] =
    [
        {
            userId: 1,
            firstName: 'Raju',
            lastName: 'Rastogi',
            address: 'Ludhiana',
            phoneNumber: '0987654321',
            email: 'raju.rastogi@gmail.com',
            userName: 'raju123',
            password: 'abcd1234',
            role: Roles.INTERN
        },
        {
            userId: 2,
            firstName: 'Arjun',
            lastName: 'Singh',
            address: 'Udaipur',
            phoneNumber: '0987654321',
            email: 'arjun.singh@gmail.com',
            userName: 'arjun123',
            password: 'abcd1234',
            role: Roles.MANAGER
        },
        {
            userId: 3,
            firstName: 'Farhan',
            lastName: 'Syed',
            address: 'Delhi',
            phoneNumber: '0987654321',
            email: 'farhan.syed@gmail.com',
            userName: 'farhan123',
            password: 'abcd1234',
            role: Roles.SALES_PERSON
        },
        {
            userId: 4,
            firstName: 'Viru',
            lastName: 'Sahastrabudhi',
            address: 'Lucknow',
            phoneNumber: '0987654321',
            email: 'viru.sahastra@gmail.com',
            userName: 'raju123',
            password: 'abcd1234',
            role: Roles.SENIOR_MANAGER
        },
        {
            userId: 5,
            firstName: 'Raghav',
            lastName: 'Sharma',
            address: 'Amritsar',
            phoneNumber: '0987654321',
            email: 'raghav.sharma@gmail.com',
            userName: 'raghav123',
            password: 'abcd1234',
            role: Roles.INTERN
        },
    ];

export default mockUsers;