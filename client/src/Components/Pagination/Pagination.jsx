import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Pagination,PaginationItem} from '@material-ui/lab';
import { getPosts } from '../../action/Post';
import { useDispatch,useSelector } from 'react-redux';

const Paginate = ({page}) => {
  const dispatch =useDispatch();
  const {numberOfPages}=useSelector(state => state.Posts);
  useEffect(()=>{
    dispatch(getPosts(page));
  },[page])
  return (
    <Pagination 
    classes={{ul:`justify-content-around`}}
    count={numberOfPages}
    page={Number(page) || 1}
    variant="outlined"
    renderItem={(item)=>(
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
    )}
    />
)
}

export default Paginate