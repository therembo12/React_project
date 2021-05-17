import React from "react";
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home
                    <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-contact">Add new</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Separated link</a>
                                    </div>
                                </li>
                </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                            </form>
            </div>
        </nav>
                </div>
    )
}
export default Header;