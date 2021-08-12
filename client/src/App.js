import React from 'react';
import HomePage from './HomePage';
import FileUploader from './FileUploader';
import Video from './Video';
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="nav">
            <Link to="/">Home page</Link>
            <Link to="/send-video">Send video</Link>
          </div>
          <Route
            exact path="/"
            render={() => (
              <HomePage/>
            )}
          />
          <Route
            exact path="/video/:id"
            render={(props) => (
              <Video
                id={props.match.params.id}
              />
            )}
          />
          <Route
            exact path="/send-video"
            render={() => (
              <FileUploader />
            )}
          />
        </BrowserRouter>
      </div >
    )
  }
}