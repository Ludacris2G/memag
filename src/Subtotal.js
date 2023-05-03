import React from 'react';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format'
import './Styles/Subtotal.css'
import { sumBasket } from './reducer';
import { useNavigate } from 'react-router-dom'


function Subtotal() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const proceedToPayment = () => {
        if (!basket.length) {
            alert('You got no items in your basket');
        } else if (!user) {
            alert('You must first log in or create an account')
        } else {
            navigate('/payment')
        }
        const scrollToTop = () => {
            window.scrollTo(0, 0)
        }
        scrollToTop();
    }

  return (
    <div className='subtotal'>
        <CurrencyFormat 
            renderText={(value) => (
            <>
                <div className="subtotal__proceedToPayment">
                    <span>Subtotal: ({basket?.length} items): <strong>{value}</strong></span>
                    <button onClick={proceedToPayment} className="subtotal__button">Proceed to Payment</button>
                </div>
            </>
            )
            }
            value={sumBasket(basket)}
            displayType={'text'}
            prefix={'$'}
            thousandSeparator={true}
            decimalScale={2}
        />
    </div>
  )
}

export default Subtotal
