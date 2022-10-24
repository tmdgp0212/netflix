import styled from "styled-components";
import { makeImagePath } from "../utils";

const LastEp = styled.div`
  margin: 50px 0 20px;

  > h3 {
    padding: 5px 10px;
    background-color: ${(props) => props.theme.red};
    border-radius: 5px;
  }

  > .episodes {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    cursor: pointer;

    > .still {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 100px;
      color: gray;
      background-image: url(${(props) => props.bgphoto});
      background-size: cover;
      background-position: center;
    }

    > .desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      flex: 1;

      > .title {
        display: flex;
        flex-direction: column;

        > h4 {
          word-break: keep-all;
        }

        > p {
          font-size: 14px;
          color: gray;
        }
      }

      > .ep_num {
        display: flex;

        > p {
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }

    > .overview {
      margin-top: 15px;
      word-break: keep-all;
    }
  }
`;

const LastEpisode = ({ data }) => {
  return (
    <LastEp
      bgphoto={makeImagePath(data.last_episode_to_air.still_path, "w500")}
    >
      <h3>지난 에피소드</h3>
      <div className="episodes">
        <div className="still">
          {data.last_episode_to_air.still_path === null && "이미지가 없습니다."}
        </div>
        <div className="desc">
          <div className="title">
            <h4>{data.last_episode_to_air.name}</h4>
            <p>{data.last_episode_to_air.air_date}</p>
          </div>
          <div className="ep_num">
            <p>시즌 {data.last_episode_to_air.season_number}</p>
            <p>EP.{data.last_episode_to_air.episode_number}</p>
          </div>
        </div>
        <div className="overview">{data.last_episode_to_air.overview}</div>
      </div>
    </LastEp>
  );
};

export default LastEpisode;
