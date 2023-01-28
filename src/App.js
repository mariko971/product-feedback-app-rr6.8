import React from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

const mapStateToProps = (state) => ({
  appData: state.appData,
});
export default connect(mapStateToProps)(App);
