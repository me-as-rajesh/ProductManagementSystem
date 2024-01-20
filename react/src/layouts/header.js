import React, { Component } from 'react'
import { IoMdLogOut } from "react-icons/io";
import { Link, Navigate } from 'react-router-dom';
import {logOut} from '../features/authAction';
import { useDispatch } from 'react-redux';


function Header() {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logOut())
        window.location.href = '/';
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                            <li className="nav-item"><Link className="nav-link" onClick={logout}>Logout <IoMdLogOut style={{ fontSize: "40px" }} /></Link ></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Header;
