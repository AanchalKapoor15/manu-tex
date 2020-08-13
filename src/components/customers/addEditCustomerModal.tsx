import React, { FunctionComponent, useState, useEffect } from 'react';
import {
    ModalHeader,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input,
    ModalFooter,
    Button,
} from 'reactstrap';

import { Customer } from '../../models/customer';
import { GlobalStyles } from '../../styles/globalStyles';

interface AddEditCustomerModalProps {
    customer: Customer;
    customers: Customer[];
    isEditMode: boolean;
    isCustomerModalOpen: boolean;
    onSave: (customer: Customer) => void;
    onToggleCustomerModal: () => void;
}

export const AddEditCustomerModal: FunctionComponent<AddEditCustomerModalProps> = props => {
    let [currentCustomer, setCurrentCustomer] = useState(props.customer);
    const [isCustomerDataValid, setIsCustomerDataValid] = useState(false);

    useEffect(() => setCurrentCustomer(props.customer), [props.customer])
    useEffect(() => validateCustomerData(), [currentCustomer]);

    function onHideCustomerModal() {
        props.onToggleCustomerModal();
    }

    function onDataInput(event: any) {
        let field = event.target.name;
        let value = event.target.value;
        setCurrentCustomer({ ...currentCustomer, [field]: value });
    }

    function onAddEditCustomer() {
        props.onSave(currentCustomer);
        onHideCustomerModal();
    }

    function validateCustomerData() {
        if (!currentCustomer.firstName
            || !currentCustomer.lastName
            || !currentCustomer.address
            || !currentCustomer.phoneNumber
            || !currentCustomer.email
            || !currentCustomer.description
            || !currentCustomer.gstNumber
        ) {
            setIsCustomerDataValid(false);
        }
        else {
            setIsCustomerDataValid(true);
        }
    }

    return (
        <Modal
            isOpen={props.isCustomerModalOpen}
            toggle={onHideCustomerModal}>
            <ModalHeader
                toggle={onHideCustomerModal}>
                {props.isEditMode ? 'Edit' : 'Add'} Customer
                </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={currentCustomer.firstName}
                            onChange={onDataInput}
                            placeholder="First name" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={currentCustomer.lastName}
                            onChange={onDataInput}
                            placeholder="Last name" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            name="address"
                            id="address"
                            value={currentCustomer.address}
                            onChange={onDataInput}
                            placeholder="Address" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={currentCustomer.phoneNumber}
                            onChange={onDataInput}
                            placeholder="Phone" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            name="email"
                            id="email"
                            value={currentCustomer.email}
                            onChange={onDataInput}
                            placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            value={currentCustomer.description}
                            onChange={onDataInput}
                            placeholder="Description" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="gstNumber"
                            id="gstNumber"
                            value={currentCustomer.gstNumber}
                            onChange={onDataInput}
                            placeholder="GST Number" />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={onAddEditCustomer}
                    disabled={!isCustomerDataValid}
                    style={GlobalStyles.PrimaryBtn}>
                    Save
                         </Button>
                <Button
                    onClick={onHideCustomerModal}>
                    Cancel
                        </Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddEditCustomerModal;