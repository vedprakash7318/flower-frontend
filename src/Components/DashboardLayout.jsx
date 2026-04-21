import React, { useEffect, useState } from 'react'
import './CSS/DashboardLayout.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdDashboard, MdOutlineProductionQuantityLimits, MdLockPerson, MdMarkunreadMailbox, MdContactPhone } from "react-icons/md";
import Swal from 'sweetalert2';
const DashboardLayout = ({children}) => {

    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[])


    const [open, setOpen] = useState(false)
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure to logout?",
            text: "After this you will be redirected to login page",
            icon: "question",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logout!",
                    text: "You are logged out",
                    icon: "success"
                });
                localStorage.clear()
                navigate('/login')
            }

        })

    }
    return (
        <>
            <div className="container">
                <div className={open ? 'sidebar open' : "sidebar"}>
                    <h2>Dashboard</h2>
                    <NavLink className='nav-links' to='/dashboard'>
                        <MdDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink className='nav-links' to='/add-product'>
                        <MdOutlineProductionQuantityLimits />
                        <span>Products</span>
                    </NavLink>
                    <NavLink className='nav-links'>
                        <MdMarkunreadMailbox />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink className='nav-links'>
                        <MdContactPhone />
                        <span>Contact</span>
                    </NavLink>
                    <NavLink className='nav-links'>
                        <MdLockPerson />
                        <span>Profile</span>
                    </NavLink>

                    <button className='logout' onClick={handleLogout}>Logout</button>
                </div>

                <div className="main">
                    <div className="header">
                        <button onClick={() => setOpen(!open)}>☰</button>
                    </div>
                    <div className="content">
                            {children}
                    </div>
                </div>


            </div>
        </>
    )
}

export default DashboardLayout