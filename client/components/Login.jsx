import React, { Component } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';


class LogIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
        
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }

    changeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleClick(event){
        event.preventDefault();
        event.stopPropagation();
        event.target.className += " was-validated";
        let self = this;
        axios.post('http://[PATH_HERE]/api/v1/login', {
            "email": this.state.username,
            "password": this.state.password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#Home">WalkMo</Navbar.Brand>
                <Form inline className="needs-validation" onSubmit={this.handleClick} noValidate>
                    <Form.Control
                        type="email"
                        className="mr-sm-2"
                        placeholder="email"
                        required
                        //value={this.state.username}
                        onChange={this.changeHandler}
                    />
                    <Form.Control
                        type="password"
                        className="mr-sm-2"
                        placeholder="password"
                        required
                        //value={this.state.password}
                        onChange={this.changeHandler}
                    />                  
                    <Button type="submit" variant="outline-info">Log In</Button>
                    
                    <Nav.Item>
                        <Nav.Link href="/Home">Forgot Password?</Nav.Link>
                    </Nav.Item>
                    
                </Form>
            </Container>
        </Navbar>         
        )
    }    
}

export default LogIn;