import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import uuid from 'uuid/v4';
import{
  SET_ALERT,
  REMOVE_ALERT
} from '../Types'

const AlertState = props => {
 
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (message, type, timeout = 3000) => {
    const id = uuid();
    dispatch({type: SET_ALERT, payload: {message, type, id}});
    
    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}),timeout);
  } 

  return (
    <AlertContext.Provider value={{
      alerts: state,
      setAlert
    }}>
      {props.children}
    </AlertContext.Provider>
  )
} 

export default AlertState;