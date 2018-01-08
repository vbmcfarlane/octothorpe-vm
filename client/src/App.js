import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Videos from "./pages/Videos";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
console.log("Running client/src/App.js");
const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Videos} />
        <Route exact path="/videos" component={Videos} />
        <Route exact path="/videos/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;
export default App;