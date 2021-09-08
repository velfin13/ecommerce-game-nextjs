import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

const SummaryCart = ({ products, setReloadCart, reloadCart }) => {
  const { removeProductCart } = useCart();
  const [totalprice, setTotalprice] = useState(0);

  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product[0].price;
    });
    setTotalprice(price);
  }, [reloadCart, products]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Productos</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product[0].id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product[0].url)}
                  />
                  <Image src={product[0].poster.url} alt={product[0].title} />
                  {product[0].title}
                </Table.Cell>
                <Table.Cell>{product[0].platform.title}</Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>{product[0].price}$</Table.Cell>
              </Table.Row>
            ))}
            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="2">Total: 0</Table.Cell>
              <Table.Cell className="total-price">
                {totalprice.toFixed(2)} $
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default SummaryCart;
