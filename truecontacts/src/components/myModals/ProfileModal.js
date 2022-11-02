import { Button, Modal } from "semantic-ui-react"

const ProfileModal = ({show, onClose}) => {
    const handleProfileUpdate = () => {

    }

    return (
        <Modal open={show} dimmer="blurring">
            <Modal.Header>Profile</Modal.Header>
            <Modal.Content>
                <Modal.Description>Profile</Modal.Description>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    color="black"
                    onClick={onClose}
                    content="Close" 
                />
                <Button 
                    type="submit"
                    content="Update"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={handleProfileUpdate}
                    positive
                />
            </Modal.Actions>

        </Modal>
    )
}

export default ProfileModal;