import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../utils/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from 'react-loading';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import "../css/login.css";
import SocialBanner from "../components/socialbanner";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {  
        return(
            <div class="busy">
                <ReactLoading type='bars' color='grey' height={'20vw'} width={'20vw'} />
            </div>
        )
    }
    if (user) navigate("/home");
  }, [user, loading]);
  return (
    /* have the same interface design as the home page */
    <div>
      <SocialBanner/>
      <div class="container backgroundgrey">
            <div class="twitch-area">
                <ReactTwitchEmbedVideo channel="impulsiveempathy" height="100%"/>
            </div>
            <div class="other-area">
            <div>
              <div className="login">
                <div className="login__container">
                  <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                  />
                  <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                  >
                    Login
                  </button>
                  <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                  </button>
                  <div>
                    <Link to="/reset">Forgot Password</Link>
                  </div>
                  <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
export default Login;