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
import Favorites from './components/Favorites';
import MovieDetails from './components/MovieDetails';
import Actors from './components/Actors';


function App() {

  // This is to show some of the movies
  const fetchMovies = (searchKey) => {
    const API_URL = 'https://api.themoviedb.org/3';
    const type = searchKey ? 'search/movie' : 'movie/now_playing';
    const apiKey = '4a8e3679e70d606a9981baa4c0311d38';
    let url = `${API_URL}/${type}?language=en-US&page=1&api_key=${apiKey}`;

    if (searchKey) {
      url += `&query=${searchKey}`;
    }

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          if (searchKey) {
            setSelectedMovie(data.results[0]);
            setSearchedMovies(data.results);
          } else {
            setSelectedMovie(data.results[0]);
          }
        } else {
          console.log("No search results found.");
          setSearchedMovies([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Catch users from the localStorage so the array won't reset
  const [users, setUsers] = useState(() => {
    let usersFromStorage = localStorage.getItem('users');
    if (usersFromStorage !== null && usersFromStorage !== undefined) {
      return JSON.parse(usersFromStorage);
    }
    return [];
  });

  // Register as a new user
  const register = (userName, email, password) => {
    const newUser = { userName, email, password, favorites: [] };
    setUsers([newUser, ...users]);
  }

  // Checkes Wheter the user is logged in or not
  const [navbarFlag, setNavbarFlag] = useState(() => {
    let navbarFlagFromStorage = localStorage.getItem('isLoggedIn');
    if (navbarFlagFromStorage !== null && navbarFlagFromStorage !== undefined) {
      return JSON.parse(navbarFlagFromStorage);
    }
    return false;

  });


  // Keeps the user logged in even after closing the browser
  const [currentUser, setCurrentUser] = useState(() => {
    let currentUserFromStorage = localStorage.getItem('currentUser');
    if (currentUserFromStorage !== null && currentUserFromStorage !== undefined) {
      try {
        return JSON.parse(currentUserFromStorage);
      } catch (error) {
        console.error("Error parsing currentUserFromStorage:", error);
        return {};
      }
    }
    return {};
  });
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);


  // User can log out, updating the states and local storage
  const logOut = () => {
    setCurrentUser({});
    setNavbarFlag(false)

    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.setItem('currentUser', JSON.stringify({}));
  }


  const [searchKey, setSearchKey] = useState('');
  const [searchedMovies, setSearchedMovies] = useState('');


  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);


  return (
    <div className="App">
      <ApiProvider api={moviesApi}>
        <BrowserRouter>
          <NavBar
            navbarFlag={navbarFlag}
            logOut={logOut}
            setSearchKey={setSearchKey}
            searchMovies={searchMovies}
            searchKey={searchKey}
            setSearchedMovies={setSearchedMovies}
            currentUser={currentUser}
          />
          < Routes >

            <Route path='/' element={<HomePage setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie} searchedMovies={searchedMovies} />} />
            <Route path='/toprated' element={<TopRatedMovies />} />

            <Route path='/signin'
              element={<SignIn users={users} setCurrentUser={setCurrentUser} setNavbarFlag={setNavbarFlag} navbarFlag={navbarFlag} />}
            />
            <Route path='/signup' element={<SignUp register={register} />} />
            <Route path='/favorites' element={<Favorites />} />

            <Route path='/details' element={<MovieDetails selectedMovie={selectedMovie} />} />
            <Route path='/actors' element={<Actors />} />


          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </div >
  );
}

export default App;
