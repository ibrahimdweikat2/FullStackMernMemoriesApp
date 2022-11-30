import React from 'react'
import { useSelector } from 'react-redux';
import {CircularProgress} from '@material-ui/core';
import Post from './Post/Post';

const Posts = ({setCurrentId}) => {
  const {posts}= useSelector(state => state.Posts);
  console.log(posts);
  return (
    <>
    {!posts?.length ? <CircularProgress /> :(
      <div className='row align-items-stretch flex-wrap'>
        {posts.map(post =>{
          return <div key={Math.random(10).toString()} className='col-xs-12 col-sm-12 col-md-6 col-lg-3 mb-2'>
            <Post post={post} setCurrentId={setCurrentId}/>
          </div>
        })}
      </div>
    )}
    </>
    
  )
}

export default Posts