import React, { FunctionComponent, useState } from 'react';
import { Table, Input, Button, Container, Row, Col } from 'reactstrap';

import Header from '../header/header';
import { GlobalStyles } from '../../styles/globalStyles';
import { getOrders } from '../../services/customerOrderService';
import { CustomerOrder } from '../../models/customerOrder';
import { PaymentStatus } from '../../models/enums/paymentStatus';
import { CustomerOrderModal } from './customerOrderModal';
import { CustomerOrderItem } from '../../models/customerOrderItem';
import ColorConstants from '../../styles/variables';
import Sidebar from '../sidebar/sidebar';

export const CustomerOrdersView: FunctionComponent = () => {
    const [customerOrders, setCustomerOrders] = useState(getOrders());
    const [currentOrder, setCurrentOrder] = useState(new CustomerOrder());
    const [searchText, setSearchText] = useState('');
    const [isCustomerOrderModalOpen, setIsCustomerOrderModalOpen] = useState(false);

    function filterOrders() {
        return customerOrders.filter(order => {
            if (
                order.orderNumber.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || order.orderDate.toDateString()
                    .indexOf(searchText.toUpperCase()) > -1
                || order.totalSellingPrice.toString()
                    .indexOf(searchText.toUpperCase()) > -1
                || order.paymentStatus.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || order.orderStatus.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    function onOpenCustomerOrderModal(order: CustomerOrder) {
        setCurrentOrder(order);
        setIsCustomerOrderModalOpen(true);
    }

    function onCloseCustomerOrderModal() {
        setIsCustomerOrderModalOpen(false);
    }

    function isSellingPriceSet(order: CustomerOrder) {
        return order.orderItems.some(item => item.sellingPricePerMetre);
    }

    function updateOrderRate(updatedOrderItem: CustomerOrderItem) {
        currentOrder.orderItems.map(
            orderItem =>
                orderItem.orderItemId === updatedOrderItem.orderItemId
                    ? {
                        ...orderItem,
                        sellingPricePerMetre: updatedOrderItem.sellingPricePerMetre
                    }
                    : orderItem);

        setCustomerOrders(customerOrders.map(
            order => order.orderId === currentOrder.orderId
                ? {
                    ...order,
                    orderItems: currentOrder.orderItems,
                    totalSellingPrice: currentOrder.totalSellingPrice
                }
                : order))
    }

    function onSaveOrder(customerOrder: CustomerOrder) {
        setCustomerOrders(customerOrders.map(order =>
            order.orderId === customerOrder.orderId ?
                {
                    ...order,
                    orderStatus: customerOrder.orderStatus,
                    paymentStatus: customerOrder.paymentStatus
                }
                : order));
    }

    function rowElement(order: CustomerOrder) {
        return (
            <tr key={order.orderId} style={{ color: order.paymentStatus === PaymentStatus.OVERDUE ? ColorConstants.redColor : ColorConstants.blackColor }}>
                <td><Button
                    onClick={() => { onOpenCustomerOrderModal(order) }}>
                    {order.orderNumber}
                </Button></td>
                <td>{order.orderDate.toDateString()}</td>
                <td>{isSellingPriceSet(order) ? order.totalSellingPrice : '--'}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.orderStatus}</td>
            </tr>
        );
    }

    return (
        <Container
            style={GlobalStyles.MasterContainer}>
            <Row>
                <Col
                    className="col-auto"
                    style={GlobalStyles.Col}>
                    <Sidebar pageIndex={3} />
                </Col>
                <Col
                    style={GlobalStyles.Col}>
                    <Header title="Customer Orders" />
                    <Container style={GlobalStyles.TopContainer}>
                        <Row>
                            <Col>
                                <Input
                                    type="text"
                                    style={GlobalStyles.SearchBox}
                                    onChange={(event) => { setSearchText(event.target.value) }}
                                    placeholder="Search" />
                            </Col>
                        </Row>
                    </Container>
                    <CustomerOrderModal
                        order={currentOrder}
                        isCustomerOrderModalOpen={isCustomerOrderModalOpen}
                        onSaveOrder={onSaveOrder}
                        updateOrderRate={updateOrderRate}
                        onCloseCustomerOrderModal={onCloseCustomerOrderModal} />
                    <Table style={GlobalStyles.Table}>
                        <thead>
                            <tr>
                                <th>Order No.</th>
                                <th>Order Date</th>
                                <th>Billing Amount</th>
                                <th>Payment Status</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterOrders().map(rowElement)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default CustomerOrdersView;