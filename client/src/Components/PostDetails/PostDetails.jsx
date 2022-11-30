import React,{useEffect} from 'react'
import {CircularProgress} from '@material-ui/core';
import {useParams,useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getPost,getDataBySearches} from '../../action/Post';
import moment from 'moment';
import classes from './PostDetails.module.css';

const PostDetails = () => {
  const history =useHistory();
  const {id}=useParams();
  const dispatch =useDispatch();
  const {post,posts,isLoading} =useSelector(state => state.Posts);
  useEffect(()=>{
    dispatch(getPost(id));
  },[id])
  useEffect(()=>{
    dispatch(getDataBySearches({search:'none',tags:post?.tags.join(',')}));
  },[post])
  if(!post) return null;
  if(isLoading){
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }
  const recommended =posts.filter(({_id}) => _id !== post?._id)
  console.log(recommended);
  const openPost=(_id)=>{
    history.push(`/posts/${_id}`)
  }
  return (
    <div className='bg-white p-3 rounded-4'>
      <div className={`${classes.main} d-flex justify-content-between align-items-center`}>
        <div className='ms-3'>
          <h2 className='mb-2'>{post.title}</h2>
          <h6 className='text-muted ms-1'>{post.tags.map(tag=> `#${tag} `)}</h6>
          <p className='fs-4 ms-1'>{moment(post.createdAt).fromNow()}</p>
          <p className='text-muted ms-1'>{post.message}</p>
          <h3>{`Created By: ${post.name}`}</h3>
          <p className='text-muted ms-1'>{`Number Of Like:${post.likes.length}`}</p>
        </div>
        <div>
          <img className='rounded-4' style={{width:'600px',height:'400px'}}  src={post.selectedFile} alt={post.name}/>
        </div>
      </div>
      {recommended.length && (
        <div className='text-center mt-5'>
          <h3>You might also like:</h3>
          <hr />
          <div className='d-flex flex-wrap justify-content-between align-items-center'>
            {
              recommended.map(({title,tags,_id,name,message,selectedFile,likes})=>(
                <div style={{margin:'20px',cursor:"pointer"}} key={_id} onClick={()=> openPost(_id)}>
                  <h5>{title}</h5>
                  <p>{tags.map(tag=> `#${tag} `)}</p>
                  <h6>{name}</h6>
                  <p>{message}</p>
                  <p>{`Number Of Like:${likes.length}`}</p>
                  <img src={selectedFile} alt={name} style={{width:'200px'}}/>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails