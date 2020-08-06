# Exercise 6: Managing the access token

Our first order of business: as soon as possible, we want to hit our backend server to get a Spotify access token, so that we can request data from spotify directly.

We'll do this in `App.js`, since that's our top-level component.

How do we do something in React immediately after the first render? We can use `React.useEffect`.

Inside the useEffect hook, make a `fetch` call to `/spotify_access_token`. When you have the response as JSON, start by logging it out. We can also catch any errors, and log them with console.error.

Take a few minutes to see if you can get this working. You should see a console message that looks like `{ access_token: 'fjdufhsd89fhdsfhs' }`. We'll add the Redux bits next, but you should use previous workshops to solve this first part.

> If you're getting an error, `SyntaxError: Unexpected token < in JSON at position 0`, it's likely because you need to add a "proxy" field to your package.json. Scroll back up to the "Setup" section and add that.

Here's our starting point, without Redux:

```js
// Inside App.js
React.useEffect(() => {
  fetch("/spotify_access_token")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);
```

We have three states we care about:

- The request is made, but we don't yet have the token (it's loading)
- The request is successful, and we have a token
- The request failed

Let's create Redux action-creators for each one. Add the following lines to `src/actions.js`

```js
export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});
```

Import those actions into App.js, and let's dispatch them at the right time:

```diff
React.useEffect(() => {
+ dispatch(requestAccessToken());

  fetch('/spotify_access_token')
    .then(res => res.json())
    .then(json => {
-     console.log(json);
+     dispatch(receiveAccessToken(json.access_token));
    })
    .catch(err => {
      console.error(err);
+     dispatch(receiveAccessTokenError());
    });
}, []);
```

Let's update our auth.reducer to handle these actions:

```diff
export default function authReducer(state = initialState, action) {
  switch (action.type) {
+   case 'REQUEST_ACCESS_TOKEN': {
+     return {
+       ...state,
+       status: 'loading',
+     };
+   }

+   case 'RECEIVE_ACCESS_TOKEN': {
+     return {
+       ...state,
+       token: action.token,
+       status: 'idle',
+     };
+   }

+    case 'RECEIVE_ACCESS_TOKEN_ERROR': {
+     return {
+       ...state,
+       status: 'error',
+     };
+   }

    default: {
      return state;
    }
  }
}

```

Verify that the actions are being dispatched correctly in the Redux Devtools, and updating the state:

![Redux Devtools showing the action log and the effect on state](../__lecture/assets/redux-devtools-auth-token.png)

Notice that the `RECEIVE_ACCESS_TOKEN` action changes both the token from `null` to a random string, and the `status` from "loading" to "idle".

Cool! So our next goal is to select this token in our application. For now, we'll render it to verify that our Redux plumbing is correct.

Use the `useSelector` hook from the `react-redux` package to select it:

```js
// ArtistRoute.js
const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);

  return accessToken;
};
```

Here's what our beautiful page looks like:

![Blank page with an access token](../__lecture/assets/render-token.png)

> _That was **a lot** of setup!!_
>
> The biggest complaint people have about redux is that there's "too much boilerplate". It takes a lot of work to set it up. It feels like it makes everything a bit slower.
>
> On a small application like this, it's probably not worth the trouble. But Redux shines on large, hairy applications. Many many companies use it because it actually _speeds up_ their development… but those speed gains are only noticeable when you have a medium or large codebase.
