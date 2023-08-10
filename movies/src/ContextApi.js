import { createContext, useState, useEffect } from "react";

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
                movieVideos, setMovieVideos
            }}>
            {children}
        </AllData.Provider>
    )
}


export default AllData;