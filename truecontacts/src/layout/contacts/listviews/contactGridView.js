import { useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import ImageThumb from "../../../components/ImageThumb/imagethumb";
import DeleteModal from "../../../components/myModals/DeleteModal";
import NewForm from "../../../components/myModals/NewForm";

const ContactGridView = ({contacts, deleteContact, addToFavorite, updateContact}) => {
    const [show, setShow] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [data, setData] = useState();
    const [contactID, setContactID] = useState();
    
    return(
        <div className="grid-container">
            <Card.Group>
                {
                    contacts.length > 0 &&
                    contacts.map((contact) => (
                        <Card key={contact._id}>
                            <Card.Content>
                                <ImageThumb
                                    circular
                                    firstname={contact.firstname}
                                    lastname={contact.lastname}
                                    src={contact.profilePic}
                                    style={{width: 73, height: 73}}
                                    floated="right"
                                />

                                <Card.Header>{contact.firstname} {contact.lastname}</Card.Header>
                                <Card.Meta>{contact.email}</Card.Meta>
                                <Card.Meta>Country Code: {contact.countrycode}</Card.Meta>
                                <Card.Description>{contact.phonenumber}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a style={{float: 'right'}} onClick={() => addToFavorite(contact._id, contact.isFavorite)}>
                                    Add to Fav
                                    {contact.isFavorite ? <Icon name="star" style={{float: 'right', marginLeft: 10, color: 'red'}}/>:<Icon name="star outline" style={{float: 'right', marginLeft: 10}}/>}
                                </a>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="ui two buttons">
                                    <Button 
                                        basic color="green" 
                                        onClick={() =>{
                                            setShow(true); 
                                            setData(contact);
                                            setContactID(contact._id)
                                        }}
                                    >Edit</Button>
                                    <NewForm 
                                        show={show}
                                        onClose={() => setShow(false)}
                                        contact={data}
                                        contactID={contactID}
                                        updateContact={updateContact}
                                    />
                                    <Button 
                                        basic color="red" 
                                        onClick={() => {
                                            setDelModal(true);
                                            setContactID(contact._id)
                                            setData(contact.profilePic)
                                        }}
                                    >Remove</Button>
                                    <DeleteModal
                                        show={delModal}
                                        onClose={() => setDelModal(false)}
                                        contactID={contactID}
                                        contact={data}
                                        deleteContact={deleteContact}/>
                                </div>
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
        </div>
    );
};

export default ContactGridView;

