import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import {
  FaPlay,
  FaPlus,
  FaThumbsUp,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeImagePath } from "../utils";

const Slider = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 50px;
  padding-bottom: 25%;

  > h3 {
    width: fit-content;
    margin: 0 0 15px 60px;
    cursor: pointer;
  }

  > button {
    background: none;
    border: none;
    outline: none;

    position: absolute;
    top: 50%;
    height: 200px;
    margin-top: -100px;
    color: ${(props) => props.theme.white.darker};
    font-size: 36px;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.red};
    }

    &.prev {
      left: 0;
    }

    &.next {
      right: 0;
    }
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  padding: 0 60px;
`;

const Box = styled(motion.div)`
  position: relative;
  padding-bottom: 150%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transform-origin: center bottom;

  &:first-child {
    transform-origin: left bottom;
  }

  &:last-child {
    transform-origin: right bottom;
  }

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    z-index: 100;

    > .title {
      word-break: keep-all;
      opacity: 1;
    }

    > div {
      display: flex;
    }
  }

  > .title {
    display: flex;
    align-items: flex-end;
    position: absolute;
    bottom: 0;
    padding: 15px;
    width: 100%;
    height: 50%;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
    transition: opacity 0.3s;
    opacity: 0;
  }
`;

const Info = styled(motion.div)`
  display: none;
  flex-direction: column;
  position: absolute;
  bottom: -80px;
  width: 100%;
  height: 80px;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};

  > .btns {
    display: flex;
    color: ${(props) => props.theme.white.lighter};

    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      margin: 0 5px;
      border: 2px solid gray;
      border-radius: 50%;

      transition: border 0.3s;

      &:hover {
        border: 2px solid ${(props) => props.theme.white.lighter};
      }

      > svg {
        font-size: 12px;
      }
    }
  }

  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    margin-top: 10px;
  }
`;

const offset = 6;

const MovieSlide = ({ title, data, isMovie }) => {
  const history = useNavigate();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const [innerWidth, setInnerwidth] = useState(window.innerWidth);

  useEffect(() => {
    setInnerwidth(window.innerWidth);
  }, [window.innerWidth]);

  const rowVariants = {
    hidden: { x: innerWidth },
    visible: { x: 0 },
    exit: { opacity: 0 },
  };

  const rowVariantsback = {
    hidden: { x: -innerWidth },
    visible: { x: 0 },
    exit: { opacity: 0 },
  };

  const increaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setIsPrev(false);
    setIndex((prev) =>
      prev < Math.ceil(data.results.length / offset) - 2 ? prev + 1 : (prev = 0)
    );
  };

  const decreaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setIsPrev(true);
    setIndex((prev) =>
      prev > 0 ? prev - 1 : (prev = Math.ceil(data.results.length / offset) - 2)
    );
  };

  const onBoxClicked = (movieId) => {
    isMovie ? history(`/movies/${movieId}`) : history(`/tv/${movieId}`);
  };

  return (
    <Slider>
      <h3>{title} &gt;</h3>
      <AnimatePresence initial={false} onExitComplete={() => setLeaving(false)}>
        <Row
          key={index + { title }}
          variants={isPrev ? rowVariantsback : rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
        >
          {data.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                key={movie.id}
                layoutId={String(movie.id)}
                whileHover={{ scale: 1.1, y: -20 }}
                transition={{ type: "tween", duration: 0.2 }}
                bgphoto={makeImagePath(movie.poster_path, "w300")}
                onClick={() => onBoxClicked(movie.id)}
              >
                <h4 className="title">{isMovie ? movie.title : movie.name}</h4>
                <Info>
                  <div className="btns">
                    <span>
                      <FaPlay />
                    </span>
                    <span>
                      <FaPlus />
                    </span>
                    <span>
                      <FaThumbsUp />
                    </span>
                  </div>
                  <p>
                    {movie.overview === ""
                      ? "줄거리 정보가 없습니다 :( "
                      : movie.overview}
                  </p>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
      <button className="prev" onClick={decreaseIndex}>
        <FaAngleLeft />
      </button>
      <button className="next" onClick={increaseIndex}>
        <FaAngleRight />
      </button>
    </Slider>
  );
};

export default MovieSlide;
