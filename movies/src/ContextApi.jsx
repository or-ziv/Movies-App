import { createContext, useState, useEffect } from "react";

const AllData = createContext();

export const DataProvider = ({ children }) => {

    //For Showing The Main Movie In The Website 
    const [heroMovie, setHeroMovie] = useState({});

    // To Select A Movie
    const [selectedMovie, setSelectedMovie] = useState({});


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

    // Whenever the users list has changes, updata local storage with the new data
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    return (
        <AllData.Provider
            value={{ heroMovie, setHeroMovie, selectedMovie, setSelectedMovie, users, setUsers, register }}>
            {children}
        </AllData.Provider>
    )

}


export default AllData;