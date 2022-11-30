import React,{useState} from 'react'
import { Grow } from '@material-ui/core';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import {useDispatch} from 'react-redux';
import {useHistory,useLocation} from 'react-router-dom';
import {getDataBySearches} from '../../action/Post';
import Pagination from '../Pagination/Pagination';
import ChipInput from 'material-ui-chip-input';

function useQuary(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId,setCurrentId] =useState(null);
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
    const dispatch =useDispatch();
    const quary=useQuary();
    const history=useHistory();
    const page=quary.get('page') || 1;
    const searchQuery=quary.get('searchQuery');

  const searchPost=()=>{
    if(search.trim() || tags){
      dispatch(getDataBySearches({search,tags:tags.join(',')}));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }else{
      history.push('/');
    }
  };
  
  const KeyHandler=(e)=>{
    if(e.keyCode === 13){
      searchPost();
    }
  };
  const addHandler=(tag)=>{
    setTags([...tags,tag]);
  };
  const deleteHandler=(tagToDelete)=>{
    setTags(tags.filter((tag) => tag!== tagToDelete));
  }
  return (
    <Grow in>
        <div className='container' >
          <div className='row justify-content-between align-items-stretch mainContainer'>
            <div className='col-xs-12 col-sm-6 col-md-9'>
              <Posts setCurrentId={setCurrentId}/>
            </div>
            <div className='col-xs-12 col-sm-6 col-md-3'>
              <div className='p-2 mb-3 bg-white rounded-4'>
                <input type='text'  className='form-control' onKeyPress={KeyHandler} onChange={(e)=>setSearch(e.target.value)} value={search} placeholder='Search'/>
                <ChipInput 
                className='form-control my-3'
                value={tags}
                onAdd={addHandler}
                onDelete={deleteHandler}
                variant='outlined'
                label='Search Tags'
                />
                <button onClick={searchPost} className='btn form-control btn-sm btn-primary'>Search</button>
              </div>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <Pagination page={page}/>
            </div>
          </div>
        </div>
      </Grow>
  )
}

export default Home