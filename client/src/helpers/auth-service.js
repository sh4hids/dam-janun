import jsCookie from 'js-cookie';

export default class AuthService {
  loggedIn = () => {
    const token = this.getToken();
    return !!token;
  };

  setToken = token => {
    jsCookie.set('Token', token, { expires: 7 });
  };

  getToken = () => {
    return jsCookie.get('Token');
  };

  setUser = user => {
    jsCookie.set('user', JSON.stringify(user), { expires: 7 });
  };

  getUser = req => {
    return jsCookie.get('user');
  };

  getCsrfToken = () => {
    return jsCookie.get('csrftoken');
  };

  removeToken = () => {
    jsCookie.remove('Token');
    jsCookie.remove('user');
    jsCookie.remove('csrftoken');
  };
}
