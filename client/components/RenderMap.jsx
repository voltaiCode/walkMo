import React, { Component } from 'react';
import { GoogleMap, withGoogleMap, DirectionsRenderer } from 'react-google-maps';
import { Form, Button, Col, Container } from 'react-bootstrap';

/**
 * RenderMap handles the map logic  
 * @param {*} props 
 */
class RenderMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '0.4',
      directions: null,
      origin: { lat: 33.988010, lng: -118.470947 },
      destination: {},
      selectDestination: false,
    };
    this.distanceOnChange = this.distanceOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.runService = this.runService.bind(this);
  }
  
  // componentDidMount(){
  //   let aux = document.getElementById('user').value;
  //   console.log(aux);
  // }

  // Calculating the route with google map Api
  runService() {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: this.state.origin,
        destination: this.state.destination,
        travelMode: google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            selectDestination: true,
          });
        }
        else {
          console.log('RenderMap fetching directions: Error: ',result);
        }
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    // Distance selected in KM
    const distanceSelected = Number(this.state.distance)/2;
    // Radius of the Earth
    const radius = 6378.1
    // Obtaining a random bearing in degrees
    let bearing = Math.floor(Math.random() * 360);
    // Transforming to Radians
    bearing = Math.floor((bearing*Math.PI)/180);
    // Transforming origin latitud to Radians
    let lat1 = (Number(this.state.origin.lat)*Math.PI)/180;
    let lng1 = (Number(this.state.origin.lng)*Math.PI)/180;
    // Calculating destination in radians
    let lat2 = Math.asin(Math.sin(lat1)*Math.cos(distanceSelected/radius) + 
                     Math.cos(lat1)*Math.sin(distanceSelected/radius)*Math.cos(bearing));
    let lng2 = lng1 + Math.atan2(Math.sin(bearing)*Math.sin(distanceSelected/radius)*Math.cos(lat1),
                      Math.cos(distanceSelected/radius)-Math.sin(lat1)*Math.sin(lat2));
    // Changing back to degrees
    lat2 = ((lat2*180)/Math.PI);
    lng2 = ((lng2*180)/Math.PI);
    // Setting destination state
    this.setState(prevState => {
      let destination = Object.assign({},prevState.destination);
      destination.lat = Number(lat2);
      destination.lng = Number(lng2);
      return { destination };
    }, this.runService);
  };
  
  handleFinish(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('saving data');
    this.setState({
      selectDestination: false,
    });
    console.log(document.getElementById('user').value);
    // fetch('/signUp', {
      //     method: 'POST',
      //     headers: {
      //       "Content-Type":"Application/JSON"
      //     },
      //     body: JSON.stringify(body)
      //   })
      //   .then(resp => resp.json(0))
      //   .then(data => {
            //  props.changeLoggedIn(true);
      //   })
      //   .catch(err => console.log('SignUp fetch /: ERROR: ', err)); 
  }

  distanceOnChange(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      distance: e.target.value, 
    });
  };

  render() {
    // Wrapping the map with the correct funtions
    const MapWithRoute = withGoogleMap(props => (
      // Setting the map component with props to be render
      <GoogleMap 
        defaultZoom={10} 
        defaultCenter={this.state.origin}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    // Wrapping the map with the correct funtions
    const Map = withGoogleMap(props => (
      // Setting the map component with props to be render
      <GoogleMap 
        defaultZoom={10} 
        defaultCenter={this.state.origin}
      />
    ));

    // Option distance value is given in Km
    return (
      <React.Fragment>
        {this.state.selectDestination ? 
          ( <React.Fragment>
              <Container>
                <h1>Complete your walk:</h1>
                <Form noValidate onSubmit={this.handleFinish}>
                  <Button variant="success" type="submit">
                    Finalize Walk
                  </Button>
                </Form>            
              </Container>
              <Container>
                <MapWithRoute
                 containerElement={<div style={{ height: `100%`, width: "100%" }} />}
                 mapElement={<div style={{ height: `100%` }} />}
                />  
              </Container>
            </React.Fragment>
          )  
          : 
          (
            <React.Fragment>
              <Container>
                <h1>Select walk duration:</h1>
                <Form noValidate onSubmit={this.handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formDistance">
                      <Form.Control 
                        as="select"
                        name="distance"
                        onChange={this.distanceOnChange}
                      >
                        <option value='0.4'>5 min</option>
                        <option value='0.8'>10 min</option>
                        <option value='1.2'>15 min</option>
                        <option value='1.6'>20 min</option>
                        <option value='2'>25 min</option>
                        <option value='2.4'>30 min</option>
                        <option value='2.8'>35 min</option>
                        <option value='3.2'>40 min</option>
                        <option value='3.6'>45 min</option>
                        <option value='4'>50 min</option>
                        <option value='4.4'>55 min</option>
                        <option value='4.8'>60 min</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Button variant="success" type="submit">
                        Start Walking
                      </Button>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Container>
              < Container>
                <Map 
                  containerElement={<div style={{ height: `80%`, width: "80%" }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Container>
            </React.Fragment>
          )
        }
      </React.Fragment>
    );
  }
}
export default RenderMap; 