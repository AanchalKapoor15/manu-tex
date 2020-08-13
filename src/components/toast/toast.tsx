import React, { FunctionComponent } from "react";
import {
    Toast,
    ToastBody,
    ToastHeader,
    Spinner
} from 'reactstrap';

import { ToastType } from "../../models/enums/toastType";

interface ToastProps {
    message: string;
    type: ToastType;
    isToastOpen: boolean;
}

export const ToastComponent: FunctionComponent<ToastProps> = (props) => {
    function checkToastType() {
        return props.type === ToastType.success
            ? 'p-3 bg-success my-2 rounded'
            : 'p-3 bg-danger my-2 rounded';
    }
    return (
        <div className={checkToastType()}>
            <Toast isOpen={props.isToastOpen}>
                <ToastHeader>
                </ToastHeader>
                <ToastBody>
                    {props.message}
                </ToastBody>
            </Toast>
        </div>
    );
}

export default Toast;