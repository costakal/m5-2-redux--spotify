# Exercise 7: Artist profile

Let's use our shiny new access token to fetch information about the artist.

### Fetching the artist from Spotify

Create a new folder, `helpers`, in the `src` directory. Inside that new folder, create a new file, `api-helpers.js`.

We want this file because we may want to have _many_ different API calls to the Spotify API, and we should keep them all in the same place, for organization.

Create a new function that will fetch the artist profile from the API:

```js
export function fetchArtistProfile(token, artistId) {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const url = `https://api.spotify.com/v1/artists/${artistId}`;

  return fetch(url, options).then((response) => response.json());
}
```

This URL was found in the Spotify API documentation. We can see information about it here: https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/

We're sending an `Authorization` header with our access token, and we're hitting the URL shown in the docs:

> GET https://api.spotify.com/v1/artists/{id}

Here is an example of the data returned from the API:

```json
{
  "external_urls": {
    "spotify": "https://open.spotify.com/artist/0OdUWJ0sBjDrqHygGUXeCF"
  },
  "followers": {
    "href": null,
    "total": 306565
  },
  "genres": ["indie folk", "indie pop"],
  "href": "https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF",
  "id": "0OdUWJ0sBjDrqHygGUXeCF",
  "images": [
    {
      "height": 163,
      "url": "https://i.scdn.co/image/2efc93d7ee88435116093274980f04ebceb7b527",
      "width": 200
    },
    {
      "height": 52,
      "url": "https://i.scdn.co/image/4f25297750dfa4051195c36809a9049f6b841a23",
      "width": 64
    }
  ],
  "name": "Band of Horses",
  "popularity": 59,
  "type": "artist",
  "uri": "spotify:artist:0OdUWJ0sBjDrqHygGUXeCF"
}
```

We will want to make a request to this API in `ArtistRoute`. To make this request, we need two pieces of information: the Spotify access token, and the artist ID:

```js
// ArtistRoute.js
const ArtistRoute = () => {
  const accessToken = useSelector(state => state.auth.token);

  const artistId = ???

  fetchArtistProfile(accessToken, artistId)

  // render something
};
```

You'll need to get the `artistId` from the URL params. Check out the React Router Dom documentation to rediscover how to hook into and access the URL params.

**There's a "gotcha" here.** The very first time this component runs, you won't have `accessToken` - that data only becomes available after a few seconds, since it needs to fetch it from the API. So the very first time this component renders, you won't have the data you need.

Here's a similar case, and how to solve it:

```js
const SomeOtherApp = () => {
  const aDependentValue = useSelector(getDependantValue);
  const someOtherValue = 5;

  // Run an effect whenever `aDependentValue` changes.
  // ⚠️ Notice the "dependencies array" is [aDependentValue]
  React.useEffect(() => {
    // If we don't have that value, do nothing
    if (!aDependentValue) {
      return;
    }

    // If we make it here, we KNOW we have it!
    doSomethingWithDependentValue(aDependentValue, someOtherValue);
  }, [aDependentValue]);
};
```

### Managing data in Redux

Follow the same steps you did earlier for the auth token stuff:

- Create new actions in `src/actions.js` for the initial data fetch, the successful data response, and the error.
- Add a reducer to `src/artist-reducer.js`
- The initial state for `artist-reducer` should look like this:

```js
const initialState = {
  currentArtist: null,
  status: "idle",
};
```

- When the info is first requested, the status should flip to `loading`
- When the data is successfully received, we should set `currentArtist` to be equal to this shape:

```js
state = {
  status: "idle",
  currentArtist: {
    profile: {
      /* All the data we got from Spotify */
    },
  },
};
```

- When the data is not successfully received, set `status` to `error`.

### Updating the UI

Once the data is in your Redux store, use `useSelector` to fetch the `currentArtist`. The data you get from Spotify includes:

- Several images of the artist
- The artist's name
- The artist's number of followers
- An array of genres for the artist

Spend some time rendering this to the screen. Don't worry about styles yet, but do focus on good component structure / semantic HTML.

You will need to manipulate the data somewhat, in the following ways:

1. You only want to show the first 2 genres. The Spotify API might return many more.
2. We should show a "short version" for the # of followers. Instead of displaying "2451376 followers", we should say "2M followers". Instead of "12345" followers, "12K followers". Feel free to write a utility function for this, or search for a pre-existing solution online.

In the end, you should have something like this:

<img src="../__lecture/assets/initial-profile.png" alt="Finished app" />

> Remember, the first time this renders, you won't have an artist yet! You can render a fallback, like the text "Loading...", until you have an artist you can use.
