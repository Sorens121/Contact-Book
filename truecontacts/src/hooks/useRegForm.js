import { useState, useEffect, useContext } from 'react';
import { regActions } from '../contexts/actions/auth/regActions';
import { GlobalContext } from '../contexts/Provider';
import { useHistory } from 'react-router-dom';

const useRegForm = () => {
    const [form, setForm] = useState({});
    const [fieldError, setFieldError] = useState({});
    const [isSubmit, setSubmit] = useState(false);

    const {authDispatch, authState: {loading, error, user}} = useContext(GlobalContext);
    //console.log(isAuthenticated, loading, error, user);
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
        if(user){
            history.push('/login');
        }
    },[user]);
    

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
        if(error === 409)
            setFieldError({...fieldError, username: 'username taken'})
        if(error === 500)
            setFieldError({...fieldError, email: 'email already exits'})

        return ()=> setSubmit(false)
    }, [error]);
    
    return {form, onChange, formValidator, onSubmit, loading, fieldError};
}

export default useRegForm;