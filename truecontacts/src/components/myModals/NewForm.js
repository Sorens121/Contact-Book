import {useEffect, useRef, useState } from "react";
import { Modal, Button, Image, Form, Select } from "semantic-ui-react";
import countries from "../../utils/countries";
import './style.css';

const NewForm = ({show, onClose, contactID, contact, updateContact}) => {
    const [update, setUpdate] = useState(null);
    const [btnState, setBtnState] = useState(false);
    const [tempFile, setTempFile] = useState(null);
    const [isProfilePic, setProfilePic] = useState(false);
    const imagePickRef = useRef(null);

    useEffect(() => {
        setUpdate({...update, profilePic: contact?.profilePic});
        // clean up function
        return () => {
            if(!show){
                return null;
            }
            setUpdate(null);
        }
    },[contact]);
    

    const chooseImage = () => {
        if(imagePickRef.current) {
            imagePickRef.current.click();
        }
    }

    const onImgChange = (e) => {
        e.persist();
        const fileURL = e.target.files[0];
        
        if(fileURL){
            setTempFile(URL.createObjectURL(fileURL));
            setUpdate({...update, profilePic: fileURL});
            setProfilePic(true);
            setBtnState(true);
        }
    }

    const handleChange = (e,{name, value}) => {
        setUpdate({...update, 
            [name]: value
        });
        setBtnState(true);
    }

    const resetAll = () => {
        setUpdate(null);
        setProfilePic(false);
        setTempFile(null);
        setBtnState(false);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //const prevImgURL = !contact.profilePic ? contact.profilePic : null;
        updateContact(contactID, update, contact.profilePic, isProfilePic);
        onClose();
        // console.log("original values: ", contact);
        // console.log("updated values: ", update);
        // console.log("prev: ", prevImgURL);
        resetAll();
    }

    

    return(
        <Modal open={show} style={{width: 700}} dimmer='blurring'>
            <Modal.Header>Edit Profile</Modal.Header>
            <Modal.Content image>
                <input onChange={onImgChange} ref={imagePickRef} type="file" hidden/>
                <div className="contact-picture" onClick={chooseImage}>
                    {!tempFile ? <Image src={contact?.profilePic} wrapped/> : <Image src={tempFile} wrapped/>}
                </div>
                <Form unstackable style={{marginLeft: 30}}>
                    <Form.Group widths={2}>
                        <Form.Input
                            label="First Name"
                            name="firstname"
                            defaultValue={contact?.firstname}
                            onChange={handleChange}
                        />
                        <Form.Input
                            label="Last Name"
                            name="lastname"
                            defaultValue={contact?.lastname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                            <Form.Input 
                              label="Country" 
                              name="countrycode"
                              control={Select}
                              options={countries}
                              defaultValue={contact?.countrycode}
                              onChange={handleChange}
                            />
                            <Form.Input 
                              label="Phonenumber" 
                              name="phonenumber"
                              defaultValue={contact?.phonenumber}
                              onChange={handleChange}
                            />
                    </Form.Group>
                    <Form.Input 
                        label="Email" 
                        name="email" 
                        defaultValue={contact?.email}
                        onChange={handleChange}
                    />

                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={onClose}>Discard</Button>
                <Button
                    type="submit"
                    content="Submit"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={handleSubmit}
                    positive
                    disabled={!btnState}
                    
                />
            </Modal.Actions>
        </Modal>
    );
};

export default NewForm;