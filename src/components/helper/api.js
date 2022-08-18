import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  //baseURL: 'https://gentle-plateau-38671.herokuapp.com/',
});

instance.interceptors.request.use((c) => {
  c.headers.Authorization = localStorage.getItem('token');
  c.headers['x-access-token'] = localStorage.getItem('token');
  return c;
});

const api = {
  auth: {
    me: () => instance.get('api/users/current'),
    login: (data) => instance.post('users/sign_in', data),
    register: (data) => instance.post('users', data),
  },
  items: {
    all: (search) => instance.get(`api/items?search=${search}`),
    add: (data) => instance.post('api/items', data),
    edit: (data,id) => instance.put('/api/items/' + id, data),
    delete: (id) => instance.delete('api/items/' + id),
  },
  users: {
    all: () => instance.get('api/users'),
    add: (data) => instance.post('api/users', data),
    edit: (data,id) => instance.put('/api/users/' + id, data),
    delete: (id) => instance.delete('api/users/' + id),
  },
  orders: {
    all: () => instance.get('api/orders'),
    add: (data) => instance.post('api/orders', data),
  }
};

export default api;