import axios from 'axios';
const API = axios.create({baseURL:'https://mernmemories-app22.herokuapp.com'});

API.interceptors.request.use(req =>{
    if(localStorage.getItem('profile')){
        const user =JSON.parse(localStorage.getItem('profile'))
        req.headers.Authorization = `Bearer ${user.token}`;
    }
return req;
})

export const fetchPost= id => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const getDataBySearch = searchQuery => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (post) => API.post('/posts', post);
export const updatePost =(id,postData) => API.patch(`/posts/${id}`, postData);
export const deletePost =(id) => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/likePost`);

export const signIn=(formData)=> API.post('/users/signin',formData);
export const signUp=(formData)=> API.post('/users/signup',formData);

