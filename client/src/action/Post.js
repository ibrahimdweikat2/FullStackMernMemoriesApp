import * as api from '../api/index';
import { FETCH_ALL,FETCH_POST,STARTING_LOADING,ENDING_LOADING,FETCH_BY_SEARCH,CREATE,UPDATE,DELETE } from "../constants/typeAction";

export const getPosts = (page)=> async (dispatch) =>{
    try {
        dispatch({type: STARTING_LOADING});
        const { data } = await api.fetchPosts(page);
        dispatch({type:FETCH_ALL,payload:data});
        dispatch({type: ENDING_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id)=> async (dispatch) =>{
    try {
        const {data}=await api.fetchPost(id);

        dispatch({type:FETCH_POST,payload:data})
    } catch (error) {
        
    }
}

export const getDataBySearches = searchQuery => async dispatch =>{
    try {
        dispatch({type: STARTING_LOADING});
        const {data:data} =await api.getDataBySearch(searchQuery);
        dispatch({type:FETCH_BY_SEARCH,payload:data});
        dispatch({type: ENDING_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const CreatePost = post => async dispatch =>{
    try {
        dispatch({type: STARTING_LOADING});
        const {data} =await api.createPost(post);
        dispatch({type:CREATE,payload:data});
        dispatch({type: ENDING_LOADING})
    } catch (error) {
        
    }
}


export const updatePost = (_id,postData) => async dispatch =>{
    try {
        const {data} =await api.updatePost(_id,postData);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = _id => async dispatch =>{
    try {
        await api.deletePost(_id);
        dispatch({type:DELETE,payload:_id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost= id => async dispatch =>{
    try {
        const {data} =await api.likePost(id);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}