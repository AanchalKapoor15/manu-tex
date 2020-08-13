import React, { FunctionComponent, useState } from 'react';
import Header from '../header/header';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Input, Button, Container, Row, Col } from 'reactstrap';

import SupplierTable from './supplierTable';
import SupplierDetail from './supplierDetails';
import { Supplier } from '../../models/supplier';
import { getSuppliers } from '../../services/supplierService';
import AddEditSupplierModal from './addEditSupplierModal';
import SupplierStyles from './supplierStyles';
import { GlobalStyles } from '../../styles/globalStyles';
import Sidebar from '../sidebar/sidebar';

interface ItemsProps {
    history: History;
}

export const Suppliers: FunctionComponent<ItemsProps> = (props) => {
    let match = useRouteMatch();
    const [originalSuppliers, setOriginalSuppliers] = useState(getSuppliers());
    const [currentSupplier, setCurrentSupplier] = useState(new Supplier());
    const [searchText, setSearchText] = useState('');
    const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    function onAddEditSupplier({
        isEditMode,
        supplier
    }: {
        isEditMode: boolean,
        supplier?: Supplier
    }) {
        setIsSupplierModalOpen(true);
        setIsEditMode(isEditMode);
        if (!isEditMode) {
            setCurrentSupplier(new Supplier());
        }
        else if (supplier) {
            if (supplier) {
                setCurrentSupplier(supplier);
            }
        }
    }

    function onToggleSupplierModal() {
        setIsSupplierModalOpen(!isSupplierModalOpen);
        setCurrentSupplier(new Supplier());
    }

    function filterSuppliers(): Supplier[] {
        return originalSuppliers.filter(supplier => {
            if (supplier.firstName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || supplier.lastName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || supplier.description.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || supplier.address.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || supplier.phoneNumber.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || supplier.gstNumber.toUpperCase().indexOf(searchText.toUpperCase()) > -1) {
                return true;
            }

            else {
                return false;
            }
        });
    }

    function onSaveSupplier(supplier: Supplier) {
        //server side : TODO

        //client side
        if (!isEditMode) {
            setOriginalSuppliers([...originalSuppliers, supplier]);
        }
        else {
            setOriginalSuppliers(originalSuppliers.map(
                originalSupplier => originalSupplier.supplierId === supplier.supplierId
                    ? {
                        ...originalSupplier,
                        firstName: supplier.firstName,
                        lastName: supplier.lastName,
                        address: supplier.address,
                        phoneNumber: supplier.phoneNumber,
                        description: supplier.description,
                        gstNumber: supplier.gstNumber
                    }
                    : originalSupplier))
        }
    }

    function onDeleteSupplier(supplierId: number) {
        //server side: TODO

        //client side
        setOriginalSuppliers(originalSuppliers.filter(supplier => supplier.supplierId !== supplierId));
    }

    function checkAuthorization() {
        //let token = sessionStorage.getItem('token');
        //try {
        // var decoded = decodeToken(token);
        //if(decoded.role === 'ADMIN'){
        return (
            <Container
                style={GlobalStyles.MasterContainer}>
                <Row>
                    <Col
                        className="col-auto"
                        style={GlobalStyles.Col}>
                        <Sidebar pageIndex={7} />
                    </Col>
                    <Col style={GlobalStyles.Col}>
                        <AddEditSupplierModal
                            supplier={currentSupplier}
                            suppliers={originalSuppliers}
                            isEditMode={isEditMode}
                            isSupplierModalOpen={isSupplierModalOpen}
                            onSave={onSaveSupplier}
                            onToggleSupplierModal={onToggleSupplierModal} />
                        <Switch>
                            <Route exact path="/suppliers" render={() => (
                                <div>
                                    <Header title="Suppliers" />
                                    <Container style={GlobalStyles.TopContainer}>
                                        <Row>
                                            <Col className="col-auto">
                                                <Button
                                                    style={GlobalStyles.AddBtn}
                                                    onClick={() => { onAddEditSupplier({ isEditMode: false }) }}>
                                                    Add Supplier
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
                                    <SupplierTable
                                        suppliers={filterSuppliers()}
                                        editSupplier={onAddEditSupplier}
                                        deleteSupplier={onDeleteSupplier} />
                                </div>
                            )} />
                            <Route
                                path={`${match ? match.path : ''}/:supplierId`}
                                render={() => (
                                    <div>
                                        <Header
                                            title="Suppliers Details" />
                                        <SupplierDetail
                                            suppliers={filterSuppliers()}
                                            history={props.history} />
                                    </div>
                                )} />
                        </Switch>
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

export default Suppliers;