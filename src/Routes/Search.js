import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { FaStar } from "react-icons/fa";

const Wrapper = styled.div`
  padding: 80px 60px;
`;

const SearchInput = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;

  > input {
    outline: none;
    border: none;

    width: 50vw;
    height: 50px;
    padding: 0 30px;
    color: ${(props) => props.theme.white.darker};
    font-family: "Pretendard-Regular", "Source Sans Pro", sans-serif;
    font-size: 18px;
    background-color: transparent;
    outline: 2px solid ${(props) => props.theme.red};
    border: ${(props) => props.theme.red};
  }

  > button {
    outline: none;
    border: none;

    height: 54px;
    padding: 0 35px;
    color: ${(props) => props.theme.white.darker};
    font-size: 18px;
    background-color: ${(props) => props.theme.red};

    cursor: pointer;
  }
`;

const SearchedMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 100px;

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
  }

  > h2 {
    grid-column: span 2;
    font-size: 48px;

    @media screen and (max-width: 992px) {
      grid-column: initial;
    }
  }

  > .null {
    grid-column: span 2;
    text-align: center;
    color: gray;

    @media screen and (max-width: 992px) {
      grid-column: initial;
    }
  }
`;

const Content = styled.div`
  display: flex;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 5px;
  cursor: default;

  > .poster {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 285px;
    color: gray;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.black.lighter};
  }

  > .info {
    flex: 1;
    padding: 10px 30px;

    > h3 {
      margin-bottom: 5px;
      font-size: 22px;
    }

    > .origin_title {
      color: gray;
    }

    > .vote {
      display: flex;
      align-items: center;
      margin: 20px 0;

      > svg {
        margin-right: 5px;
        color: ${(props) => props.theme.red};
      }
    }

    > .overview {
      word-break: keep-all;
      line-height: 1.5;
    }
  }
`;

const Search = () => {
  const keywordMatch = useMatch("/search/:keyword");
  const history = useNavigate();

  function SearchMovies() {
    return fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=1157463f787b86f6b3274330f0cd685f&language=ko&query=${
        keywordMatch ? keywordMatch.params.keyword : "???"
      }&include_adult=false`
    ).then((response) => response.json());
  }

  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [TVs, setTVs] = useState([]);

  const { data, isLoading } = useQuery(
    ["keyword", keywordMatch ? keywordMatch.params.keyword : null],
    SearchMovies
  );

  const onInputChange = (e) => {
    setKeyword(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history(`/search/${keyword}`);
  };

  useEffect(() => {
    if (data) {
      setMovies(data.results.filter((it) => it.media_type === "movie"));
      setTVs(data.results.filter((it) => it.media_type === "tv"));
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (keywordMatch) {
      setKeyword(keywordMatch.params.keyword);
    }
  }, [keywordMatch]);
  return (
    <Wrapper>
      <SearchInput onSubmit={(e) => onSubmit(e)}>
        <input
          placeholder="???????????? ??????????????????"
          value={keyword}
          onChange={onInputChange}
        />
        <button>??????</button>
      </SearchInput>
      <SearchedMovies>
        {isLoading ? null : (
          <>
            <h2>??????</h2>
            {movies.length <= 0 ? (
              <div className="null">
                "{keywordMatch ? keywordMatch.params.keyword : " "}"??? ??????
                ??????????????? ????????????.
              </div>
            ) : (
              movies.map((movie) => (
                <Content
                  key={movie.id}
                  bgPhoto={makeImagePath(movie.poster_path, "w300")}
                >
                  <div className="poster">
                    {movie.poster_path ? null : "???????????? ????????????"}
                  </div>
                  <div className="info">
                    <h3>{movie.title}</h3>
                    <p className="origin_title">
                      {movie.original_title}, {parseInt(movie.release_date)}
                    </p>
                    <p className="vote">
                      <FaStar />
                      ?????? {movie.vote_average}
                    </p>
                    <div className="overview">
                      {movie.overview === ""
                        ? "????????? ????????? ????????????."
                        : movie.overview}
                    </div>
                  </div>
                </Content>
              ))
            )}
          </>
        )}
      </SearchedMovies>
      <SearchedMovies>
        {isLoading ? null : (
          <>
            <h2>TV ????????????</h2>
            {TVs.length <= 0 ? (
              <div className="null">
                "{keywordMatch ? keywordMatch.params.keyword : " "}"??? ??????
                ??????????????? ????????????.
              </div>
            ) : (
              TVs.map((tv) => (
                <Content
                  key={tv.id}
                  bgPhoto={makeImagePath(tv.poster_path, "w300")}
                >
                  <div className="poster">
                    {tv.poster_path ? null : "???????????? ????????????"}
                  </div>
                  <div className="info">
                    <h3>{tv.name}</h3>
                    <p className="origin_title">
                      {tv.original_name}, {parseInt(tv.first_air_date)}
                    </p>
                    <p className="vote">
                      <FaStar />
                      ?????? {tv.vote_average}
                    </p>
                    <div className="overview">
                      {tv.overview === ""
                        ? "????????? ????????? ????????????."
                        : tv.overview}
                    </div>
                  </div>
                </Content>
              ))
            )}
          </>
        )}
      </SearchedMovies>
    </Wrapper>
  );
};

export default Search;
