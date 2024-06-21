import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Adjust if your server runs on a different port

export const fetchAccounts = () => axios.get(`${API_BASE_URL}/account`);
export const createAccount = (account) => axios.post(`${API_BASE_URL}/account`, account);
export const deleteAccount = (accountId) => axios.delete(`${API_BASE_URL}/account/${accountId}`);

export const fetchDestinations = (accountId) => axios.get(`${API_BASE_URL}/destination/${accountId}`);
export const createDestination = (destination) => axios.post(`${API_BASE_URL}/destination`, destination);
export const deleteDestination = (id) => axios.delete(`${API_BASE_URL}/destination/${id}`);

export const sendData = (data, token) =>
  axios.post(`${API_BASE_URL}/server/incoming_data`, data, {
    headers: { 'CL-X-TOKEN': token },
  });
