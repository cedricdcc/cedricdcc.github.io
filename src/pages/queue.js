import React, {useState, useEffect} from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth ,db, getValUserDocUid, getValUserInfo, updateValUserInfo, getValUserCredentials} from '../utils/firebase-config';
import {getUserInfo} from "../utils/tracker-gg-valo-api";
import ReactLoading from 'react-loading';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import CurrentMatch from '../components/current_match';
import {Table} from 'react-bootstrap';
import '../css/queue.css';
function QueuePage() {
    //constants
    const [user, loading, error] = useAuthState(auth);
    const [usercred, setUserCred] = useState("td");
    const usersCollRef = collection(db, "users");
    const [users, setUsers] = useState([]);
    const [Loading, setLoading] = useState(false) 
    const [currentqueue, setCurrentQueue] = useState([]);
    const navigate = useNavigate();

    getValUserCredentials(user?.uid).then((rs) => {
        setUserCred(rs);
    });

    //this function is meant to be in the moderator_queue.js
    const teambalancer = async () => {
        console.log("get balanced teams");
        //first have a big enough dataset to test on, right now there are not enough users to test this
    }

    useEffect(() => {
        console.log("getting data queue");

        onSnapshot(collection(db,"queue"), (snapshot) =>{
            const all_docs = snapshot.docs.map(doc => doc.data());
            console.log(all_docs);
            setCurrentQueue(all_docs);
        });

    }, []); 


    const getUsers = async () => {
        setLoading(true);
        getValUserInfo(user?.uid).then((response) => {
            //add try except here to see if the user is already registered
            console.log(response.valorant_name);
            //setValoName(response.valorant_name);
            //setValoTag(response.valorant_tag);
            const valoname = response.valorant_name;
            const valtag = response.valorant_tag;
            // cascade into getting docid and updating userdata
            getValUserDocUid(user?.uid).then((r) => {
                console.log(r)
                const userdocumentid = r
                //setUserDocId(r);
                getUserInfo(valoname,valtag).then((ruser) => {
                    console.log(ruser);
                    //setUpdateDict(r);
                    const updatedict = ruser;
                    console.log("trying to update");
                    updateValUserInfo(userdocumentid,updatedict).then(() => {
                        console.log("update completed");
                        //set users varibale here
                        getDocs(usersCollRef).then((finaluserdata) => {
                            setUsers(finaluserdata.docs.map((doc) => ({...doc.data(), id: doc.id})));
                            setLoading(false);
                        })
                    });
                });
            });
        });
    }

    const checkusercreds = async() => {
        if (usercred == "moderator") {
          console.log("welcome mod");
        }if(usercred == "user") {
            navigate("/");
        }else{
            console.log("TBD");
            
        }
    }

    useEffect(() => {
        checkusercreds();
        getUsers();
    }, [user, loading])
    
    return (
        <div width="90%">
            <h1>queue page</h1>
            <hr/>
            <CurrentMatch/>
            <div className="queuetable">
                <Table striped bordered>
                    <thead>
                        <tr>
                        <th>queue</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentqueue.map((user) => {
                        return  <tr>
                                    <td>{user.name}</td>
                                </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
    
export default QueuePage