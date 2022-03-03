import logo from '../static/IE_small.png';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../utils/firebase-config";
import { query, collection, getDocs, where } from "firebase/firestore";
import {Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {SiRiotgames} from 'react-icons/si';
import '../css/home_page.css';

function HomePage() {
    //define all constants first
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    //All the functions here
    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          console.log(user?.uid);
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.valorant_name);
        } catch (err) {
          console.error(err);
          setName("You magnificent creature");
        }
    };

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Queue</Popover.Header>
          <Popover.Body>
            Click here to go to the queue page.
          </Popover.Body>
        </Popover>
      );

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
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
                        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                            <Button href="/queue" variant="danger"> <SiRiotgames size="10em"/> </Button>
                        </OverlayTrigger>
                </div>
            </div>
        )
    }
    }
    
    export default HomePage