import { createStore } from 'vuex'

import axios from 'axios'
const instanceAxios = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

let user = localStorage.getItem('user');
if(!user) {
  user= {
    userId: -1,
    token: ''
  };
} else {
  try {
    user.JSON.parse(user);
    instanceAxios.defaults.headers.common['Authorization'] = user.token; 
  } catch(initial) {
    user= {
      userId: -1,
      token: ''
    };
  }
}

export default createStore({
  state: {
    status: '',
    user: user,
    userInformations: {
      username: '',
      email:'',
      bio: '',
      imageUrl: ''
    }
  },
  mutations: {
    setStatus(state, status){
      state.status = status;
    },
    logUser(state, user){
      instanceAxios.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInformations(state, userInformations){
      state.userInformations = userInformations;
    },
    deconnexion(state){
      state.user = {
        userId: -1,
        token: ''
      }
      localStorage.removeItem('user');
    }
  },

  actions: {
    subscribe: ({commit}, userInformations) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instanceAxios
        .post('auth/subscribe', userInformations)
        .then(response => {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(error => {
          commit('setStatus', 'error-created');
          reject(error);
        })
      })
    },

    connexion: ({commit}, userInformations) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instanceAxios
        .post('auth/connexion', userInformations)
        .then(response => {
          commit('setStatus', '');
          commit('logUser', response.data)
          resolve(response);
        })
        .catch(error => {
          commit('setStatus', 'error-connexion');
          reject(error);
        })
      })
    }
  }
})
