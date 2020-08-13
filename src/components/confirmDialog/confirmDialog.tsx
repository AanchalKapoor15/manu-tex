import React, { FunctionComponent, useState, useEffect } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { GlobalStyles } from '../../styles/globalStyles';

interface ConfirmDialogProps {
    options: {
        showConfirmDialog: boolean,
        heading: string,
        actionBtnLabel: string,
        entityId: number,
        bodyMessage: string
    };
    takeAction: (entityId: number) => void;
    resetConfirmDialog: () => void;
}

export const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = (props) => {
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() =>
        setShowDialog(props.options.showConfirmDialog),
        [props.options.showConfirmDialog]);

    function onHidePopup() {
        setShowDialog(false);
        props.resetConfirmDialog();
    }

    return (
            <Modal
                isOpen={showDialog}
                toggle={onHidePopup}>
                <ModalHeader
                    toggle={onHidePopup}>
                    {props.options.heading}
                </ModalHeader>
                <ModalBody>
                    <h5>
                        {props.options.bodyMessage}
                    </h5>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => { props.takeAction(props.options.entityId) }}
                        style={GlobalStyles.PrimaryBtn}>
                        {props.options.actionBtnLabel}
                    </Button>
                    <Button
                        onClick={onHidePopup}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
    );
}

export default ConfirmDialog;
