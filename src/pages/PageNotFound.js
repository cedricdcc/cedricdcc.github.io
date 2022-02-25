import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase-config";
import ReactPlayer from "react-player";

function PageNFound() {
    //define all constants first
    const [youtubeID] = useState('dQw4w9WgXcQ')
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);
    //All the functions here
    return (
        <div>
        <h1>You've gone to the wrong link kiddo</h1>
        <ReactPlayer
            url={`https://youtube.com/embed/${youtubeID}?autoplay=0`}
            playing={true}
            width='100%'
            height='90vh'
        />
        </div>
    )
}
    
export default PageNFound