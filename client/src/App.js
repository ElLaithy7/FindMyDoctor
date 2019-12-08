import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './components/Homepage';
import UserSignup from './components/UserSignup';
import DoctorSignup from './components/DoctorSignup';
import Doctors from './components/Doctors';
import DoctorProfile from './components/DoctorProfile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/user/signup" component={UserSignup} />
        <Route exact path="/doctor/signup" component={DoctorSignup} />
        <Route exact path="/doctors/:id" component={DoctorProfile} />
        <Route exact path="/doctors" component={Doctors} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
