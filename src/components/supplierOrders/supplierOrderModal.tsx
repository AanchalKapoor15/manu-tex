import React, { FunctionComponent, useState, useEffect } from "react";
import { SupplierOrder } from "../../models/supplierOrder";
import { Modal, ModalHeader, ModalBody, Table, ModalFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col } from "reactstrap";
import { PaymentStatus } from "../../models/enums/paymentStatus";
import { SupplierOrderItem } from "../../models/supplierOrderItem";
import { SupplierOrderStatus } from "../../models/enums/supplierOrderStatus";
import { GlobalStyles } from "../../styles/globalStyles";

interface SupplierOrderModalProps {
    order: SupplierOrder;
    isSupplierOrderModalOpen: boolean;
    onSaveOrder: (order: SupplierOrder) => void;
    onCloseSupplierOrderModal: () => void;
}

export const SupplierOrderModal: FunctionComponent<SupplierOrderModalProps> = (props) => {
    const [currentOrder, setCurrentOrder] = useState(props.order);
    const [isOrderStatusDropdownOpen, setIsOrderStatusDropdownOpen] = useState(false);
    const [isPaymentStatusDropdownOpen, setIsPaymentStatusDropdownOpen] = useState(false);


    useEffect(() => setCurrentOrder(props.order), [props.order]);

    function orderStatusDropdownElement(orderStatus: string) {
        return (
            <DropdownItem key={orderStatus}
                onClick={() => { onSelectOrderStatus(orderStatus) }}>
                {orderStatus}
            </DropdownItem>
        );
    }

    function paymentStatusDropdownElement(paymentStatus: string) {
        return (
            <DropdownItem key={paymentStatus}
                onClick={() => { onSelectPaymentStatus(paymentStatus) }}>
                {paymentStatus}
            </DropdownItem>
        );
    }

    function onSelectOrderStatus(orderStatus: string) {
        switch (orderStatus) {
            case 'New':
                setCurrentOrder({ ...currentOrder, orderStatus: SupplierOrderStatus.NEW });
                break;
            case 'In-process':
                setCurrentOrder({ ...currentOrder, orderStatus: SupplierOrderStatus.IN_PROCESS });
                break;
            case 'Received':
                setCurrentOrder({ ...currentOrder, orderStatus: SupplierOrderStatus.RECEIVED });
                break;
        }
    }

    function onSelectPaymentStatus(paymentStatus: string) {
        switch (paymentStatus) {
            case 'Overdue':
                setCurrentOrder({ ...currentOrder, paymentStatus: PaymentStatus.OVERDUE });
                break;
            case 'Unpaid':
                setCurrentOrder({ ...currentOrder, paymentStatus: PaymentStatus.UNPAID });
                break;
            case 'Partially paid':
                setCurrentOrder({ ...currentOrder, paymentStatus: PaymentStatus.PARTIALLY_PAID });
                break;
            case 'Paid':
                setCurrentOrder({ ...currentOrder, paymentStatus: PaymentStatus.PAID });
                break;
        }
    }

    function onSaveOrder() {
        props.onSaveOrder(currentOrder);
        props.onCloseSupplierOrderModal();
    }

    function onCloseCustomerOrderModal() {
        resetOrderAndPaymentStatus();
        props.onCloseSupplierOrderModal();
    }

    function resetOrderAndPaymentStatus() {
        currentOrder.orderStatus = props.order.orderStatus;
        currentOrder.paymentStatus = props.order.paymentStatus;
    }

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

    return (
        <div>
            <Modal
                size="xl"
                isOpen={props.isSupplierOrderModalOpen}
                toggle={props.onCloseSupplierOrderModal}>
                <ModalHeader>
                    Supplier Order
            </ModalHeader>
                <ModalBody>
                    <Container style={GlobalStyles.OrderModalContainer}>
                        <Row>
                            <Col
                                style={GlobalStyles.OrderModalCol}>
                                <span
                                    style={GlobalStyles.OrderModalColHeader}>
                                    Order Number:
                                </span>
                                <span>
                                    {currentOrder.orderNumber}
                                </span>
                            </Col>
                            <Col
                                style={GlobalStyles.OrderModalCol}>
                                <span
                                    style={GlobalStyles.OrderModalColHeader}>
                                    Order Date:
                                </span>
                                <span>
                                    {currentOrder.orderDate.toDateString()}
                                </span>
                            </Col>
                            <Col
                                style={GlobalStyles.OrderModalCol}>
                                <span
                                    style={GlobalStyles.OrderModalColHeader}>
                                    Supplier:
                                </span>
                                <span>
                                    {`${currentOrder.supplier.firstName} ${currentOrder.supplier.lastName}`}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                style={GlobalStyles.OrderModalCol}>
                                <span
                                    style={GlobalStyles.OrderModalColHeader}>
                                    Order Status:
                                </span>
                                <Dropdown
                                    isOpen={isOrderStatusDropdownOpen}
                                    toggle={() => { setIsOrderStatusDropdownOpen(!isOrderStatusDropdownOpen) }}
                                    style={GlobalStyles.OrderModalInput}>
                                    <DropdownToggle
                                        caret>
                                        {currentOrder.orderStatus}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {Object.values(SupplierOrderStatus).map(orderStatusDropdownElement)}
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                            <Col
                                style={GlobalStyles.OrderModalCol}>
                                <span
                                    style={GlobalStyles.OrderModalColHeader}>
                                    Payment status:
                                </span>
                                <Dropdown
                                    isOpen={isPaymentStatusDropdownOpen}
                                    toggle={() => { setIsPaymentStatusDropdownOpen(!isPaymentStatusDropdownOpen) }}
                                    style={GlobalStyles.OrderModalInput}>
                                    <DropdownToggle
                                        caret>
                                        {currentOrder.paymentStatus}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {Object.values(PaymentStatus).map(paymentStatusDropdownElement)}
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                            <Col
                                style={GlobalStyles.OrderModalCol}>
                                <span
                                    style={GlobalStyles.OrderModalColHeader}>
                                    Billing Amount:
                                </span>
                                <span>
                                    {currentOrder.totalBillAmount}
                                </span>
                            </Col>
                        </Row>
                    </Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Base</th>
                                <th>Description</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrder.orderItems.map(rowElement)}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={GlobalStyles.PrimaryBtn}
                        onClick={onSaveOrder}>
                        Save
                    </Button>
                    <Button
                        style={GlobalStyles.SecondaryBtn}
                        onClick={onCloseCustomerOrderModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default SupplierOrderModal;