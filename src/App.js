import React, { Component } from "react";
import CovidApp from "./components/CovidApp";
import Paper from "./components/Paper";
import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
    };
    this.setDarkMode = this.setDarkMode.bind(this);
  }

  setDarkMode(e) {
    this.setState({ isDarkMode: e.target.checked });
  }

  render() {
    const { isDarkMode } = this.state;
    return (
      <Paper isDarkMode={this.state.isDarkMode}>
        <div className="root">
          <div className="navBar">
            <Navbar isDarkMode={isDarkMode} />
          </div>
          <div className="mainContent">
            <Switch>
              <Route
                exact
                path={process.env.PUBLIC_URL + "/"}
                render={() => (
                  <CovidApp
                    setDarkMode={this.setDarkMode}
                    isDarkMode={this.state.isDarkMode}
                  />
                )}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/symptoms"}
                render={() => <h1>symptoms</h1>}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/stay-safe"}
                render={() => <h1>Stay Safe</h1>}
              />
              <Route
                exact
                path={process.env.PUBLIC_URL + "/help"}
                render={() => <h1>Help Page</h1>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/"}
                render={() => (
                  <CovidApp
                    setDarkMode={this.setDarkMode}
                    isDarkMode={this.state.isDarkMode}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Paper>
    );
  }
}

export default App;
