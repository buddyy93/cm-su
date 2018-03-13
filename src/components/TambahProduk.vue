<template>
  <v-container style="position: relative">
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-card-title>
            <h1>Tambah Produk</h1>
          </v-card-title>
          <v-card-text>
              <v-text-field v-model="nama_produk" name="nama_produk" label="Nama Produk" requried></v-text-field>
              <v-text-field v-model="sku" name="sku" label="SKU" requried></v-text-field>
              <v-checkbox v-model="asuransi" label="Asuransi"></v-checkbox>
              <input style="display:none;" type="checkbox" name="asuransi" :checked="asuransi">
              <v-text-field v-model="minimum_order" name="minimum_order" label="Minimum Order" requried></v-text-field>
              <v-text-field v-model="harga" name="harga" label="Harga" requried></v-text-field>
              <v-text-field v-model="berat" name="berat" label="Berat (gram)" requried></v-text-field>
              <v-text-field v-model="stok" name="stok" label="Stok" requried></v-text-field>
              <v-select :items="kategories1" v-model="ctgi" label="Kategori 1" single-line bottom></v-select>
              <v-text-field v-model="deskripsi" name="deskripsi" label="Deskripsi" textarea requried></v-text-field>
              <input style="display:none;" type="text" name="ctgi" :value="ctgi.text">
              <v-btn block color="primary" @click="tambah">Tambah</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      nama_produk: '',
      sku: '',
      asuransi: false,
      minimum_order: '',
      harga: '',
      berat: '',
      stok: '',
      deskripsi: '',
      ctgi: '',
      kategories1: [{
        text: 'State 1'
      },
      {
        text: 'State 2'
      }]
    }
  },
  methods: {
    tambah () {
      alert(this.ctgi.text)
      const produk = {
        nama_produk: this.nama_produk,
        sku: this.sku,
        asuransi: this.asuransi,
        minimum_order: this.minimum_order,
        harga: this.harga,
        berat: this.berat,
        stok: this.stok,
        deskripsi: this.deskripsi,
        ctgi: this.ctgi.text
      }
      this.$store.dispatch('actTambahProduk', produk)
    }
  }
}
</script>

