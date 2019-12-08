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
import { withRouter } from 'react-router';
import { post, get } from '../../utils/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import decode from 'jwt-decode';

const AppointmentReservation = ({ match }) => {
  const [doctor, setDoctor] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    get(`doctors/${match.params.doctorId}`).then(response =>
      setDoctor(response)
    );
  }, []);

  const onReserve = () => {
    post('appointments/create', {
      doctorId: match.params.doctorId,
      patientId: decode(localStorage.getItem('token')).id,
      date
    }).then(response => alert('Appointment Reserved'));
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh', marginTop: '50px' }}>
      <Grid.Column style={{ maxWidth: 1000 }}>
        <Header as="h1" color="teal" textAlign="center">
          Reserve an Appointment
        </Header>
        {doctor && (
          <Header as="h3" color="teal" textAlign="center">
            Availability: {doctor.availability}
          </Header>
        )}
        <DatePicker
          selected={date}
          onChange={date => setDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <Button basic color="blue" onClick={onReserve}>
          Reserve
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(AppointmentReservation);
