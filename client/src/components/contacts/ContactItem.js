import React, {useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/Contact/contactContext';


const ContactItem = ({contact}) => {

  const {_id, name, email, phone, type} = contact

  const contactContext = useContext(ContactContext);

  const {deleteContact, setCurrent, clearCurrent} = contactContext;

  const onDelete = _ => {
    deleteContact(_id);
    clearCurrent();
  }
  // const onUpdate = _=> updateContact(id);

  return (
    <div>
      <div className="card bg-light">
        <h3 className="text-primary text-left">
            {name}{' '} 
            <span style = {{float: 'right'}} className={"badge " + (type === "professional" ? 'badge-success': 'badge-primary')}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        </h3>
        <ul className="list">
          {email && (
            <li>
              <i className="fas fa-envelope-open"></i> {email}
            </li>)}
          {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>)}
        </ul>
        <p>
          <button className="btn btn-dark btn-sm" onClick={_ => setCurrent(contact)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
        </p>
      </div>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactItem