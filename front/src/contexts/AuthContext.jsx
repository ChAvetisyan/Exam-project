import { createContext, useContext, useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../helpers";
import axios from "axios";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromLocalStorage());

    const updateUser = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        
    }

    useEffect(() => {
        axios.get("http://localhost:3000/user", {
            headers: {
                "user-token": localStorage.getItem("token"),
            }
        })
            .then((res) => {
                updateUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }

