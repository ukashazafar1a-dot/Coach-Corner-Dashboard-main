"use client";
import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import useApp from "@/context/useApp";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CheckoutForm = () => {
  const router = useRouter();
  const elements = useElements();
  const stripe = useStripe();
  const {
    completeOrder,
    cancelOrder,
    setClientSecret,
    setOrderFailed,
    setToaster,
  } = useApp();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [disableBtns, setDisableBtns] = useState(false);
  const [error, setError] = useState<string | undefined | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setIsProcessing(false);
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
      //   confirmParams: {
      //     return_url: 'http://localhost:3000/?Id=create-test-2',
      //   },
    });
    console.log(result)
    if (result?.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setIsProcessing(false);
      setError(result?.error?.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.

      try {
        const { data: response }: any = await completeOrder();
        if (response && response?.succeeded) {
          setToaster(
            "success",
            response?.messages[0] || "Order completed successfully."
          );
          const { data } = response;
          console.log(data);
          return;
        } else {
          setToaster("error", response?.messages[0] || "Something went wrong!");
          setOrderFailed(true);
          setClientSecret(null);
          setIsProcessing(false);
        }
        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
        setClientSecret(null);
        setOrderFailed(true);
      }
    }
  };
  const handleOrderCancel = async () => {
    try {
      setLoading(true);
      const { data: response }: any = await cancelOrder();
      if (response && response?.succeeded) {
        setClientSecret(null);
        router.push("/");
        setToaster(
          "success",
          response?.messages[0] || "Order cancelled successfully!"
        );
      } else {
        setClientSecret(null);
        setToaster("error", response?.messages[0] || "Something went wrong!");
        router.push("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const onOrderCancel = (e: any) => {
    e.preventDefault();
    handleOrderCancel();
  };
  useEffect(() => {
    if (isProcessing || loading) {
      setDisableBtns(true);
    } else {
      setDisableBtns(false);
    }
  }, [isProcessing, loading]);

  return (
    <div className="stripe-form-custom">
      <form className="w-100" onSubmit={(e) => handleSubmit(e)}>
        <PaymentElement
          className="payment-element mb-3"
          options={{ layout: { type: "accordion", defaultCollapsed: false } }}
        />
        {error && (
          <p className="py-2 text-sm text-red-500 font-medium mb-3s">{error}</p>
        )}
        <div className="flex mb-3 items-center justify-between">
          <button
            className="btn btn--secondary"
            type="button"
            disabled={!stripe || disableBtns}
            onClick={onOrderCancel}
          >
            <span>Cancel</span>
            {loading && (
              <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3" />
            )}
          </button>
          <button
            className="btn btn--primary"
            type="submit"
            disabled={!stripe || disableBtns}
          >
            <span>Pay Now</span>
            {isProcessing && (
              <AiOutlineLoading3Quarters className="animate-spin icon icon-loading fill-white ms-3" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
