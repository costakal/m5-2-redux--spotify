import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import ArtistRoute from "./ArtistRoute";

const DEFAULT_ARTIST_ID = "46kMeWjz1bYzVPOFqk8u6a"

const App = (store) => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Redirect to={`artist/${DEFAULT_ARTIST_ID}`} />
          <Route exact path="/artist/:id">
            <ArtistRoute />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
