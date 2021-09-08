import React, { useEffect, useState } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Swal from "sweetalert2";
import { getMeAPI } from "../../../api/user";
import { getPlatformAPI } from "../../../api/platform";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { map } from "lodash";

const { Item } = Menu;

const MenuWeb = () => {
  /* states */
  const [showModal, setShowModal] = useState(false);
  const [platform, setPlatform] = useState([]);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  const [user, setUser] = useState(undefined);
  const { logout, auth } = useAuth();

  /* useEffect que trae datos del usuario */
  useEffect(() => {
    (async () => {
      const response = await getMeAPI(logout);
      setUser(response);
    })();
  }, [auth]);

  /* useEffect que trae datos del menu de plataformas */
  useEffect(() => {
    (async () => {
      const result = await getPlatformAPI();
      setPlatform(result || []);
    })();
  }, []);

  /* funciones que abren y cierran el modal */
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  /* extraer Colum de Grid */
  const { Column } = Grid;

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Column className="menu__left" width={6}>
            <MenuPlatforms platform={platform} />
          </Column>
          <Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                logout={logout}
                user={user}
              />
            )}
          </Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
};

/* componente de de opciones de plataformas */
const MenuPlatforms = ({ platform }) => {
  return (
    <Menu>
      {map(platform, (platform) => (
        <Link key={platform._id} href={`/games/${platform.url}`}>
          <Menu.Item as="a" name={platform.url}>
            {platform.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
};

/* componente de menu de opciones del usuario */
const MenuOptions = (props) => {
  const { onShowModal, user, logout } = props;
  const { productsCart } = useCart();
  /* funcion de deslogear */
  const cerrarSesion = () => {
    Swal.fire({
      title: "Estas seguro de cerrar Sesion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar Sesion",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Item>
          </Link>

          <Link href="/wishlist">
            <Item as="a">
              <Icon name="heart outline" />
              Favoritos
            </Item>
          </Link>

          <Link href="/account">
            <Item as="a">
              <Icon name="user outline" />
              {user.name}
            </Item>
          </Link>

          <Link href="/cart">
            <Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Item>
          </Link>

          <Item onClick={cerrarSesion} className="m-0">
            <Icon name="power off" />
          </Item>
        </>
      ) : (
        <Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Item>
      )}
    </Menu>
  );
};

export default MenuWeb;
