import React, {useEffect, useState} from 'react';
import {useNavigate } from 'react-router-dom';
import styled from "styled-components";
import load from "../assets/load.gif";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';

export default function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate();
}
