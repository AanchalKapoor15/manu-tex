import React, { FunctionComponent, CSSProperties } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { SidebarStyles } from './sidebarStyles';
import MenuItem from '../../models/menuItem';
import menuItemsContext from '../../context/menuItemsContext';

interface SidebarProps {
    pageIndex: number;
}

export const Sidebar: FunctionComponent<SidebarProps> = props => {
    const menuItems = React.useContext(menuItemsContext);
    const history = useHistory();

    function navigateToRoute(routerLink: string) {
        history.push(routerLink);
    }

    function addStyle(event: any) {
        if (event.target.className === 'nav-item') {
            event.target.style.background = SidebarStyles.NavItemHover.backgroundColor;
        }
    }

    function removeStyle(event: any, menuItem: MenuItem) {
        if (event.target.className === 'nav-item'
            && menuItem.index == props.pageIndex) {
            event.target.style.background = SidebarStyles.CurrentNavItem.backgroundColor;
            event.target.style.fontWeight = SidebarStyles.CurrentNavItem.fontWeight;
        }
        else if (event.target.className === 'nav-item') {
            event.target.style.background = '';
        }
    }

    function currentPageStyle(menuItem: MenuItem): CSSProperties {
        return menuItem.index == props.pageIndex
            ? { ...SidebarStyles.NavItem, ...SidebarStyles.CurrentNavItem }
            : { ...SidebarStyles.NavItem };
    }

    function menuElement(menuItem: MenuItem) {
        return (
            <NavItem
                key={menuItem.text}
                onClick={() => { navigateToRoute(menuItem.routeLink) }}
                style={{ ...currentPageStyle(menuItem) }}
                onMouseEnter={addStyle}
                onMouseLeave={(event) => { removeStyle(event, menuItem) }}>
                <span
                    style={SidebarStyles.NavLink}>
                    {menuItem.text}
                </span>
            </NavItem>
        );
    }

    return (
        <div>
            <Nav
                vertical
                style={SidebarStyles.Nav}>
                <span
                    style={SidebarStyles.NavHeader}>
                    Manu Textiles
                </span>
                {menuItems.map(menuElement)}
            </Nav>
        </div>
    );
}

export default Sidebar;