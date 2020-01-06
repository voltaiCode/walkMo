import React, { Component } from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
import { GoogleMap, withGoogleMap, DirectionsRenderer } from 'react-google-maps';

/**
 * RenderMap handles the map logic  
 * @param {*} props 
 */
class RenderMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      origin: { lat: 33.988010, lng: -118.470947 },
      destination: { lat: 33.986961, lng: -118.472458 },
      selectDestination: false,
    };
  }
  
  componentDidMount() {
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
            directions: result
          });
        }
        else {
          console.log('RenderMap fetching directions: Error: ',result);
        }
      }
    );
  }

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

    return (
      <React.Fragment>
        {this.state.selectDestination ? 
           <MapWithRoute
            containerElement={<div style={{ height: `100%`, width: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />    
          : 
          <Map 
            containerElement={<div style={{ height: `100%`, width: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        }
      </React.Fragment>
    );
  }
}
export default RenderMap; 