import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../context/UserState";
import EditProfile from "../modals/EditProfile";

const About = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const context = useContext(userContext);
    let { getUser } = context;
    let [user, setUser] = useState({});

    useEffect(() => {
        document.title = "About | FMS";
        if (isAuthenticated) {
            getUser()
                .then((data) => {
                    setUser(data);
                });
        }

    }, []);

    const handleEditProfile = () => {
        setIsEditProfileOpen(true);
    };

    return (
        <div>
            {isAuthenticated
                ? (
                    <>
                        <div className="w-3/5 mx-auto my-5 p-4 border border-blue-400">
                            This is the authenticated session of <i><b>{user.name}</b></i> with email <i><b>{user.email}</b></i> who is a <i><b>{user.role}</b></i> <br />
                            <div className="flex items-center justify-center m-4">
                                <button onClick={handleEditProfile} className="rounded-lg mx-2 px-2 py-1 cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Edit Profile</button>
                            </div>
                        </div>
                        <EditProfile isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} user={user} />
                    </>)
                : (
                    <>
                        <div className="flex items-center justify-center my-5">You are not logged in!</div>
                        {window.location.href = "/login"}
                    </>
                )}
        </div>
    );
};

export default About;