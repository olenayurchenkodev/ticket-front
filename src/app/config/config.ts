import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";

export const SK = 'pk_test_51K1qeXHdq0KWWsCrNAW0kb6zXfZzu5woq819UZ32fwMzLZIZ2lYLw5beHSXrJahy0UdXpnTlRSx6Ip7wUEibRzPa00DJASL9v3'

export const cardOptions: StripeCardElementOptions = {
  hidePostalCode: true,
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      fontWeight: '300',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '18px',
      '::placeholder': {
        color: '#CFD7E0'
      }
    }
  }
};

export const elementsOptions: StripeElementsOptions = {
  locale: 'en'
};
