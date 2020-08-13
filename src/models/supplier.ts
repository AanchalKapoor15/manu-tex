export class Supplier {
    supplierId: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    description: string;
    gstNumber: string;

    constructor(
        supplierId: number = 0,
        firstName: string = '',
        lastName: string = '',
        address: string = '',
        phoneNumber: string = '',
        description: string = '',
        gstNumber: string = ''
    ) {
        this.supplierId = supplierId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.gstNumber = gstNumber;
    }

}