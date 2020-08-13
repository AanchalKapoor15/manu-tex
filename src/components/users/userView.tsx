import React, { FunctionComponent, useState } from 'react';
import Header from '../header/header';
import { Input, Button, Container, Row, Col } from 'reactstrap';

import UsertTable from './userTable';
import { User } from '../../models/user';
import { getUsers } from '../../services/userService';
import AddEditUserModal from './addEditUserModal';
import UserStyles from './userStyles';
import { GlobalStyles } from '../../styles/globalStyles';
import Sidebar from '../sidebar/sidebar';

export const Users: FunctionComponent = () => {
    const [originalUsers, setOriginalUsers] = useState(getUsers());
    const [currentUser, setCurrentUser] = useState(new User());
    const [searchText, setSearchText] = useState('');
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    function onAddEditUser({
        isEditMode,
        user
    }: {
        isEditMode: boolean,
        user?: User
    }) {
        setIsUserModalOpen(true);
        setIsEditMode(isEditMode);
        if (!isEditMode) {
            setCurrentUser(new User());
        }
        else if (user) {
            setCurrentUser(user);
        }
    }

    function onToggleUserModal() {
        setIsUserModalOpen(!isUserModalOpen);
        setCurrentUser(new User());
    }

    function filterUsers(): User[] {
        return originalUsers.filter(user => {
            if (user.firstName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || user.lastName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || user.address.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || user.phoneNumber.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || user.email.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || user.userName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                || user.role.toString().toUpperCase().indexOf(searchText.toUpperCase()) > -1
            ) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    function onSaveUser(user: User) {
        console.log('onSaveUser:', user);
        //server side : TODO

        //client side
        if (!isEditMode) {
            setOriginalUsers([...originalUsers, user]);

        }
        else {
            setOriginalUsers(originalUsers.map(originalUser =>
                originalUser.userId === user.userId ?
                    {
                        ...originalUser,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                        email: user.email,
                        userName: user.userName,
                        password: user.password,
                        role: user.role
                    }
                    : originalUser
            ));
        }
    }

    function onDeleteUser(userId: number) {
        //server side: TODO

        //client side
        setOriginalUsers(originalUsers.filter(user => user.userId !== userId));
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
                        <Sidebar pageIndex={8} />
                    </Col>
                    <Col
                        style={GlobalStyles.Col}>
                        <Header title="Users" />
                        <AddEditUserModal
                            user={currentUser}
                            users={originalUsers}
                            isEditMode={isEditMode}
                            showUserModal={isUserModalOpen}
                            onSave={onSaveUser}
                            onToggleUserModal={onToggleUserModal} />
                        <Container style={GlobalStyles.TopContainer}>
                            <Row>
                                <Col className="col-auto">
                                    <Button
                                        style={GlobalStyles.AddBtn}
                                        onClick={() => { onAddEditUser({ isEditMode: false }) }}>
                                        Add User
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
                        <UsertTable
                            users={filterUsers()}
                            editUser={onAddEditUser}
                            deleteUser={onDeleteUser} />
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

export default Users;