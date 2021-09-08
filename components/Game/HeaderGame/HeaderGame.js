import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button, Loader } from "semantic-ui-react";
import {
  isFavoriteAPI,
  addFavoriteAPI,
  removeFavoriteAPI,
} from "../../../api/favorite";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { size } from "lodash";
import classNames from "classnames";

const HeaderGame = (props) => {
  const { game, setReload } = props;

  useEffect(() => {
    if (!game) {
      setReload(true);
    }
  }, []);

  if (!game) return <Loader active>Cargando..</Loader>;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={game.poster.url} alt={game.title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
};

const Info = (props) => {
  const { game } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();
  const { addProducCart } = useCart();

  useEffect(() => {
    (async () => {
      if (auth) {
        const result = await isFavoriteAPI(auth.idUser, game.id, logout);
        if (size(result) > 0) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    })();
    setReloadFavorite(false);
  }, [game, reloadFavorite]);

  //funcion para agregar a favorito
  const addFavorite = async () => {
    if (auth) {
      setLoading(true);
      await addFavoriteAPI(auth.idUser, game.id, logout);
      setReloadFavorite(true);
      setLoading(false);
    }
  };

  //eliminar de favoritos
  const removeFavorite = async () => {
    if (auth) {
      setLoading(true);
      await removeFavoriteAPI(auth.idUser, game.id, logout);
      setReloadFavorite(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {game.title}
        {loading ? (
          <Icon loading name="spinner" />
        ) : (
          <Icon
            name={isFavorite ? "heart" : "heart outline"}
            className={classNames({ like: isFavorite })}
            onClick={isFavorite ? removeFavorite : addFavorite}
            link
          />
        )}
      </div>
      <div className="header-game__delivery">Entrega en 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: game.summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de Venta: ${game.price}</p>
          {game.discount && (
            <div className="header-game__buy-price-actions">
              <p>-{game.discount}% </p>
              <p>
                {(
                  game.price -
                  Math.floor(game.price * game.discount) / 100
                ).toFixed(2)}
                $
              </p>
            </div>
          )}
        </div>
        <Button
          className="header-game__buy-btn"
          onClick={() => addProducCart(game.url)}
        >
          Comprar
        </Button>
      </div>
    </>
  );
};

export default HeaderGame;
