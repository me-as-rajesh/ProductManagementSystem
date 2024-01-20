import React, { Component } from 'react'
import { SiReactivex } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="border bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light ">Product Management System <SiReactivex style={{fontSize:"30px", color:'blueviolet'}}/></div>
            <div className="list-group list-group-flush">
                <Link to="/" className="list-group-item list-group-item-action list-group-item-light p-3" ><MdDashboard /> Dashboard</Link>
                <Link to="/Products" className="list-group-item list-group-item-action list-group-item-light p-3" ><MdProductionQuantityLimits/> Products</Link>
            </div>
        </div>
    );
}

export default Sidebar;
