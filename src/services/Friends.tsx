import axios, {AxiosResponse} from 'axios';
import { getAuthHeader } from './Auth'

function getUsers(): Promise<AxiosResponse> {
  return axios.get('/users/', getAuthHeader());
}

function getFriends(): Promise<AxiosResponse> {
  return axios.get('/friends/', getAuthHeader());
}

function getWaitingFriends(): Promise<AxiosResponse> {
  return axios.get('/friends/waiting', getAuthHeader());
}

function getRequestingFriends(): Promise<AxiosResponse> {
  return axios.get('/friends/requested', getAuthHeader());
}

function addFriend(id: string): Promise<AxiosResponse> {
  return axios.post('/friends/' + id + '/add/', {}, getAuthHeader());
}

function confirmFriend(id: string): Promise<AxiosResponse> {
  return axios.post('/friends/' + id + '/confirm/', {}, getAuthHeader());
}

function removeFriend(id: string): Promise<AxiosResponse> {
  return axios.post('/friends/' + id + '/delete/', {}, getAuthHeader());
}

export { getUsers, getFriends, getWaitingFriends, addFriend, confirmFriend, getRequestingFriends, removeFriend };


