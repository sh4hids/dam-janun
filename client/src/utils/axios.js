import axios from 'axios';

const fetch = async ({ url, method, body, type, token }) => {
  const options = {
    method,
    headers: requestHeaders(token, type),
    data:
      method !== 'GET'
        ? type !== 'multipart'
          ? JSON.stringify(body)
          : body
        : null,
  };
  const res = await axios(url, options);
  return parseStatus(res.status, getJSON(res));
};

function parseStatus(status, res) {
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      res.then(response => resolve(response));
    } else {
      res.then(response => {
        return reject({ status, message: response });
      });
    }
  });
}

async function getJSON(response) {
  if (response.status === 204) return '';

  try {
    const text = await response.text(); // Parse it as text
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    return err;
  }
}

function requestHeaders(token, type) {
  if (type && type === 'multipart') {
    return {
      Authorization: token ? `Token ${token}` : '',
    };
  }

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token ? `Token ${token}` : '',
  };
}

export default fetch;
