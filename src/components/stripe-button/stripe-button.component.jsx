import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    console.log(token);
    alert("Payment successful")
}

const StripCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IuDR2SGFD3NAhQDt22SWpUgWTBFuBOvGV8U1pV4xMCnGAWn6wQmSTPdeKH6xTRZeNXhov4kn8NhHwc9bds54wOJ00iDeHYelu";

    return (
        <StripeCheckout 
            label="Pay Now"
            name="BSolz"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripCheckoutButton;