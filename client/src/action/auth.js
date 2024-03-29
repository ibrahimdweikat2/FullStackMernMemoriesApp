import {AUTH} from '../constants/typeAction';
import * as api from '../api/index';
export const signIn =(formData,history) => async dispatch =>{
    try {
        const {data} =await api.signIn(formData);
        dispatch({type:AUTH,data:data});
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}


export const signUp =(formData,history) => async dispatch =>{
    try {
        const {data} =await api.signUp(formData);
        dispatch({type:AUTH,data:data});
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}