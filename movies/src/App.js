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

  // This is for the users
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

  const [navbarFlag, setNavbarFlag] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);




  // This is to show some of the movies

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=4a8e3679e70d606a9981baa4c0311d38')
      .then(res => res.json())
      .then((data) => {
        setSelectedMovie(data.results[0]);
      })
      .catch((err) => {
        console.log(err);
        
      })
  }, [])



  return (
    <div className="App">
      <ApiProvider api={moviesApi}>
        <BrowserRouter>
          <NavBar navbarFlag={navbarFlag} />
          <Routes>

            <Route path='/' element={<HomePage setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie} />} />
            <Route path='/toprated' element={<TopRatedMovies />} />
            <Route path='/signin' element={<SignIn users={users} setCurrentUser={setCurrentUser} setNavbarFlag={setNavbarFlag} />} />
            <Route path='/signup' element={<SignUp register={register} />} />


          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </div>
  );
}

export default App;
