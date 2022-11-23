import {useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Image } from "semantic-ui-react";

import './style.css';

const ProfileModal = ({
    show, 
    onClose, 
    state:{
        profile: {
            loading, data, error
        }
    },updateProfile}) => {
    const imagePickRef = useRef(null);
    const [tempFile, setTempFile] = useState(null);
    const [update, setUpdate] = useState(null);
    const [isProfilePic, setIsProfilePic] = useState(false);
    const [btnState, setBtnState] = useState(false);
    //console.log("profile", data, error);

    useEffect(() => {
        setUpdate({...update, profilepic: data?.profilepic});

        //clean up function
        return () => {
            if(!show){
                return null;
            }
            setUpdate(null);
        }
    }, []);

    const chooseImage = () => {
        if(imagePickRef.current){
            imagePickRef.current.click();
        }
    }
    
    const onImageChange = (e) => {
        e.persist();
        const fileURL = e.target.files[0];

        if(fileURL){
            setTempFile(URL.createObjectURL(fileURL));
            setUpdate({...update, profilepic: fileURL});
            setIsProfilePic(true);
            setBtnState(true);
        }
    }

    const handleChange = (e, {name, value}) => {
        setUpdate({...update,
            [name]: value
        });
        setBtnState(true);
    }

    const resetAll = () => {
        setTempFile(null);
        setUpdate(null);
        setIsProfilePic(false);
        setBtnState(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("updates", update, data.profilepic, isProfilePic);
        updateProfile(update, data.profilepic, isProfilePic);
        onClose();
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
                        {!tempFile ? <Image src={data?.profilepic} wrapped/> : <Image src={tempFile} wrapped />}
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
                        onClick={handleSubmit}
                        positive
                        disabled={!btnState}
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