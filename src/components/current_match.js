import ReactLoading from 'react-loading';
import {collection, getDocs, doc, onSnapshot, querySnapshot,query} from 'firebase/firestore';
import {db} from '../utils/firebase-config';
import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import '../css/current_match.css';

function CurrentMatch() {
    const [currentmatch, setCurrentMatch] = useState({"team_blue":[],"team_red":[]});
    const [currentqueue, setCurrentQueue] = useState([]);

    useEffect(() => {
        console.log("getting data current match");

        onSnapshot(collection(db,"current_match"), (snapshot) =>{
            const all_docs = snapshot.docs.map(doc => doc.data());
            console.log(all_docs[0]);
            setCurrentMatch(all_docs[0]);
        });

        onSnapshot(collection(db,"queue"), (snapshot) =>{
            const all_docs = snapshot.docs.map(doc => doc.data());
            console.log(all_docs);
            setCurrentQueue(all_docs);
        });

    }, []); 

    function DisplayNameMatch(props) {
        const user = props.user;
        const rs = user.anchored
        if(rs == false){
            return (
                <td>{user.name}</td>
            )
        }if(rs == true){
            return (
                <td><b>{user.name}</b></td>
            )
        }else{
            return(<></>)
        }
    }
  
    return (
        //whatever you choose to render;
        <div className="container_curm">
            <div className="colblue">
                <Table striped bordered>
                    <thead className="blueteam">
                        <tr>
                        <th >team blue</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentmatch.team_blue.map((user) => {
                        return  <tr>
                                    <DisplayNameMatch user={user}/>
                                </tr>
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="colred">
                <Table striped bordered>
                    <thead className="redteam">
                        <tr>
                        <th >team red</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentmatch.team_red.map((user) => {
                        return  <tr>
                                    <DisplayNameMatch user={user}/>
                                </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
  }

export default CurrentMatch