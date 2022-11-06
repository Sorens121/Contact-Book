import { useState, useEffect, useContext } from 'react';
import { regActions } from '../contexts/actions/auth/regActions';
import { GlobalContext } from '../contexts/Provider';
import { useHistory } from 'react-router-dom';

const useRegForm = () => {
    const [form, setForm] = useState({});
    const [fieldError, setFieldError] = useState({});
    const [isSubmit, setSubmit] = useState(false);

    const { authState:{ auth: {loading, data, error}}, authDispatch} = useContext(GlobalContext);

    const history = useHistory();

    const onChange = (e, {name, value}) => {
        e.preventDefault();
        setForm({...form, [name]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setFieldError({});
        const validationError = validate(form);
        if(!isSubmit && validateForm(validationError)){
            //console.log("valid")
            regActions(form)(authDispatch);
        } else {
            //console.log("invalid")
            setFieldError(validationError);
        }
        setSubmit(true);
    };
    
    useEffect(() => {
        if(isSubmit){
            setFieldError({...fieldError});
        }

        return () => {
            setSubmit(false);
        }
    },[isSubmit]);

    //redirect after successful registration
    useEffect(() => {
        if(data){
            history.push('/login');
        }
    },[data]);
    

    const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!regex.test(values.email)){
            errors.email = "Email is not valid"
        }
        if(values.password.length <= 4){
            errors.password = "Password must be more than 4 characters";
        }

        return errors;
    }

    const validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            val => val.length > 0 && (valid = false)
        );
        return valid;
    }

    const formValidator = 
    !form.username?.length ||
    !form.firstname?.length ||
    !form.lastname?.length ||
    !form.email?.length ||
    !form.password?.length;

    // if getting error from backend
    useEffect(()=> {
        if(error?.usernameerror){
            setFieldError({...fieldError, "username": error.usernameerror})
        }

        if(error?.emailerror){
            setFieldError({...fieldError, "email": error.emailerror})
        }
        
        return ()=> {
            setSubmit(false);
            setFieldError({});
        }
    }, [error]);

    //console.log("errors", fieldError)
    
    return {form, onChange, formValidator, onSubmit, loading, fieldError};
}

export default useRegForm;