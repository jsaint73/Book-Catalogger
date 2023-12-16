import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import WishlistTable from '../components/home/WishlistTable';

const WishlistPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books/wishlist')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-transparent hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => window.location.href = '/'}
        >
          Back Home
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <WishlistTable books={books} />
      ) : (
        <WishlistTable books={books} />
      )}
    </div>
  );
};

export default WishlistPage;
