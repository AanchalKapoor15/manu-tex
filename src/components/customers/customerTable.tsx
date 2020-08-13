import React, { FunctionComponent, useState } from 'react';
import { Table } from 'reactstrap';

import { Customer } from '../../models/customer';
import CustomerStyles from './customerStyles';
import IconEdit from '../../assets/iconEdit';
import IconDelete from '../../assets/iconDelete';
import ConfirmDialog from '../confirmDialog/confirmDialog';
import { GlobalStyles } from '../../styles/globalStyles';

interface CustomerTableProps {
    customers: Customer[];
    editCustomer: ({ isEditMode, customer }:
        { isEditMode: boolean, customer: Customer }) => void;
    deleteCustomer: (customerId: number) => void;
}

export const CustomerTable: FunctionComponent<CustomerTableProps> = (props) => {
    const [confirmDialogOptions, setConfirmDialogOptions] = useState({
        showConfirmDialog: false,
        heading: 'Delete Customer',
        actionBtnLabel: 'Delete',
        entityId: 0,
        bodyMessage: 'Are you sure you want to delete the customer?'
    });

    function onDeleteCustomer(customerId: number) {
        props.deleteCustomer(customerId);
        onCloseConfirmDialog();
    }

    function onOpenConfirmDialog(customerId: number) {
        setConfirmDialogOptions(
            {
                ...confirmDialogOptions,
                showConfirmDialog: true,
                entityId: customerId
            });
    }

    function onCloseConfirmDialog() {
        setConfirmDialogOptions(
            {
                ...confirmDialogOptions,
                showConfirmDialog: false
            });
    }

    function rowElement(customer: Customer) {
        return (
            <tr key={customer.customerId}>
                <td>{customer.firstName + ' ' + customer.lastName}</td>
                <td>{customer.address}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.email}</td>
                <td>{customer.description}</td>
                <td>{customer.gstNumber}</td>
                <td>
                    <span
                        style={CustomerStyles.EditButton}
                        onClick={() => {
                            props.editCustomer(
                                {
                                    isEditMode: true,
                                    customer: customer
                                })
                        }}>
                        <IconEdit width="18" height="18" />
                    </span>
                    <span
                        style={CustomerStyles.DeleteButton}
                        onClick={() => {
                            onOpenConfirmDialog(customer.customerId)
                        }}>
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
                takeAction={onDeleteCustomer}
                resetConfirmDialog={onCloseConfirmDialog} />
            <Table
                style={GlobalStyles.Table}>
                <thead style={CustomerStyles.CustomersTableHeader}>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email ID</th>
                        <th>Description</th>
                        <th>GST Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody
                    style={CustomerStyles.CustomersTableBody}>
                    {props.customers.map(rowElement)}
                </tbody>
            </Table>
        </div>
    );
}

export default CustomerTable;