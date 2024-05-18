import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {add} from '../store/cartSlice'

const Products = () => {
  const dispatch = useDispatch();
  const[products,setProducts]=useState([]);

useEffect(()=>{

const fetchProduct = async()=>{
     const res = await fetch('https://fakestoreapi.com/products');
     const data = await res.json();
     console.log(data);
     setProducts(data);
}
fetchProduct();
},[])

const handleAdd = (product) =>{
      dispatch(add(product))
}

  return (
    <>
    
    <div className='productsWrapper'>
      {
       products.map((product)=>(
            <div className='card' key={product.id}>
            <img src={product.image} alt='products'/>
            <h4>{product.title}</h4>
            <h4>{product.price}</h4>
            <button className='btn' onClick={()=>handleAdd(product)}>ADD TO CART</button>

            </div>
       ))
      }
    </div>
   
    </>
  )
}

export default Products
