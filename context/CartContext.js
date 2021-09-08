import { createContext } from "react";

const CartContext = createContext({
  productsCart: 0,
  addProducCart: () => null,
  getProductosCart: () => null,
  removeProductCart: () => null,
  removeProductsCart: () => null,
});

export default CartContext;
