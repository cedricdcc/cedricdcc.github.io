import React, {useState, useEffect, useRef} from 'react';
import ReactLoading from 'react-loading';
import {auth ,db, getValUserDocUid, getValUserInfo, updateValUserInfo} from '../utils/firebase-config';
import {Table, Button} from 'react-bootstrap';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import {getUserInfo} from "../utils/tracker-gg-valo-api";
import { useAuthState } from "react-firebase-hooks/auth";
function UserPage() {
    const [Loading, setLoading] = useState(false) 
    const [users, setUsers] = useState([]);
    const usersCollRef = collection(db, "users");
    const [user, loading, error] = useAuthState(auth);
    const [ValoName, setValoName] = useState(); 
    const [ValoTag, setValoTag] = useState(); 
    const [userdocid, setUserDocId] = useState(''); 
    const [toupdatedict, setUpdateDict] = useState();
    /*
    const useruid = user?.uid;
    valoprofilename(useruid);
    getdocid(useruid);
    toupdatedictf(ValoName,ValoTag);
    console.log(toupdatedict);
    updateprofiledatabase(userdocid,toupdatedict);
    */

    //query users before mounting
    const getUsers = async () => {
        setLoading(true);
        const userdata = await getDocs(usersCollRef);
        console.log(userdata)
        setUsers(userdata.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setLoading(false);
    }

    const valoprofilename = async (useruid) => {
        getValUserInfo(useruid).then((response) => {
            console.log(response.valorant_name);
            setValoName(response.valorant_name);
            setValoTag(response.valorant_tag);
        });
    }

    const toupdatedictf = async (profilename,profiletag) => {
        getUserInfo(profilename,profiletag).then((r) => {
            console.log(r);
            setUpdateDict(r);
        });
    }

    const getdocid = async (tosearchuser) => {
        getValUserDocUid(tosearchuser).then((r) => {
            console.log(r)
            setUserDocId(r);
        });
    }

    const updateprofiledatabase = async (docid,toupdatedict) => {
        updateValUserInfo(docid,toupdatedict).then(() => {
            console.log("trying to update");
        });
    }
    
    useEffect(() => {
        getUsers();
        valoprofilename(user?.uid);
        getdocid(user?.uid)
    }, [user, loading])

    useEffect(() => {
        console.log(ValoName);
        console.log(ValoTag);
        toupdatedictf(ValoName,ValoTag);
    }, [ValoName, ValoTag])

    useEffect(() => {
        console.log("last executed");
        updateprofiledatabase(userdocid,toupdatedict);
    }, [toupdatedict, userdocid])

    

    if(Loading){
        return(
        <div className="busy">
            <ReactLoading type='bars' color='grey' height={'20vw'} width={'20vw'} />
        </div>
        )
        }else{
        return (
            <div>
                <hr />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>Valorant id</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return  <tr>
                                    <td><Button>Test doesn't do anything</Button></td>
                                    <td>{user.valorant_name}#{user.valorant_tag}</td>
                                </tr>
                        })}
                    </tbody>
                </Table>   
            </div>
        )
    }
    
}

export default UserPage