import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import styled from 'styled-components';

const Public = (props) => {
  // Styling 
  const H1 = styled.h1`
    font-size: 2.1em;
    color: black;
    font-weight: bold;
    margin-top: 3em;
    margin-bottom: 2em;
  `
  const P = styled.h1`
    font-size: 1.1em;
    color: black;
    font-weight: normal;
    margin-bottom: 2em;
  `
  return (
    <React.Fragment>
    <LogIn changeLoggedIn={props.changeLoggedIn} />
    <Container>
      <Row>
        <Col>
        <H1> Start moving and get points! </H1>
        <P>See your previous completed walks</P>
        <P>Enjoy new places with easy and fun routes </P>
        </Col>
        <Col>
        <SignUp changeLoggedIn={props.changeLoggedIn}/>
        </Col>
      </Row>     
    </Container>
    </React.Fragment>
  );
};

export default Public;