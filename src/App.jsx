import React, {useEffect} from "react";
import Navbar from "./components/Navbar/Navbar";

import Footer from "./components/Footer/Footer.jsx";
import Popup from "./components/Popup/Popup.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

import { useDispatch } from "react-redux"; 
import { setBooks } from "./redux/bookSlice";
import axios from "axios";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BookDetailsPage from "./pages/BookDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";

const API_KEY = "AIzaSyALe6VaDMi3fpBbTa8IH6Imbza7biDX5Bk"; 

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${API_KEY}`);
        dispatch(setBooks(response.data.items));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [dispatch]);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/details/:id' element={<BookDetailsPage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
