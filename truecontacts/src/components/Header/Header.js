import React, { useContext, useEffect, useState } from 'react';
import { Button, Icon, Image, Input, Menu } from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logout from '../../contexts/actions/auth/logout';
import { GlobalContext } from '../../contexts/Provider';
import isAuthenticated from '../../utils/isAuthenticated';
import searchContacts from '../../contexts/actions/contacts/searchContacts';
import ProfileModal from '../myModals/ProfileModal';
import getProfile from '../../contexts/actions/profile/getProfile';


const Header = () => {
  const { contactsDispatch:dispatch } = useContext(GlobalContext);
  const { profileState, profileDispatch } = useContext(GlobalContext);

  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  let id = localStorage.getItem("user_id");

  const handleLogout = () => {
    logout(history)(dispatch);
  };

  const onChange = (e,{value}) => {
    const searchText = value.trim().replace(/" "/g, "");

    searchContacts(searchText)(dispatch);
  }

  const getProfileData = () => {
    getProfile({id})(profileDispatch);
  }

  useEffect(()=> {
    if(id !== null){
      id = id.toString();
      getProfileData();
    }
  },[id]);
  
  
  return (
    <Menu secondary pointing>
      <Image src={logo} width={60}/>
      <Menu.Item as={Link} to="/" style={{fontSize: 22}}>TrulyContacts</Menu.Item>

      {
        isAuthenticated() && (<Menu.Item position='right'>
          <Input style={{width: 350, marginBottom: 1}} placeholder="Search Contacts" onChange={onChange}/>
        </Menu.Item>)
      }
      
      {
        isAuthenticated() && (
          <Menu.Item position='right' style={{marginBottom: 4, paddingRight:10}}>
            <Button as={Link} to="/contacts/create" primary basic icon>
              <Icon name='add'></Icon>
              Create Contact
            </Button>
          </Menu.Item>
        )
      }

      {
        isAuthenticated() && (
          <Menu.Item style={{marginBottom: 4, paddingRight: 10, paddingLeft: 10}}>
            <Button 
              icon
              onClick={() => {
                setShow(true);
                getProfileData();
              }}
            >
              <Icon name='user'/>
            </Button>
            <ProfileModal
              state={profileState}
              show={show}
              onClose={() => setShow(false)}
            />
          </Menu.Item>

        )
      }

      {
        isAuthenticated() && (
          <Menu.Item style={{marginBottom: 4, paddingLeft: 10}}>
            {" "}
            <Button onClick={handleLogout} color="red" basic icon>
              <Icon name='log out'></Icon>
              Logout
            </Button>
          </Menu.Item>
        )
      }
    </Menu>
  );
}

export default Header;