import React, { createContext } from "react";
import { useState } from "react";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const userContext = createContext();

const UserState = (props) => {
    const [user, setUser] = useState([]);
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const role = document.cookie.includes("isdonor=true") ? "donor" : (document.cookie.includes("isadmin=true") ? "admin" : "agent");
    const getUser = async () => {
        if (isAuthenticated === true) {
            const response = await fetch(backendURL + "/user/" + role + "/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonData = await response.json();
            return jsonData[role];
        }
    }

    return (
        <userContext.Provider value={{ getUser, user }}>
            {props.children}
        </userContext.Provider>
    );
}

export default UserState;
export { userContext };