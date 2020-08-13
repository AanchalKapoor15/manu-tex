import { createContext } from 'react';

import { MenuItems } from '../constants/menuItems';

export const menuItemsContext = createContext(MenuItems);

export default menuItemsContext;