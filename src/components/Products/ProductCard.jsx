import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToFavorites, addToCart } from '../../redux/bookSlice';
import { useSelector, useDispatch } from 'react-redux';

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.book.favorites);
  const cartItems = useSelector((state) => state.book.cartItems);

  const handleAddToFavorites = (book) => {
    const isBookInFavorites = favorites.some((favorite) => favorite.id === book.id);
    if (!isBookInFavorites) {
      dispatch(addToFavorites(book));
      toast.success("Book is added to Favorites");
    } else {
      toast.warn("Book is already in Favorites");
    }
  };

  const handleAddToCart = (book) => {
    const isBookInCart = cartItems?.some((cartItem) => cartItem?.id === book.id);
    if (!isBookInCart) {
      dispatch(addToCart(book));
      toast.success("Book is added to Cart");
    } else {
      toast.warn("Book is already in Cart");
    }
  };

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {/* card section */}
        {data.map((book, index) => (
          <div key={index} className="group w-[300px]">
          <Link to={`/details/${book.id}`} >
          <div
            data-aos="fade-up"
            data-aos-delay={index*200}
            
          >
            <div className="relative">
              <img
                src={book?.volumeInfo?.imageLinks?.thumbnail}
                alt=""
                className="h-[180px] w-[260px] object-cover rounded-md"
              />
            </div>
            <div className="leading-7">
              <h2 className="font-semibold">{book?.volumeInfo?.title}</h2>
              <h2 className="font-semibold">${book?.volumeInfo?.publishedDate}</h2>
              <h2 className="font-bold">Author: {book?.volumeInfo?.authors.join(', ')}</h2>
            </div>
          </div>
        </Link>
          {/* <div className="flex justify-start items-center gap-5">
                <button className="flex items-center space-x-1 text-primary hover:text-blue-700 focus:outline-none" onClick={() => handleAddToFavorites(book)}>
                  <FaHeart className="w-5 h-5" />
                 
                </button>
                <button className="flex items-center space-x-1 text-green-500 hover:text-green-700 focus:outline-none" onClick={() => handleAddToCart(book)}>
                  <FaShoppingCart className="w-5 h-5" />
                 
                </button>
              </div> */}
        </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
