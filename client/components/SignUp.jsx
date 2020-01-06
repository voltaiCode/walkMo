import React, { useState } from 'react';
import { Form, Col, Button} from 'react-bootstrap';
import styled from 'styled-components';
/**
 * Creating a hook to handle all of the states in input boxes
 * saves us from creating onChange handlers for them individually
 */
const useInput = init => {
  // returns a stateful value, and a function to update it.
  const [ value, setValue ] = useState(init);
  // defining onChange handlers targeting setState to update the state
  const onChange = e => {
    setValue(e.target.value);
  }
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};
/**
 * SignUp container handles the create a new user logic 
 * @param {changeLoggedIn} props loggedIn state handler, depending on the value public or main container are render
 */
const signUp = props => {
  // Setting the state and handlers by calling useInput
  const [ firstName, firstNameOnChange ] = useInput('');
  const [ lastName, lastNameOnChange ] = useInput('');
  const [ email, emailOnChange ] = useInput('');
  const [ password, passwordOnChange ] = useInput('');  
  const [ month, monthOnChange ] = useInput('Jan');
  const [ day, dayOnChange ] = useInput('1');
  const [ year, yearOnChange ] = useInput('2002');  
  
  // Setting the state for error handler bootstrap
  const [validated, setValidated] = useState(false);

  // Validates input and if correct Submit data to server
  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    // Prevents Submiting the form to server if state is not set
    if (form.checkValidity() === false) {  
      setValidated(true);
    }
    // Props are correctly set, sending data to server
    else{
      setValidated(false);
      const body = {
        firstName,
        lastName,
        email,
        password,
        month,
        day,
        year
      }
      console.log(body);
     
    //   fetch('/signUp', {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type":"Application/JSON"
    //     },
    //     body: JSON.stringify(body)
    //   })
    //   .then(resp => resp.json(0))
    //   .then(data => {
           props.changeLoggedIn(true);
    //   })
    //   .catch(err => console.log('SignUp fetch /: ERROR: ', err));    
    }   
  };

  // Creating the option field for select birthday day
  const monthOption = [
    <option key="Jan" value="Jan">Jan</option>,
    <option key="Feb" value="Feb">Feb</option>,
    <option key="Mar" value="Mar">Mar</option>,
    <option key="Apr" value="Apr">Apr</option>,
    <option key="May" value="May">May</option>,
    <option key="Jun" value="Jun">Jun</option>,
    <option key="Jul" value="Jul">Jul</option>,
    <option key="Aug" value="Aug">Aug</option>,
    <option key="Sep" value="Sep">Sep</option>,
    <option key="Oct" value="Oct">Oct</option>,
    <option key="Nov" value="Nov">Nov</option>,
    <option key="Dec" value="Dec">Dec</option>
  ];

  // Creating the option field for select birthday day
  const dayOption = () => {
    let array = [];
    for (let i = 1; i<=31; i++){
        array.push(<option key={'day'+i} value={i}>{i}</option>);
     }
    return array;
  };

  // Creating the option field for select birthday month
  const yearOption = () => {
    let array = [];
    for (let i = 2002; i>=1905; i--){
        array.push(<option key={'year'+i} value={i}>{i}</option>);
     }
    return array;
  };

  // Styling 
  const H1 = styled.h1`
    font-size: 2.1em;
    color: black;
    font-weight: bold;
    margin-top: 1em;
  `
  const P = styled.h1`
    font-size: 1.1em;
    color: black;
    font-weight: normal;
    margin-bottom: 1.5em;
  `

  return (
    <React.Fragment>
      <H1>Sign Up</H1>
      <P>It's quick and easy.</P>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Control 
              required
              type="text"
              placeholder="First name" 
              name="firstName"
              value={firstName}
              onChange={firstNameOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a first name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formLastName">
            <Form.Control 
              required
              type="text"
              placeholder="Last name" 
              name="lastName"
              value={lastName}
              onChange={lastNameOnChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a last name
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formEmail">
          <Form.Control 
            required
            type="email" 
            placeholder="Email"
            name="email"
            value={email}
            onChange={emailOnChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Control 
            required
            type="password" 
            placeholder="New password" 
            name="password"
            value={password}
            onChange={passwordOnChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a password
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Row>
          <Form.Group as={Col} controlId="formBirthdayMonth">
            <Form.Control 
              as="select"
              name="month"
              onChange={monthOnChange}
            >
              {monthOption}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formBirthdayDay">
            <Form.Control 
              as="select"
              name="day"
              onChange={dayOnChange}
            >
              {dayOption()}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formBirthdayYear">
            <Form.Control 
              as="select"
              name="year"
              onChange={yearOnChange}
            >
              {yearOption()}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button variant="success" type="submit">
          Sign Up
        </Button>
      </Form>
    </React.Fragment>
  )
};

export default signUp;
