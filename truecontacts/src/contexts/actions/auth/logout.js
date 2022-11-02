import { LOGOUT_USER } from "../../../constants/constants";

export default (history) => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    dispatch({
        type: LOGOUT_USER
    });

    history.push("/login");
}