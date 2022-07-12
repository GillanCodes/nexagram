import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (Uid) => {
    return(dispatch) => {
        return axios({
            method: 'get',
            withCredentials: true,
            url: `${process.env.REACT_APP_API_URL}/api/user/${Uid}`
        }).then((res) => {
            dispatch({type: GET_USER, payload: res.data});
        }).catch((err) => {
            throw Error(err);
        })
    }
}