import React, { useState } from 'react';
import {Container, Header, Icon, Message, Placeholder } from 'semantic-ui-react';
import AppHeader from '../../../components/Header/Header';
import Favorites from '../Favorites/Favorites';
import ContactGridView from '../listviews/contactGridView';
import ContactListView from '../listviews/contactListView';

const ContactListUI = ({
    state: {
      isAuthenticated, 
    contacts: {
      loading, data, error,  isSearchActive, foundContacts
    }
  }, deleteContact, addToFavorite, updateContact
}) => {
    const currentContacts = isSearchActive ? foundContacts : data;
    const [isListActive, setListActive] = useState(true);
    const showList = () => {
      setListActive(true);
    }

    const showGrid = () => {
      setListActive(false)
    }

    //console.log("current data", currentContacts);

    return (
      <div>
        <AppHeader />
          <Container fluid>
            <Header style={{marginLeft: '85px', marginTop: '10px'}}>Starred</Header>
            <Favorites loading={loading} favorites={currentContacts.filter((item)=> item.isFavorite)}/>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Header style={{marginLeft: '85px'}}>All Contacts</Header>
              <div className='icons-container'>
                <Icon className="custom-icons" name="th list" size='large' onClick={showList}/>
                <Icon className="custom-icons" name="grid layout" size='large' onClick={showGrid}/>
              </div>
            </div>
            { loading && (
              <>
                {" "}
                <Placeholder style={{marginLeft: '80px'}}>
                  <Placeholder.Header>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                  </Placeholder.Paragraph>
                </Placeholder>
              </>
            )}
            {/* If contact list is empty then show following message */}
            {!loading && currentContacts.length === 0 && (
              <div style={{margin:'30px'}}>
                <Message
                  header="No Contacts"
                  content="no contacts to show"
                  color='yellow'
                />
              </div>
            )}

            {
              isListActive ? 
              <ContactListView 
                contacts={currentContacts} 
                deleteContact={deleteContact} 
                addToFavorite={addToFavorite} 
                updateContact={updateContact}
              /> : 
              <ContactGridView 
                contacts={currentContacts} 
                deleteContact={deleteContact}
                addToFavorite={addToFavorite} 
                updateContact={updateContact}
              />
            }
            
          </Container>
      </div>
    )
};

export default ContactListUI;