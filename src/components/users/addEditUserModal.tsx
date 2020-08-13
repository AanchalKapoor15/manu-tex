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

import { User } from '../../models/user';
import { Roles } from '../../models/enums/roles';
import { GlobalStyles } from '../../styles/globalStyles';

interface AddEditUserModalProps {
    user: User;
    users: User[];
    isEditMode: boolean;
    showUserModal: boolean;
    onSave: (user: User) => void;
    onToggleUserModal: () => void;
}

export const AddEditUserModal: FunctionComponent<AddEditUserModalProps> = props => {
    const [currentUser, setCurrentUser] = useState(props.user);
    const [isUserDataValid, setIsUserDataValid] = useState(false);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

    useEffect(() => setCurrentUser(props.user), [props.user])
    useEffect(() => validateUserData(), [currentUser]);

    function onHideUserModal() {
        props.onToggleUserModal();
    }

    function onSelectRole(role: string) {
        switch (role) {
            case 'Intern':
                setCurrentUser({ ...currentUser, role: Roles.INTERN });
                break;
            case 'Sales Person':
                setCurrentUser({ ...currentUser, role: Roles.SALES_PERSON });
                break;
            case 'Manager':
                setCurrentUser({ ...currentUser, role: Roles.MANAGER });
                break;
            case 'Senior Manager':
                setCurrentUser({ ...currentUser, role: Roles.SENIOR_MANAGER });
                break;
        }
    }

    function onDataInput(event: any) {
        let field = event.target.name;
        let value = event.target.value;
        setCurrentUser({ ...currentUser, [field]: value });
    }

    function onAddEditUser() {
        console.log('onAddEditUser', currentUser);
        props.onSave(currentUser);
        onHideUserModal();
    }

    function validateUserData() {
        if (!currentUser.firstName
            || !currentUser.lastName
            || !currentUser.address
            || !currentUser.phoneNumber
            || !currentUser.email
            || !currentUser.userName
            || !currentUser.password
        ) {
            setIsUserDataValid(false);
        }
        else {
            setIsUserDataValid(true);
        }
    }

    function dropdownElement(role: string) {
        return (
            <DropdownItem key={role}
                onClick={() => { onSelectRole(role) }}>
                {role}
            </DropdownItem>
        );
    }

    return (
        <Modal isOpen={props.showUserModal}
            toggle={onHideUserModal}>
            <ModalHeader
                toggle={onHideUserModal}>
                {props.isEditMode ? 'Edit' : 'Add'} User
                </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={currentUser.firstName}
                            onChange={onDataInput}
                            placeholder="First name" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={currentUser.lastName}
                            onChange={onDataInput}
                            placeholder="Last name" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            name="address"
                            id="address"
                            value={currentUser.address}
                            onChange={onDataInput}
                            placeholder="Address" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={currentUser.phoneNumber}
                            onChange={onDataInput}
                            placeholder="Phone" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            name="email"
                            id="email"
                            value={currentUser.email}
                            onChange={onDataInput}
                            placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Dropdown
                            isOpen={isRoleDropdownOpen}
                            toggle={() => { setIsRoleDropdownOpen(!isRoleDropdownOpen) }}>
                            <DropdownToggle
                                caret>
                                {currentUser.firstName ?
                                    currentUser.role
                                    : 'Select Role'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {Object.values(Roles).map(dropdownElement)}
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="userName"
                            id="userName"
                            value={currentUser.userName}
                            onChange={onDataInput}
                            placeholder="User name" />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            value={currentUser.password}
                            onChange={onDataInput}
                            placeholder="Password" />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={onAddEditUser}
                    disabled={!isUserDataValid}
                    style={GlobalStyles.PrimaryBtn}>
                    Save
                    </Button>
                <Button
                    onClick={onHideUserModal}>
                    Cancel
                    </Button>
            </ModalFooter>
        </Modal>
    );
}

export default AddEditUserModal;