import Modal from 'react-bootstrap/Modal';

const ModalComponent = ({showModal, setShowModal, title, children}) => {
    const handleClose = () => setShowModal(false);

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
};

export default ModalComponent;