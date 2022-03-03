import ReactLoading from 'react-loading';
import {collection, getDocs, doc, onSnapshot, querySnapshot,query} from 'firebase/firestore';
import {db,deletefrommatch,replacefrommatch} from '../utils/firebase-config';
import React, {useState, useEffect} from 'react';
import {Table, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {FaRecycle, FaTrashAlt} from 'react-icons/fa';
import '../css/current_match.css';

function CurrentMatchMod() {
    const [currentmatch, setCurrentMatch] = useState({"team_blue":[],"team_red":[]});
    const [currentqueue, setCurrentQueue] = useState([]);

    const popoverdelete = (
        <Popover id="popover-delete">
            <Popover.Header as="h3">Delete</Popover.Header>
            <Popover.Body>
            Click this to delete player from current match, the player won't return to the queue automaticly.
            </Popover.Body>
        </Popover>
      );

    const popoverreplace = (
        <Popover id="popover-replace">
            <Popover.Header as="h3">Replace</Popover.Header>
            <Popover.Body>
            Click this to replace player from current match, the player will return to the queue in first place.
            </Popover.Body>
        </Popover>
    );

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
                                    <td width="150px">
                                        <OverlayTrigger trigger="hover" placement="left" overlay={popoverdelete}>
                                            <Button variant='danger' onClick={() => deletefrommatch(user,"blue")}><FaTrashAlt/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger="hover" placement="left" overlay={popoverreplace}>
                                            <Button variant='info'   onClick={() => replacefrommatch(user,"blue")}><FaRecycle/></Button>
                                        </OverlayTrigger>
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
                                    <td width="150px">
                                        <OverlayTrigger trigger="hover" placement="right" overlay={popoverreplace}>
                                            <Button variant='info'   onClick={() => replacefrommatch(user,"red")}><FaRecycle/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger="hover" placement="right" overlay={popoverdelete}>
                                            <Button variant='danger' onClick={() => deletefrommatch(user,"red")}><FaTrashAlt/></Button>
                                        </OverlayTrigger>
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