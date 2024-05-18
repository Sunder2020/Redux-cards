import React from 'react'
import Products from '../components/Products'

const Home = () => {
  return (
    <div>
      <h2 className='heading'>WELCOME TO THE DIAMOND STORE</h2>
      <section>
        <h3>PRODUCTS</h3>
        <Products/>
      </section>
    </div>
  )
}

export default Home
