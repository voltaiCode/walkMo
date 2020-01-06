import React, { Component} from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
import Public from './Public.jsx';
import Main from './Main.jsx';
import NoMatch from './NoMatch.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
    this.changeLoggedIn = this.changeLoggedIn.bind(this);
  };
  changeLoggedIn(value) {
    this.setState({
      loggedIn: value, 
    });
  }
  // <Route exact path = "/stats" component = {Main}/>         
  //  <Route component = {NoMatch} />  
  render() {
    return(
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {this.state.loggedIn ? <Main /> : <Public changeLoggedIn={this.changeLoggedIn} />}
            </Route>      
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  };
};

export default App;