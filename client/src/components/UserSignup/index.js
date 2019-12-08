import React, { Fragment, useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import { post } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions';
import { withRouter } from 'react-router';

const UserSignup = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
    image: ''
  });
  const dispatch = useDispatch();

  const onSubmit = () => {
    post('patients/create', state).then(response => {
      post('doctors/login', {
        email: state.email,
        password: state.password
      }).then(response => {
        dispatch(logIn(response));
        localStorage.setItem('token', JSON.stringify(response));
        history.push('/');
      });
    });
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Register as a User
        </Header>
        <Form size="large">
          <Segment>
            <Form.Input
              fluid
              placeholder="E-mail address"
              value={state.email}
              onChange={e => setState({ ...state, email: e.target.value })}
            />
            <Form.Input
              fluid
              placeholder="Password"
              type="password"
              value={state.password}
              onChange={e => setState({ ...state, password: e.target.value })}
            />
            <Form.Input
              fluid
              placeholder="Name"
              value={state.name}
              onChange={e => setState({ ...state, name: e.target.value })}
            />
            <Form.Input
              fluid
              placeholder="Image URL"
              value={state.image}
              onChange={e => setState({ ...state, image: e.target.value })}
            />
            <Button color="teal" fluid size="large" onClick={onSubmit}>
              Sign Up
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(UserSignup);
