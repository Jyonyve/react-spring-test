import { NavLink } from "react-router-dom"
import React from "react"

export const LinkSelector = (props:any) => {
    return(
        <nav className="linkSelcetor">
            <h2>Let's travel! club</h2>
            <ul className="select-links">
                <li><NavLink to = '/club'>Travel Clubs</NavLink></li>
                <li><NavLink to ='/member'>For Members</NavLink></li>
            </ul>
        </nav>
    )
}