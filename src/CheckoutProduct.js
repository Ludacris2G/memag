import React from 'react'
import { ACTIONS } from './reducer';
import { useStateValue } from './StateProvider'
import './Styles/CheckoutProduct.css'

function CheckoutProduct({ id, image, price, rating, title, hideButton }) {
    const [{ basket, user }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: ACTIONS.REMOVE_FROM_BASKET,
            id: id
        })
    }


  return (
    <div className='checkoutProduct'>
        <img src={image} alt="" />
        <div className="checkoutProduct__leftSide">
            <h4>{title}</h4>
            <span>
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <span key={i}>⭐</span>
                    ))
            }</span>
            <span className='checkoutProduct__price'>${price}</span>
            {!hideButton && <button onClick={removeFromBasket} className='checkoutProduct__button'>Remove from Basket</button>}
            
        </div>
    </div>
  )
}

export default CheckoutProduct
