import { Button, Modal } from "semantic-ui-react";

const DeleteModal = ({show, onClose,contactID, contact, deleteContact}) => {
    const handleDelete = () => {
        deleteContact(contactID, contact);
        onClose();
    }

    return (
        <Modal open={show} dimmer="blurring">
            <Modal.Header>Delete Contact</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <p>Are you sure you want to delete this contact?</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="black"
                    onClick={onClose}
                >
                    No
                </Button>
                <Button
                    content="Yes"
                    labelPosition="right"
                    icon="delete"
                    onClick={handleDelete}
                    negative
                />
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteModal;