import React, { FunctionComponent, useState } from "react";
import { Table } from "reactstrap";

import { Supplier } from "../../models/supplier";
import SupplierStyles from './supplierStyles';
import IconEdit from "../../assets/iconEdit";
import IconDelete from "../../assets/iconDelete";
import ConfirmDialog from "../confirmDialog/confirmDialog";
import { GlobalStyles } from "../../styles/globalStyles";

interface SupplierListProps {
    suppliers: Supplier[];
    editSupplier: ({ isEditMode, supplier }: { isEditMode: boolean, supplier: Supplier }) => void;
    deleteSupplier: (supplierId: number) => void;
}

export const SupplierTable: FunctionComponent<SupplierListProps> = (props) => {
    const [confirmDialogOptions, setConfirmDialogOptions] = useState({
        showConfirmDialog: false,
        heading: "Delete Supplier",
        actionBtnLabel: "Delete",
        entityId: 0,
        bodyMessage: "Are you sure you want to delete the supplier?"
    });

    function onDeleteSupplier(supplierId: number) {
        props.deleteSupplier(supplierId);
        onCloseConfirmDialog();
    }

    function onOpenConfirmDialog(supplierId: number) {
        setConfirmDialogOptions(
            {
                ...confirmDialogOptions,
                showConfirmDialog: true,
                entityId: supplierId
            });
    }

    function onCloseConfirmDialog() {
        setConfirmDialogOptions(
            {
                ...confirmDialogOptions,
                showConfirmDialog: false
            });
    }

    function rowElement(supplier: Supplier) {
        return (
            <tr key={supplier.supplierId}>
                <td>{supplier.firstName + ' ' + supplier.lastName}</td>
                <td>{supplier.phoneNumber}</td>
                <td>{supplier.address}</td>
                <td>{supplier.description}</td>
                <td>{supplier.gstNumber}</td>
                <td>
                    <span
                        style={SupplierStyles.EditButton}
                        onClick={() => { props.editSupplier({ isEditMode: true, supplier: supplier }) }}>
                        <IconEdit width="18" height="18" />
                    </span>
                    <span
                        style={SupplierStyles.DeleteButton}
                        onClick={() => { onOpenConfirmDialog(supplier.supplierId) }}>
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
                takeAction={onDeleteSupplier}
                resetConfirmDialog={onCloseConfirmDialog} />
            <Table
                style={{ ...GlobalStyles.Table }}>
                <thead style={SupplierStyles.SuppliersTableHeader}>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Description</th>
                        <th>GST</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody
                    style={SupplierStyles.SuppliersTableBody}>
                    {props.suppliers.map(rowElement)}
                </tbody>
            </Table>
        </div>
    );
}

export default SupplierTable;