import { createStore } from 'vuex'

const user = JSON.parse(localStorage.getItem('user'));

export default createStore({
  state: {
    headers : {headers:{ 'Authorization' : `Bearer ${user.token}` }},
    userId : user.userId
  },
})
