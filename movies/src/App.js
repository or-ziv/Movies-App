import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { moviesApi } from './features/apiSlice';
import { useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import TopRatedMovies from './components/TopRatedMovies';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


function App() {

  const [users, setUsers] = useState(() => {
    let usersFromStorage = localStorage.getItem('users');
    if (usersFromStorage !== null && usersFromStorage !== undefined) {
      return JSON.parse(usersFromStorage);
    }
    return [];
  });

  const register = (userName, email, password) => {
    const newUser = { userName, email, password, favorites: [] };
    setUsers([newUser, ...users]);
  }






  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);


  return (
    <div className="App">
      <ApiProvider api={moviesApi}>
        <BrowserRouter>
          <NavBar />
          <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/toprated' element={<TopRatedMovies />} />
            <Route path='/signin' element={<SignIn users={users} />} />
            <Route path='/signup' element={<SignUp register={register} />} />


          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </div>
  );
}

export default App;
