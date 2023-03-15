

import {
    ComponentProps,
    forwardRef,
    ReactNode,
    useImperativeHandle
} from "react";

import {
    Modal as DefaultModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";

export interface ModalProps extends ComponentProps<typeof ModalBody> {
    children?: ReactNode
};

export interface ModalRef {
    isOpen: boolean,
    handleOpen: () => void,
    handleClose: () => void
};

export const Modal = forwardRef<ModalRef, ModalProps>((
    { title, ...props }, ref
) => {
    const {
        isOpen,
        onOpen: handleOpen,
        onClose: handleClose
    } = useDisclosure()

    useImperativeHandle(ref, () => ({
        isOpen,
        handleOpen,
        handleClose
    }));

    return (
        <DefaultModal
            isOpen={isOpen}
            onClose={handleClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent
                maxWidth="fit-content"
            >
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    {...props}
                />
            </ModalContent>
        </DefaultModal>
    );
});

Modal.displayName = "Modal";