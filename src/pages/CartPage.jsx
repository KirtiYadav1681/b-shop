import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes, FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeFromCart, updateQuantity } from '../redux/bookSlice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.book.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success("Book is removed from cart");
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    console.log("update quantity", itemId, newQuantity);
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  // If cart is empty, redirect to home page
  if (cartItems.length === 0) {
    return <div className='flex flex-row justify-center items-center h-[50vh]'>
    <div className='text-center'>
    <h3 className='font-bold text-3xl'>No Items Added to Cart</h3>
    <br />
    <Link to='/' className='text-primary cursor-pointer font-semibold'>Continue Shopping</Link>
    </div>
    </div>
  }

  return (
    <div className="container mx-auto mt-8">
    <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-lg font-semibold dark:text-black">{item.volumeInfo.title}</h2>
            <p className="text-gray-500 mb-2">{item.author}</p>
            <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                disabled={item.quantity <= 1}
                className="p-1 text-gray-600"
              >
                <FaMinus />
              </button>
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 text-gray-600"
              >
                <FaPlus />
              </button>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="rounded-full p-1 text-red-500"
              >
                <FaTrashAlt />
              </button>
            </div>
            </div>
            <button
              onClick={() => {
                // Dispatch action to remove item from cart
              }}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <Link to="/" className="block mt-8 text-primary hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartPage;
