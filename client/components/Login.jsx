import React, { Component, useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Col} from 'react-bootstrap';

//function to initiate state and onChange handler
const userInput = init => {
    const  [value, setValue ] = useState(init);
    const onChange = e => {
        setValue(e.target.value);
    }
    return [value, onChange];
}
//using Hooks to create state and use validated method in Bootstrap
const LogIn = props => {
    const [email, usernameOnChange ] = userInput('');
    const [password, passwordOnChange ] = userInput('');

    const [validated, setValidated] = useState(false);
    
    //handleClick handler to check validation of log in and setState
    const handleClick = event =>{
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();    
        if (form.checkValidity() === false){
            setValidated(true);
        }     
        else {
            const body = {
                email,
                password
            }
            setValidated(false);            
            fetch('/login', {
                method: 'POST',
                headers: {
                  "Content-Type":"Application/JSON"
                },
                body: JSON.stringify(body)
              })
              .then(resp => resp.json(0))
              .then(data => {
                if (data.authenticated) {
                    props.userChange(data);
                    props.changeLoggedIn(true);
                }
                else {
                  alert("Check credentials and try again");
                }
              })
              .catch(err => console.log('Login fetch /: ERROR: ', err));  
        }
    }
    return(
        <Navbar bg="dark" variant="dark">

            <Navbar.Brand href="#Home">WalkMo</Navbar.Brand>

                <Form noValidate validated={validated} onSubmit={handleClick} className='ml-auto'>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="email"
                                className="mr-sm-2"
                                placeholder="email"
                                required
                                value={email}
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
                        <Button type="submit" variant="outline-success">Log In</Button>
                    {/* <Nav.Item>
                        <Nav.Link href="/Home">Forgot Password?</Nav.Link>
                        </Nav.Item> */}
                    </Form.Group> 
                </Form.Row> 
             </Form>
        </Navbar>         
    )       
}

export default LogIn;
