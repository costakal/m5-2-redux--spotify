# Exercise 1: Working with APIs

There are many third-party APIs that let us build rich applications on top of them:

- You can use the Google Maps API to embed a live map on your site
- You can use the Instagram API to display photos from Instagram
- You can use various sports APIs to build analytics apps based on sports data.

The way that they typically work is they expose a set of "RESTful endpoints".

The trickiest part of working with third-party APIs is _authentication_. APIs don't want strangers to abuse their services, so they require that you register for a _key_ and use that key on all requests.

First order of business is registering for a Spotify API key.

## Registering an API key

First, you'll need a Spotify account. If you don't already have one, you can create one for free at this URL: https://www.spotify.com/signup

After you have an account, navigate to the Dashboard login screen: https://developer.spotify.com/dashboard/login. Log in with your new account.

The very first time you do this, you'll need to agree to the terms of service.

We need to create an "app". Essentially, we need to tell Spotify what we want to do with its API. In return, it will give us some API keys we can use.

![Spotify create screen](../__lecture/assets/spotify-create.png)

Enter something like the following:

![Spotify Wizard](../__lecture/assets/spotify-wizard-1.png)

You'll be asked if this is a commercial or non-commercial application. Select **non-commercial**.

![Spotify Wizard](../__lecture/assets/spotify-wizard-2.png)

Afterwards, you should be taken to the app's home screen. This page will give us our Client ID and our Secret (we'll need to click "Show client secret" to reveal it):

![Spotify keys](../__lecture/assets/spotify-keys.png)

## Storing keys

Duplicate the `.env.example` in the root `workshop` directory, and then rename it `.env`. Copy and paste your `KEY` and `SECRET` it the `.env` file:

Replace "YOUR_KEY_HERE" with the keys provided from Spotify

```
SPOTIFY_CLIENT_ID=YOUR_KEY_HERE
SPOTIFY_SECRET=YOUR_KEY_HERE
```

## Avoiding source control

🚨 **It is very important** that you not commit this `.env` file into git - otherwise, it will show up on Github. Bad actors run scripts that search Github for exposed private keys. If they find yours, they'll use it for nefarious purposes, and you'll get banned from using the Spotify API.

You can tell git not to track certain files in the `.gitignore`.

If you open `workshop/.gitignore`, it should include this:

```
// Lots of stuff omitted

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

Because we've already added `.env` to this file, git won't try and commit it. No action is needed on your part, **but it's important to be mindful of this on other projects.** Always add your "secrets" to gitignore.
