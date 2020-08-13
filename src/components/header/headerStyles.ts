import { CSSProperties } from 'react';

import ColorConstants from '../../styles/variables';

export class HeaderStyles {

    public static header = {
        height: '80px',
        width: '100%',
        background: ColorConstants.headerBg,
    } as CSSProperties;

    public static headerTitle = {
        color: ColorConstants.whiteColor,
        fontSize: '30px',
        paddingLeft: '15px',
        lineHeight: '80px',
        fontWeight: 'bold',
        fontFamily: 'calibri',
    } as CSSProperties;
}

export default HeaderStyles;