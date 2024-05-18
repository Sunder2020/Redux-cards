import React from 'react'
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../store/cartSlice';

const Cart = () => {
  const products  = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const handleRemove =(productId)=>{
    
    dispatch(remove(productId))

  }
  return (
    <>
    <h1>CART</h1>
    <div className='cartWrapper'>

      {
       products && products.map(product => (
          <div className='cartCard' key={product.id}>
            <img src={product.image} alt='products'/>
            <h5>{product.title}</h5>
            <h5>{product.price}</h5>
            <button className='btn' onClick={()=>handleRemove(product.id)}>REMOVE</button>
          </div>
        ))
      }
      
    </div>
    </>
  )
}

export default Cart
