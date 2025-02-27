import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import load from "../assets/load.gif"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// Import your images
import pic1 from "../assets/pic1.svg";
import pic2 from "../assets/pic2.svg";
import pic3 from "../assets/pic3.svg";
import pic4 from "../assets/pic4.svg";
import pic5 from "../assets/pic5.svg";
import pic6 from "../assets/pic6.svg";
import pic7 from "../assets/pic7.svg";
import pic8 from "../assets/pic8.png";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    // List of imported avatars
    const avatarFiles = [
        pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8
    ];
    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    const setProfilePicture = async() =>{
        if(selectedAvatar === undefined){
            toast.error("Select a profile picture", toastOptions);
        }
        else{
            const user = JSON.parse(localStorage.getItem("chat-app-user"));
            console.log("User", user)
            const data = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            }
            );
        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem("chat-app-user", JSON.stringify(user))
            toast.success("Profile picture updated successfully", toastOptions);
            navigate("/");
        }
        else{
            toast.error("Failed to update profile picture", toastOptions);
        }
        }
    }

    useEffect(() => {
        // Shuffle and pick 4 random avatars
        const shuffled = [...avatarFiles].sort(() => 0.5 - Math.random());
        setAvatars(shuffled.slice(0, 4));

        const delay = Math.floor(Math.random() * 2000) + 1000; // Random number between 1000ms (1s) and 3000ms (3s)

    // Set a timeout to remove loading after the delay
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, delay);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
    }, []);

    return (
        <>
        {
            isLoading? <Container>
                <img src={load} alt="loader" className="loader" />
            </Container>: (
        
            <Container>
                <div className="title-container">
                    <h1>Set Avatar</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar, index) => (
                        <div 
                            key={index} 
                            className={`avatar ${selectedAvatar === index ? "selected" : ""}`} 
                            onClick={() => setSelectedAvatar(index)}
                        >
                            <img src={avatar} alt="Avatar" />
                        </div>
                    ))}
                </div>
                <button type="submit" onClick={setProfilePicture}>Set your avatar</button>
            </Container>
            )
        }
            <ToastContainer />
        </>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  .title-container h1 {
    color: white;
  }

  .avatars {
    display: flex;
    gap: 2rem;
  }

  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    
    img {
      height: 6rem;
      transition: 0.3s ease-in-out;
    }
  }

  .avatar:hover {
    transform: scale(1.1);
  }

  .selected {
    border: 0.4rem solid #4e0eff;
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
`;
