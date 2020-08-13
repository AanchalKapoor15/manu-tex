import { CSSProperties } from "react";
import ColorConstants from "../../styles/variables";

export class SidebarStyles {
    public static Nav = {
        width: '200px',
        backgroundColor: ColorConstants.primaryColor,
        height: '600px',
        color: 'white',
        borderColor: ColorConstants.borderColor,
    } as CSSProperties

    public static NavHeader = {
        fontSize: 'x-large',
        padding: '30px',
    } as CSSProperties

    public static NavItem = {
        padding: '10px 10px 10px 25px',
        cursor: 'pointer',
    } as CSSProperties

    public static CurrentNavItem = {
        fontWeight: 'bold',
        backgroundColor: '#8b9c78',
    } as CSSProperties

    public static NavItemHover = {
        backgroundColor: '#8b9c78',
    } as CSSProperties

    public static NavLink = {
        color: 'white',
    }
}

export default SidebarStyles;