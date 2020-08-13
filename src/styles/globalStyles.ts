import { CSSProperties } from 'react';
import ColorConstants from './variables';

export const GlobalStyles = {
    MasterContainer: {
        padding: '0px',
        maxWidth: '100%',
    } as CSSProperties,

    Col: {
        padding: '0px',
    } as CSSProperties,

    TopContainer: {
        marginTop: '15px',
    } as CSSProperties,

    Table: {
        fontFamily: 'calibri',
        width: '100%',
        position: 'relative',
        marginTop: '15px',
    } as CSSProperties,

    SearchBox: {
        padding: '7px',
        width: '100px',
        textAlign: 'center',
    } as CSSProperties,

    AddBtn: {
        backgroundColor: ColorConstants.primaryColor,
        borderColor: ColorConstants.borderColor,
        color: ColorConstants.whiteColor,
        borderRadius: '0.25rem',
        marginRight: '-15px',
    } as CSSProperties,

    AddBtnDisabled: {
        cursor: 'default',
    } as CSSProperties,

    PrimaryBtn: {
        backgroundColor: ColorConstants.primaryColor,
        borderColor: ColorConstants.borderColor,
        color: ColorConstants.whiteColor,
        borderRadius: '0.25rem',
        padding: '0.375rem 0.75rem',
        marginRight: '10px',
    } as CSSProperties,

    SecondaryBtn: {
        backgroundColor: ColorConstants.secondaryColor,
        borderColor: ColorConstants.borderColor,
        color: ColorConstants.whiteColor,
        borderRadius: '0.25rem',
        padding: '0.375rem 0.75rem',
    } as CSSProperties,

    BoldText: {
        fontWeight: 'bold',
    } as CSSProperties,

    PointerCursor: {
        cursor: 'pointer',
    } as CSSProperties,

    OrderModalContainer: {
        marginBottom: '1rem',
    } as CSSProperties,

    OrderModalColHeader: {
        fontWeight: 'bold',
        padding: '1rem',
    } as CSSProperties,

    OrderModalCol: {
        padding: '5px',
    } as CSSProperties,

    OrderModalInput: {
        display: 'inline-block',
    } as CSSProperties,
}
