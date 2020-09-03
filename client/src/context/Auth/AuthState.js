import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'
import{
REGISTER_SUCCESS,
REGISTER_FAIL,
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
CLEAR_ERRORS
} from '../Types'

const AuthState = props => {
 
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null 
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Load User
  const loadUsers = async () => {

    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({type: USER_LOADED, payload: res.data});
    } catch (err) {
      dispatch({type: AUTH_ERROR}); 
    }
  };
  //Register User
  const register = async formData => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({type: REGISTER_SUCCESS, payload: res.data});
      loadUsers();
    } catch (err) {
      dispatch({type: REGISTER_FAIL, payload: err.response.data.message});
    }

  }

  //Login User

  const login = async (formData) => {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({type: LOGIN_SUCCESS, payload: res.data});
    } catch (err) {
      dispatch({type: LOGIN_FAIL, payload: err.response.data.message});
    }

  };

  //Logout
  const logout = () => dispatch({type: LOGOUT});
  //Clear errors
  const clearErrors = () => dispatch({type: CLEAR_ERRORS});

  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      user: state.user,
      error: state.error,
      register,
      loadUsers,
      login,
      logout,
      clearErrors
    }}>
      {props.children}
    </AuthContext.Provider>
  )
} 

export default AuthState;