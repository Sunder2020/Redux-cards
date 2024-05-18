import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const items = useSelector((state)=>state.cart);
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <span  className='logo'>THE DIAMOND STORE</span>
      <div>
        <Link to='/'  className='navlink'>HOME</Link> 
        <Link to='/cart' className='navlink'>CART</Link>
        <span className='cartCount'>CART ITMES : {items.length}</span>
        
      </div>
    </div>
  )
}

export default Navbar
