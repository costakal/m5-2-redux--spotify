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

export const requestCurrentArtist = () => ({
  type: "REQUEST_CURRENT_ARTIST",
});

export const receiveCurrentArtist = (artist) => ({
  type: "RECEIVE_CURRENT_ARTIST",
  artist,
});

export const receiveCurrentArtistError = () => ({
  type: "RECEIVE_CURRENT_ARTIST_ERROR",
});
