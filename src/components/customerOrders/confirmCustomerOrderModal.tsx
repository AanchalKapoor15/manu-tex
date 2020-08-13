import React, { FunctionComponent, useState, useEffect } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col
} from "reactstrap";

import { CustomerOrderItem } from "../../models/customerOrderItem";
import { Customer } from "../../models/customer";
import { CustomerOrder } from "../../models/customerOrder";
import { GlobalStyles } from "../../styles/globalStyles";

interface ConfirmOrderModalProps {
    orderItems: CustomerOrderItem[];
    customers: Customer[];
    isConfirmOrderModalOpen: boolean;
    onConfirmOrder: (customerOrder: CustomerOrder) => void;
    onHideOrderModal: () => void;
}

const ConfirmOrderModal: FunctionComponent<ConfirmOrderModalProps> = (props) => {
    const [selectedCustomer, setSelectedCustomer] = useState(new Customer());
    const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);

    useEffect(() => setSelectedCustomer(new Customer()), [props.orderItems]);

    function rowElement(orderItem: CustomerOrderItem) {
        return (
            <tr key={orderItem.orderItemId}>
                <td>{orderItem.item.itemCode}</td>
                <td>{orderItem.item.base}</td>
                <td>{orderItem.item.description}</td>
                <td>{orderItem.quantityInMetre}</td>
            </tr>
        );
    }

    function dropdownElement(customer: Customer) {
        return (
            <DropdownItem
                key={customer.customerId}
                onClick={() => { setSelectedCustomer(customer) }}>
                {`${customer.firstName} ${customer.lastName}`}
            </DropdownItem>
        );
    }

    function onConfirmOrder() {
        let confirmedOrder = new CustomerOrder({ orderItems: props.orderItems, customer: selectedCustomer });
        props.onConfirmOrder(confirmedOrder);
        props.onHideOrderModal();
    }

    return (
        <Modal
            isOpen={props.isConfirmOrderModalOpen}
            toggle={props.onHideOrderModal}>
            <ModalHeader>
                Confirm Customer Order
        </ModalHeader>
            <ModalBody>
                <Table>
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
                <Container>
                    <Row>
                        <Col>
                            <Dropdown isOpen={isCustomerDropdownOpen} toggle={() => { setIsCustomerDropdownOpen(!isCustomerDropdownOpen) }}>
                                <DropdownToggle caret>
                                    {selectedCustomer.firstName ?
                                        selectedCustomer.firstName + ' ' + selectedCustomer.lastName
                                        : 'Select Customer'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {props.customers.map(dropdownElement)}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col className="offset-md-2">
                            <Button
                                onClick={onConfirmOrder}
                                disabled={!selectedCustomer.firstName}
                                style={{ ...GlobalStyles.PrimaryBtn, marginRight: '25px' }}>
                                Save
                            </Button>
                            <Button
                                onClick={() => { props.onHideOrderModal() }}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmOrderModal;