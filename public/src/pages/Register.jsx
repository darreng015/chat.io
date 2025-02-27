import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Passwords do not match", toastOptions);
            return false;
        } else if (password.length < 6) {
            toast.error("Password should be at least 6 characters long", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be at least 3 characters long", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, { username, email, password });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h1>Chat.io</h1>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Username"
                        name="username" 
                        value={values.username}
                        onChange={handleChange}
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        name="email" 
                        value={values.email}
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        name="password" 
                        value={values.password}
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        name="confirmPassword" 
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit">Create Account</button>
                    <span>Have an account? <Link to="/login">Login here</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    background: rgba(255, 255, 255, 0.1);
    padding: 2.5rem;
    border-radius: 60px;
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
    width: 400px;
  }

  input {
    background-color: transparent;
    padding: 0.9rem;
    border: 2px solid #15522c;
    border-radius: 15px;
    color: white;
    font-size: 1rem;
    outline: none;
    transition: 0.3s ease-in-out;
  }

  input:hover {
    border: 2px solid #4e0eff;
  }

  input:focus {
    border: 2px solid #4e0eff;
    box-shadow: 0 0 10px rgba(78, 14, 255, 0.5);
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 15px;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
  }

  button:hover {
    background-color: #3a0bcc;
  }

  button:active {
    transform: scale(0.95);
  }

  span {
    color: white;
    text-align: center;
    text-transform: uppercase;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
