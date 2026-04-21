import React, { useEffect, useState } from 'react'
import Cards from '../Components/Cards'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './CSS/Products.css'
import axios from 'axios'

const Products = () => {

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || []
  })

  const [product, setProduct] = useState([])

  const getProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/get-all')
      setProduct(res.data.product)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const addTocart = (item) => {
    const existingItem = cart.find((i) => i._id === item._id)

    if (existingItem) {
      const updateCart = cart.map((i) =>
        i._id === item._id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
      setCart(updateCart)
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <>
      <Header cart={cart} />

      <div>
        <h2 style={{ textAlign: "center" }}>Products</h2>

        <div className="product-container">
          {product.map((item, i) => (
            <div className='card-outer' key={i}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.des}</p>
              <h3>{item.price} rs</h3>

              <button onClick={() => addTocart(item)}>
                Add to cart
              </button>

              <button>Buy Now</button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Products