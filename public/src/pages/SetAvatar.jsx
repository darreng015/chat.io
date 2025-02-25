import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

// Import your images
import pic1 from "../assets/pic1.svg";
import pic2 from "../assets/pic2.svg";
import pic3 from "../assets/pic3.svg";
import pic4 from "../assets/pic4.svg";
import pic5 from "../assets/pic5.svg";
import pic6 from "../assets/pic6.svg";
import pic7 from "../assets/pic7.svg";
import pic8 from "../assets/pic8.png";

export default function SetAvatar() {
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    // List of imported avatars
    const avatarFiles = [
        pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8
    ];

    useEffect(() => {
        // Shuffle and pick 4 random avatars
        const shuffled = [...avatarFiles].sort(() => 0.5 - Math.random());
        setAvatars(shuffled.slice(0, 4));
    }, []);

    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>Set Avatar</h1>
                </div>
                <div className="avatar-container">
                    {avatars.map((avatar, index) => (
                        <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`} onClick={() => setSelectedAvatar(index)}>
                            {/* Use the imported images */}
                            <img src={avatar} alt="Avatar" />
                        </div>
                    ))}
                </div>
            </Container>
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

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
