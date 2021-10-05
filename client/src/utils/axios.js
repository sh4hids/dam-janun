import axios from 'axios';

const fetch = async ({ url, method, body }) => {
  const options = {
    method,
    headers: requestHeaders(),
    data: body,
  };

  const res = await axios(url, options);
  return parseStatus(res.status, getJSON(res));
};

function parseStatus(status, res) {
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      res.then((response) => resolve(response));
    } else {
      res.then((response) => {
        return reject({ status, message: response });
      });
    }
  });
}

async function getJSON(response) {
  if (response.status === 204) return '';

  try {
    const data = await response.data;
    return data;
  } catch (err) {
    return err;
  }
}

function requestHeaders() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
}

export default fetch;
