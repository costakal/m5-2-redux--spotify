import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import ArtistRoute from "./ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

// const DEFAULT_ARTIST_ID = "46kMeWjz1bYzVPOFqk8u6a";

const App = (store) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((data) => {
        dispatch(receiveAccessToken(data.access_token));
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          {/* <Redirect to={`artist/${DEFAULT_ARTIST_ID}`} /> */}
          <Route exact path="/artist/:id">
            <ArtistRoute />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
