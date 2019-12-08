import React, { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Card,
  Image,
  Rating
} from 'semantic-ui-react';
import { get } from '../../utils/axios';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    get(
      `appointments/doctorAppointments/${
        decode(localStorage.getItem('token')).id
      }`
    ).then(response => setAppointments(response));
  }, []);

  return (
    <Grid textAlign="center" style={{ height: '100vh', marginTop: '50px' }}>
      <Grid.Column style={{ maxWidth: 1000 }}>
        <Header as="h2" color="teal" textAlign="center">
          Your Appointments
        </Header>
        <Card.Group>
          {appointments.map(appointment => (
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src={appointment.patient.image}
                />
                <Card.Header>{appointment.patient.name}</Card.Header>
                <Card.Meta>{appointment.patient.email}</Card.Meta>
                <Card.Description>
                  Date: {appointment.date.substring(0, 10)}{' '}
                  {appointment.date.substring(11, 16)}
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default Appointments;
