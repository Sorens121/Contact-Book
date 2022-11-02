import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header as SemanticHeader, Message, Segment } from 'semantic-ui-react';
import Header from '../../components/Header/Header';

const LoginUI = ({form: {form, loading, error, onChange, onSubmit, loginValidator}}) => {
  return (
    <div>
        <Header />
        <Grid centered>
          <Grid.Column style={{maxWidth: 550, marginTop: 20}}>
            <SemanticHeader>Login</SemanticHeader>
            <Segment>
              <Form>
                {error && <Message content={error?.message} negative/>}
                <Form.Field>
                  <Form.Input
                      value={form.username || ""}
                      onChange={onChange}
                      name="username"
                      label="Username"
                      placeholder="username"
                    />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                      value={form.password || ""}
                      onChange={onChange}
                      name="password"
                      label="Password"
                      placeholder="password"
                      type='password'
                    />
                </Form.Field>

                <Button
                  onClick={onSubmit}
                  disabled={loginValidator || loading}
                  fluid
                  primary
                  type='submit'
                  loading={loading}
                >
                  Login
                </Button>

                <Segment>
                  Need an account?
                  <Link to="/register">Register</Link> 
                </Segment>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
    </div>
  )
}

export default LoginUI;