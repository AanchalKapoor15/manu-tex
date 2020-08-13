import React, { FunctionComponent, useState, useEffect } from 'react';
import {
    ModalHeader,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input,
    ModalFooter,
    Button
} from 'reactstrap';

import { Supplier } from '../../models/supplier';
import { GlobalStyles } from '../../styles/globalStyles';

interface AddEditSupplierModalProps {
    supplier: Supplier;
    suppliers: Supplier[];
    isEditMode: boolean;
    isSupplierModalOpen: boolean;
    onSave: (supplier: Supplier) => void;
    onToggleSupplierModal: () => void;
}

export const AddEditSupplierModal: FunctionComponent<AddEditSupplierModalProps> = props => {
    let [currentSupplier, setCurrentSupplier] = useState(props.supplier);
    const [isSupplierDataValid, setIsSupplierDataValid] = useState(false);

    useEffect(() => setCurrentSupplier(props.supplier), [props.supplier])
    useEffect(() => validateSupplierData(), [currentSupplier]);

    function onHideSupplierModal() {
        props.onToggleSupplierModal();
    }

    function onDataInput(event: any) {
        let field = event.target.name;
        let value = event.target.value;
        setCurrentSupplier({ ...currentSupplier, [field]: value });
    }

    function onAddEditSupplier() {
        props.onSave(currentSupplier);
        onHideSupplierModal();
    }

    function validateSupplierData() {
        if (!currentSupplier.firstName
            || !currentSupplier.lastName
            || !currentSupplier.description
            || !currentSupplier.address
            || !currentSupplier.phoneNumber
            || !currentSupplier.gstNumber
        ) {
            setIsSupplierDataValid(false);
        }
        else {
            setIsSupplierDataValid(true);
        }

    }

    return (
        <Modal
            isOpen={props.isSupplierModalOpen}
            toggle={onHideSupplierModal}>
            <ModalHeader
                toggle={onHideSupplierModal}>
                {props.isEditMode ? 'Edit' : 'Add'} Supplier
                </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={currentSupplier.firstName}
                            onChange={onDataInput}
                            placeholder="First name" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={currentSupplier.lastName}
                            onChange={onDataInput}
                            placeholder="Last name" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={currentSupplier.phoneNumber}
                            onChange={onDataInput}
                            placeholder="Phone" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            name="address"
                            id="address"
                            value={currentSupplier.address}
                            onChange={onDataInput}
                            placeholder="Address" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            value={currentSupplier.description}
                            onChange={onDataInput}
                            placeholder="Description" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="gstNumber"
                            id="gstNumber"
                            value={currentSupplier.gstNumber}
                            onChange={onDataInput}
                            placeholder="GST" />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={onAddEditSupplier}
                    disabled={!isSupplierDataValid}
                    style={GlobalStyles.PrimaryBtn}>
                    Save
                    </Button>
                <Button
                    onClick={onHideSupplierModal}>
                    Cancel
                    </Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddEditSupplierModal;