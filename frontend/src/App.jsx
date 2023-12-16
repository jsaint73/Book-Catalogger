import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/CreateAccountPage'
import WishlistPage from './pages/Wishlist';
import { AuthProvider, useAuth } from './auth/AuthContext';

const PrivateRouter = ({ children }) => {
  const auth = useAuth();
  return auth.isAuthenticated ? <Route element={children}/> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/books/wishlist" element={<WishlistPage/>} />
          <Route path="/books/create" element={
            //<PrivateRouter>
              <CreateBook />
            //</PrivateRouter>
          }/>
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={
            //<PrivateRouter>
              <EditBook />
            //</PrivateRouter>
          }/>
           <Route path="/books/delete/:id" element={
            //<PrivateRouter>
              <DeleteBook />
            //</PrivateRouter>
          }/>
        </Routes>
    </AuthProvider>
  );
};

export default App;
