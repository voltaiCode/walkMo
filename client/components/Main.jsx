import React, { Component} from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
import { withScriptjs } from "react-google-maps";
import Header from './Header.jsx';
import MainUserStats from './MainUserStats.jsx';
import InputLocation from './InputLocation.jsx';
import RenderMap from './RenderMap.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'phonores'
    };
  };
  // <BrowserRouter>
  //         <Switch>
  //           <Header />
  //           <Route path = "/stats" component = {MainUserStats}/>
  //           <Route path = "/createWalk" component = {InputLocation}/>
  //           
  //         </Switch>
  //       </BrowserRouter>
  render() {
    const MapLoader = withScriptjs(RenderMap);
    return(
      <React.Fragment>
        <MapLoader
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA1pIbzYAxkCxQQz143WWX96K6DnMfn6bA`} 
          loadingElement={<div style={{ height: `100%` }} />}
        />
      </React.Fragment>
    );
  };
};

export default Main;






