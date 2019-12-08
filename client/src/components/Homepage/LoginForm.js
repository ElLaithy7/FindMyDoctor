import React, { Fragment, useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { post } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    post('doctors/login', { email, password })
      .then(response => {
        dispatch(logIn(response));
        localStorage.setItem('token', JSON.stringify(response));
      })
      .catch(error => alert('Incorrect email or password'));
  };

  return (
    <Fragment>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button color="teal" fluid size="large" onClick={onSubmit}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New Doctor? <Link to="/doctor/signup">Register Here</Link>
      </Message>
      <Message>
        New User? <Link to="/user/signup">Register Here</Link>
      </Message>
    </Fragment>
  );
};

export default LoginForm;
