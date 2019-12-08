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

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    get('doctors').then(response => setDoctors(response));
  }, []);

  return (
    <Grid textAlign="center" style={{ height: '100vh', marginTop: '50px' }}>
      <Grid.Column style={{ maxWidth: 1000 }}>
        <Header as="h2" color="teal" textAlign="center">
          Find the best Doctor
        </Header>
        <Card.Group>
          {doctors.map(doctor => (
            <Card>
              <Card.Content>
                <Image floated="right" size="mini" src={doctor.image} />
                <Card.Header>{doctor.name}</Card.Header>
                <Card.Meta>
                  <Rating
                    defaultRating={
                      doctor.ratings.reduce(
                        (acc, current) => (acc += current.rating),
                        0
                      ) / doctor.ratings.length
                    }
                    maxRating={5}
                    disabled
                    size="mini"
                  />
                </Card.Meta>
                <Card.Description>
                  Specialization: {doctor.specialization}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Link to={`/doctors/${doctor._id}`} className="button">
                    <Button basic color="green">
                      Profile
                    </Button>
                  </Link>
                  <Link to={`/reserve/${doctor._id}`} className="button">
                    <Button basic color="blue">
                      Reserve
                    </Button>
                  </Link>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default Doctors;
