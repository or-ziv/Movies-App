import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { moviesApi } from './features/apiSlice';
import NavBar from './components/NavBar';
import TopRatedMovies from './components/TopRatedMovies';

function App() {
  return (
    <div className="App">
      <ApiProvider api={moviesApi}>
        <BrowserRouter>
          <NavBar />
          <Routes>

            <Route path='/' element={<TopRatedMovies />} />


          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </div>
  );
}

export default App;
