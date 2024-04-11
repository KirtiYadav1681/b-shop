import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes, FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { removeFromCart, updateQuantity } from '../../redux/bookSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartDrawer = ({ isOpen, onClose }) => {
    console.log("cart");
  const cartItems = useSelector((state) => state.book.cartItems);
  const dispatch = useDispatch();
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success("Book is removed from cart", {
      onClose: onClose, // Pass the onClose function to close the cart drawer
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  
  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-black z-60 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition duration-300 ease-in-out`}>
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
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
        <h2 className="text-lg font-bold text-white">Shopping Cart</h2>
        <button onClick={onClose}>
          <FaTimes className="text-gray-500" />
        </button>
      </div>
      <div className="p-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={item.volumeInfo.imageLinks.thumbnail}
                alt={item.volumeInfo.title}
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{item.volumeInfo.title}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                disabled={item.quantity <= 1}
                className="p-1 text-white"
              >
                <FaMinus />
              </button>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 text-white"
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
        ))}
      </div>
      {/* <button onClick={handleCheckout} disabled={cartItems.length === 0 || isCheckoutLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {isCheckoutLoading ? 'Processing...' : 'CHECKOUT'}
      </button> */}
    </div>
  );
};

export default CartDrawer;






