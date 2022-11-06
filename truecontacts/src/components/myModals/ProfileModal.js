import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Image } from "semantic-ui-react";
import { GlobalContext } from "../../contexts/Provider";
import './style.css';

const ProfileModal = ({
    show, 
    onClose, 
    state:{
        profile: {
            loading, data, error
        }
    }}) => {
    const imagePickRef = useRef(null);
    const [tempFile, setTempFile] = useState(null);
    const [update, setUpdate] = useState(null);
    const [isProfile, setIsProfile] = useState(false);
    //console.log("profile", data, error);

    useEffect(() => {
        setUpdate({...update, profilePic: data?.profilePic});

        //clean up function
        return () => {
            if(!show){
                return null;
            }
            setUpdate(null);
        }
    }, [data]);

    const chooseImage = () => {
        if(!imagePickRef.current){
            imagePickRef.current.click();
        }
    }
    
    const onImageChange = (e) => {
        e.persist();
        const fileURL = e.target.files[0];

        if(fileURL){
            setTempFile(URL.createObjectURL(fileURL));
            setUpdate({...update, profilePic: fileURL});
            setIsProfile(true);
        }
    }

    const handleChange = (e, {name, value}) => {
        setUpdate({...update,
            [name]: value
        })
    }

    const resetAll = () => {
        setTempFile(null);
        setUpdate(null);
        setIsProfile(false);
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        resetAll();
    }

    return (
        <div>
            {
                !error ?
                <Modal open={show} style={{width: 700}} dimmer="blurring">
                <Modal.Header>Profile</Modal.Header>
                <Modal.Content image>
                    <input onChange={onImageChange} ref={imagePickRef} type="file" hidden />
                    <div className="contact-picture" onClick={chooseImage}>
                        {!tempFile ? <Image src={data?.profilePic} wrapped/> : <Image src={tempFile} wrapped />}
                    </div>

                    <Form unstackable style={{marginLeft: 30}}>
                        <Form.Input
                            label="Username"
                            name="username"
                            defaultValue={data?.username}
                            onChange={handleChange}
                        />
                        <Form.Group widths={1}>
                            <Form.Input
                                label="First Name"
                                name="firstname"
                                defaultValue={data?.firstname}
                                onChange={handleChange}
                            />
                            <Form.Input
                                label="Last Name"
                                name="lastname"
                                defaultValue={data?.lastname}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Input
                            label="Old Password"
                            name="oldpassword"
                            type="password"
                            onChange={handleChange}
                        />

                        <Form.Group widths={1}>
                            <Form.Input
                                label="New Password"
                                name="newpassword"
                                type="password"
                                onChange={handleChange}
                            />
                            <Form.Input
                                label="Confirm Password"
                                name="confirmpassword"
                                type="password"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Input
                            label="Email"
                            name="email"
                            defaultValue={data?.email}
                            onChange={handleChange}
                        />
                    </Form>
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

                </Modal> :
                <Modal open={show} style={{width:500}} dimmer="blurring">
                    <Modal.Header>Loading Error</Modal.Header>
                    <Modal.Content>{error?.message}</Modal.Content>
                    <Modal.Actions>
                        <Button
                            content="OK"
                            color="red"
                            onClick={onClose}
                        />
                    </Modal.Actions>
                </Modal>
            }
        </div>
    )
}

export default ProfileModal;