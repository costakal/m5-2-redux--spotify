import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { useParams } from "react-router-dom";
import {
  requestCurrentArtist,
  receiveCurrentArtist,
  receiveCurrentArtistError,
} from "../../actions";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const currentArtist = useSelector((state) => state.artist.currentArtist);
  const { artistId } = useParams();
  const dispatch = useDispatch();

  console.log(currentArtist);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    dispatch(requestCurrentArtist());

    fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        dispatch(receiveCurrentArtist(data));
      })
      .catch((err) => dispatch(receiveCurrentArtistError(err)));
  }, [accessToken]);

  function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
      var suffixes = ["", "k", "m", "b", "t"];
      var suffixNum = Math.floor(("" + value).length / 3);
      var shortValue = "";
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat(
          (suffixNum != 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + "").replace(
          /[^a-zA-Z 0-9]+/g,
          ""
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }

  return (
    <>
      {currentArtist ? (
        <div>
          <img
            alt="artist-photo"
            src={currentArtist.profilePage.images[1].url}
          />
          <h2>{currentArtist.profilePage.name}</h2>
          <h3>
            {abbreviateNumber(currentArtist.profilePage.followers.total)}{" "}
            <span>followers</span>
          </h3>
          <h4>Tags</h4>
          {currentArtist.profilePage.genres.map((genre) => (
            <p key={genre}>{genre}</p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ArtistRoute;
