import React, { useState } from 'react';
import '../Components.css';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Loader from '../Loader';
import { setAuthUser } from '../../helper/Storage';
import { useNavigate } from "react-router-dom";

function Login({ onLogin, errorMessage }) {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

  const [login, setLogin ] =useState({
    // email:'',
    password:'',
    username:'',
    loading:'false',
    err:[]
  }) 
  const [register, setRegister ] =useState({
    // name:'',
    email:'',
    password:'',
    username:'',
    loading:'false',
    err:[]
  }) 

    // LOGIN
  const LoginFun = (e) =>{
    e.preventDefault();
    setLogin({...Login, loading: true, err:[]})
    axios.post('http://127.0.0.1:8000/api/login/', {
      // email: login.email,
      username: login.username,
      password: login.password
    }).then(resp => {
      setLogin({...Login, loading: false, err:[]})
      const { access, refresh } = resp.data;  // Extract tokens
      // console.log("Tokens:", access, refresh);
      // console.log("login data", resp.data)
      setAuthUser({ accessToken: access, refreshToken: refresh });
      // setAuthUser(resp.data);
      navigate('/');

    }).catch(errors => {
      console.log(errors)
      setLogin({...login, loading: false, err: errors.response?.data?.errors || ["Invalid user. Please Signup!"] });
    });}

    // REGISTER
    const RegisterFun = (e) =>{
      e.preventDefault();
      setRegister({...register, loading: true, err:[]})
      axios.post('http://127.0.0.1:8000/api/signup/', {
        email: register.email,
        username: register.username,
        password: register.password,
        // name: register.name
      }).then(resp => {
        setRegister({...register, loading: false, err:[]})
        const { access, refresh } = resp.data;
        setAuthUser({ accessToken: access, refreshToken: refresh });
        // setAuthUser(resp.data);
        navigate('/');
  
      }).catch(errors => {
        console.log(errors)
        setRegister({...register, loading: false, err: errors.response?.data?.errors || ["Email already registered. Please try a different email."] });
      });}




  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card-switch">
        <label className="login-switch">
          <input className="login-toggle" type="checkbox" checked={isSignUp} onChange={toggleForm} />
          <span className="login-slider"></span>
          <span className="login-card-side"></span>
          <div className="login-flip-card__inner">
            {/* LOGIN*/}
            <div className="login-flip-card__front">
              <div className="login-title">Log in</div>
              
              {login.err.map((error, index) => (
                  <Alert key={index} variant={'danger'} >{error.msg}</Alert>
              ))}

              {/* {login.loading === true && (
                <Loader />
              )} */}
              <form onSubmit={LoginFun} className="login-flip-card__form">
                {
                /* <input type="email" placeholder="Email" name="email" className="login-flip-card__input" value={login.email} onChange={(e) => setLogin({...login, email: e.target.value})} /> */}
                { <input type="text" placeholder="Username" name="username" className="login-flip-card__input" value={login.username} onChange={(e) => setLogin({...login, username: e.target.value})} /> }
                <input type="password" placeholder="Password" name="password" className="login-flip-card__input" value={login.password} onChange={(e) => setLogin({...login, password: e.target.value})} />
                <button className="login-flip-card__btn" type='submit' disabled={login.loading === true }>Let's go!</button>
              </form>
              {/* {errorMessage && <p className="login-error">{errorMessage}</p>} */}
            </div>


            {/* SIGN UP */}
            <div className="login-flip-card__back">
              <div className="login-title">Sign up</div>

              {register.err.map((error, index) => (
                  <Alert key={index} variant={'danger'} >{error.msg}</Alert>
              ))}
              {/* {register.loading === true && (
                <Loader />
              )} */}
              <form onSubmit={RegisterFun} className="login-flip-card__form">
              {/* #ff305d*/}
                <input type="text" placeholder="Username" className="login-flip-card__input" value={register.username} onChange={(e) => setRegister({...register,username:e.target.value})} />
                <input type="email" placeholder="Email" name="email" className="login-flip-card__input" value={register.email} onChange={(e) => setRegister({...register,email:e.target.value})} />
                <input type="password" placeholder="Password" name="password" className="login-flip-card__input" value={register.password} onChange={(e) => setRegister({...register,password:e.target.value})} />
                <button className="login-flip-card__btn" type='submit' disabled={register.loading === true }>Confirm!</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Login;
