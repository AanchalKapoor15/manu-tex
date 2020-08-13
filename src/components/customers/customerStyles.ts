import { CSSProperties } from 'react';

export class CustomerStyles {
    public static CustomersTableHeader = {
        fontSize: '1.5rem',
        textAlign: 'center',
    } as CSSProperties

    public static CustomersTableBody = {
        fontSize: '1rem',
        textAlign: 'center',
    } as CSSProperties

    public static EditButton = {
        cursor: 'pointer',
    } as CSSProperties

    public static DeleteButton = {
        cursor: 'pointer',
    } as CSSProperties

    public static CustomerDetail = {
        padding: '20px',
        width: '50%',
    } as CSSProperties

    public static CustomerDetailLabel = {
        fontWeight: 'bold',
    } as CSSProperties    
}

export default CustomerStyles;

