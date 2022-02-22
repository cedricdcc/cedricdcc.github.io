import React, {useState, useEffect, useRef} from 'react';
import ReactLoading from 'react-loading';
import {db} from '../utils/firebase-config';
import {Table, Button} from 'react-bootstrap';
import {collection, getDocs, addDoc} from 'firebase/firestore';

function UserPage() {
    const [Loading, setLoading] = useState(false) 
    const [users, setUsers] = useState([]);
    const [NewName, setNewName] = useState("");
    const [NewValorantName, setNewValorantName] = useState("");
    const [NewTag, setNewTag] = useState("");
    const usersCollRef = collection(db, "valo_users")
    //query users before mounting


    const createUser = async () => {
        await addDoc(usersCollRef, {name: NewName, valorant_name:NewValorantName, valorant_tag:NewTag})
        window.location.reload();
    }

    useEffect(() => {
        const getUsers = async () => {
        setLoading(true);
        const userdata = await getDocs(usersCollRef);
        console.log(userdata)
        setUsers(userdata.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setLoading(false);
    }

    getUsers()

    }, [])

    if(Loading){
        return(
        <div class="busy">
            <ReactLoading type='bars' color='grey' height={'20vw'} width={'20vw'} />
        </div>
        )
        }else{
        return (
            <div class="container">
                <input type="text" placeholder="...name" onChange={(event) => {setNewName(event.target.value)}}/>
                <input type="text" placeholder="...valorant name" onChange={(event) => {setNewValorantName(event.target.value)}}/>
                <input type="text" placeholder="...valorant tag eg :EUW" onChange={(event) => {setNewTag(event.target.value)}}/>
                <button onClick={createUser}> Create User </button>
                <hr />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th>Name</th>
                            <th>Valorant id</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => {
                        return  <tr>
                                    <td><Button>Test doesn't do anything</Button></td>
                                    <td>{user.name}</td>
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