import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import addToFavorite from '../../contexts/actions/contacts/addToFavorite';
import getContacts from '../../contexts/actions/contacts/contactActions';
import deleteContact from '../../contexts/actions/contacts/deleteContact';
import updateContact from '../../contexts/actions/contacts/updateContact';
import { GlobalContext } from '../../contexts/Provider';
import ContactListUI from '../../layout/contacts/list/contactList';

const ContactsContainer = () => {
  const { contactState, contactsDispatch } = useContext(GlobalContext);
  const history = useHistory();
  let id = localStorage.getItem("user_id");

  //console.log('contactState',contactState);
  const handleDeleteContact = (contact_id, profilePicURL) => {
    //console.log(`contact_id ${contact_id} for ${id}`);
    if(id !== null){
      id = id.toString();
      console.log("Parent ID: ", id);
      console.log('Contact ID: ', contact_id);
      deleteContact({id, contact_id, profilePicURL})(contactsDispatch);
    }
  };

  const handleFavorite = (contact_id, isFavorite) => {
    if(id !== null){
      id = id.toString();
      isFavorite = !isFavorite;
      addToFavorite({id, contact_id, isFavorite})(contactsDispatch);
    }
  };

  const handleUpdateContact = (contact_id, update, prevImgURL, isProfilePic) => {
    if(id != null){
      id = id.toString();
      updateContact({id, contact_id, update, prevImgURL, isProfilePic})(contactsDispatch);
    }
    //console.log("from container: ", update, isProfilePic);
  }

  useEffect(() => {
    if((id === undefined || id === null) && !contactState.isAuthenticated){ 
      history.push("/login")
    } 
    
    if(id !== null){
      id = id.toString();
      getContacts({history, id})(contactsDispatch);
    }
  }, [id]);
  return (
    <div>
      <ContactListUI 
        state={contactState} 
        deleteContact={handleDeleteContact} 
        addToFavorite={handleFavorite}
        updateContact={handleUpdateContact}
      />
    </div>
  );
}

export default ContactsContainer;