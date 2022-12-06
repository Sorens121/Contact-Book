import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Icon, Image, Input, Menu } from 'semantic-ui-react';
import logo from '../../assets/images/logo.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logout from '../../contexts/actions/auth/logout';
import { GlobalContext } from '../../contexts/Provider';
import isAuthenticated from '../../utils/isAuthenticated';
import searchContacts from '../../contexts/actions/contacts/searchContacts';
import ProfileModal from '../myModals/ProfileModal';
import getProfile from '../../contexts/actions/profile/getProfile';
import updateProfile from '../../contexts/actions/profile/updateProfile';
//import './header.css';

const Header = () => {
  const { contactsDispatch:dispatch } = useContext(GlobalContext);
  const { profileState, profileDispatch } = useContext(GlobalContext);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  
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

  const handleUpdateProfile = (update, prevImgURL, isProfilePic) => {
    if(id != null){
      id = id.toString();
      updateProfile({id, update, prevImgURL, isProfilePic})(profileDispatch);
    }
    console.log("from header", id, update, prevImgURL, isProfilePic);
  }
  
  return (
    <Menu secondary pointing>
      <Image src={logo} width={60}/>
      <Menu.Item as={Link} to="/" style={{fontSize: 22}}>TrulyContacts</Menu.Item>

      {
        isAuthenticated() && (
        <Menu.Item style={{width: 450, marginBottom: 5}}>
          <Input placeholder="Search Contacts" onChange={onChange}/>
        </Menu.Item>)
      }

      {
        isAuthenticated() && (
          <Menu.Item position='right' style={{marginBottom: 5}}>
            <Button as={Link} to="/contacts/create" primary basic icon>
              <Icon name='add'></Icon>
              Create Contact
            </Button>
          </Menu.Item>
        )
      }

      {
        isAuthenticated() && (
          <Menu.Item style={{marginBottom: 5}}>
            <Dropdown 
              text='profile'
              icon='user' 
              floating
              button
              labeled
              className='icon' 
            >
              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={() => {
                    setUpdateProfileModal(true);
                    getProfileData();
                  }}
                >Update Profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <ProfileModal
              state={profileState}
              show={updateProfileModal}
              onClose={() => setUpdateProfileModal(false)}
              updateProfile={handleUpdateProfile}
            />
          </Menu.Item>
        )
      }

      {
        isAuthenticated() && (
          <Menu.Item style={{marginBottom: 5}}>
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