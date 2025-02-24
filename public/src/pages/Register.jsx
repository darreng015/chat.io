import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/logo.svg";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
function Register() {
  const navigate = useNavigate();
    const [values,setValues] = useState({
      username : "",
      email : "",
      password : "",
      confirm_password : ""
    })

    useEffect(()=>{
          if(localStorage.getItem('chat-app-user')){
            navigate('/')
          }
        }, [])
    const handleSubmit = async(event) => {
        event.preventDefault();
        if(handleValidation()){
          console.log("INSIDE VALIDATION: ", registerRoute);
          const {password, username, email} = values;
          const {data} = await axios.post(registerRoute, {
            username,
            email,
            password
          });
          if(data.status === false){
            toast.error(data.msg, toastOptions);
          }
          if(data.status===true){
            localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            navigate("/");
          }
        }
    };
    const handleChange = (event) =>{
        setValues({...values, [event.target.name]: event.target.value});
    };

    const toastOptions = {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          draggable:true,
          theme:"dark"
    }
    const handleValidation = () => {
      const {password, confirmPassword, username, email}= values;
      if(password!=confirmPassword){
        toast.error("Passwords not matching", toastOptions);
        return false;
      }
      else if(password.length<6){
        toast.error("Password should be at least 6 characters long", toastOptions);
        return false;
      }
      else if(username.length<3){
        toast.error("Username should be at least 3 characters long", toastOptions);
        return false;
      }
      return true;
    }
  return (
    <>
        <FormContainer>
            <form onSubmit={(event) =>handleSubmit(event)}>
                <div className="brand">
                    <img src={logo} alt="logo" />
                    <h1>Chat.io</h1>
                </div>
                <input 
                    type="text" 
                    placeholder="Username"
                    name="username" 
                    onChange={(e)=>handleChange(e)}
                />
                <input 
                    type="email" 
                    placeholder="Email"
                    name="email" 
                    onChange={(e)=>handleChange(e)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password" 
                    onChange={(e)=>handleChange(e)}
                />
                <input 
                    type="password" 
                    placeholder="Re-enter Password"
                    name="confirmPassword" 
                    onChange={(e)=>handleChange(e)}
                />
                <button type="submit">Create Account</button>
                <span>Have an account? <Link to="/login">Login here</Link></span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div
`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #112354;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #15522c;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #05ff65;
      outline: none;
    }
  }
  button {
    background-color: #127845;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #127845;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #127845;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;


