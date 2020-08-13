import { CSSProperties } from 'react';

export class UserStyles {
    public static UsersTable = {
        fontFamily: 'calibri',
        width: '100%',
        height: '100%',
        position: 'relative',
        marginTop: '70px',
    } as CSSProperties

    public static UsersTableHeader = {
        fontSize: '1.5rem',
        textAlign: 'center',
    } as CSSProperties

    public static UsersTableBody = {
        fontSize: '1rem',
        textAlign: 'center',
    } as CSSProperties

    public static EditButton = {
        cursor: 'pointer',
    } as CSSProperties

    public static DeleteButton = {
        cursor: 'pointer',
    } as CSSProperties

    public static UserDetail = {
        padding: '20px',
        width: '50%',
    } as CSSProperties

    public static UserDetailLabel = {
        fontWeight: 'bold',
    } as CSSProperties    
}

export default UserStyles;

