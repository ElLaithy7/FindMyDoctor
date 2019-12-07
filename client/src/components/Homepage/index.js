import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const token = useSelector(state => state.token);
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Find My Doctor
        </Header>
        {!token && <LoginForm />}
        {token && decode(token).role === 'doctor' && (
          <Link to="/appointments">
            <Header as="h3" color="blue" textAlign="center">
              My Appointments >
            </Header>
          </Link>
        )}
        {token && decode(token).role === 'patient' && (
          <Link to="/doctors">
            <Header as="h3" color="blue" textAlign="center">
              Doctors >
            </Header>
          </Link>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Homepage;
