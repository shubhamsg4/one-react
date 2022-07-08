import './App.css';
import React, { Component, Fragment, Suspense } from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";

const ViewLive = React.lazy(() => import("./views/one"));
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Suspense fallback={<div className="loading" ></div>}>
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={<ViewLive />}
            />
          </Routes>
        </Router>
      </Suspense >
    );
  }
}


export default App;
