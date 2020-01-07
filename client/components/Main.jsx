import React, { Component} from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
import { withScriptjs } from "react-google-maps";
import MainUserStats from './MainUserStats.jsx';
import RenderMap from './RenderMap.jsx'

const Main = (props) => {
  // <BrowserRouter>
  //         <Switch>
  //           <Header />
  //           <Route path = "/stats" component = {MainUserStats}/>
  //           <Route path = "/createWalk" component = {InputLocation}/>
  //           
  //         </Switch>
  //       </BrowserRouter>
    // console.log(props.user.user);
    const MapLoader = withScriptjs(RenderMap);
    return(
      <React.Fragment>
        <span id='user' value={props.user.user._id} ></span>
        <MapLoader
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA1pIbzYAxkCxQQz143WWX96K6DnMfn6bA`} 
          loadingElement={<div style={{ height: `100%` }} />}
        />
      </React.Fragment>
    );
};

export default Main;






