import React, { useContext, useEffect, useState } from 'react';
import CreateContact from '../../layout/contacts/create/createcontact';
import createContact from '../../contexts/actions/contacts/createContact';
import { GlobalContext } from '../../contexts/Provider';
import { useHistory } from 'react-router-dom';
import clearCreateContact from '../../contexts/actions/contacts/clearCreateContact';

const CreateContactsContainer = () => {
  const [form, setForm] = useState({});
  const [tempFile, setTempFile] = useState(null)
  const history = useHistory();
  const { contactsDispatch, 
    contactState: {
      addContact: {loading, data, error}
    }
  } = useContext(GlobalContext);

  const onChange = (e, {name, value}) => {
    setForm({...form, [name]: value});
  };

  const onImgChange = (e) => {
    e.persist();
    const fileURL = e.target.files[0];
    setForm({...form, profilePic:fileURL});

    if(fileURL){
      setTempFile(URL.createObjectURL(fileURL));
    }
  };

  // console.log("form", form);
  // console.log("data", data);

  useEffect(() => {
    if(data) {
      history.push('/');
    }

    return () => {
      clearCreateContact()(contactsDispatch)
    }
  }, [data]);

  const formIsHalfFilled = Object.values(form).filter((item) => item && item !== "")?.length > 0 && !data;

  const onSubmit = () => {
    const id = localStorage.getItem("user_id").toString();
    createContact({form, id})(contactsDispatch);
  }

  const formInvalid = 
    !form.firstname?.length || 
    !form.lastname?.length || 
    !form.countrycode?.length|| 
    !form.phonenumber?.length;
  
  return (
    <CreateContact 
      onChange={onChange}
      form={form}
      onSubmit={onSubmit}
      formInvalid={formInvalid}
      loading={loading}
      formIsHalfFilled={formIsHalfFilled}
      onImgChange={onImgChange}
      tempFile={tempFile}
    />
  )
}

export default CreateContactsContainer;