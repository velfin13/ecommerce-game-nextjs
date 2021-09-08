import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { size, forEach } from "lodash";
import { getFavoriteAPI } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import ListGames from "../components/ListGames";
import { Loader } from "semantic-ui-react";

const wishlist = () => {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteAPI(auth.idUser, logout);
      if (size(response) > 0) {
        const listGames = [];
        forEach(response, (data) => {
          listGames.push(data.game);
        });
        setGames(listGames);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de Favoritos</div>

        <div className="data">
          {!games && <Loader active>Cargando..</Loader>}
          {games && size(games) === 0 && (
            <div>
              <h3>No hay juegos</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games}></ListGames>}
        </div>
      </div>
    </BasicLayout>
  );
};

export default wishlist;
