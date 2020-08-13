import React, { FunctionComponent } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table,
} from "reactstrap";

import { Supplier } from "../../models/supplier";
import { SupplierOrder } from "../../models/supplierOrder";
import { SupplierOrderItem } from "../../models/supplierOrderItem";
import { GlobalStyles } from "../../styles/globalStyles";

interface ConfirmOrderModalProps {
    orderItems: SupplierOrderItem[];
    supplier: Supplier;
    isConfirmOrderModalOpen: boolean;
    onConfirmOrder: (supplierOrder: SupplierOrder) => void;
    onHideOrderModal: () => void;
}

const ConfirmOrderModal: FunctionComponent<ConfirmOrderModalProps> = (props) => {

    function rowElement(orderItem: SupplierOrderItem) {
        return (
            <tr key={orderItem.orderItemId}>
                <td>{orderItem.item.itemCode}</td>
                <td>{orderItem.item.base}</td>
                <td>{orderItem.item.description}</td>
                <td>{orderItem.quantityInMetre}</td>
            </tr>
        );
    }

    function onConfirmOrder() {
        let confirmedOrder = new SupplierOrder({orderItems: props.orderItems, supplier: props.supplier});
        props.onConfirmOrder(confirmedOrder);
        props.onHideOrderModal();
    }

    return (
        <Modal
            isOpen={props.isConfirmOrderModalOpen}
            toggle={props.onHideOrderModal}>
            <ModalHeader>
                Confirm Supplier Order
        </ModalHeader>
            <ModalBody>
                <span style={{fontWeight: 'bold'}}>Supplier: </span>
                <span>{`${props.supplier.firstName} ${props.supplier.lastName}`}</span>
                <Table
                style={{position: 'relative', top: '20px'}}>
                    <thead>
                        <tr>
                            <th>Item Code</th>
                            <th>Base</th>
                            <th>Description</th>
                            <th>Quantity (in metre)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.orderItems.map(rowElement)}
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={onConfirmOrder}
                    style={GlobalStyles.PrimaryBtn}>
                    Save
            </Button>
                <Button
                    onClick={() => { props.onHideOrderModal() }}>
                    Cancel
            </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmOrderModal;