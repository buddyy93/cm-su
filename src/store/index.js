import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Router from '../router'

Vue.use(Vuex, Axios)

export const store = new Vuex.Store({
  state: {
    user: null,
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
      state.user.statusMp.statusBl = payload.statusBl
    },
    mutLoginTp (state, payload) {
      state.user.statusMp.statusTp = payload.statusTp
    },
    mutLoginSp (state, payload) {
      state.user.statusMp.statusSp = payload.statusSp
    },
    mutTambahProduk (state, payload) {
      state.produk.push(payload)
    },
    mutHapusProduk (state, payload) {
      var array = state.produk
      var index = array.map((item) => { return item.id_produk }).indexOf(payload)
      state.produk.splice(index, 1)
      Router.push('/')
    }
  },
  actions: {
    autoLogin ({commit}, payload) {
      Axios.get('http://2fd26c69.ngrok.io/markethub-cmsu/main/login', {
        headers: {
          'Authorization': 'Basic ' + payload.token
        }
      })
        .then(response => {
          // JSON responses are automatically parsed.
          console.log('[Login].. ' + response.data)
          var user = response.data
          localStorage.setItem('user', JSON.stringify(response.data))
          commit('mutUser', user)
          Axios.get('http://2fd26c69.ngrok.io/markethub-cmsu/product/list', {
            headers: {
              'Authorization': 'Basic ' + user.token
            }
          })
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
    logout ({commit}) {
      // Clear local storage
      localStorage.clear()
      Router.push('/login')
      commit('logout', '')
    },
    actLogin ({commit}, payload) {
      const user = {
        email: payload.email,
        password: payload.password
      }
      alert(window.btoa(user.email + ':' + user.password))
      Axios.get('http://2fd26c69.ngrok.io/markethub-cmsu/main/login', {
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.email + ':' + user.password)
        }
      })
        .then(response => {
          // JSON responses are automatically parsed.
          console.log('[Login].. ' + response.data)
          var user = response.data
          localStorage.setItem('user', JSON.stringify(response.data))
          commit('mutUser', user)
          Axios.get('http://2fd26c69.ngrok.io/markethub-cmsu/product/list', {
            headers: {
              'Authorization': 'Basic ' + user.token
            }
          })
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
        url: 'http://2fd26c69.ngrok.io/markethub-cmsu/login/bukalapak',
        data: form,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          commit('mutLoginBl', res.data)
          console.log(res.data)
          Router.push('/pengaturan')
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
        url: 'http://2fd26c69.ngrok.io/markethub-cmsu/login/tokopedia',
        data: form,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          commit('mutLoginTp', res.data)
          console.log(res.data)
          Router.push('/pengaturan')
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
        url: 'http://2fd26c69.ngrok.io/markethub-cmsu/login/shopee',
        data: form,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          commit('mutLoginSp', res.data)
          console.log(res.data)
          Router.push('/pengaturan')
        })
    },
    actTambahProduk ({commit, getters}, payload) {
      console.log('actTambahProduk')
      console.log(payload)
      var form = new FormData()
      form.append('nama_produk', payload.nama_produk)
      form.append('sku', payload.sku)
      form.append('asuransi', payload.asuransi)
      form.append('minimum_order', payload.minimum_order)
      form.append('harga', payload.harga)
      form.append('berat', payload.berat)
      form.append('stok', payload.stok)
      form.append('deskripsi', payload.deskripsi)
      form.append('ctgi', payload.ctgi)
      var s = getters.user.token
      Axios({
        method: 'post',
        url: 'http://2fd26c69.ngrok.io/markethub-cmsu/product/tambah',
        data: form,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          commit('mutTambahProduk', res.data)
          console.log('[act]..' + res.data)
          Router.push('/')
        })
    },
    actUpdateProduk ({commit, getters}, payload) {
      var form = new FormData()
      form.append('nama_produk', payload.nama_produk)
      form.append('sku', payload.sku)
      form.append('asuransi', payload.asuransi)
      form.append('minimum_order', payload.minimum_order)
      form.append('harga', payload.harga)
      form.append('berat', payload.berat)
      form.append('stok', payload.stok)
      form.append('deskripsi', payload.deskripsi)
      form.append('ctgi', payload.ctgi)
      var s = getters.user.token
      Axios({
        method: 'post',
        url: 'http://2fd26c69.ngrok.io/markethub-cmsu/product/edit/' + payload.id_produk,
        data: form,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          alert('update sukses')
          Router.push('/')
        })
    },
    actHapusProduk ({commit, getters}, payload) {
      var s = getters.user.token
      alert(payload)
      Axios({
        method: 'post',
        url: 'http://2fd26c69.ngrok.io/markethub-cmsu/product/delete/' + payload,
        headers: {
          'Authorization': 'Basic ' + s
        }
      })
        .then((res) => {
          commit('mutHapusProduk', payload)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    getPorduk (state) {
      return state.produk
    },
    getSingleProduk (state) {
      return (produkId) => {
        return state.produk.find((produk) => {
          return produk.id_produk === produkId
        })
      }
    }
  }
})
