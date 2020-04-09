import React,{useState, useEffect, useContext} from 'react'
import AlertContext from '../../context/Alert/alertContext';
import AuthContext from '../../context/Auth/authContext';

const Login = props => {
  
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {setAlert } = alertContext;

  const {login, error, clearErrors, isAuthenticated} = authContext;

  useEffect(() => {
    if(isAuthenticated){
      //redirecting
      props.history.push('/');
    }
    if(error === 'Invalid Creds..'){
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);



  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const {email, password} = user;

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();

    if(email === '' || password === ''){
      setAlert('Please enter all the fields', 'danger');
    }else{
      login({
        email,
        password
      })
    }
    
  }

  return (
    <div className="form-container">
      <h1>
        <span className="text-primary">Login</span>
      </h1>
      <form onSubmit = {onSubmit}>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange}/>
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block"/>
      </form>
    </div>
  )
}

export default Login
