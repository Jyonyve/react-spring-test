import { NavLink } from "react-router-dom"
import React from "react"

export const LinkSelector = (props:any) => {
    return(
        <nav className="navtop">
            <h2><NavLink to= '/'> Let's travel! club </NavLink></h2>
            <ul className="nav-links">
                <li><NavLink to ='/login'>Login</NavLink></li>
                <li><NavLink to = '/club'>Travel Clubs</NavLink></li>
                <li><NavLink to ='/member'>For Members</NavLink></li>
            </ul>
        </nav>
    )
}