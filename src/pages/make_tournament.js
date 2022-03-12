import {Table, Button, Popover, OverlayTrigger, Form} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import '../css/make_tournament.css';
function MakeTournamentPage(){
 // consts here

 //functions here
    const logeverything = async() =>  {
        console.log("test");
    };


 // return here
 return (
     <>
     <div className="form">
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Tournament Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name tournament" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>number of players</Form.Label>
                <Form.Select aria-label="Default select example">
                    <option>Select number of teams</option>
                    <option value="32">32</option>
                    <option value="16">16</option>
                    <option value="8">8</option>
                    <option value="4">4</option>
                </Form.Select>
            </Form.Group>
            
            <Form.Check 
                type="switch"
                id="custom-switch"
                label="double elimination"
            />

            <Button variant="primary" onClick={() => logeverything()}>
                Make tournament
            </Button>
        </Form>
     </div>
     </>
 )
}

export default MakeTournamentPage