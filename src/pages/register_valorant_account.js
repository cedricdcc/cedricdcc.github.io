import React, {useState, useEffect, useRef} from 'react';
import {ProgressBar, Button, Form, Alert, Modal} from 'react-bootstrap';
import '../css/valo_profile_registration.css';
import { Steps, useSteps } from "react-step-builder";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth , createValorantUser, valUserExists, getValUserDocUid, updateValUserInfo} from "../utils/firebase-config";
import {getUserValoProfileInfo, getUserInfo} from "../utils/tracker-gg-valo-api";
function ValAccountRegistration() {
    // consts here
    const { prev, next, jump, total, current, progress } = useSteps();
    const [profilename, setProfileName] = useState("");
    const [profiletag, setProfileTag] = useState("");
    const [alertmessage, setAlert] = useState("");
    const [showalert, setShowAlert] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        checkUserInDatabase();
    }, [user, loading]);
    //functions here

    function Alertshowing(props) {
        var showalert    = props.showalert;
        var alertmessage = props.message;
        if (showalert) {
          return <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        {alertmessage}
                    </p>
                </Alert>;
        }
        return "";
    }

    const checkUserInDatabase = async () => {
        console.log('check if user is already in database');
        await valUserExists(user?.uid).then(data => {
            if(data){navigate("/")}
        })
    }

    // make function that checks the step and then according to the step does a check 
    const checkstep = async () => {
        console.log(current);
        if(current == 2){
            console.log(profilename,"#",profiletag);
            getUserValoProfileInfo(profilename,profiletag).then( result => {
                if(result){
                    console.log("user was already registered with tracker.gg");
                    next();
                };
            });
            //alert("preparing data to go in database",profilename,profiletag);
        };
        if(current == 3){
            getUserValoProfileInfo(profilename,profiletag).then( result => {
                if(!result){
                    //alert("check if the filled in valorant name and tag match that of your profile and make sure you signed in with tracker.gg")
                    setShowAlert(true);
                    setAlert("check if the filled in valorant name and tag match that of your profile and make sure you signed in with tracker.gg");
                    jump(1);
                };
                if(result){
                    console.log("user registrated succesfully");
                    console.log("useruid mail");
                    console.log(user?.uid);
                    const useruid = user?.uid;
                    createValorantUser(profilename,profiletag,useruid);
                    const docid_user = getValUserDocUid(useruid).then((response) => {
                        console.log(response);
                        return response;
                    });
                    const toupdatedict = getUserInfo(profilename,profiletag).then((r) => {
                            console.log(r);
                            return r
                    });
                    updateValUserInfo(docid_user,toupdatedict);
                    navigate("/");
                };
            });
        };  
    };

    //return
    return(
    <div>
        <Alertshowing showalert={showalert} message={alertmessage}/>
        <div className="steps_wrapper">
            <ProgressBar animated striped variant="success" now={progress*100} label={`${progress*100}%`}/>
            <Steps>
            <div className="step">
                <h4>fill in valorant profile info</h4>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>valorant profile name</Form.Label>
                        <Form.Control type="text" placeholder={profilename} onChange={(e) => setProfileName(e.target.value)}/>
                        <Form.Text className="text-muted">
                        the part before the #
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>valorant tag</Form.Label>
                        <Form.Control type="text" placeholder={profiletag} onChange={(e) => setProfileTag(e.target.value)}/>
                        <Form.Text className="text-muted">
                        the part after the #
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
            <div className="step">
                <h4>Go to the link below and sign in with your riot account to enable account tracing</h4>
                <a href="https://tracker.gg/valorant">https://tracker.gg/valorant</a>
            </div>
            <div className="step">
                <h2>Congratz, you are now able to participate in events!!!</h2>
            </div>
            </Steps>
            <div className="navigation">
                <button onClick={prev}>Prev</button>
                <button onClick={checkstep(current),next}>Next</button>
            </div>
        </div>
    </div>
    )
}

export default ValAccountRegistration