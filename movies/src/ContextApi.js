import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllData = createContext();

export const DataProvider = ({ children }) => {

    //For Showing The Main Movie In The Website 
    const [heroMovie, setHeroMovie] = useState({});

    // To Select A Movie
    const [selectedMovie, setSelectedMovie] = useState({});

    // Getting the videos for each movie
    const [movieVideos, setMovieVideos] = useState('');


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
    const initialUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const [currentUser, setCurrentUser] = useState(initialUser);


    // User can log out, updating the states and local storage
    const logOut = () => {
        setCurrentUser({});
        setNavbarFlag(false)

        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        localStorage.setItem('currentUser', JSON.stringify({}));
    }

    // Whenever the users list has changes, updata local storage with the new data
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);


    // Add a movie to favorites
    const [favorite, setFavorite] = useState({});

    const addToFavorite = (movie) => {
        if (Object.keys(currentUser).length !== 0) {
            if (!currentUser.favorites.includes(movie)) {
                const updatedFavorites = [movie, ...currentUser.favorites];
                setCurrentUser((prevState) => ({
                    ...prevState,
                    favorites: updatedFavorites
                }));
                setFavorite(movie);
                alert('Movie Added To Favorites!')
            } else {
                alert('This Movie Is Already In Your Favorites...');
            }
        } else {
            alert('Please Login To Add A Movie To Your Favorites!');
        }
    };

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.email === currentUser.email
                    ? { ...user, favorites: currentUser.favorites }
                    : user
            )
        );
    }, [favorite, currentUser])


    // Remove a Movie From Favorites

    const removeMovieFromFavorites = (movie) => {
        const updatedFavorites = currentUser.favorites.filter((val) => (val.id !== movie.id))
        setCurrentUser((prevState) => ({
            ...prevState,
            favorites: [...updatedFavorites]
        }));
    }

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        let usersFromStorage = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = usersFromStorage.map((user) => {
            if (user.email === currentUser.email) {
                return { ...user, ...currentUser };
            }
            return user;
        });

        localStorage.setItem('users', JSON.stringify(updatedUsers));

    }, [currentUser]);




    return (
        <AllData.Provider
            value={{
                heroMovie, setHeroMovie,
                selectedMovie, setSelectedMovie,
                users, setUsers,
                register,
                navbarFlag, setNavbarFlag,
                logOut,
                currentUser, setCurrentUser,
                movieVideos, setMovieVideos,
                addToFavorite, removeMovieFromFavorites,
                currentUser
            }}>
            {children}
        </AllData.Provider>
    )
}


export default AllData;