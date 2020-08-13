export class Customer {
    customerId: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
    description: string;
    gstNumber: string;

    constructor(
        customerId = 0,
        firstName = '',
        lastName = '',
        address = '',
        phoneNumber = '',
        email = '',
        description = '',
        gstNumber = '',
    ) {
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.description = description;
        this.gstNumber = gstNumber;
    }
}
