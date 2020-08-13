import React, { FunctionComponent, useState, useEffect } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    ModalFooter,
    Button,
    DropdownItem,
    Table,
    Input
} from "reactstrap";

import { Supplier } from "../../models/supplier";
import { SupplierOrderItem } from "../../models/supplierOrderItem";
import { getSelectedSupplierItems, addToSupplierOrders } from "../../services/supplierOrderService";
import { GlobalStyles } from "../../styles/globalStyles";
import ConfirmOrderModal from "./confirmSupplierOrderModal";
import { SupplierOrder } from "../../models/supplierOrder";

interface AddSupplierOrderModalProps {
    suppliers: Supplier[];
    isAddSupplierOrderModalOpen: boolean;
    onCloseAddSupplierOrderModal: () => void;
    toggleAddSupplierOrderModal: () => void;
}

export const AddSupplierOrderModal: FunctionComponent<AddSupplierOrderModalProps> = (props) => {
    const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(new Supplier());
    const [selectedSupplierItems, setSelectedSupplierItems] = useState(new Array<SupplierOrderItem>());
    const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    useEffect(mapItemsToSupplierOrderItems, [selectedSupplier]);
    useEffect(() => resetOrder, [isOrderConfirmed]);


    function mapItemsToSupplierOrderItems() {
        let id = 0;
        let orderItems = getSelectedSupplierItems(selectedSupplier.supplierId)
            .map(item => new SupplierOrderItem(
                {
                    orderItemId: ++id,
                    item: item
                }
            ));
        setSelectedSupplierItems(orderItems);

    }

    function dropdownElement(supplier: Supplier) {
        return (
            <DropdownItem
                key={supplier.supplierId}
                onClick={() => { setSelectedSupplier(supplier) }}>
                {`${supplier.firstName} ${supplier.lastName}`}
            </DropdownItem>
        );
    }

    function showSupplierOrderForm() {
        if (selectedSupplier.supplierId > 0) {
            return (
                <Table 
                style={{position: 'relative',top: '17px'}}>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Item Code</th>
                            <th>Base</th>
                            <th>Description</th>
                            <th>Quantity (in m)</th>
                            <th>Price (per m)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedSupplierItems.map(rowElement)}
                    </tbody>
                </Table>
            );
        }
    }

    function rowElement(orderItem: SupplierOrderItem) {
        if (orderItem) {
            return (
                <tr key={orderItem.orderItemId}>
                    <td>
                        <Input
                            type="checkbox"
                            style={{ margin: '0 auto' }}
                            checked={orderItem.isSelected}
                            onChange={() => { toggleQuantityText(orderItem) }} />
                    </td>
                    <td>{orderItem.item.itemCode}</td>
                    <td>{orderItem.item.base}</td>
                    <td>{orderItem.item.description}</td>
                    <td>
                        <Input
                            type="number"
                            min={0}
                            style={{ width: '100px' }}
                            disabled={!orderItem.isSelected}
                            value={orderItem.quantityInMetre}
                            onChange={(event) => { setItemQuantity(event, orderItem) }} />
                    </td>
                    <td>{orderItem.item.costPricePerMetre}</td>
                </tr>
            );
        }
    }

    function toggleQuantityText(orderItem: SupplierOrderItem) {
        setSelectedSupplierItems(selectedSupplierItems.map(item =>
            item.orderItemId === orderItem.orderItemId
                ? {
                    ...item,
                    quantityInMetre: 0,
                    isSelected: !item.isSelected
                }
                : item));
    }

    function setItemQuantity(event: any, orderItem: SupplierOrderItem) {
        setSelectedSupplierItems(selectedSupplierItems.map(item =>
            item.orderItemId === orderItem.orderItemId
                ? {
                    ...item,
                    quantityInMetre: event.target.value
                }
                : item));
    }

    function getSelectedOrderItems(): SupplierOrderItem[] {
        return selectedSupplierItems.filter(item => item.quantityInMetre > 0);
    }

    function onAddOrder() {
        setIsConfirmOrderModalOpen(true);
    }

    function onHideOrderModal() {
        setIsConfirmOrderModalOpen(false);
    }

    function validateAddBtn() {
        if (selectedSupplier.supplierId === 0 || getSelectedOrderItems().length === 0) {
            return true;
        }
        return false;
    }

    function onConfirmOrder(customerOrder: SupplierOrder) {
        addToSupplierOrders(customerOrder);
        setIsOrderConfirmed(true);
    }

    function resetOrder() {
        if (!isOrderConfirmed) {
            setSelectedSupplier(new Supplier());
        }
    }

    function onCancelOrder() {
        setSelectedSupplier(new Supplier());
        props.onCloseAddSupplierOrderModal();
    }

    return (
        <div>
            <ConfirmOrderModal
                orderItems={getSelectedOrderItems()}
                supplier={selectedSupplier}
                isConfirmOrderModalOpen={isConfirmOrderModalOpen}
                onConfirmOrder={onConfirmOrder}
                onHideOrderModal={onHideOrderModal} />
            <Modal
                size="xl"
                isOpen={props.isAddSupplierOrderModalOpen}
                toggle={props.toggleAddSupplierOrderModal}>
                <ModalHeader>
                    Add Supplier Order
            </ModalHeader>
                <ModalBody>
                    <Dropdown
                        isOpen={isSupplierDropdownOpen}
                        toggle={() => { setIsSupplierDropdownOpen(!isSupplierDropdownOpen) }}>
                        <DropdownToggle caret>
                            {selectedSupplier.firstName ?
                                selectedSupplier.firstName + ' ' + selectedSupplier.lastName
                                : 'Select supplier'}
                        </DropdownToggle>
                        <DropdownMenu>
                            {props.suppliers.map(dropdownElement)}
                        </DropdownMenu>
                    </Dropdown>
                    {showSupplierOrderForm()}
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={GlobalStyles.PrimaryBtn}
                        onClick={onAddOrder}
                        disabled={validateAddBtn()}>
                        Add Order
                </Button>
                    <Button
                        onClick={onCancelOrder}>
                        Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}