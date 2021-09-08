import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import { getOrderApi } from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from "../components/Orders/Order";
import Seo from "../components/Seo";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const { logout, auth } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrderApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <Seo title="Mis pedidos" />
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              Aún no has hecho ningun pedido
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

const OrderList = ({ orders }) => {
  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default Orders;
