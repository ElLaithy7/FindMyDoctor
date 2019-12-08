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
import { get, put } from '../../utils/axios';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => (
  <div
    style={{
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: '5px solid red',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    }}
  >
    I'm Here
  </div>
);

const DoctorProfile = ({ match }) => {
  const [doctor, setDoctor] = useState(false);

  useEffect(() => {
    get(`doctors/${match.params.id}`).then(response => setDoctor(response));
  }, []);

  const handleRate = (e, { rating, maxRating }) => {
    put(`doctors/rate/${match.params.id}`, {
      rating,
      patientId: decode(localStorage.getItem('token')).id
    }).then(response => {
      alert('Thanks for rating');
    });
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh', marginTop: '50px' }}>
      <Grid.Column style={{ maxWidth: 1000 }}>
        <Image src={doctor.image} circular centered size="medium" />
        <Header as="h1" color="teal" textAlign="center">
          {doctor && doctor.name}
        </Header>
        <Header as="h3" color="teal" textAlign="center">
          Email: {doctor && doctor.email}
        </Header>
        <Header as="h3" color="teal" textAlign="center">
          Specialization: {doctor && doctor.specialization}
        </Header>
        <Header as="h3" color="teal" textAlign="center">
          What do you think of this doctor?
        </Header>
        {doctor && (
          <Rating
            defaultRating={
              doctor.ratings.reduce(
                (acc, current) => (acc += current.rating),
                0
              ) / doctor.ratings.length
            }
            maxRating={5}
            icon="star"
            onRate={handleRate}
          />
        )}
        <Header as="h3" color="teal" textAlign="center"></Header>
        <Link to={`/reserve/${doctor._id}`} className="button">
          <Button basic color="blue">
            Reserve
          </Button>
        </Link>
        <Header as="h3" color="teal" textAlign="center">
          Location:
        </Header>
        {doctor && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyA04eKWIFgJBhtmuR06hie9kwpOZGEOvAA'
            }}
            defaultCenter={{
              lat: doctor.lat,
              lng: doctor.lng
            }}
            defaultZoom={15}
          >
            <Marker lat={doctor.lat} lng={doctor.lng} />
          </GoogleMapReact>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(DoctorProfile);
