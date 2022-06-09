import { useState } from 'react';
import axios, {AxiosResponse} from 'axios';

function getUserToken(): string|null {
  const userToken = localStorage.getItem('userToken');
  if(!userToken) {
    return null;
  }
  return JSON.parse(userToken)
};

function useToken() {
  const [token, setToken] = useState(getUserToken());

  const saveToken = (userToken: string|null) => {
    localStorage.setItem('userToken', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}

function login(pseudo: string, password: string): Promise<AxiosResponse> {
  return axios.post('/auth/signin', {
    "username": pseudo,
    "password": password
  })
}

function register(firstName: string, lastName: string, pseudo: string, email: string, password: string, age: string, sexe: string): Promise<AxiosResponse> {
  return axios.post('/auth/signup', {
    "first-name": firstName,
    "last-name": lastName,
    "user-name": pseudo,
    "email": email,
    "password": password,
    "age": age,
    "sexe": sexe
  })
}

function getAuthHeader(): { headers: { Authorization: string } } {
  return {
    headers: {
      Authorization: `Bearer ${getUserToken()}`
    }
  };
}

function getUser(): Promise<AxiosResponse> {
  return axios.post('/auth/me/', {}, getAuthHeader())
}

export { login, register, getUser, useToken, getAuthHeader, getUserToken };


