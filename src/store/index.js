import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Router from '../router'

Vue.use(Vuex, Axios)

export const store = new Vuex.Store({
  state: {
    user: [],
    produk: []
  },
  mutations: {
    mutUser (state, payload) {
      state.user = payload
      Router.push('/')
    },
    logout (state, payload) {
      state.user = payload
      state.produk = payload
    },
    mutProduk (state, payload) {
      state.produk = payload
    },
    mutLoginBl (state, payload) {
      state.user.statusBl = payload.statusBl
    }
  },
  actions: {
    autoLogin ({commit}, payload) {
      commit('mutUser', payload)
      Axios.get('http://6b9ac90d.ngrok.io/markethub-cmsu/product/myjson')
        .then(response => {
          commit('mutProduk', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    logout ({commit}) {
      // Clear local storage
      localStorage.clear()
      Router.push('/login')
      commit('logout', '')
    },
    actLogin ({commit}, payload) {
      const user = {
        email: 'admin',
        password: 'admin'
      }
      Axios.get(`http://6b9ac90d.ngrok.io/markethub-cmsu/main/login`, {
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.email + ':' + user.password)
        }
      })
        .then(response => {
          // JSON responses are automatically parsed.
          var user = response.data
          localStorage.setItem('user', JSON.stringify(response.data))
          commit('mutUser', user)
          Axios.get('http://6b9ac90d.ngrok.io/markethub-cmsu/product/myjson')
            .then(response => {
              commit('mutProduk', response.data)
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
    },
    actLoginBl ({commit, getters}, payload) {
      var form = new FormData()
      form.append('emailBl', payload.email)
      form.append('passBl', payload.pass)
      var s = getters.user.token
      alert(payload.email + ' ' + payload.pass + ' ' + s)
      Axios({
        method: 'post',
        url: 'http://6b9ac90d.ngrok.io/markethub-cmsu/login/bukalapak',
        data: form,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          commit('mutLoginBl', res.data)
          console.log(res.data)
        })
    },
    actLoginTp ({commit, getters}, payload) {
      var form = new FormData()
      form.append('emailTp', payload.email)
      form.append('passTp', payload.pass)
      var s = getters.user.token
      alert(payload.email + ' ' + payload.pass + ' ' + s)
      Axios({
        method: 'post',
        url: 'http://6b9ac90d.ngrok.io/markethub-cmsu/login/tokopedia',
        data: form,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          console.log(res.data)
        })
    },
    actLoginSp ({commit, getters}, payload) {
      var form = new FormData()
      form.append('emailSp', payload.email)
      form.append('passSp', payload.pass)
      var s = getters.user.token
      alert(payload.email + ' ' + payload.pass + ' ' + s)
      Axios({
        method: 'post',
        url: 'http://6b9ac90d.ngrok.io/markethub-cmsu/login/shopee',
        data: form,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          console.log(res.data)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    getPorduk (state) {
      return state.produk
    }
  }
})
