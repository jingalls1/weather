import React from "react";
import ErrorBoundary from "./ErrorBoundary.js";
import Weather from "./Weather.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ErrorBoundary>
        <div className="App">
          <Weather />
        </div>
      </ErrorBoundary>
    );
  }
}
