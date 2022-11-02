import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../contexts/Provider";
import { loginActions } from "../contexts/actions/auth/loginActions";

const useLogForm = () => {
    const [form, setForm] = useState({});
    const history = useHistory();

    const { authDispatch, authState: {auth:{isAuthenticated, loading, error, data}}} = useContext(GlobalContext);

    const onChange = (e, {name, value}) => {
        e.preventDefault();
        setForm({...form, [name]: value})
    }

   // console.log("login error", error);

    const onSubmit = () => {
        loginActions(form)(authDispatch);    
    }

    const loginValidator = !form.username?.length || !form.password?.length;

    useEffect(() => {
        if(data && isAuthenticated && localStorage.token){
            if(data.user){
                history.push("/");
            }
        }
    }, [data, isAuthenticated]);

    return {form, error, isAuthenticated, loading, onChange, onSubmit, loginValidator};

}

export default useLogForm;