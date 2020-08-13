import { CSSProperties } from 'react';

export class SupplierStyles {
    public static SuppliersTableHeader = {
        fontSize: '1.5rem',
        textAlign: 'center',
    } as CSSProperties

    public static SuppliersTableBody = {
        fontSize: '1rem',
        textAlign: 'center',
    } as CSSProperties

    public static EditButton = {
        cursor: 'pointer',
    } as CSSProperties

    public static DeleteButton = {
        cursor: 'pointer',
    } as CSSProperties

    public static SupplierDetail = {
        padding: '20px',
        width: '50%',
    } as CSSProperties

    public static SupplierDetailLabel = {
        fontWeight: 'bold',
    } as CSSProperties
}

export default SupplierStyles;

