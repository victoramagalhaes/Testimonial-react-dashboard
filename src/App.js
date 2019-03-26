import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/login';
import Testimonial from './Components/Testimonial';
import AuthenticatedComponent from './Components/Auth'
import Header from './Components/Header';
import TestimonialPrint from './Components/TestimonialPrint';
import TestimonialRegister from './Components/TestimonialRegister'

const Rotas = () => (
  <BrowserRouter>
  <Switch>
  <Route path='/' component={Login} exact/>
  <Route path='/print' component={TestimonialPrint}/>
  <Route path='/testimonialregister' component={TestimonialRegister}/>
    <AuthenticatedComponent>
    <Header/>
          <Route path="/testimonial" component={Testimonial} />
    </AuthenticatedComponent>
  </Switch>
  </BrowserRouter>
)

class App extends Component {
  render() {
    return (
      <Rotas/>
    );
  }
}

export default App;
