import axios from 'axios';


const apiUrl = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';
const email = 'rnevesdemello@gmail.com';

export const fetchAPI = () => {
  return axios.get(apiUrl, { headers: { 'dev-email-address': email } })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};
