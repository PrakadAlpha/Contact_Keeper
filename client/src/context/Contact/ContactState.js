import React, {useReducer} from 'react';
import axios from 'axios'
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import{
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../Types'

const ContactState = props => {
 
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  }


  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const getContacts = async _ => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({type: GET_CONTACTS, payload: res.data});
    } catch (err) {
      dispatch({type: CONTACT_ERROR, payload: err.response.message});
    }
  }

  //Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({type: ADD_CONTACT, payload: res.data});
    } catch (err) {
      dispatch({type: CONTACT_ERROR, payload: err.response.message});
    }
  }

  //Delete contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.message
      });
    }  
  } 

  //Set current contact
  const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact});
  } 
  //Clear current contact
  const clearCurrent = _ => {
    dispatch({type: CLEAR_CURRENT});
  } 
  //Update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.message
      });
    }  }
  //Filter contacts
  const filterContacts = contact => {
    dispatch({type: FILTER_CONTACT, payload: contact});
  }

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };
  //clear Filter
  const clearFilter = _ => {
    dispatch({type: CLEAR_FILTER});
  }

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      addContact,
      deleteContact,
      updateContact,
      setCurrent,
      clearCurrent,
      filterContacts,
      clearFilter,
      getContacts,
      clearContacts
    }}>
      {props.children}
    </ContactContext.Provider>
  )
} 

export default ContactState;