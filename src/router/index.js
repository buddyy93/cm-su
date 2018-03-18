import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Pengaturan from '@/components/Pengaturan'
import TambahProduk from '@/components/TambahProduk'
import DetailProduk from '@/components/DetailProduk'
import AuthGuard from './auth-guard'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/pengaturan',
      name: 'Pengaturan',
      component: Pengaturan,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/tambah-produk',
      name: 'TambahProduk',
      component: TambahProduk,
      beforeEnter: AuthGuard
    },
    {
      path: '/detail-produk/:id_produk',
      name: 'DetailProduk',
      props: true,
      component: DetailProduk,
      beforeEnter: AuthGuard
    }
  ]
})
