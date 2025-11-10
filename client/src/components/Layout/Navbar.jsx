import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Button from "../Common/Button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex shrink-0">
                        <Link to="/home" className="text-2xl font-bold">
                            Dashboard
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">

                        {user ? (
                            <>
                                <Link to="/home" className="hover:text-gray-300">
                                    Home
                                </Link>
                                <Link to="/profile" className="hover:text-gray-300">
                                    Profile
                                </Link>
                                <Button
                                    text="Logout"
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700"
                                />
                            </>
                        ) : (
                            <Link to="/login">
                                <Button text="Login" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2">

                    {user ? (
                        <>
                            <Link to="/home" className="block hover:text-gray-300">
                                Home
                            </Link>
                            <Link to="/profile" className="block hover:text-gray-300">
                                Profile
                            </Link>
                            <Button
                                text="Logout"
                                onClick={handleLogout}
                                className="w-full bg-red-600 hover:bg-red-700"
                            />
                        </>
                    ) : (
                        <Link to="/login">
                            <Button text="Login" className="w-full" />
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
