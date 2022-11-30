import React,{useState} from 'react'
import {useDispatch}from 'react-redux'
import {useHistory} from 'react-router-dom';
import {signUp,signIn} from '../../action/auth'
import './Auth.css';
const initFormData={
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
}
const Auth = () => {
    const [isSignUp,setIsSignUp]=useState(false);
    const [formData,setFormData]=useState(initFormData);
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler=(event)=>{
        event.preventDefault();
        if(isSignUp){
            dispatch(signUp(formData,history));
        }else{
            dispatch(signIn(formData,history));
        }
    }
    const changeHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const switchSign=()=>{
        setIsSignUp((prevState)=>!prevState);
    }
  return (
    <div className='container '>
        <div className='auth position-absolute top-50 start-50 translate-middle bg-white' style={{width:'30%'}}>
            <h5 className='text-center mb-4 mt-5'>{isSignUp ? "SingUp" :"SingIn"}</h5>
            <form onSubmit={submitHandler}>
                {isSignUp && <div className='row mb-3 mx-1'>
                    <div className='col-xs-12 col-sm-6'>
                        <input className='form-control' required type='text' name='firstName' placeholder='First Name *' onChange={changeHandler} />
                    </div>
                    <div className='col-xs-12 col-sm-6'>
                        <input className='form-control' required type='text' name='lastName' placeholder='Last Name *' onChange={changeHandler} />
                    </div>
                    </div>}
                <div className='row mb-3 mx-1'>
                    <div className='col'>
                        <input className='form-control' required type='text' name='email' placeholder='Email *' onChange={changeHandler} />
                    </div>
                </div>
                <div className='row mb-3 mx-1'>
                    <div className='col'>
                        <input className='form-control' required type='password' name='password' placeholder='password *' onChange={changeHandler} />
                    </div>
                </div>
                {isSignUp && 
                <div className='row mb-3 mx-1'>
                    <div className='col'>
                        <input className='form-control' required type='password' name='confirmPassword' placeholder='Confirm Password *' onChange={changeHandler} />
                    </div>
                </div>
                }
                <div className='row mb-4 mx-1'>
                    <div className='col'>
                        <button type='submit' className='btn btn-primary form-control'>{isSignUp ?"Sign Up" :"Sign In" }</button>
                    </div>
                </div>
            </form>
            <div className='d-flex justify-content-end btn mb-3' onClick={switchSign}>
                {isSignUp ? "Dont Have Account? Sign UP" : "Already Have Account? Sign In"}
            </div>
        </div>
    </div>
  )
}

export default Auth