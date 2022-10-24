import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getMovies, getTopRated, getUpcoming } from "../api";
import Detail from "../Components/Detail";
import MovieSlide from "../Components/MovieSlide";
import Banner from "../Components/Banner";

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

const Home = () => {
  const history = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");

  const { data: nowPlaying, isLoading } = useQuery(
    ["movies", "nowPlaying"],
    getMovies
  );

  const { data: upcoming, isLoading: upcomingLoading } = useQuery(
    ["movies", "upcoming"],
    getUpcoming
  );

  const { data: toprated, isLoading: topratedLoading } = useQuery(
    ["movies", "toprated"],
    getTopRated
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>loading</Loader>
      ) : (
        <>
          <Banner nowPlaying={nowPlaying} isMovie />

          <MovieSlide title={"Now Playing"} data={nowPlaying} isMovie />
          {topratedLoading ? null : (
            <MovieSlide title={"Top Rated"} data={toprated} isMovie />
          )}
          {upcomingLoading ? null : (
            <MovieSlide title={"Upcomming"} data={upcoming} isMovie />
          )}
          {bigMovieMatch ? <Detail isMovie /> : null}
        </>
      )}
    </Wrapper>
  );
};

export default Home;
