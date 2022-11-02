import React from 'react';
import Header from '../../components/Header/Header';
import { Button, Form, Grid, Header as SemanticHeader, Segment } from 'semantic-ui-react';

const RegisterUI = ({form: {onChange, form, formValidator, onSubmit, loading, fieldError}}) => {
  return (
    <div>
        <Header />
        <Grid centered>
          <Grid.Column style={{maxWidth: 550, marginTop:20}}>
            <SemanticHeader>Sign Up</SemanticHeader>
            <Segment>
              <Form>
                <Form.Field>
                  <Form.Input
                    name="username"
                    label="Username"
                    placeholder="username"
                    value={form.username || ""}
                    onChange={onChange}
                    error={
                      fieldError.username && {
                        content: fieldError.username,
                        pointing: "below"
                      }
                    }
                    />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    name="firstname"
                    label="First Name"
                    placeholder="firstname"
                    value={form.firstname || ""}
                    onChange={onChange}
                    />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    name="lastname"
                    label="Last Name"
                    placeholder="lastname"
                    value={form.lastname || ""}
                    onChange={onChange}
                    />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    name="email"
                    label="Email"
                    placeholder="email"
                    value={form.email || ""}
                    onChange={onChange}
                    error={
                      fieldError.email && {
                        content: fieldError.email,
                        pointing: "below"
                      }
                    }
                    />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    name="password"
                    label="Password"
                    placeholder="password"
                    type='password'
                    value={form.password || ""}
                    onChange={onChange}
                    error={
                      fieldError.password && {
                        content: fieldError.password,
                        pointing: "below"
                      }
                    }
                    />
                </Form.Field>

                <Button 
                    disabled={formValidator} 
                    fluid
                    primary
                    type='submit'
                    onClick={onSubmit}
                    loading={loading}
                  >
                  Submit
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
    </div>
  )
}

export default RegisterUI;