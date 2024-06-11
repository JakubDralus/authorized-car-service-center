import { ApiResponse, TicketRead, User } from '../../api/model';
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUser = async () => {
  try {
    const response = await instance.get<ApiResponse<User>>('/users/me');
    console.log('User fetched');
    return response.data.data;
  } 
  catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchUsersTickets = async () => {
  try {
    const response = await instance.get<ApiResponse<TicketRead[]>>('/tickets/my-tickets');
    console.log('Tickets fetched');
    return response.data.data;
  } 
  catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};
