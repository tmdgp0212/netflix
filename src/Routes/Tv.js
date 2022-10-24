import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getTvShows, getTvTopRated } from "../api";
import MovieSlide from "../Components/MovieSlide";
import Detail from "../Components/Detail";
import Banner from "../Components/Banner";
import { useEffect } from "react";

const Wrapper = styled.div`
  max-width: 1920px;
  min-width: 992px;
  overflow: hidden;
  margin: 0 auto;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: #fff;
`;

const Tv = () => {
  const bigMovieMatch = useMatch("/tv/:movieId");

  const { data: nowPlaying, isLoading } = useQuery(
    ["tvShow", "nowPlaying"],
    getTvShows
  );

  const { data: topRated, isLoading: topRatedIsLoading } = useQuery(
    ["tvShow", "topRated"],
    getTvTopRated
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>loading</Loader>
      ) : (
        <>
          <Banner nowPlaying={nowPlaying} />

          <MovieSlide title={"Now Playing"} data={nowPlaying} />
          {topRatedIsLoading ? null : (
            <MovieSlide title={"Top Rated"} data={topRated} />
          )}

          {bigMovieMatch ? <Detail isMovie={false} /> : null}
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
