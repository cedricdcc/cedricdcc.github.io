import logo from '../static/IE_small.png';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../utils/firebase-config";
import { query, collection, getDocs, where } from "firebase/firestore";
import '../css/home_page.css';
import {Table} from 'react-bootstrap';
function HomePage() {
    //define all constants first
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    //All the functions here
    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);
    return (
        <div class="container backgroundblack">
            <br />
            <div class="twitch-area">
                <ReactTwitchEmbedVideo channel="impulsiveempathy" height="100%"/>
            </div>
            <div class="other-area">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Welcome back {name}</p>
                    <p>
                    Coming soon: impulsive valorant matchmaker bruv
                    </p>
            </div>
        </div>
    )
    }
    
    export default HomePage