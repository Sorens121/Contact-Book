import { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const ChangePwd = ({show, onClose, state: {
    profile: {
        loading, data, error
    }
}, updatePassword}) => {
    const [update, setUpdate] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorField, setErrorFiled] = useState({});

    useEffect(() => {
        return () => {
            if(!show){
                return null;
            }
        }
    }, [data])

    // to catch error from backend
    useEffect(()=>{
        if(error?.passworderror){
            setErrorFiled({...errorField, "newpassword": error.passworderror})
        }
    },[error]);

    const handleChange = (e, {name, value}) => {
        setUpdate({...update, [name]: value});
        setIsSubmit(true);
    }

    const validate = (value) => {
        let error = {};

        if(value.newpassword !== value.confirmpassword){
            error.confirmpassword = "Password don't match"
        }

        if(!value.oldpassword?.length){
            error.oldpassword = "Old password required"
        }

        if(!value.newpassword?.length){
            error.newpassword = "Cannot be empty"
        }

        if(!value.confirmpassword?.length){
            error.confirmpassword = "Cannot be empty"
        }

        return error;
    }

    const validateForm =(errors) => {
        let valid = true;
        Object.values(errors).forEach(
            val => val.length > 0 && (valid = false)
        );

        return valid
    }

    const resetAll = () => {
        setIsSubmit(false);
        setErrorFiled({});
        setUpdate(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updates", update);
        const validateError = validate(update);

        if(!isSubmit && validateForm(validateError)){
            let newUpdate = {"oldpassword": update.oldpassword, "newpassword": update.newpassword};
            console.log("new update after validation",newUpdate)
            updatePassword(newUpdate);
        } else {
            setErrorFiled(validateError);
        }
        setIsSubmit(true);
    }

    return (
        <div>
            {
                !error ?
                <Modal open={show} style={{width: 700}} dimmer="blurring">
                    <Modal.Header>Change Password</Modal.Header>
                    <Modal.Content>
                        <Form unstackable style={{marginLeft: 30}}>
                            <Form.Input
                                label="Email"
                                name="email"
                                value={data?.email}
                            />
                            <Form.Input
                                label="Old Password"
                                name="oldpassword"
                                type="password"
                                onChange={handleChange}
                                error={
                                    errorField.oldpassword && {
                                        content: errorField.oldpassword,
                                        pointing: "below"
                                    }
                                }
                            />
                            <Form.Input
                                label="New Password"
                                name="newpassword"
                                type="password"
                                onChange={handleChange}
                                error={
                                    errorField.newpassword && {
                                        content: errorField.newpassword,
                                        pointing: "below"
                                    }
                                }
                            />
                            <Form.Input
                                label="Confirm Password"
                                name="confirmpassword"
                                type="password"
                                onChange={handleChange}
                                error={
                                    errorField.confirmpassword && {
                                        content: errorField.confirmpassword,
                                        pointing: "below"
                                    }
                                }
                            />
                        </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button
                            color="black"
                            content="Close"
                            onClick={onClose}
                        />

                        <Button
                            type="submit"
                            content="Update"
                            labelPosition="right"
                            icon="checkmark"
                            onClick={handleSubmit}
                            positive
                            disabled={!isSubmit}
                        />
                    </Modal.Actions>
                </Modal> :
                <Modal open={show} style={{width: 500}} dimmer="blurring">

                </Modal>

            }
        </div>
    )
}

export default ChangePwd;