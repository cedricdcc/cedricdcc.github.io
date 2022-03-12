import React, {useState, useEffect} from 'react';
import ReactLoading from 'react-loading';
import {auth ,db, getValUserDocUid, getValUserInfo, updateValUserInfo, getValUserCredentials} from '../utils/firebase-config';
import {Table, Button} from 'react-bootstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {query,getDocs,collection,where} from "firebase/firestore";
import '../css/users.css';
function UserPage() {
    const [Loading, setLoading] = useState(false) 
    const [users, setUsers] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [usercred, setUserCred] = useState("td");

    getValUserCredentials(user?.uid).then((rs) => {
        setUserCred(rs);
    });

    const checkusercreds = async() => {
        if (usercred == "moderator") {
          console.log("welcome mod");
        }if(usercred == "user") {
            navigate("/");
        }if(usercred == "error") {
            setLoading(true);
        }else{
            console.log("TBD");
            
        }
    }
    //query users before mounting
    const getUsers = async () => {
        setLoading(true);
        const q = query(collection(db, "users"), where("current_tier", "!=", null));
        getDocs(q).then((finaluserdata) => {
            try {
                setUsers(finaluserdata.docs.map((doc) => ({...doc.data(), id: doc.id})));
            } catch (error) {
                alert("something went wrong here")
            }
            setLoading(false);
        })
    }
    
    useEffect(() => {
        checkusercreds();
        getUsers();
    }, [user, loading, usercred])

    if(Loading){
        return(
        <div className="busy">
            <h4>Getting users data</h4>
            <ReactLoading className="loadingbar" type='bars' color='grey' height={'20vw'} width={'20vw'} />
        </div>
        )
    }else{
        return (
            <div>
                <hr />
                <Table striped bordered hover  size="sm">
                    <thead>
                        <tr>
                            <th>Moderator Actions</th>
                            <th>Valorant id</th>
                            <th className="rankbadge">current rank</th>
                            <th className="rankbadge">max rank </th>
                            <th>time played</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return  <tr>
                                    <td><Button>actions in the future</Button></td>
                                    <td>{user.valorant_name}#{user.valorant_tag}</td>
                                    <td><img className="rankbadge" src={user.current_tier_icon} /></td>
                                    <td><img className="rankbadge" src={user.max_tier_icon} /></td>
                                    <td>{user.time_played.hours_played}h {user.time_played.minutes_played}m</td>
                                </tr>
                        })}
                    </tbody>
                </Table>   
            </div>
        )
    }
    
}

export default UserPage