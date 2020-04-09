import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/Auth/authContext'
import ContactContext from '../../context/Contact/contactContext'

const Navbar = ({title, icon}) => {

  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const {logout, isAuthenticated, user} = authContext
  const {clearContacts} = contactContext

  const onLogout = () => {
    logout();
    clearContacts();
  }

  const authLinks = (
    <>
      <li>Hello {user && user.data.name}</li>
      <li>
        <a onClick={onLogout}>
          <i className="fas fa-sign-out-alt"><span className="hide-sm">Logout</span></i>
        </a>
      </li>
    </>
  )

  const guestLinks = (
    <>
       <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
    </>
  )

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}/> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}  
      </ul>       
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: 'fas fa-id-card-alt'
}

export default Navbar;