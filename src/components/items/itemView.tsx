import React, { FunctionComponent, useState } from 'react';
import { Button, Input, Container, Row, Col } from 'reactstrap';

import { getItems } from '../../services/itemService';
import { getSuppliers } from '../../services/supplierService';
import Header from '../header/header';
import { Item } from '../../models/item';
import AddEditItemModal from './addEditItemModal';
import { ItemsTable } from './itemTable';
import { GlobalStyles } from '../../styles/globalStyles';
import Sidebar from '../sidebar/sidebar';
import ItemStyles from './itemStyles';

export const Items: FunctionComponent = () => {
    const [items, setItems] = useState(getItems());
    const [currentItem, setCurrentItem] = useState(new Item());
    const [suppliers] = useState(getSuppliers());
    const [searchText, setSearchText] = useState('');
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    // const [loadingStatus, setLoadingStatus] = useState(0);

    function onAddEditItem({
        isEditMode,
        item
    }: {
        isEditMode: boolean,
        item?: Item
    }) {
        setIsItemModalOpen(true);
        setIsEditMode(isEditMode);
        if (!isEditMode) {
            setCurrentItem(new Item());
        }
        else if (item) {
            setCurrentItem(item);
        }
    }

    function onToggleItemModal() {
        setIsItemModalOpen(!isItemModalOpen);
        setCurrentItem(new Item());
    }

    function filterItems(): Item[] {
        return items.filter(item => {
            if (
                item.itemCode.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || item.base.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1
                || item.description.toUpperCase()
                    .indexOf(searchText.toUpperCase()) > -1) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    function onSaveItem(item: Item) {
        console.log('inputItem: ', item);
        //server side : TODO

        //client side
        if (!isEditMode) {
            setItems([...items, item]);
        }
        else {
            setItems(items.map(
                originalItem => originalItem.itemId === item.itemId
                    ? {
                        ...originalItem,
                        itemCode: item.itemCode,
                        base: item.base,
                        description: item.description,
                        supplier: item.supplier,
                        costPricePerMetre: item.costPricePerMetre
                    }
                    : originalItem))
        }

        console.log('items:', items);
    }

    function onDeleteItem(itemId: number) {
        //server side: TODO

        //client side
        setItems(items.filter(item => item.itemId !== itemId));
    }

    function checkAuthorization() {
        //let token = sessionStorage.getItem('token   ');
        try {
            //var decoded = decodeToken(token);
            //if(decoded.role === 'ADMIN'){
            return (
                <Container style={GlobalStyles.MasterContainer}>
                    <Row>
                        <Col
                            className="col-auto"
                            style={GlobalStyles.Col}>
                            <Sidebar pageIndex={5} />
                        </Col>
                        <Col
                            style={GlobalStyles.Col}>
                            <Header title="Items" />
                            <AddEditItemModal
                                item={currentItem}
                                items={items}
                                suppliers={suppliers}
                                isEditMode={isEditMode}
                                isItemModalOpen={isItemModalOpen}
                                onSave={onSaveItem}
                                onToggleItemModal={onToggleItemModal} />
                            <Container style={GlobalStyles.TopContainer}>
                                <Row>
                                    <Col className="col-auto">
                                        <Button
                                            style={GlobalStyles.AddBtn}
                                            onClick={() => { onAddEditItem({ isEditMode: false }) }}>
                                            Add Item
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
                            <ItemsTable
                                items={filterItems()}
                                editItem={onAddEditItem}
                                deleteItem={onDeleteItem}
                                suppliers={suppliers} />
                        </Col>
                    </Row>
                </Container>

            );
            //}
            //else{}
        }
        catch (error) {
            console.log(error);
            return (<div />);
        }
    }
    return (
        checkAuthorization()
    );
}

export default Items;