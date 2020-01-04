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
  render() {
    return(
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Header />
            <Route path = "/stats" component = {MainUserStats}/>
            <Route path = "/createWalk" component = {InputLocation}/>
            <Route path = "/route" component = {RenderMap} />     
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  };
};

export default Main;






