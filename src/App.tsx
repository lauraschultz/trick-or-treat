import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import RequestPage from "./RequestPage";
import SendPage from "./SendPage";

function App() {
  return (
    <Switch>
      <Route path="/requester" exact>
        <RequestPage />
      </Route>
      <Route path="/sender" exact>
        <SendPage />
      </Route>
      <Route path="/" exact>
        I am...
        <Link to="/requester">requesting candy</Link>
        <Link to="/sender">sending candy</Link>
      </Route>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
