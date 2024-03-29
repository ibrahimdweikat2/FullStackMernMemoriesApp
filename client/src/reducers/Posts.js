import { FETCH_ALL,FETCH_POST,STARTING_LOADING,ENDING_LOADING,FETCH_BY_SEARCH,CREATE,UPDATE,DELETE } from "../constants/typeAction";

export default (state ={isLoading:true,posts:[]},action) =>{
    switch (action.type) {
        case STARTING_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case ENDING_LOADING:
            return {
                ...state,
                isLoading: false,
            }
        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                numberOfPages:action.payload.numberOfPages,
                currentPage:action.payload.currentPage,
            }
        case FETCH_POST:
            return {
                ...state,
                post:action.payload.data,
            }
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts:action.payload.data,
            }
        case CREATE:
        return {...state,posts: [...state.posts,action.payload]};
        case UPDATE:
            return {...state, posts:state.posts.map(post => post._id === action.payload._id ? action.payload : post)};
        case DELETE:
            return {...state,posts: state.posts.filter(post => post._id !== action.payload)};
        default:
            return state;
    }
}