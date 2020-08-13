import React from 'react';
import HeaderStyles from './headerStyles';

interface HeaderProps {
    title: string;
}


export function Header(props: HeaderProps) {
    return (
        <div style={HeaderStyles.header}>
            <span
                style={HeaderStyles.headerTitle}>
                {props.title}
            </span>
        </div>
    );
}

export default Header;