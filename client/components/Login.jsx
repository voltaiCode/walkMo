import React, { Component, useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Col} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';


const userInput = init => {
    const  [value, setValue ] = useState(init);
    const onChange = e => {
        setValue(e.target.value);
    }
    return [value, onChange];
}

const LogIn = props => {
    const [username, usernameOnChange ] = userInput('');
    const [password, passwordOnChange ] = userInput('');

    const [validated, setValidated] = useState(false);
    
    const handleClick = event =>{
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        
        if (form.checkValidity() === false){
            setValidated(true);
        }
        
        else {
            const body = {
                username,
                password
            }
            setValidated(false);
            console.log(body)
            // fetch('/URL here',{
            //     method: 'POST',
            //     header: {"Content-Type": "Application/JSON"},
            //     body: JSON.stringify(body)
            // })
            // .then(resp => resp.json())
            // .then(data => {
                  props.changeLoggedIn(true);
            // })
            // .catch(err => console.log('Error: Log In User failed', err);
        }
    }
    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#Home">WalkMo</Navbar.Brand>
                
                <Form noValidate validated={validated} onSubmit={handleClick}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="email"
                                className="mr-sm-2"
                                placeholder="email"
                                required
                                value={username}
                                onChange={usernameOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email
                            </Form.Control.Feedback>
                         </Form.Group>  

                        <Form.Group as={Col}> 
                            <Form.Control
                                type="password"
                                className="mr-sm-2"
                                placeholder="password"
                                required
                                value={password}
                                onChange={passwordOnChange}
                            /> 
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password
                            </Form.Control.Feedback>
                        </Form.Group> 
                        <Form.Group as={Col}> 
                        <Button type="submit" variant="outline-info">Log In</Button>
                    {/* <Nav.Item>
                        <Nav.Link href="/Home">Forgot Password?</Nav.Link>
                    </Nav.Item> */}
                        </Form.Group> 
                    </Form.Row> 
                </Form>
                
            </Container>
        </Navbar>         
    )       
}

export default LogIn;
