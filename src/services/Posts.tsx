import axios, {AxiosResponse} from 'axios';
import { getAuthHeader } from './Auth'

function getPosts(): Promise<AxiosResponse> {
  return axios.get('/posts/', getAuthHeader());
}

function addPost(title: string, message: string): Promise<AxiosResponse> {
  return axios.post('/posts/add', {
    "title": title,
    "message": message,
  }, getAuthHeader());
}

// redirect if not login

export { getPosts, addPost };


