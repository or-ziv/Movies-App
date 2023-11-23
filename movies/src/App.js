import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { moviesApi } from './features/apiSlice';
import { useEffect, useState, useContext } from 'react';
import AllData, { DataProvider } from './MoviesContextApi';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import TopRatedMovies from './components/TopRatedMovies';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Favorites from './components/Favorites';
import MovieDetails from './components/for details/MovieDetails';
import Actors from './components/for details/Actors';
import PopularMovies from './components/PopularMovies';

function App() {

  const { setSelectedMovie } = useContext(AllData);

  // handles the bg of each navbar btn 
  const [btnBG, setBtnBG] = useState(0);


  // This is to show some of the movies
  const fetchMovies = (searchKey) => {
    const API_URL = 'https://api.themoviedb.org/3';
    const type = searchKey ? 'search/movie' : 'movie/now_playing';
    const apiKey = process.env.REACT_APP_API_KEY;
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
      <DataProvider>
        <ApiProvider api={moviesApi}>
          <BrowserRouter>
            <NavBar
              setSearchKey={setSearchKey}
              searchMovies={searchMovies}
              searchKey={searchKey}
              setSearchedMovies={setSearchedMovies}
              btnBG={btnBG}
              setBtnBG={setBtnBG}
            />
            < Routes >

              <Route path='/' element={<HomePage searchedMovies={searchedMovies} />} />
              <Route path='/toprated' element={<TopRatedMovies />} />
              <Route path='/popularMovies' element={<PopularMovies />} />

              <Route path='/signin' element={<SignIn setBtnBG={setBtnBG} />} />
              <Route path='/signup' element={<SignUp setBtnBG={setBtnBG} />} />
              <Route path='/favorites' element={<Favorites />} />

              <Route path='/details' element={<MovieDetails />} />
              <Route path='/actors' element={<Actors />} />

            </Routes>
          </BrowserRouter>
        </ApiProvider>
      </DataProvider>
    </div >
  );
}

export default App;
