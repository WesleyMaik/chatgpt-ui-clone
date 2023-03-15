import { Modal, ModalRef, ModalProps } from "@/components/Modal";
import { useCallback, useRef } from "react";

export const useModal = () => {
    const ref = useRef<ModalRef>(null),
        handleOpen = () => ref.current?.handleOpen(),
        handleClose = () => ref.current?.handleClose();

    return ({
        Modal: useCallback(({ ...props }: ModalProps) => (
            <Modal {...props} ref={ref} />
        ), []),
        handleOpen,
        handleClose
    })
};