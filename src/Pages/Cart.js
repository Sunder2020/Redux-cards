import React, { useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../store/cartSlice';
import Modal from 'react-modal';

const Cart = () => {
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [paymentError, setPaymentError] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const products = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const handleFakePayment = () => {
    if (!validatePaymentInfo()) {
      setPaymentError('Please fill in all required fields.');
      return;
    }

    setIsProcessingPayment(true);
    // Simulate payment process
    setTimeout(() => {
      setIsPaymentCompleted(true);
      setIsProcessingPayment(false);
      setPaymentError('');
      setIsPaymentModalOpen(false); // Close the modal after payment completion
    }, 2000);
  };

  const validatePaymentInfo = () => {
    const { name, cardNumber, expiryDate, cvv } = paymentInfo;
    return name.trim() !== '' && cardNumber.trim() !== '' && expiryDate.trim() !== '' && cvv.trim() !== '';
  };

  return (
    <>
      <h1>CART</h1>
      <div className='cartWrapper'>
        {products &&
          products.map(product => (
            <div className='cartCard' key={product.id}>
              <img src={product.image} alt='products' />
              <h5>{product.title}</h5>
              <h5>{product.price}</h5>
              <button className='btn' onClick={() => handleRemove(product.id)}>
                REMOVE
              </button>
            </div>
          ))}
      </div>
      <Modal
        isOpen={isPaymentModalOpen}
        onRequestClose={() => setIsPaymentModalOpen(false)}
        contentLabel='Payment Modal'
      >
        <h2>Payment Information</h2>
        <form className='paymentForm'>
          <input
            type='text'
            name='name'
            placeholder='Name on Card'
            value={paymentInfo.name}
            onChange={handleInputChange}
            required
          />
          <input
            type='text'
            name='cardNumber'
            placeholder='Card Number'
            value={paymentInfo.cardNumber}
            onChange={handleInputChange}
            required
          />
          <div className='expiry-cvv'>
            <input
              type='text'
              name='expiryDate'
              placeholder='Expiry Date'
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
              required
            />
            <input
              type='text'
              name='cvv'
              placeholder='CVV'
              value={paymentInfo.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
        {paymentError && <p className='error'>{paymentError}</p>}
        <button className='btn' onClick={handleFakePayment} disabled={isProcessingPayment}>
          {isProcessingPayment ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </Modal>
      {!isPaymentCompleted && (
        <button className='btn' onClick={() => setIsPaymentModalOpen(true)}>Open Payment</button>
      )}
      {isPaymentCompleted && (
        <div className='orderSummary'>
          <h2>Order Summary</h2>
          <p>Thank you for your order!</p>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                {product.title} - ${product.price}
              </li>
            ))}
          </ul>
          <p>Total: ${products.reduce((total, product) => total + product.price, 0)}</p>
        </div>
      )}
    </>
  );
};

export default Cart;
