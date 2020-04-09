import React, {useContext, useEffect} from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/Auth/authContext';

const Home = () => {

  const authContext = useContext(AuthContext);

  const {loadUsers} = authContext;

  useEffect(() => {
    loadUsers();
    //eslint-disable-next-line 
  }, [])

  return (
    <div>
      <div className="grid-2">
        <div> 
          <ContactForm />
        </div>
        <div>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </div>
  )
}

export default Home
