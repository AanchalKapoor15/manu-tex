import React, { FunctionComponent, useState } from 'react';
import { Table } from 'reactstrap';

import { Item } from '../../models/item';
import IconEdit from '../../assets/iconEdit';
import IconDelete from '../../assets/iconDelete';
import { ConfirmDialog } from '../confirmDialog/confirmDialog';
import { ItemStyles } from './itemStyles';
import { Supplier } from '../../models/supplier';
import { GlobalStyles } from '../../styles/globalStyles';
import { Link } from 'react-router-dom';

interface ItemsTableProps {
    items: Item[];
    suppliers: Supplier[];
    editItem: ({ isEditMode, item }: { isEditMode: boolean, item: Item }) => void;
    deleteItem: (itemId: number) => void;
}

export const ItemsTable: FunctionComponent<ItemsTableProps> = props => {
    const [confirmDialogOptions, setConfirmDialogOptions] = useState({
        showConfirmDialog: false,
        heading: "Delete Item",
        actionBtnLabel: "Delete",
        entityId: 0,
        bodyMessage: "Are you sure you want to delete the item?"
    });

    function onDeleteItem(itemId: number) {
        props.deleteItem(itemId);
        onCloseConfirmDialog();
    }

    function onOpenConfirmDialog(itemId: number) {
        setConfirmDialogOptions(
            {
                ...confirmDialogOptions,
                showConfirmDialog: true,
                entityId: itemId
            });
    }

    function onCloseConfirmDialog() {
        setConfirmDialogOptions(
            {
                ...confirmDialogOptions,
                showConfirmDialog: false
            });
    }

    function rowElement(item: Item) {
        //let token = sessionStorage.getItem('token');
        //let decoded = decodeToken(token);
        // if(decoded.role === 'ADMIN'){
        return (
            <tr key={item.itemId}>
                <td>{item.itemCode}</td>
                <td>{item.base}</td>
                <td>{item.description}</td>
                <td>
                    <Link to={`suppliers/${item.supplier.supplierId}`}>
                        {`${item.supplier.firstName} ${item.supplier.lastName}`}
                    </Link>
                </td>
                <td>{item.costPricePerMetre}</td>
                <td>
                    <span
                        style={ItemStyles.HandCursor}
                        onClick={() => props.editItem({ isEditMode: true, item: item })}>
                        <IconEdit height="18" width="18" />
                    </span>
                    <span
                        style={ItemStyles.HandCursor}
                        onClick={() => onOpenConfirmDialog(item.itemId)}>
                        <IconDelete height="18" width="18" />
                    </span>
                </td>
            </tr>
        );
        //}
        // else{}
    }

    return (
        <div>
            <ConfirmDialog
                options={confirmDialogOptions}
                takeAction={onDeleteItem}
                resetConfirmDialog={onCloseConfirmDialog} />
            <Table
                style={GlobalStyles.Table}>
                <thead style={ItemStyles.ItemsTableHeader}>
                    <tr>
                        <th>Item Code</th>
                        <th>Base</th>
                        <th>Description</th>
                        <th>Supplier</th>
                        <th>Cost Price (per m)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody
                    style={ItemStyles.ItemsTableBody}>
                    {props.items.map(rowElement)}
                </tbody>
            </Table>
        </div>
    );
}

export default ItemsTable;