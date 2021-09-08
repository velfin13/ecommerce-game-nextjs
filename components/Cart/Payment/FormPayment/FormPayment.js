import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { paymentCartApi } from "../../../../api/cart";

const FormPayment = ({ products, adress }) => {
  const [loading, setLoading] = useState(false);

  const { logout, auth } = useAuth();

  const { removeAllProductsCart } = useCart();

  const route = useRouter();

  const stripe = useStripe();
  const element = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !element) return null;
    const cardElement = element.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
    } else {
      console.log("hola");
      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        adress,
        logout
      );
      console.log(response);
      if (size(response) > 0) {
        toast.success("Pedido completado!");
        removeAllProductsCart();
        route.push("/")
        setLoading(false);
      } else {
        toast.error("Error al realizar el pedido");
        setLoading(false);
      }
    }
  };
  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe}>
        Realizar pago
      </Button>
    </form>
  );
};

export default FormPayment;
