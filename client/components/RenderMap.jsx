import React from 'react';
import { 
  GoogleMap, 
  withScriptjs, 
  withGoogleMap, 
  DirectionsRenderer 
} from 'react-google-maps';

/**
 * Setting the map component with props to be render
 */
function Map() {
  return (
    <GoogleMap 
      defaultZoom={10} 
      defaultCenter={{lat: 47.444, lng: -122.176}}
    />
  );
}
/**
 * Wrapping the map with the correct funtions
 */
const WrappedMap = withScriptjs(withGoogleMap(Map));

/**
 * RenderMap handles the map logic  
 * @param {*} props 
 */
const RenderMap = props => {
    return (
      <React.Fragment>
        <WrappedMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA1pIbzYAxkCxQQz143WWX96K6DnMfn6bA`} 
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />       
      </React.Fragment>
    )
  }

export default RenderMap; 