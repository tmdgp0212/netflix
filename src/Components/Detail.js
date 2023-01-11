import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { makeImagePath } from "../utils";

import { FaStar } from "react-icons/fa";
import LastEpisode from "./LastEpisode";
import Similar from "./Similar";

const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 80px;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 540px;
  height: 720px;
  max-height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
`;

const BackdropImg = styled.div`
  min-height: 300px;
  background-image: linear-gradient(
      transparent,
      ${(props) => props.theme.black.lighter}
    ),
    url(${(props) => props.bgphoto});
  background-position: center;
  background-size: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 420px;
  padding: 0px 25px 20px;
  flex: 1;

  cursor: default;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e510138a;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.black.darker};
  }

  > h3 {
    position: absolute;
    top: 250px;
    color: ${(props) => props.theme.white.darker};
    font-size: 36px;
  }

  > .origin_title {
    color: gray;
  }

  > .etc {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;

    > .genres {
      > span {
        margin-right: 5px;
      }
    }

    > p {
      display: flex;
      align-items: center;

      > svg {
        margin-right: 5px;
        color: ${(props) => props.theme.red};
      }
    }
  }

  > .overview {
    flex: 1;
    line-height: 1.5;
    word-break: keep-all;
  }
`;

const Detail = ({ isMovie }) => {
  const history = useNavigate();
  const bigMovieMatch = useMatch(isMovie ? "/movies/:movieId" : "/tv/:movieId");

  const { data, isLoading } = useQuery(
    bigMovieMatch.params.movieId,
    MovieDetails
  );

  function MovieDetails() {
    return fetch(
      `https://api.themoviedb.org/3/${isMovie ? "movie" : "tv"}/${
        bigMovieMatch.params.movieId
      }?api_key=1157463f787b86f6b3274330f0cd685f&language=ko`
    ).then((response) => response.json());
  }

  const onOverlayClick = (e) => {
    document.body.style.overflow = 'unset';
    return e.target === e.currentTarget && history(-1);
  };

  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay
            onClick={(e) => onOverlayClick(e)}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BigMovie layoutId={bigMovieMatch.params.movieId}>
              {isLoading ? null : (
                <>
                  <BackdropImg
                    bgphoto={makeImagePath(data.backdrop_path, "w500")}
                  ></BackdropImg>
                  <Details>
                    <h3>{isMovie ? data.title : data.name}</h3>
                    <div className="origin_title">
                      {isMovie ? data.original_title : data.original_name},{" "}
                      {isMovie
                        ? data.release_date.slice(0, 4)
                        : data.first_air_date.slice(0, 4)}
                    </div>
                    <div className="etc">
                      <div className="genres">
                        {data.genres.map((gnr) => (
                          <span key={gnr.id}>{gnr.name}</span>
                        ))}
                      </div>
                      <p>
                        <FaStar /> 평점 {data.vote_average}
                      </p>
                    </div>
                    <div className="overview">
                      {data.overview === ""
                        ? "제공된 줄거리 정보가 없습니다."
                        : data.overview}
                    </div>
                    {isMovie ? (
                      <Similar movieId={bigMovieMatch.params.movieId} />
                    ) : (
                      <LastEpisode data={data} />
                    )}
                  </Details>
                </>
              )}
            </BigMovie>
          </Overlay>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default Detail;
