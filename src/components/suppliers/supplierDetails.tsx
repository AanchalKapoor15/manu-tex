import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import {
    Form,
    FormGroup,
    Input,
    Label,
    Button
} from 'reactstrap';

import { Supplier } from '../../models/supplier';
import SupplierStyles from './supplierStyles';
import { BackIcon } from '../../assets/iconBack';
import { GlobalStyles } from '../../styles/globalStyles';

interface SupplierDetailsProps {
    suppliers: Supplier[];
    history: any;
}

export const SupplierDetail: FunctionComponent<SupplierDetailsProps> = (props) => {
    let { supplierId = '' } = useParams();
    let supplier = props.suppliers.find(
        supplier =>
            supplier.supplierId === +supplierId
    );

    return (
        <div>
            <Form style={SupplierStyles.SupplierDetail}>
                <FormGroup>
                    <span style={GlobalStyles.PointerCursor} onClick={() => { props.history.goBack() }}>
                        <BackIcon height="25px" width="25px" />
                    </span>
                </FormGroup>
                <FormGroup>
                    <Label
                        style={SupplierStyles.SupplierDetailLabel}>
                        First Name
                    </Label>
                    <Input
                        readOnly
                        value={supplier ? supplier.firstName : ''} />
                </FormGroup>
                <FormGroup>
                    <Label
                        style={SupplierStyles.SupplierDetailLabel}>
                        Last Name
                    </Label>
                    <Input
                        readOnly
                        value={supplier ? supplier.lastName : ''} />
                </FormGroup>
                <FormGroup>
                    <Label
                        style={SupplierStyles.SupplierDetailLabel}>
                        Phone Number
                    </Label>
                    <Input
                        readOnly
                        value={supplier ? supplier.phoneNumber : ''} />
                </FormGroup>
                <FormGroup>
                    <Label
                        style={SupplierStyles.SupplierDetailLabel}>
                        Address
                    </Label>
                    <Input
                        readOnly
                        value={supplier ? supplier.address : ''} />
                </FormGroup>
                <FormGroup>
                    <Label
                        style={SupplierStyles.SupplierDetailLabel}>
                        Description
                    </Label>
                    <Input
                        readOnly
                        value={supplier ? supplier.description : ''} />
                </FormGroup>
                <FormGroup>
                    <Label
                        style={SupplierStyles.SupplierDetailLabel}>
                        GST
                    </Label>
                    <Input
                        readOnly
                        value={supplier ? supplier.gstNumber : ''} />
                </FormGroup>
            </Form>
        </div>
    );
}

export default SupplierDetail;