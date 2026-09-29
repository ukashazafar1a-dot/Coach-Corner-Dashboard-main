"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useApp from "@/context/useApp";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

type props = {
  onCancelChange?: any;
};
const StripeContainer = ({ onCancelChange }: props) => {
  const { paymentSecret } = useApp();
  const options = {
    clientSecret: paymentSecret ? paymentSecret : "",
  };

  if (!paymentSecret) return;
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;
