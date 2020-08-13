import { Roles } from "./enums/roles";

export class User {
    userId: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    userName: string;
    role: Roles;

    constructor({
        userId = 0,
        firstName = '',
        lastName = '',
        address = '',
        phoneNumber = '',
        email = '',
        userName = '',
        password = '',
        role = Roles.INTERN,
    } = {}) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.role = role
    }

}
     