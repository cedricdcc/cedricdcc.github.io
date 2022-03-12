import ReactLoading from 'react-loading';
import {collection, getDocs, doc, onSnapshot, querySnapshot,query} from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import {Table, Button, OverlayTrigger, Popover} from 'react-bootstrap';
import {FaRecycle, FaTrashAlt, FaAnchor} from 'react-icons/fa';
import {BsBoxArrowDown} from 'react-icons/bs';
import {db,deletefrommatch,replacefrommatch,bottomqueuereplacefrommatch,changeanchoruser,bottomqueuereplaceteam} from '../utils/firebase-config';
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

    const popoveranchor = (
        <Popover id="popover-anchor">
            <Popover.Header as="h3">Anchor</Popover.Header>
            <Popover.Body>
            Click this to anchor player into place. this player will not be replayed by the replace alluntill unanchored.
            </Popover.Body>
        </Popover>
    );

    const popoverreplacedown = (
        <Popover id="popover-replacedown">
            <Popover.Header as="h3">Bottom queue</Popover.Header>
            <Popover.Body>
            Click this to replace player to the bottom of the queue.
            </Popover.Body>
        </Popover>
    );

    function AnchorButton(props) {
        const user = props.user;
        const rs = user.anchored
        const team = props.team;
        if(rs == false){
            return (
                <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoveranchor}>
                    <Button variant='success'   onClick={() => changeanchoruser(user,team)}><FaAnchor/></Button>
                </OverlayTrigger>
            )
        }if(rs == true){
            return (
                <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoveranchor}>
                    <Button variant='dark'   onClick={() => changeanchoruser(user,team)}><FaAnchor/></Button>
                </OverlayTrigger>
            )
        }else{
            return(<></>)
        }
    }

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
                        <th colspan="2">team blue <Button variant='warning' onClick={() => bottomqueuereplaceteam("blue")}>Replace all</Button>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentmatch.team_blue.map((user) => {
                        return  <tr>
                                    <td width="150px">
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverdelete}>
                                            <Button variant='danger' onClick={() => deletefrommatch(user,"blue")}><FaTrashAlt/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverreplace}>
                                            <Button variant='info'   onClick={() => replacefrommatch(user,"blue")}><FaRecycle/></Button>
                                        </OverlayTrigger>
                                        <AnchorButton user={user} team="blue"/>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverreplacedown}>
                                            <Button variant='warning'  onClick={() => bottomqueuereplacefrommatch(user,"blue")} ><BsBoxArrowDown/></Button>
                                        </OverlayTrigger>
                                        
                                    </td>
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
                        <th colspan="2">team red <Button variant='warning' onClick={() => bottomqueuereplaceteam("red")}>Replace all</Button>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentmatch.team_red.map((user) => {
                        return  <tr>
                                    <DisplayNameMatch user={user}/>
                                    <td width="150px">
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverreplace}>
                                            <Button variant='info'   onClick={() => replacefrommatch(user,"red")}><FaRecycle/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverdelete}>
                                            <Button variant='danger' onClick={() => deletefrommatch(user,"red")}><FaTrashAlt/></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popoverreplacedown}>
                                            <Button variant='warning'  onClick={() => bottomqueuereplacefrommatch(user,"red")} ><BsBoxArrowDown/></Button>
                                        </OverlayTrigger>
                                        <AnchorButton user={user} team="red"/>
                                        
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