import React, { FunctionComponent, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Container, Row, Col } from 'reactstrap';

import { CustomerOrderItem } from '../../models/customerOrderItem';
import { GlobalStyles } from '../../styles/globalStyles';

interface SetSupplierModalProps {
    orderItem: CustomerOrderItem;
    isSupplierModalOpen: boolean;
    onCloseSupplierModal: () => void;
    saveRate: (sellingPricePerMetre: number) => void;
}

export const SetSupplierModal: FunctionComponent<SetSupplierModalProps> = (props) => {
    const [orderItemSellingPrice, setOrderItemSellingPrice] = useState(0);

    function onCloseModal() {
        setOrderItemSellingPrice(0);
        props.onCloseSupplierModal();
    }

    function onSaveRate() {
        setOrderItemSellingPrice(0);
        props.saveRate(orderItemSellingPrice);
    }

    return (
        <Modal
            size="lg"
            isOpen={props.isSupplierModalOpen}
            toggle={props.onCloseSupplierModal}>
            <ModalHeader>
                Set Selling Price
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <span
                                style={GlobalStyles.OrderModalColHeader}>
                                Supplier:
                            </span>
                            <span>
                                {`${props.orderItem.item.supplier.firstName} ${props.orderItem.item.supplier.lastName}`}
                            </span>
                        </Col>
                        <Col>
                            <span
                                style={GlobalStyles.OrderModalColHeader}>
                                Item Code:
                            </span>
                            <span>
                                {props.orderItem.item.itemCode}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span
                                style={GlobalStyles.OrderModalColHeader}>
                                Cost Price:
                            </span>
                            <span>
                                {props.orderItem.costPricePerMetre}
                            </span>
                        </Col>
                        <Col>
                            <span
                                style={GlobalStyles.OrderModalColHeader}>
                                Base:
                            </span>
                            <span>
                                {props.orderItem.item.base}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span
                                style={GlobalStyles.OrderModalColHeader}>
                                Total Cost Price:
                            </span>
                            <span>
                                {props.orderItem.costPricePerMetre * props.orderItem.quantityInMetre}
                            </span>
                        </Col>
                        <Col>
                            <span style={GlobalStyles.OrderModalColHeader}>
                                Description:
                            </span>
                            <span>
                                {props.orderItem.item.description}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span style={GlobalStyles.OrderModalColHeader}>
                                Selling Price:
                            </span>
                            <Input
                                type="number"
                                onChange={(event: any) => { setOrderItemSellingPrice(event.target.value) }}
                                style={{ display: 'inline-block', width: '50%' }} />
                        </Col>
                        <Col>
                            <span
                                style={GlobalStyles.OrderModalColHeader}>
                                Quantity:
                            </span>
                            <span>
                                {props.orderItem.quantityInMetre}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                        // md="3"
                        >
                            <span
                                style={GlobalStyles.OrderModalColHeader}>
                                Total Selling Price:
                            </span>
                            <span>
                                {
                                    orderItemSellingPrice > 0
                                        ? orderItemSellingPrice * props.orderItem.quantityInMetre
                                        : 0
                                }
                            </span>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button
                    disabled={orderItemSellingPrice == 0}
                    onClick={onSaveRate}
                    style={GlobalStyles.PrimaryBtn}>
                    Save
                </Button>
                <Button
                    onClick={onCloseModal}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>);
}