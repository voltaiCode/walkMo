import React, { Component } from 'react';
import { 
  GoogleMap, 
  withGoogleMap, 
  DirectionsRenderer 
} from 'react-google-maps';

/**
 * RenderMap handles the map logic  
 * @param {*} props 
 */
class RenderMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
    };
  }

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    const origin = { lat: 33.988010, lng: -118.470947 };
    const destination = { lat: 33.986961, lng: -118.472458 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
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
    const WrappedMap = withGoogleMap(props => (
      // Setting the map component with props to be render
      <GoogleMap 
        defaultZoom={10} 
        defaultCenter={{ lat: 33.988010, lng: -118.470947 }}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));
    return (
      <React.Fragment>
        <WrappedMap 
          containerElement={<div style={{ height: `100%`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />       
      </React.Fragment>
    );
  }
}
export default RenderMap; 