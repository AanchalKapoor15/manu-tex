import React,
{
    FunctionComponent,
    useState,
    useEffect,
    CSSProperties
} from 'react';
import {
    Button,
    Input,
    Table,
    Container,
    Col,
    Row
} from 'reactstrap';

import Header from '../header/header';
import { GlobalStyles } from '../../styles/globalStyles';
import { CustomerOrderItem } from '../../models/customerOrderItem';
import { getItems } from '../../services/itemService';
import ConfirmOrderModal from './confirmCustomerOrderModal';
import { getCustomers } from '../../services/customerService';
import { CustomerOrder } from '../../models/customerOrder';
import { addToCustomerOrders } from '../../services/customerOrderService';
import Sidebar from '../sidebar/sidebar';

export const AddCustomerOrder: FunctionComponent = () => {
    const [orderItems, setOrderItems] = useState(mapItemsToOrderItems());
    const [searchText, setSearchText] = useState('');
    const [isConfirmOrderModalOpen, setIsConfirmOrderModalOpen] = useState(false);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    useEffect(() => resetOrder, [isOrderConfirmed]);

    function filterItems() {
        return orderItems.filter(orderItem => {
            if (
                orderItem.item.itemCode.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || orderItem.item.base.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || orderItem.item.description.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    function mapItemsToOrderItems() {
        let id = 0;
        return getItems().map(item => new CustomerOrderItem(
            {
                orderItemId: ++id,
                item: item
            }
        ));
    }

    function setItemQuantity(event: any, orderItem: CustomerOrderItem) {
        setOrderItems(orderItems.map(item => item.orderItemId === orderItem.orderItemId
            ? {
                ...item,
                quantityInMetre: event.target.value
            }
            : item));
    }

    function onAddOrder() {
        setIsConfirmOrderModalOpen(true);
    }

    function toggleQuantityText(orderItem: CustomerOrderItem) {
        setOrderItems(orderItems.map(item =>
            item.orderItemId === orderItem.orderItemId
                ? {
                    ...item,
                    quantityInMetre: 0,
                    isSelected: !item.isSelected
                }
                : item));
    }

    function getSelectedOrderItems(): CustomerOrderItem[] {
        return orderItems.filter(item => item.quantityInMetre > 0);
    }

    function onConfirmOrder(customerOrder: CustomerOrder) {
        addToCustomerOrders(customerOrder);
        setIsOrderConfirmed(true);
    }

    function onHideOrderModal() {
        setIsConfirmOrderModalOpen(false);
    }

    function resetOrder() {
        if (!isOrderConfirmed) {
            setOrderItems(orderItems.map(item => {
                item.isSelected = false;
                item.quantityInMetre = 0;
                return item;
            }));
        }
    }

    function isAddOrderBtnDisabled() {
        return !orderItems.some(item =>
            item.isSelected && item.quantityInMetre > 0)
    }

    function addBtnStyles(): CSSProperties {
        return !isAddOrderBtnDisabled()
            ? GlobalStyles.AddBtn
            : { ...GlobalStyles.AddBtn, ...GlobalStyles.AddBtnDisabled };
    }

    function rowElement(orderItem: CustomerOrderItem) {
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
                    <Sidebar pageIndex={2} />
                </Col>
                <Col
                    style={GlobalStyles.Col}>
                    <Header title="Add Customer Order" />
                    <ConfirmOrderModal
                        orderItems={getSelectedOrderItems()}
                        customers={getCustomers()}
                        isConfirmOrderModalOpen={isConfirmOrderModalOpen}
                        onConfirmOrder={onConfirmOrder}
                        onHideOrderModal={onHideOrderModal} />
                    <Container style={GlobalStyles.TopContainer}>
                        <Row>
                            <Col className="col-auto">
                                <Button
                                    style={addBtnStyles()}
                                    onClick={onAddOrder}
                                    disabled={isAddOrderBtnDisabled()}>
                                    Add Order
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
                                <th>Select</th>
                                <th>Item Code</th>
                                <th>Base</th>
                                <th>Description</th>
                                <th>Quantity (in m)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterItems().map(rowElement)}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default AddCustomerOrder;