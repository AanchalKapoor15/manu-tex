import React, { FunctionComponent, useState } from 'react';
import { Input, Table, Button, Container, Col, Row } from 'reactstrap';

import Header from '../header/header';
import { GlobalStyles } from '../../styles/globalStyles';
import { getOrders } from '../../services/supplierOrderService';
import { PaymentStatus } from '../../models/enums/paymentStatus';
import ColorConstants from '../../styles/variables';
import { SupplierOrder } from '../../models/supplierOrder';
import { AddSupplierOrderModal } from './addSupplierOrderModal';
import SupplierOrderModal from './supplierOrderModal';
import { Supplier } from '../../models/supplier';
import { getSuppliers } from '../../services/supplierService';
import Sidebar from '../sidebar/sidebar';

export const SupplierOrdersView: FunctionComponent = () => {
    const [supplierOrders, setSupplierOrders] = useState(getOrders());
    const [currentOrder, setCurrentOrder] = useState(new SupplierOrder());
    const [searchText, setSearchText] = useState('');
    const [isSupplierOrderModalOpen, setIsSupplierOrderModalOpen] = useState(false);
    const [isAddSupplierOrderModalOpen, setIsAddSupplierOrderModalOpen] = useState(false);

    function filterOrders() {
        return supplierOrders.filter(order => {
            if (
                order.orderNumber.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || order.orderDate.toDateString()
                    .indexOf(searchText) > -1
                || order.supplier.firstName.toString().toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || order.supplier.lastName.toString().toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || order.totalBillAmount.toString()
                    .indexOf(searchText) > -1
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

    function onOpenSupplierOrderModal(order: SupplierOrder) {
        setCurrentOrder(order);
        setIsSupplierOrderModalOpen(true);
    }

    function onCloseSupplierOrderModal() {
        setIsSupplierOrderModalOpen(false);
    }

    function onAddSupplierOrder() {
        setIsAddSupplierOrderModalOpen(true);
    }

    function onCloseAddSupplierOrderModal() {
        setIsAddSupplierOrderModalOpen(false);
    }

    function fetchSuppliers(): Supplier[] {
        return getSuppliers();
    }

    function onSaveOrder(supplierOrder: SupplierOrder) {
        setSupplierOrders(supplierOrders.map(order =>
            order.orderId === supplierOrder.orderId ?
                {
                    ...order,
                    orderStatus: supplierOrder.orderStatus,
                    paymentStatus: supplierOrder.paymentStatus
                }
                : order));
    }

    function rowElement(order: SupplierOrder) {
        return (
            <tr
                key={order.orderId}
                style={{
                    color: order.paymentStatus === PaymentStatus.OVERDUE
                        ? ColorConstants.redColor
                        : ColorConstants.blackColor
                }}>
                <td>
                    <Button
                        onClick={() => { onOpenSupplierOrderModal(order) }}>
                        {order.orderNumber}
                    </Button>
                </td>
                <td>{order.orderDate.toDateString()}</td>
                <td>{`${order.supplier.firstName} ${order.supplier.lastName}`}</td>
                <td>{order.totalBillAmount}</td>
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
                    <Sidebar pageIndex={4} />
                </Col>
                <Col
                    style={GlobalStyles.Col}>
                    <Header title="Supplier Orders" />
                    <AddSupplierOrderModal
                        suppliers={fetchSuppliers()}
                        isAddSupplierOrderModalOpen={isAddSupplierOrderModalOpen}
                        onCloseAddSupplierOrderModal={onCloseAddSupplierOrderModal}
                        toggleAddSupplierOrderModal={onCloseAddSupplierOrderModal} />
                    <SupplierOrderModal
                        order={currentOrder}
                        isSupplierOrderModalOpen={isSupplierOrderModalOpen}
                        onSaveOrder={onSaveOrder}
                        onCloseSupplierOrderModal={onCloseSupplierOrderModal}
                    />
                    <Container style={GlobalStyles.TopContainer}>
                        <Row>
                            <Col className="col-auto">
                                <Button
                                    style={GlobalStyles.AddBtn}
                                    onClick={onAddSupplierOrder}>
                                    Add order
                            </Button>
                            </Col>
                            <Col className="col-auto">
                                <Input
                                    type="text"
                                    style={GlobalStyles.SearchBox}
                                    onChange={(event) => { setSearchText(event.target.value) }}
                                    placeholder="Search" />
                            </Col>
                        </Row>
                    </Container>
                    <Table style={GlobalStyles.Table}>
                        <thead>
                            <tr>
                                <th>Order No.</th>
                                <th>Order Date</th>
                                <th>Supplier Name</th>
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

export default SupplierOrdersView;