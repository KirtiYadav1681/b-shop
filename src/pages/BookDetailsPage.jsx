import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Button from '../components/Shared/Button';

import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, addToFavorites } from "../redux/bookSlice";

const BookDetailsPage = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Find the book with the matching ID
  const book = useSelector((state) => state.book.items.find((item) => item.id === id));
  const favorites = useSelector((state) => state.book.favorites);
  const cartItems = useSelector((state) => state.book.cartItems);

  const handleAddToFavorites = (book) => {
    const isBookInFavorites = favorites.some((favorite) => favorite.id === book.id);
    if (!isBookInFavorites) {
      dispatch(addToFavorites(book));
      toast.success("Book is  added to Favorites");
    } else {
      toast.warn("Book is already in Favorites");
    }
  };

  const handleAddToCart = (book) => {
    console.log("adding")
    const isBookInCart = cartItems?.some((cartItem) => cartItem?.id === book.id);
    if (!isBookInCart) {
      dispatch(addToCart(book));
      toast.success("Book is added to Cart");
    } else {
      toast.warn("Book is already in Cart");
    }
  };


  if (!book) {
    return <div className="text-center mt-10">Book not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:w-[70vw]">
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
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Book image */}
        <div className="flex-shrink-0">
          <img
            src={book?.volumeInfo?.imageLinks?.thumbnail}
            alt={book?.volumeInfo?.title}
            className="w-full md:w-80 rounded-md object-cover"
          />
        </div>

        {/* Book details */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-4">{book?.volumeInfo?.title}</h1>
          <h2 className="text-lg text-gray-600 mb-2">
            By {book?.volumeInfo?.authors?.join(', ')}
          </h2>
          <p className="mb-4">
            Published Date: {book?.volumeInfo?.publishedDate}
          </p>
          <p className="text-gray-800 dark:text-gray-400 leading-relaxed mb-4">
            {book?.volumeInfo?.description || 'No description available.'}
          </p>

          <div className="flex flex-col md:flex-row sm:flex-row gap-2 justify-between items-center mt-4 mb-5 w-[300px]">
          {/* Add to cart button */}
          <Button
            text="Add to cart"
            bgColor="bg-primary"
            textColor="text-white"
            className="mb-4"
            handler={() => handleAddToCart(book)}
          />
          <button className="flex items-center space-x-1 text-primary focus:outline-none hover:scale-105 duration-300" onClick={() => handleAddToFavorites(book)}>
                <FaHeart className="w-5 h-5" />
                <span>Add to Favorites</span>
              </button>
            </div>

          {/* Link to go back to the product list */}
          <Link to="/" className="text-primary hover:underline">
            &larr; Back to books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
