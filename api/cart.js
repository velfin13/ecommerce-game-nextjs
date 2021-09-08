import { BASE_PATH, CART } from "../utils/constants";
import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { authFech } from "../utils/fecth";

export const getProductosCart = () => {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
};

export const addProducCart = (product) => {
  const cart = getProductosCart();

  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto ya ha sido añadido al carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido");
    }
  }
};

export const countProductsCart = () => {
  const cart = getProductosCart();
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
};

export const removeProductCart = (product) => {
  const cart = getProductosCart();
  remove(cart, (item) => {
    return item === product;
  });

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
};

export const paymentCartApi = async (
  token,
  products,
  idUser,
  address,
  logout
) => {
  try {
    const addressShipping = address;
    delete addressShipping.users_permissions_user;
    delete addressShipping.createdAt;
    delete addressShipping.published_at;
    delete addressShipping.updatedAt;

    const url = `${BASE_PATH}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };
    const result = await authFech(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeAllProductsCart = () => {
  localStorage.removeItem(CART);
};
