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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { Item } from '../../models/item';
import { Supplier } from '../../models/supplier';
import { GlobalStyles } from '../../styles/globalStyles';

interface AddEditItemModalProps {
    item: Item;
    items: Item[];
    suppliers: Supplier[];
    isEditMode: boolean;
    isItemModalOpen: boolean;
    onSave: (item: Item) => void;
    onToggleItemModal: () => void;
}

export const AddEditItemModal: FunctionComponent<AddEditItemModalProps> = props => {
    const [currentItem, setCurrentItem] = useState(props.item);
    const [selectedSupplier, setSelectedSupplier] = useState(new Supplier());
    const [isItemDataValid, setIsItemDataValid] = useState(false);
    const [isSupplierDropdownOpen, setIsSupplierDropdownOpen] = useState(false);

    useEffect(() => setCurrentItem(props.item), [props.item]);
    useEffect(() => setSelectedSupplier(props.item.supplier), [props.item.supplier]);
    useEffect(() => validateItemData(), [currentItem]);

    function onHideItemModal() {
        props.onToggleItemModal();
    }

    function onDataInput(event: any) {
        let field = event.target.name;
        let value = event.target.value;
        setCurrentItem({ ...currentItem, [field]: value });
    }

    function onAddEditItem() {
        props.onSave(currentItem);
        onHideItemModal();
    }

    function onSelectSupplier(supplier: Supplier) {
        setSelectedSupplier(supplier);
        setCurrentItem({ ...currentItem, supplier: supplier, costPricePerMetre: '' });
    }

    function dropdownElement(supplier: Supplier) {
        return (
            <DropdownItem
                key={supplier.supplierId}
                onClick={() => { onSelectSupplier(supplier) }}>
                {`${supplier.firstName} ${supplier.lastName}`}
            </DropdownItem>
        );
    }

    function validateItemData() {
        let itemExists = false;
        if (currentItem.itemId === 0) { //new item
            itemExists = props.items.some((item: Item) => item.itemCode === currentItem.itemCode);
        }
        if ((!currentItem.itemCode
            || !currentItem.base
            || !currentItem.description)
            || itemExists
            || !currentItem.supplier
            || !currentItem.costPricePerMetre) {
            setIsItemDataValid(false);
        }
        else {
            setIsItemDataValid(true);
        }
    }

    function showPriceField() {
        if (selectedSupplier.firstName) {
            return <Input
                type="text"
                name="costPricePerMetre"
                value={currentItem.costPricePerMetre}
                onChange={onDataInput}
                placeholder="Price per metre" />
        }
    }

    return (
        <Modal
            isOpen={props.isItemModalOpen}
            toggle={onHideItemModal}>
            <ModalHeader
                toggle={onHideItemModal}>
                {props.isEditMode ? 'Edit' : 'Add'} Item
                </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            name="itemCode"
                            value={currentItem.itemCode}
                            onChange={onDataInput}
                            placeholder="Item code" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="base"
                            value={currentItem.base}
                            onChange={onDataInput}
                            placeholder="Base" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            name="description"
                            value={currentItem.description}
                            onChange={onDataInput}
                            placeholder="Description" />
                    </FormGroup>
                    <FormGroup>
                        <Dropdown isOpen={isSupplierDropdownOpen} toggle={() => { setIsSupplierDropdownOpen(!isSupplierDropdownOpen) }}>
                            <DropdownToggle caret>
                                {selectedSupplier.firstName ?
                                    selectedSupplier.firstName + ' ' + selectedSupplier.lastName
                                    : 'Select supplier'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {props.suppliers.map(dropdownElement)}
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                    <FormGroup>
                        {showPriceField()}
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={onAddEditItem}
                    disabled={!isItemDataValid}
                    style={GlobalStyles.PrimaryBtn}>
                    Save
                    </Button>
                <Button
                    onClick={onHideItemModal}>
                    Cancel
                    </Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddEditItemModal;