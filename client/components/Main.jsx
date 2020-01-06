import React, { Component} from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
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
    return(
      <React.Fragment>
        <RenderMap />
      </React.Fragment>
    );
  };
};

export default Main;






