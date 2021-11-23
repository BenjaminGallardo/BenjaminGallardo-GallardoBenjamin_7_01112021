import { createStore } from 'vuex'
import axios from 'axios'

let user = localStorage.getItem('user');
if(!user){
  user= {
    userId: -1,
    token: ''
  };
} else {
  try {
    user = JSON.parse(user)
  } catch {
    user= {
      userId: -1,
      token: ''
    };
  }
}

export default createStore({
  state: {
    user: user, // C'est le user qui est chargé depuis le localstorage
  },

  mutations: {
    connexionUser: function(state, user){
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user;
    },
    deconnexion: function(state){
      state.user = {
        userId: -1,
        token: ''
      }
      localStorage.removeItem('user');
    }
  },

  actions:{
    connexion: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3001/api/auth/connexion', userInfos)
        .then(response => {
          commit('connexionUser', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        });
      });
    },
    subscribe: ({commit}, userInfos) => {
      return new Promise ((resolve, reject) => {
        commit;
        axios.post('http://localhost:3001/api/auth/subscribe', userInfos)
        .then(response => {
          resolve(response)
        }) 
        .catch(error => {
          reject(error)
        })
      })
    }
  }
})
