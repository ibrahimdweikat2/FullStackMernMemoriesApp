import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useDispatch} from 'react-redux';
import {deletePost,likePost} from '../../../action/Post';
import {useHistory} from 'react-router-dom';
import classes from './Post.module.css';
import moment from 'moment';

const Post = ({post,setCurrentId}) => {
  const dispatch=useDispatch();
  const user=JSON.parse(localStorage.getItem('profile'));
  const history=useHistory();
  const openPage=()=>{
    history.push(`/posts/${post._id}`)
  }
  return (
    <div className={`card ${classes.card}`} >
      <button className={`${classes.button} form-control`} onClick={openPage}>
      <img className={`${classes.media} card-img-top`} src={post.selectedFile}  alt={post.title} />
      <div className={classes.overlay}>
        <h6>{post.name}</h6>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>
      <div className={`${classes.overlay2} d-xs-block`}>
        {user?.result?._id === post?.creator && <button style={{color:'white'}} className='btn btn-sm' onClick={()=> setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="medium"/>
        </button>
        }
      </div>
      <div className="card-body">
        <div className={`${classes.details} card-title`}>{post.tags.map(tag=> `#${tag} `)}</div>
        <h5 className="card-title my-2">{post.title}</h5>
        <p className="card-text ms-2 text-muted">{post.message}</p>
      </div>
      </button>
      <div className={classes.cardActions}>
        <button className='btn btn-outline-primary btn-sm' disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
          <ThumbUpAltIcon fontSize="small"/>
          &nbsp; Like 	&nbsp;
          {post.likes.length > 0 && post.likes.length}
        </button>
        {(user?.result?._id === post?.creator) && <button className='btn btn-outline-primary btn-sm w-sm-50' onClick={()=>dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small"/>
          &nbsp;
          Delete
        </button>
        }
      </div>
    </div>
  )
}

export default Post