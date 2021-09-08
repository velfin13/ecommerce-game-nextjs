import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

/* contexts */
import AuthContext from "../context/authContext";
import CartContext from "../context/CartContext";

import { setToken, getToken, removeToken } from "../api/token";
import {
  getProductosCart,
  addProducCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart
} from "../api/cart";
import Speaner from "../components/Speaner";

import "../scss/global.scss";

import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MyApp = ({ Component, pageProps }) => {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  /* verifica que el usuario este autenticado */
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  /* use efect para recarcagr el carrito */
  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  /* autenticacion */
  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  /* carrito de compras*/

  const addProduct = (producto) => {
    const token = getToken();
    if (token) {
      addProducCart(producto);
      setReloadCart(true);
    } else {
      toast.warning("Para comprar un juego debes iniciar sesión");
    }
  };

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  const cartdata = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProducCart: (product) => addProduct(product),
      getProductosCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return <Speaner />;
  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartdata}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default MyApp;
