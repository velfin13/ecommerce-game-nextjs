import React, { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getGameByIdAPI } from "../api/game";
import useCart from "../hooks/useCart";
import SummaryCart from "../components/Cart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping";
import Payment from "../components/Cart/Payment/Payment";

const cart = () => {
  const { getProductosCart } = useCart();
  const products = getProductosCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
};

/* si el carrito viene vacio */
const EmptyCart = () => {
  return (
    <BasicLayout className="empty-cart">
      <h2>Carrito vacio</h2>
    </BasicLayout>
  );
};

/* si el carrito tiene productos */
const FullCart = ({ products }) => {
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [adress, setAdress] = useState(null);

  useEffect(() => {
    (async () => {
      const productsTemp = [];
      for await (const product of products) {
        const data = await getGameByIdAPI(product);
        productsTemp.push(data);
      }
      setProductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="empty-cart">
      <SummaryCart
        products={productsData}
        setReloadCart={setReloadCart}
        reloadCart={reloadCart}
      />
      <AddressShipping setAdress={setAdress} />
      {adress && <Payment products={productsData} adress={adress}/>}
    </BasicLayout>
  );
};

export default cart;
