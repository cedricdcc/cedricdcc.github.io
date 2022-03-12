import React, {useState, useEffect} from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth ,db, getValUserDocUid, getValUserInfo, updateValUserInfo, getValUserCredentials, bumptofirst, deletefromqueue,modplayself} from '../utils/firebase-config';
import {getUserInfo} from "../utils/tracker-gg-valo-api";
import {collection, getDocs, onSnapshot, query, orderBy} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import CurrentMatchMod from '../components/current_match_mod';
import {Table, Button, Popover, OverlayTrigger} from 'react-bootstrap';
import {BsFillArrowUpSquareFill} from 'react-icons/bs';
import {FaTrashAlt} from 'react-icons/fa';
import '../css/queue.css';
function ModQueuePage() {
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

    const popoverdelete = (
        <Popover id="popover-delete">
            <Popover.Header as="h3">Delete</Popover.Header>
            <Popover.Body>
                Click this to delete player from the queue.
            </Popover.Body>
        </Popover>
    );
    const popoverbump = (
        <Popover id="popover-replace">
            <Popover.Header as="h3">bump to first place</Popover.Header>
            <Popover.Body>
            Click this to bump player to the first place of the queue.
            </Popover.Body>
        </Popover>
    );
    const popovernextgroup = (
        <Popover id="popover-delete">
            <Popover.Header as="h3">Next group (not working)</Popover.Header>
            <Popover.Body>
                Click this to replace everybody from the current match with poeple in the queue. The people replaced will not auto go in the queue.
            </Popover.Body>
        </Popover>
    );

    const checkusercreds = async() => {
        if (usercred == "moderator") {
          console.log("welcome mod");
        }if(usercred == "user") {
            navigate("/queue");
        }if(usercred == "error") {
            setLoading(true);
        }else{
            console.log("TBD");
            
        }
    }

    //this function is meant to be in the moderator_queue.js
    const teambalancer = async () => {
        console.log("get balanced teams");
        //first have a big enough dataset to test on, right now there are not enough users to test this
    }

    useEffect(() => {
        console.log("getting data queue");

        const q = query(collection(db,"queue"), orderBy("time", "asc"));
        onSnapshot(q, (snapshot) =>{
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

    //TODO add functionality to the play self button to add current user to the current match and delete 10th user from it and add him back to the queue
    //TODO add next group functionality

    useEffect(() => {
        checkusercreds();
        getUsers();
    }, [user, loading, usercred])
    
    return (
        <div width="90%">
            <h1>moderator queue page</h1>
            <hr/>
            <CurrentMatchMod/>
            <Button variant="primary" onClick={() => modplayself(user?.uid)}>play yourself</Button>
            <OverlayTrigger trigger="hover" placement="right" overlay={popovernextgroup}>
                <Button variant="primary" >next group</Button>
            </OverlayTrigger>
            <hr />
            <div className="queuetable">
                <Table striped bordered>
                    <thead>
                        <tr>
                        <th>queue</th>
                        <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentqueue.map((user) => {
                        return  <tr>
                                    <td width="150px">
                                        <OverlayTrigger trigger="hover" placement="right" overlay={popoverdelete}>
                                            <Button variant="danger"  onClick={() => deletefromqueue(user.name)}><FaTrashAlt/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger="hover" placement="right" overlay={popoverbump}>
                                            <Button variant="success" onClick={() => bumptofirst(user.name)}><BsFillArrowUpSquareFill/></Button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>{user.name} </td>
                                </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
    
export default ModQueuePage