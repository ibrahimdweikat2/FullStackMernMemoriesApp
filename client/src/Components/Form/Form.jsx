import React,{useState,useEffect} from 'react'
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import {CreatePost,updatePost} from '../../action/Post';
import classes from './Form.module.css';

const initPostData={
  title:'',
  message:'',
  tags:'',
  selectedFile:'',
}
const Form = ({currentId ,setCurrentId}) => {
  const post =useSelector(state => currentId? state.Posts.find(p => p._id === currentId):null);
  const [postData,setPostData]=useState(initPostData)
  const user =JSON.parse(localStorage.getItem('profile'));

  const dispatch=useDispatch();

  useEffect(()=>{
    if(post){
      setPostData(post);
    }
  },[post])

  const submitHandler = (event) => { 
    event.preventDefault();
      if(currentId){
        dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
      }else{
        dispatch(CreatePost({...postData,name:user?.result?.name}));
      }
      clear();
  };

  const clear =()=>{
    setPostData(initPostData);
    setCurrentId(null);
  };

  if(!user?.result?.name){
    return (
      <div className={`${classes.paper} bg-white rounded-3`}>
        <h6>Please Sign In/Sign Up To Create Own Memories or Likes others Memories</h6>
      </div>
    )
  }

  return (
    <div className={`${classes.paper} bg-white rounded-3`}>
      <form noValidate autoComplete='off' className={`${classes.form} ${classes.root} gap-2`} onSubmit={submitHandler}>
        <h6 className='text-center'>{currentId ? 'Editing' :'Create'} A Memory</h6>
        <input className='rounded-3 form-control' type='text' name='title' placeholder='Enter title' value={postData.title} onChange={(e)=> setPostData({...postData,title:e.target.value})}/>
        <input className='rounded-3 form-control ' type='text' name='message' placeholder='Enter message' value={postData.message} onChange={(e)=> setPostData({...postData,message:e.target.value})}/>
        <input className='rounded-3 form-control mb-1' type='text' name='tags' placeholder='Enter tags' value={postData.tags} onChange={(e)=> setPostData({...postData,tags:e.target.value.split(',')})}/>
        <FileBase type='file' multiple={false} onDone={({base64})=> setPostData({...postData,selectedFile:base64})}/>
        <button className={`${classes.buttonSubmit} mt-1 btn btn-primary rounded-4 form-control btn-lg`} type="submit">{currentId ? 'Edit' :'Create'} Post</button>
      </form>
      <button className='btn btn-danger  form-control btn-sm' onClick={clear}>Clear</button>
    </div>
  )
}

export default Form