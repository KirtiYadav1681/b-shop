import React, {useState} from "react";
import Heading from "../Shared/Heading";
import ProductCard from "./ProductCard";

import { useSelector } from 'react-redux';

const Products = () => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const books = useSelector((state) => state.book.items);

  const filteredBooks = selectedAuthor
    ? books.filter((book) => book.volumeInfo.authors.includes(selectedAuthor))
    : books;

    const authorOptions = [
      'J K. ROFLING',
      'J. K. Rowling',
      'Pottermore Publishing',
      'Insight Editions',
    ];
  
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <Heading title="Our Products" subtitle={"Explore Our Products"}/>
        <div className="flex justify-start mb-4 ml-5">
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md mr-4 dark:text-black"
        >
          <option value="">Filter by Author</option>
          {authorOptions.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
        {/* Body section */}
        <ProductCard data={selectedAuthor? filteredBooks.slice(0,4): books.slice(0,4)} />
        <ProductCard data={selectedAuthor? filteredBooks.slice(5,9): books.slice(0,4)} />
      </div>
    </div>
  );
};

export default Products;
