 import React, { useRef } from 'react';
import { Prompt } from 'react-router-dom';
import { Button, Card, Form, Grid, Header as SemanticHeader, Icon, Image, Select } from 'semantic-ui-react';
import Header from '../../../components/Header/Header';
import countries from '../../../utils/countries';
import './createcontact.css';

const CreateContact = ({ onChange, onSubmit, formInvalid, loading , formIsHalfFilled, onImgChange, tempFile}) => {
  const imagePickRef = useRef(null);
  const chooseImage = () => {
    if(imagePickRef.current){
      imagePickRef.current.click();
    }
  }
  return (
    <div>
      <Prompt when={formIsHalfFilled} 
        message={JSON.stringify({
          header: "Confirm",
          content: "You have unsaved changes, sure you wanna leave?"
        })} />
      <Header />
      <Grid centered>
        <Grid.Column className='form-column'>
            <SemanticHeader>Create Contact</SemanticHeader>

            <Card fluid>
                <Card.Content>
                    <Form unstackable>
                        <input onChange={onImgChange} ref={imagePickRef} type="file" hidden/>
                        <div className='image-wrapper'>
                          {tempFile && <Image className='contactpicture' src={tempFile}/>}
                          
                          {!tempFile && (
                            <div onClick={chooseImage} className='contactpicture'>
                              <span>Choose picture</span>
                            </div>
                          )}
                          
                          <Icon name="pencil" onClick={chooseImage}/>
                        </div>

                        <Form.Group widths={2}>
                            <Form.Input 
                              label="First name" 
                              placeholder="First name"
                              name="firstname"
                              onChange={onChange}
                            />
                            <Form.Input 
                              label="Last name" 
                              placeholder="Last name"
                              name="lastname"
                              onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group widths={2}>
                            <Form.Input 
                              label="Country" 
                              placeholder="Country"
                              name="countrycode"
                              onChange={onChange}
                              control={Select}
                              options={countries}
                            />
                            <Form.Input 
                              label="Phonenumber" 
                              placeholder="Phonenumber"
                              name="phonenumber"
                              onChange={onChange}
                            />
                        </Form.Group>
                        
                        <Form.Input label="Email" placeholder="Email" name="email" onChange={onChange}/>
                        
                        <Form.Checkbox 
                          label="Add to favorite"
                          name="isFavorite"
                          onChange={(e, data) =>{
                            onChange(e,{name: 'isFavorite', value: data.checked});
                          }}
                        />
                        <Button disabled={formInvalid || loading} primary type='submit' onClick={onSubmit} loading={loading}>Submit</Button>
                    </Form>
                </Card.Content>

            </Card>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default CreateContact;