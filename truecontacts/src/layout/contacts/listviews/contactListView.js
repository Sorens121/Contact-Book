import { useMemo, useState } from "react";
import { Button, Icon, List } from "semantic-ui-react";
import ImageThumb from "../../../components/ImageThumb/imagethumb";
import DeleteModal from "../../../components/myModals/DeleteModal";
import NewForm from "../../../components/myModals/NewForm";
import Pagination from "../../../components/Pagination/Pagination";
import './style.css';

let PageSize = 5;

const ContactListView = ({contacts, deleteContact, addToFavorite, updateContact}) => {
    const [show, setShow] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [data, setData] = useState();
    const [contactID, setContactID] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const currentPageData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;

        return contacts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage,contacts]);

    return (
        <div className="list-container">
            <List>
                {
                    currentPageData.map((contact) => (
                        <List.Item key={contact._id} style={{padding: 10}} disabled={contact.deleting}>
                            <List.Content floated="right" style={{marginTop: 19}}>
                                <span>{contact.countrycode} {contact.phonenumber}</span>
                                <Button 
                                    basic color="green" 
                                    size="tiny" 
                                    style={{marginLeft: 10}}
                                    onClick={() => {
                                        setShow(true); 
                                        setContactID(contact._id);
                                        setData(contact)
                                    }}
                                >
                                    <Icon name="edit"/>
                                </Button>
                                <NewForm 
                                    show={show} 
                                    onClose={() => setShow(false)} 
                                    contactID={contactID}
                                    contact={data}
                                    updateContact={updateContact}
                                />
                                <Button 
                                    basic color="red" size="tiny" style={{marginLeft: 5}} 
                                    onClick={() => {
                                        setDelModal(true);
                                        setContactID(contact._id)
                                        setData(contact.profilePic)
                                    }}>
                                    <Icon name="delete"/>
                                </Button>
                                <DeleteModal 
                                    show={delModal} 
                                    onClose={() => setDelModal(false)}
                                    contactID={contactID}
                                    contact={data} 
                                    deleteContact={deleteContact}
                                />
                                <Button basic 
                                    color="blue" size="tiny" style={{marginLeft:5}} 
                                    onClick={() => addToFavorite(contact._id, contact.isFavorite)}>
                                        {contact.isFavorite ? <Icon name="star"/> : <Icon name="star outline"/>}
                                </Button>
                            </List.Content>
                            <List.Content style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                <ImageThumb
                                    circular
                                    firstname={contact.firstname}
                                    lastname={contact.lastname}
                                    src={contact.profilePic}
                                    style={{width: 50, height: 50}}
                                />
                                <span>
                                    {contact.firstname} {contact.lastname}
                                    {contact.isFavorite && <Icon name="favorite" color="red" style={{marginLeft: 10}}/>}
                                </span>
                            </List.Content>
                        </List.Item>
                    ))
                }
            </List>
            <Pagination
                className='pagination-bar'
                currentPage={currentPage}
                totalCount={contacts.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    )
}

export default ContactListView;