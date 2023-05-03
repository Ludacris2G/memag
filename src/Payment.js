import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import './Styles/Payment.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { sumBasket } from './reducer';
import { useNavigate, Link } from 'react-router-dom';
import axios from './axios';
import { ACTIONS } from './reducer';
import { db, doc, setDoc } from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const navigate = useNavigate();
    
    const fixedTotal = parseFloat(sumBasket(basket)).toFixed(2).toString().replace('.', '')
    // console.log(fixedTotal);
    
    useEffect(() => {
        // generate stripe secret
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${fixedTotal * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket, fixedTotal])

    // console.log('THE SECRET IS >>>>', clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
        .then(({ paymentIntent }) => {

            const addToCollection = async () => {
                await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
                    basket: basket,
                    amount: fixedTotal,
                    created: paymentIntent.created,
                })
            } 
            addToCollection();
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: ACTIONS.EMPTY_BASKET
            })

            navigate('/orders', {replace: true})
        })
    }

    const handleChange = e => {

        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

  return (
    <div className='payment'>
      <h1 className='payment__title'>Checkout <Link to='/checkout'>({basket.length} products)</Link></h1>
      {basket.map((product, i) => (
                <CheckoutProduct
                    key={i}
                    id={product.id}
                    image={product.image}
                    price={product.price}
                    rating={product.rating}
                    title={product.title}
                />
            ))}
        <form onSubmit={handleSubmit}>
            <div className="payment__flexPaymentContainer">

                <h3>Payment method</h3>
                <div className="payment__priceContainer">
                    <CardElement className='payment__cardElement' onChange={handleChange}/>
                    <small className='payment__tip'>Pro Tip: fill in card field with '4242424242....' in order to pay🗿</small>
                    <CurrencyFormat 
                        renderText={(value) => (
                            <>
                                <div className="payment__orderTotal">
                                    <span>Order total: <strong>{value}</strong></span>
                                </div>
                            </>
                        )}
                        value={sumBasket(basket)}
                        displayType={'text'}
                        prefix={'$'}
                        thousandSeparator={true}
                        decimalScale={2}
                    />
                <button className="payment__payButton" disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
                </div>
            </div>
            {/* errors */}
            {error && <div>{error}</div>}
        </form>
    </div>
  )
}

export default Payment
