import React, { useEffect, useState } from 'react'
import './CSS/Cart.css'
import axios from 'axios'

const Cart = () => {
    const [cart,setCart] = useState([])
    const [address,setAddress] = useState('')
const API_URL = import.meta.env.VITE_APi_Url

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("cart")) || []
        setCart(data)
    },[])


    const getTotal = ()=>{
        return cart.reduce((total,item)=>total+item.price*item.quantity,0)
    }


    const handlePlace =async()=>{
      try {
          const res = await axios.post(`${API_URL}/api/order`,{address,cart})
        alert("Order Placed Successfully")
        localStorage.removeItem("cart")
        setCart([])
        setAddress('')
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="cart-container">
    
    <h2 className="cart-title">My Cart</h2>

    {cart.length===0 ? (
        <h3 className="empty-cart">Cart is empty</h3>
    ) : (
        cart.map((item)=>(
            <div className="cart-item" key={item._id}>
                <img className="cart-image" src={item.image} alt="" />
                <div className="cart-details">
                    <h3 className="cart-title-text">{item.title}</h3>
                    <p className="cart-description">{item.des}</p>
                    <p className="cart-description">{item.quantity}</p>
                    <p className="cart-price">₹{item.price}</p>
                </div>
            </div>
        ))
    )}

    <h1>Total Price:- {getTotal()}</h1>
    <input type="text" placeholder='Enter Your Address' onChange={(e)=>setAddress(e.target.value)}/> <br /> <br />
    <button onClick={handlePlace}>Place Order</button>
    
    </div>
  )
}

export default Cart