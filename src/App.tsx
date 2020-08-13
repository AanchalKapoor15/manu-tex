import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Items from './components/items/itemView';
import Suppliers from './components/suppliers/supplierView';
import Users from './components/users/userView';
import Customers from './components/customers/customerView';
import AddCustomerOrder from './components/customerOrders/addCustomerOrder';
import CustomerOrdersView from './components/customerOrders/customerOrdersView';
import SupplierOrdersView from './components/supplierOrders/supplierOrdersView';
import { menuItemsContext } from './context/menuItemsContext';
import { MenuItems } from './constants/menuItems';
import { AuthContext, useAuth } from './context/auth';
import SignUp from './components/authorization/signUp';
import SignIn from './components/authorization/signIn';
import Home from './components/home/home';

export const App = () => {
    return (
            <menuItemsContext.Provider value={MenuItems}>
                <Router>
                        <Switch>
                            {/* "exact" disables partial matching */}
                            {/* <Route exact path="/" component={Home} />  */}
                            <Route exact path="/" component={Home} /> 

                            <Route path="/signUp" component={SignUp} />
                            <Route path="/signIn" component={SignIn} />
                            <Route path="/items" component={Items} />
                            <Route path="/supplierOrders" component={SupplierOrdersView} />
                            <Route path="/customerOrders" component={CustomerOrdersView} />
                            <Route path="/addCustomerOrders" component={AddCustomerOrder} />
                            <Route path="/customers" component={Customers} />
                            <Route path="/suppliers" component={Suppliers} />
                            <Route path="/users" component={Users} />


                        </Switch>
                </Router>
            </menuItemsContext.Provider>
    );
}

export default App;

