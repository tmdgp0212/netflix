import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const MovieRecommend = styled.div`
  margin: 50px 0 20px;

  > h3 {
    padding: 5px 10px;
    background-color: ${(props) => props.theme.red};
    border-radius: 5px;
  }
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  padding: 0 10px;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }

  > .poster {
    width: 140px;
    height: 210px;
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-position: center;
  }

  > .desc {
    > h4 {
      margin: 10px 0;
      word-break: keep-all;
      text-align: center;
    }
  }
`;

const Similar = ({ movieId }) => {
  const { data, isLoading } = useQuery(["similar", movieId], getSimilarMovies);

  function getSimilarMovies() {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=1157463f787b86f6b3274330f0cd685f&language=ko`
    ).then((response) => response.json());
  }

  return (
    <MovieRecommend>
      <h3>비슷한 장르</h3>
      {isLoading ? (
        "Loading.."
      ) : (
        <Movies>
          {data.results.slice(0, 9).map((movie) => (
            <Movie
              key={movie.id}
              bgphoto={makeImagePath(movie.poster_path, "w300")}
            >
              <div className="poster"></div>
              <div className="desc">
                <h4>{movie.title}</h4>
              </div>
            </Movie>
          ))}
        </Movies>
      )}
    </MovieRecommend>
  );
};

export default Similar;
