import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import './Styles/Order.css'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import { sumBasket } from './reducer'

function Order({ order, created, id, amount }) {
    // console.log(order)
  return (
    <>
    <div className='order'>
        <div className="order__text">
            <div className="order__leftText">
                <h2>Order</h2>
                <p>{moment.unix(created).format('MMMM Do YYYY, h:mma')}</p>
            </div>
            <div className="order__rightText">
                <p className='order__id'>{id}</p>
            </div>
        </div>
        {order?.map((item, i) => (
        <>
        <CheckoutProduct
            image={item.image}
            title={item.title}
            rating={item.rating}
            price={item.price}
            key={i}
            hideButton={true}
        />
        </>
        ))}
        <CurrencyFormat
            renderText={(value) => (
                <p className='order__total'>Order total: <span>{value}</span></p>
            )}
            thousandSeparator={true}
            value={parseInt(amount).toFixed(2) / 100}
            prefix={'$'}
            displayType={'text'}
        />
    </div>
    </>
  )
}

export default Order

// {order.basket?.reverse().map((order, i) => (
//     <CheckoutProduct
//     key={i}
//     id={order.id}
//     image={order.image}
//     price={order.price}
//     rating={order.rating}
//     title={order.title}
// />
// ))}