import React, { Component } from 'react';
import { Container } from '../components';

class LoginPage extends Component {
  render() {
    return (
      <Container variant="fixed">
        <h1>Login page</h1>
        <p>You are not logged in and you can't.</p>
        <p>
          Back to <a href="/">home</a>
        </p>
      </Container>
    );
  }
}

export default LoginPage;
