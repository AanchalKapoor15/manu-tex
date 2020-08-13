import React, { FunctionComponent, useState } from 'react';
import { Table } from 'reactstrap';

import { User } from '../../models/user';
import UserStyles from './userStyles';
import IconEdit from '../../assets/iconEdit';
import IconDelete from '../../assets/iconDelete';
import ConfirmDialog from '../confirmDialog/confirmDialog';
import { Roles } from '../../models/enums/roles';
import { GlobalStyles } from '../../styles/globalStyles';

interface UserTableProps {
    users: User[];
    editUser: ({ isEditMode, user }: { isEditMode: boolean, user: User }) => void;
    deleteUser: (userId: number) => void;
}

export const UserTable: FunctionComponent<UserTableProps> = (props) => {
    const [confirmDialogOptions, setConfirmDialogOptions] = useState({
        showConfirmDialog: false,
        heading: 'Delete User',
        actionBtnLabel: 'Delete',
        entityId: 0,
        bodyMessage: 'Are you sure you want to delete the user?'
    });

    function onDeleteUser(userId: number) {
        props.deleteUser(userId);
        onCloseConfirmDialog();
    }

    function onOpenConfirmDialog(userId: number) {
        setConfirmDialogOptions(
            {
                ...confirmDialogOptions,
                showConfirmDialog: true, entityId: userId
            });
    }

    function onCloseConfirmDialog() {
        setConfirmDialogOptions(
            {
                ...confirmDialogOptions,
                showConfirmDialog: false
            });
    }

    function rowElement(user: User) {
        return (
            <tr 
            key={user.userId}>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.address}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.userName}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                    <span
                        style={UserStyles.EditButton}
                        onClick={() => { props.editUser({ isEditMode: true, user: user }) }}>
                        <IconEdit width="18" height="18" />
                    </span>
                    <span
                        style={UserStyles.DeleteButton}
                        onClick={() => { onOpenConfirmDialog(user.userId) }}>
                        <IconDelete width="18" height="18" />
                    </span>
                </td>
            </tr>
        );
    }

    return (
        <div>
            <ConfirmDialog
                options={confirmDialogOptions}
                takeAction={onDeleteUser}
                resetConfirmDialog={onCloseConfirmDialog} />
            <Table
                style={GlobalStyles.Table}>
                <thead style={UserStyles.UsersTableHeader}>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email ID</th>
                        <th>User name</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody
                    style={UserStyles.UsersTableBody}>
                    {props.users.map(rowElement)}
                </tbody>
            </Table>
        </div>
    );
}

export default UserTable;