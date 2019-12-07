import React from 'react';
import { Switch, Route } from 'react-router';
import Homepage from './components/Homepage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
