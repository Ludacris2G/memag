import './Styles/Checkout.css'

import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { sumBasket } from './reducer';
import Subtotal from './Subtotal';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
    // console.log(basket)

  return (
    <div className='checkout'>
        <div className="checkout__content">
            <div className="checkout__left">
                <h4 className='checkout__leftHello'>Hello, {user ? user?.email + ' !' : "guest! You must be logged in to proceed with your order"}</h4>
                <h2 className='checkout__leftTitle'>Your shopping basket {!basket.length && <span>is empty</span>}</h2>
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
            </div>
            <div className="checkout__right">
                <Subtotal/>
            </div>
        </div>
    </div>
  )
}

export default Checkout
