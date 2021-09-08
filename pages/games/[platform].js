import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../../layouts/BasicLayout";
import { getGamePlatformAPI, getTotalGamesPlatformAPI } from "../../api/game";
import Pagination from "../../components/Pagination/Pagination";
import { Loader } from "semantic-ui-react";
import ListGames from "../../components/ListGames";
import { size } from "lodash";

const limitPage = 10;

const Platform = () => {
  const [games, setGames] = useState(null);
  const [totalGame, setTotalGame] = useState(null);
  const { query } = useRouter();

  const getStartItem = () => {
    const currentPage = parseInt(query.game);
    if (!query.page || query.page === 1) return 0;
    else return currentPage * limitPage - limitPage;
  };

  /* effect que trae juegos por plataforma */
  useEffect(() => {
    (async () => {
      if (query.platform) {
        const resul = await getGamePlatformAPI(
          query.platform,
          limitPage,
          getStartItem()
        );
        setGames(resul);
      }
    })();
  }, [query]);

  /* efecto que trae el total de juegos por categoria */
  useEffect(() => {
    (async () => {
      const result = await getTotalGamesPlatformAPI(query.platform);
      setTotalGame(result);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Cargando..</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games}></ListGames>}

      {totalGame ? (
        <Pagination
          totalGame={totalGame}
          page={query.page ? parseInt(query.page) : 1}
          limitPage={limitPage}
        />
      ) : null}
    </BasicLayout>
  );
};

export default Platform;
