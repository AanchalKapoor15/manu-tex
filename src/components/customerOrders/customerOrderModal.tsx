import React, { FunctionComponent, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Table, ModalFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col } from 'reactstrap';

import { CustomerOrder } from '../../models/customerOrder';
import { CustomerOrderStatus } from '../../models/enums/customerOrderStatus';
import { PaymentStatus } from '../../models/enums/paymentStatus';
import { CustomerOrderItem } from '../../models/customerOrderItem';
import { SetSupplierModal } from './setSellingPriceModal';
import { GlobalStyles } from '../../styles/globalStyles';

interface CustomerOrderModalProps {
    order: CustomerOrder;
    isCustomerOrderModalOpen: boolean;
    onSaveOrder: (order: CustomerOrder) => void;
    updateOrderRate: (orderItem: CustomerOrderItem) => void;
    onCloseCustomerOrderModal: () => void;
}
export const CustomerOrderModal: FunctionComponent<CustomerOrderModalProps> = (props) => {
    const [currentOrder, setCurrentOrder] = useState(props.order);
    const [currentOrderItem, setCurrentOrderItem] = useState(new CustomerOrderItem());
    const [isSetSupplierModalOpen, setIsSetSupplierModalOpen] = useState(false);
    const [isOrderStatusDropdownOpen, setIsOrderStatusDropdownOpen] = useState(false);
    const [isPaymentStatusDropdownOpen, setIsPaymentStatusDropdownOpen] = useState(false);

    useEffect(() => setCurrentOrder(props.order), [props.order]);

    function onOpenSupplierModal(orderItem: CustomerOrderItem) {
        setCurrentOrderItem(orderItem);
        setIsSetSupplierModalOpen(true);
    }

    function onCloseSetSupplierModal() {
        setIsSetSupplierModalOpen(false)
    }

    function onViewItemSellingPrice(orderItem: CustomerOrderItem) {
        if (isSellingPriceSet(orderItem)) {
            return;
        }
        else {
            setCurrentOrderItem(orderItem);
            setIsSetSupplierModalOpen(true);
        }
    }

    function calculateTotalCostPrice(orderItem: CustomerOrderItem): number {
        return orderItem.quantityInMetre * orderItem.costPricePerMetre;
    }

    function calculateTotalSellingPrice(orderItem: CustomerOrderItem): number {
        return orderItem.quantityInMetre * orderItem.sellingPricePerMetre;
    }

    function isSellingPriceSet(orderItem: CustomerOrderItem) {
        return orderItem.sellingPricePerMetre > 0;
    }

    function saveRate(sellingPricePerMetre: number) {
        setCurrentOrderItem(
            {
                ...currentOrderItem,
                sellingPricePerMetre: sellingPricePerMetre
            });

        props.updateOrderRate(currentOrderItem);
        setIsSetSupplierModalOpen(false);
    }

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
                setCurrentOrder({ ...currentOrder, orderStatus: CustomerOrderStatus.NEW });
                break;
            case 'In-process':
                setCurrentOrder({ ...currentOrder, orderStatus: CustomerOrderStatus.IN_PROCESS });
                break;
            case 'Delivered':
                setCurrentOrder({ ...currentOrder, orderStatus: CustomerOrderStatus.DELIVERED });
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
        props.onCloseCustomerOrderModal();
    }

    function onCloseCustomerOrderModal() {
        resetOrderAndPaymentStatus();
        props.onCloseCustomerOrderModal();
    }

    function resetOrderAndPaymentStatus() {
        currentOrder.orderStatus = props.order.orderStatus;
        currentOrder.paymentStatus = props.order.paymentStatus;
    }

    function rowElement(orderItem: CustomerOrderItem) {
        return (
            <tr key={orderItem.orderItemId}>
                <td>{orderItem.item.itemCode}</td>
                <td>{orderItem.item.base}</td>
                <td>{orderItem.item.description}</td>
                <td>{orderItem.quantityInMetre}</td>
                <td>
                    {`${orderItem.item.supplier.firstName} ${orderItem.item.supplier.lastName}`}
                </td>
                <td>{orderItem.costPricePerMetre}</td>
                <td>{isSellingPriceSet(orderItem)
                    ? orderItem.sellingPricePerMetre
                    : <Button
                        onClick={() => { onViewItemSellingPrice(orderItem) }}>
                        Set Selling Price
                </Button>
                }
                </td>
                <td>{calculateTotalCostPrice(orderItem)}</td>
                <td>{calculateTotalSellingPrice(orderItem)}</td>
            </tr>
        );
    }

    return (
        <div>
            <SetSupplierModal
                orderItem={currentOrderItem}
                isSupplierModalOpen={isSetSupplierModalOpen}
                onCloseSupplierModal={onCloseSetSupplierModal}
                saveRate={saveRate} />
            <Modal
                size="xl"
                isOpen={props.isCustomerOrderModalOpen}
                toggle={props.onCloseCustomerOrderModal}>
                <ModalHeader>
                    Customer Order
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
                                    Billing Amount:
                                </span>
                                <span>
                                    {currentOrder.totalSellingPrice}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col 
                            md="4"
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
                                        {Object.values(CustomerOrderStatus).map(orderStatusDropdownElement)}
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                            <Col
                            md="4"
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
                        </Row>
                    </Container>
                    <Table>
                        <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Base</th>
                                <th>Description</th>
                                <th>Qty</th>
                                <th>Supplier</th>
                                <th>CP/metre</th>
                                <th>SP/metre</th>
                                <th>Total CP</th>
                                <th>Total SP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrder.orderItems.map(rowElement)}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={onSaveOrder}
                        style={GlobalStyles.PrimaryBtn}>
                        Save
                    </Button>
                    <Button
                        onClick={onCloseCustomerOrderModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}