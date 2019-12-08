import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import Homepage from './components/Homepage';
import UserSignup from './components/UserSignup';
import DoctorSignup from './components/DoctorSignup';
import Doctors from './components/Doctors';
import DoctorProfile from './components/DoctorProfile';
import Appointments from './components/Appointments';
import AppointmentReservation from './components/AppointmentReservation';
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from './redux/actions';

function App({ history }) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
    localStorage.removeItem('token');
    history.push('/');
  };

  const token = useSelector(state => state.token);

  return (
    <Fragment>
      {token && (
        <Button basic color="blue" onClick={logout}>
          Logout
        </Button>
      )}
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/user/signup" component={UserSignup} />
        <Route exact path="/doctor/signup" component={DoctorSignup} />
        <Route exact path="/doctors/:id" component={DoctorProfile} />
        <Route exact path="/doctors" component={Doctors} />
        <Route exact path="/appointments" component={Appointments} />
        <Route
          exact
          path="/reserve/:doctorId"
          component={AppointmentReservation}
        />
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);
