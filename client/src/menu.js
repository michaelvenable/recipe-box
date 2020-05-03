import React from 'react';
import { Link } from 'react-router-dom'

class Menu extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container-fluid justify-content-center">
                    <Link to="/recipes" className="navbar-brand"><span>Recipe Box</span></Link>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            { /* If this nav item is removed, the menu collapses :( */ }
                            <li className="nav-item">
                                <Link to="/recipes" className="nav-link">&nbsp;</Link>
                            </li>

                            <li className="nav-item btn-submit-recipe">
                                <Link to="/recipes/new" className="nav-link"><i className="fa fa-upload" aria-hidden="true"></i>Add a Recipe</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Menu;