import ReactLoading from 'react-loading';
import {collection, getDocs, doc, onSnapshot, querySnapshot,query} from 'firebase/firestore';
import {db,deletefrommatch,replacefrommatch} from '../utils/firebase-config';
import React, {useState, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import '../css/current_match.css';

function CurrentMatchMod() {
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
  
    return (
        //whatever you choose to render;
        <div className="container_curm">
            <div className="colblue">
                <Table striped bordered>
                    <thead className="blueteam">
                        <tr>
                        <th colspan="2">team blue</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentmatch.team_blue.map((user) => {
                        return  <tr>
                                    <td>
                                        <Button variant='danger' onClick={() => deletefrommatch(user,"blue")}>delete</Button>
                                        <Button variant='info'   onClick={() => replacefrommatch(user,"blue")}>replace</Button>
                                    </td>
                                    <td>{user}</td>
                                </tr>
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="colred">
                <Table striped bordered>
                    <thead className="redteam">
                        <tr>
                        <th colspan="2">team red</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentmatch.team_red.map((user) => {
                        return  <tr>
                                    <td>{user}</td>
                                    <td>
                                        <Button variant='danger' onClick={() => deletefrommatch(user,"red")}>delete</Button>
                                        <Button variant='info'   onClick={() => replacefrommatch(user,"red")}>replace</Button>
                                    </td>
                                </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
  }

export default CurrentMatchMod