import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/bookSlice';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.book.favorites);

  const handleRemoveFromFavorites = (id) => {
    // Dispatch the action to remove the book from favorites
    dispatch(removeFromFavorites(id));
    toast.success("Book is removed from wishlist");
  };

  return (
    <div className="container mx-auto mt-8">
    <ToastContainer
        position="top-right"
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
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {favorites.length === 0 ? (
         <div className='flex flex-row justify-center items-center h-[40vh]'>
            <div className='text-center'>
             <h3 className='font-bold text-3xl'>No Items Added in Wishlist</h3>
              <br />
              <Link to='/' className='text-primary cursor-pointer font-semibold'>Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
          favorites.map((book) => (
            <div key={book.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
              <Link to={`/details/${book.id}`} className="card-link">
                <div className="h-48 overflow-hidden">
                  <img src={book?.volumeInfo?.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="w-full h-full object-cover" />
                </div>
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{book.volumeInfo.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Author: {book.volumeInfo.authors.join(', ')}</p>
                <p className="text-sm text-gray-600 mb-4">Publisher: {book.volumeInfo.publisher}</p>
                <p className="text-sm text-gray-600 mb-4">Published Date: {book.volumeInfo.publishedDate}</p>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => handleRemoveFromFavorites(book.id)}>Remove from Favorites</button>
              </div>
      </div>
            
          ))
        }
          </div>)}
    </div>
  );
};

export default WishlistPage;
