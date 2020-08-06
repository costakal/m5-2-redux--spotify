import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { useParams } from "react-router-dom";
import {
  requestCurrentArtist,
  receiveCurrentArtist,
  receiveCurrentArtistError,
} from "../../actions";
import styled from "styled-components";

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
        <Wrapper>
          <Header>
            <ArtistImage
              alt="artist-photo"
              src={currentArtist.profilePage.images[1].url}
            />
            <ArtistName>{currentArtist.profilePage.name}</ArtistName>
            <Followers>
              {abbreviateNumber(currentArtist.profilePage.followers.total)}
              <span> followers</span>
            </Followers>
          </Header>
          <Tags>
            <TagTitle>Tags</TagTitle>
            <Tag1>
              <div></div>
              {currentArtist.profilePage.genres[0]}
            </Tag1>
            <Tag2>
              <div></div>
              {currentArtist.profilePage.genres[1]}
            </Tag2>
          </Tags>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default ArtistRoute;

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  color: white;

  /* Charcoal */

  background: #0b0f14;
`;

const Header = styled.div`
  display: flex;
  position: absolute;
  width: 268px;
  height: 215px;
  left: 54px;
  top: 59px;
`;

const ArtistName = styled.h2`
  position: absolute;
  width: 268px;
  height: 59px;
  left: 0px;
  top: 173px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  /* identical to box height */

  /* White */

  color: #ffffff;
  /* Triple shadow */

  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;
`;

const ArtistImage = styled.img`
  position: absolute;
  width: 175px;
  height: 175px;
  left: 104px;
  top: 59px;

  background: url(image.png);
  border-radius: 190.5px;
`;

const Followers = styled.h3`
  position: absolute;
  width: 93px;
  height: 17px;
  left: 141px;
  top: 257px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-transform: lowercase;

  color: #ff4fd8;
  span {
    color: white;
  }
`;

const Tags = styled.div`
  /* position: absolute; */
  width: 253px;
  height: 79px;
  left: 61px;
  top: 478px;
`;

const TagTitle = styled.h4`
  position: absolute;
  width: 48px;
  height: 26px;
  left: 164px;
  top: 478px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  /* identical to box height */

  text-transform: lowercase;

  /* White */

  color: #ffffff;
`;

const Tag1 = styled.p`
  position: absolute;
  width: 93px;
  height: 29px;
  left: 61px;
  top: 528px;
  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
`;

const Tag2 = styled.p`
  position: absolute;
  width: 144px;
  height: 29px;
  left: 170px;
  top: 528px;
  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
`;
