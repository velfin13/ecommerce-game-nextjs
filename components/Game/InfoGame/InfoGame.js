import React from "react";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import "moment/locale/es";
import { Loader } from "semantic-ui-react";
import CarouselScreenshots from "../CarouselScreenshots";

const InfoGame = ({ game }) => {
  if (!game) return <Loader active>Cargando..</Loader>;

  return (
    <div className="info-game">
      {game ? (
        <ReactPlayer
          className="info-game__video"
          controls={true}
          url={game.video}
        />
      ) : (
        <Loader active>Cargando..</Loader>
      )}
      <CarouselScreenshots title={game.title} screeshots={game.screeshots} />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game.summary }} />
        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento:</h4>
          <p>{moment(game.releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoGame;
