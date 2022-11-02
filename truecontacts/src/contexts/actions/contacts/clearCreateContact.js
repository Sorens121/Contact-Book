import { CLEAR_ADD_CONTACT } from "../../../constants/constants";

export default () => (dispatch) => {
    dispatch({
        type: CLEAR_ADD_CONTACT
    })
};