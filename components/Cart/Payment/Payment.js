import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constants";
import FormPayment from "./FormPayment/FormPayment";

const stripePromise = loadStripe(STRIPE_TOKEN);

const Payment = ({ products, adress }) => {

  return (
    <div className="payment">
      <div className="title">Pago</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <FormPayment products={products} adress={adress} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
