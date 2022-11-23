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
import ChangePwd from '../myModals/ChangePwd';
import changePassword from '../../contexts/actions/profile/updatepwd';


const Header = () => {
  const { contactsDispatch:dispatch } = useContext(GlobalContext);
  const { profileState, profileDispatch } = useContext(GlobalContext);

  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
  
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

  // const handleUpdatePassword = (update) => {
  //   console.log("change password", update);
  //   changePassword({id, update})(profileDispatch);
  // }

  // useEffect(()=> {
  //   if(id !== null){
  //     id = id.toString();
  //     getProfileData();
  //   }
  // },[id]);
  
  
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

                {/* <Dropdown.Item
                  onClick={() => {
                    setUpdatePasswordModal(true);
                    getProfileData();
                  }}
                >Change Password
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
            
            <ProfileModal
              state={profileState}
              show={updateProfileModal}
              onClose={() => setUpdateProfileModal(false)}
              updateProfile={handleUpdateProfile}
            />

            {/* <ChangePwd
              state={profileState}
              show={updatePasswordModal}
              onClose={() => setUpdatePasswordModal(false)}
              updatePassword={handleUpdatePassword}
            /> */}
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