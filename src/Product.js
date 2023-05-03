import React from 'react';
import { useStateValue } from './StateProvider';
import './Styles/Product.css';
import { ACTIONS } from './reducer';

function Product({ id, title, rating, price, image }) {
    const [{ basket, user}, dispatch] = useStateValue();
    // console.log(basket)
    const addToBasket = () => {
        dispatch({
            type: ACTIONS.ADD_TO_BASKET,
            item: {
                id: id,
                title: title,
                rating: rating,
                price: price,
                image: image
            }
        })
    }


  return (
    <div className='product'>
        <h4 className='product__title'>{title}</h4>
        <span className='product__rating'>{
        Array(rating)
            .fill()
            .map((_, i) => (
            <span key={i}>⭐</span>
        ))}</span>
        <img className='product__img' src={image} alt="" />
        <p className='product__price'>
            <span>$</span>
            <span className='product__priceValue'>{price}</span>
        </p>
        <button onClick={addToBasket} className="product__button">Add to Basket</button>
    </div>
  )
}

export default Product
