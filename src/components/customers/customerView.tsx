import React, { FunctionComponent, useState } from 'react';
import Header from '../header/header';
import { Input, Button, Container, Col, Row } from 'reactstrap';

import CustomerTable from './customerTable';
import { Customer } from '../../models/customer';
import { getCustomers } from '../../services/customerService';
import AddEditCustomerModal from './addEditCustomerModal';
import CustomerStyles from './customerStyles';
import { GlobalStyles } from '../../styles/globalStyles';
import Sidebar from '../sidebar/sidebar';
import { globalAgent } from 'https';

export const Customers: FunctionComponent = () => {
    const [originalCustomers, setOriginalCustomers] = useState(getCustomers());
    const [currentCustomer, setCurrentCustomer] = useState(new Customer());
    const [searchText, setSearchText] = useState('');
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    function onAddEditCustomer({
        isEditMode,
        customer
    }: {
        isEditMode: boolean,
        customer?: Customer
    }) {
        setIsCustomerModalOpen(true);
        setIsEditMode(isEditMode);
        if (!isEditMode) {
            setCurrentCustomer(new Customer());
        }
        else if (customer) {
            setCurrentCustomer(customer);
        }
    }

    function onToggleCustomerModal() {
        setIsCustomerModalOpen(!isCustomerModalOpen);
        setCurrentCustomer(new Customer());
    }

    function filterCustomers(): Customer[] {
        return originalCustomers.filter(customer => {
            if (customer.firstName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || customer.lastName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || customer.address.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || customer.phoneNumber.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || customer.email.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || customer.description.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || customer.gstNumber.toString().toUpperCase().indexOf(searchText.toUpperCase()) > -1
            ) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    function onSaveCustomer(customer: Customer) {
        //server side : TODO

        //client side
        if (!isEditMode) {
            setOriginalCustomers([...originalCustomers, customer]);
        }
        else {
            setOriginalCustomers(originalCustomers.map(
                originalCustomer => originalCustomer.customerId === customer.customerId
                    ? {
                        ...originalCustomer,
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        address: customer.address,
                        phoneNumber: customer.phoneNumber,
                        email: customer.email,
                        description: customer.description,
                        gstNumber: customer.gstNumber,
                    }
                    : originalCustomer))
        }
    }

    function onDeleteCustomer(customerId: number) {
        //server side: TODO

        //client side
        setOriginalCustomers(originalCustomers.filter(customer =>
            customer.customerId !== customerId)
        );
    }

    function checkAuthorization() {
        //let token = sessionStorage.getItem('token');
        //try {
        // var decoded = decodeToken(token);
        //if(decoded.roleId === 'ADMIN'){
        return (
            <Container
                style={GlobalStyles.MasterContainer}>
                <Row>
                    <Col
                        className="col-auto"
                        style={GlobalStyles.Col}>
                        <Sidebar pageIndex={6} />
                    </Col>
                    <Col
                        style={GlobalStyles.Col}>
                        <Header title="Customers" />
                        <AddEditCustomerModal
                            customer={currentCustomer}
                            customers={originalCustomers}
                            isEditMode={isEditMode}
                            isCustomerModalOpen={isCustomerModalOpen}
                            onSave={onSaveCustomer}
                            onToggleCustomerModal={onToggleCustomerModal} />
                        <Container style={GlobalStyles.TopContainer}>
                            <Row>
                                <Col className="col-auto">
                                    <Button
                                        style={GlobalStyles.AddBtn}
                                        onClick={() => { onAddEditCustomer({ isEditMode: false }) }}>
                                        Add Customer
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
                        <CustomerTable
                            customers={filterCustomers()}
                            editCustomer={onAddEditCustomer}
                            deleteCustomer={onDeleteCustomer} />
                    </Col>
                </Row>
            </Container>
        );
        // }
        //}
        //catch (error) { }
    }
    return (
        checkAuthorization()
    );
}

export default Customers;