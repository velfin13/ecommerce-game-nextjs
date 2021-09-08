import React, { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { Loader } from "semantic-ui-react";
import { getLastGame } from "../api/game";
import { size } from "lodash";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";

const Home = () => {
  /* states */
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastGame(50);
      if (size(response) > 0) setGames(response);
      else setGames([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <Seo/>
      {!games && <Loader active>Cargando Juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
};

export default Home;
