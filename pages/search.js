import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchGameAPI } from "../api/game";
import ListGames from "../components/ListGames";
import { Loader } from "semantic-ui-react";
import Seo from "../components/Seo";

const search = () => {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGameAPI(query.query);
        if (size(response) > 0) {
          setGames(response);
        } else {
          setGames([]);
        }
      } else {
        setGames([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
      <Seo title={`Buscando: ${query.query}`} />
      {!games && <Loader active>Cargando..</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay resultados</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games}></ListGames>}
    </BasicLayout>
  );
};

export default search;
