import React, { useEffect, useState } from 'react';
import './Styles/Orders.css';
import { db, collection, doc, getDoc, getDocs, query, orderBy } from './firebase';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Order from './Order';
import moment from 'moment';


function Orders() {
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    
    const userData = async () => {
        
        const q = query(collection(db, "users", user?.uid, "orders"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        setOrders(data);
    };
    // console.log(orders);
    // console.log(orders.reverse());

    useEffect(() => {
        if (user) {
            userData();
        } else {
            setOrders([]);
        }
    }, [user])
    
  return (
    <div className='orders'>
        <h1 className='orders__yourOrders'>Your orders</h1>
      {orders.slice(0).reverse()?.map((bigOrder, i) => (
        <Order 
            order={bigOrder.basket}
            key={i}
            created={bigOrder.created}
            id={bigOrder.id}
            amount={bigOrder.amount}
        />
      ))}
    </div>
  )
}

export default Orders
