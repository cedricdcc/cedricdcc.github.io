import logo from '../static/IE_small.png';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../utils/firebase-config";
import { query, collection, getDocs, where } from "firebase/firestore";
import '../css/home_page.css';
import {getUserValoProfileInfo} from "../utils/tracker-gg-valo-api";

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
          setName("You magnificent creature");
          /*alert("An error occured while fetching user data");*/
        }
    };

    /* temp axample space for getting mmr rating of player */


    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
        getUserValoProfileInfo("Cetinator","VLIZ");
    }, [user, loading]);

    if(name == "You magnificent creature"){
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
                        Follow the link below and complete the valorant profile registration to participate in awesome events.</p>
                        <a href="/register_user">register valo id</a>
                        <p>
                        Coming soon: impulsive valorant matchmaker
                        </p>
                </div>
            </div>
        )
    }else{
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
                        Coming soon: impulsive valorant matchmaker
                        </p>
                </div>
            </div>
        )
    }
    }
    
    export default HomePage