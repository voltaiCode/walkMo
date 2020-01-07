import React, { Component} from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
import Public from './Public.jsx';
import Main from './Main.jsx';
import NoMatch from './NoMatch.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: [],
    };
    this.changeLoggedIn = this.changeLoggedIn.bind(this);
    this.userChange = this.userChange.bind(this);
  };
  changeLoggedIn(value) {
    this.setState({
      loggedIn: value, 
    });
  }
  userChange(value) {
    this.setState({
      user: value, 
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
              {this.state.loggedIn ? <Main user={this.state.user}/> : <Public changeLoggedIn={this.changeLoggedIn} userChange={this.userChange}/>}
            </Route>      
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  };
};

export default App;