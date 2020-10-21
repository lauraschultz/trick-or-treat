import React from "react";
import { Route, Switch } from "react-router";
import RequestPage from "./RequestPage";
import SendPage from "./SendPage";
import "./comp.css"
import Home from "./Home";

function App() {
  return (
    <>
    <div className="hidden sm:inline fixed bg-ghosts bg-repeat-y h-screen w-48 z-0 bg-contain ml-4 md:ml-12 lg:ml-32 opacity-75 left-0 top-0"></div>
    <Switch>
      <Route path="/requester" exact>
        <RequestPage />
      </Route>
      <Route path="/sender" exact>
        <SendPage />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
    </>
  );
}

export default App;
