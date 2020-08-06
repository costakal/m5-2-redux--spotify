# Exercise 5: Routing

Our application is only going to have one route: `/artists/:id`. We'll take the artist ID from the URL and send it to Spotify to fetch all the data we need.

What if the user goes to the home route, `localhost:3000/`? We can use `Redirect` to send them to a "placeholder" artist (the artist it starts on).

You'll need the Spotify ID for a musician you like. You can figure this out by googling "spotify [artist name]". The first search result should be the Spotify artist page. The artist's Spotify ID can be found in the URL:

![screenshot showing the Spotify artist ID in the URL](../__lecture/assets/spotify-id.png)

While testing, you'll hear a fair amount of their music, so pick something good!

With this ID in hand, let's add it to our main `App` component, and import our React Router friends:

```diff
import React from 'react';
import {
  BrowserRouter as Router,
+ Switch,
+ Route,
+ Redirect,
} from 'react-router-dom';

import GlobalStyles from '../GlobalStyles';

+const DEFAULT_ARTIST_ID = '2CIMQHirSU0MQqyYHq0eOx';

const App = () => {
  return <Router>TODO</Router>;
};

export default App;
```

Use the React Router documentation, as well as previous workshops, to create a route for `/artists/:id`, and a `<Redirect>` that otherwise sends users to `/artists/${DEFAULT_ARTIST_ID}`.

Create a new component, `ArtistRoute`, which will be rendered when the artist path matches.

> To make life a bit easier, you can use the terminal command `yarn nc ComponentName`. For example, in this case, you can run `yarn nc ArtistRoute`. It will create the correct component structure for you.
>
> `nc` stands for "New Component". This functionality comes from an NPM package called `new-component` (https://www.npmjs.com/package/new-component).
