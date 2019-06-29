import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'

class NavigationRegis extends Component {

    render() {
        console.log(this.props)

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div id="navbarNav" className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <NavLink exact to="/" activeClassName="active" className="nav-link ">Home</NavLink>
                            </li>
                            </ul>
                            <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink exact to="/login" activeClassName="active" className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/register" activeClassName="active" className="nav-link">Register</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}

export default NavigationRegis