import styled from "styled-components";
import { makeImagePath } from "../utils";

import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  min-height: 500px;
  padding: 60px;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  cursor: default;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 56px;
`;

const OverView = styled.p`
  display: -webkit-box;
  font-size: 18px;
  width: 50vw;

  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: keep-all;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const PlayBtns = styled.div`
  display: flex;
  margin-top: 20px;

  > button {
    outline: none;
    border: none;
    background: none;

    display: flex;
    align-items: center;
    padding: 8px 25px;
    border-radius: 5px;

    cursor: pointer;

    > svg {
      margin-right: 5px;
    }

    &.play {
      margin-right: 20px;
      background-color: ${(props) => props.theme.white.darker};
    }

    &.more {
      color: #fff;
      background-color: #444;
      transition: all 0.1s;

      &:hover {
        background-color: #4a4a4a;
      }
    }
  }
`;

const Banner = ({ nowPlaying, isMovie }) => {
  const history = useNavigate();

  const onBoxClicked = (movieId) => {
    isMovie ? history(`/movies/${movieId}`) : history(`/tv/${movieId}`);
  };

  return (
    <Home bgphoto={makeImagePath(nowPlaying.results[0].backdrop_path)}>
      <Title>
        {isMovie ? nowPlaying.results[0].title : nowPlaying.results[0].name}
      </Title>
      <OverView>{nowPlaying.results[0].overview}</OverView>
      <PlayBtns>
        <button className="play">
          <FaPlay /> Play
        </button>
        <button
          className="more"
          onClick={() => onBoxClicked(nowPlaying.results[0].id)}
        >
          <FaInfoCircle /> 자세히보기
        </button>
      </PlayBtns>
    </Home>
  );
};

export default Banner;
