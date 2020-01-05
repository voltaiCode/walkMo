import React, { Component} from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
import Home from './Home.jsx';
import Main from './Main.jsx';

class App extends Component {
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
            <Route exact path = "/" component = {Home}/>
            <Route exact path = "/stats" component = {Main}/>       
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  };
};

export default App;