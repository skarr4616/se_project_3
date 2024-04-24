import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

function Navbar() {
    // const guestLinks = () => (
    //     <Fragment>
    //         <li className="nav-item">
    //             <Link className="nav-link" to="/login">Login</Link>
    //         </li>
    //         <li className="nav-item">
    //             <Link className="nav-link" to="/signup">Signup</Link>
    //         </li>
    //     </Fragment>
    // );

    // const authLinks = () => (
    //     <li className="nav-item">
    //         <a className="nav-link" href="#!" onClick={logoutHandler}>Logout</a>
    //     </li>
    // );

    // return (
    //     <div>
    //         <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //             <div className="container-fluid">
    //                 <Link className="navbar-brand" to="/">RTL</Link>
    //                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                     <span className="navbar-toggler-icon"></span>
    //                 </button>
    //                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //                         <li className="nav-item">
    //                             <Link className="nav-link active" aria-current="page" to="/">Home</Link>
    //                         </li>
    //                         <li className="nav-item">
    //                             <Link className="nav-link" to="/">Link</Link>
    //                         </li>
    //                         {isAuthenticated ? authLinks() : guestLinks()}
    //                         <li className="nav-item dropdown">
    //                             <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                                 Dropdown
    //                             </Link>
    //                             <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    //                                 <li><a className="dropdown-item" href="#">Action</a></li>
    //                                 <li><a className="dropdown-item" href="#">Another action</a></li>
    //                                 <li><hr className="dropdown-divider"/></li>
    //                                 <li><a className="dropdown-item" href="#">Something else here</a></li>
    //                             </ul>
    //                         </li>
    //                         <li className="nav-item">
    //                             <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    //                         </li>
    //                     </ul>
    //                     <form className="d-flex">
    //                         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
    //                             <button className="btn btn-outline-success" type="submit">Search</button>
    //                     </form>
    //                 </div>
    //             </div>
    //         </nav>
    //     </div>
    // )
    <div>
        Navbar
    </div>
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(mapStateToProps, {logout})(Navbar);
export default Navbar;
