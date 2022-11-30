import React,{useState,useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import {Link,useLocation,useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {LOGOUT} from '../../constants/typeAction';
//import decode from 'jwt-decode';
import memories from '../../images/memories.png';

const NavBar = () => {
  const location=useLocation();
  const history=useHistory();
  const dispatch=useDispatch();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));

  const logoutHandler =()=>{
    dispatch({type:LOGOUT});
      history.push('/');
      setUser(null);
  }
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])
  return (
    <div className='appBar position-static bg-white'>
        <div className='d-flex align-items-center'>
            <Link to='/' className='heading'><h2 className='heading'>Memories</h2></Link>
            <img className='image' src={memories} alt={memories} style={{height:'60px'}}/>
      </div>
      <div className='d-flex justify-content-end align-items-center logout' style={{width:'400px'}}>
        {user && <div className='d-flex justify-content-center align-items-center'>
          <Avatar alt={user.result.name} src={user.result.imageURL}>{user.result.name.charAt(0)}</Avatar>
          <h6 className='ml-2'>{user.result.name}</h6>
          <button className='btn btn-sm btn-danger' onClick={logoutHandler}>LogOut</button>
          </div>}
          {!user && <Link to='/auth'><button className='btn btn-lg btn-primary'>SignIn</button></Link>}
      </div>
    </div>
  )
}

export default NavBar