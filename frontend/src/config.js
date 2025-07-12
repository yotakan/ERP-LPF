// src/config.js
const config = {
  apiPath: 'http://localhost:5000/api',
  headers: () => ({
    headers: {
      Authorization: localStorage.getItem('token'),
    }
  })
};

export default config;
