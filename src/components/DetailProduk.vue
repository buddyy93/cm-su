<template>
  <v-container style="position: relative">
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-card-title>
            <h1>Detail Produk</h1>
          </v-card-title>
          <v-card-text>
              <v-text-field v-model="produk.nama_produk" name="nama_produk" label="Nama Produk" requried></v-text-field>
              <v-text-field v-model="produk.sku" name="sku" label="SKU" requried></v-text-field>
              <v-checkbox v-model="produk.asuransi" true-value="0" false-value="1" label="Asuransi"></v-checkbox>
              <v-text-field name="minimum_order" label="Minimum Order" v-model="produk.minimum_order" requried></v-text-field>
              <v-text-field name="harga" label="Harga" v-model="produk.harga" requried></v-text-field>
              <v-text-field name="berat" label="Berat (gram)" v-model="produk.berat" requried></v-text-field>
              <v-text-field name="stok" label="Stok" v-model="produk.stok" requried></v-text-field>
              <v-select :items="kategories1" v-model="produk.ctgi" label="Kategori 1" single-line auto append-icon="label" hide-details></v-select>
              <v-text-field name="deskripsi" label="Deskripsi" v-model="produk.deskripsi" textarea requried></v-text-field>
              <v-btn block color="primary" @click="updateProduk">Simpan Perubahan</v-btn>
              <v-btn block color="warning" @click="hapusProduk">Hapus</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id_produk'],
  data () {
    return {
      kategories1: [
        'State 1', 'State 2'
      ]
    }
  },
  computed: {
    produk () {
      return this.$store.getters.getSingleProduk(this.id_produk)
    }
  },
  methods: {
    updateProduk () {
      const produk = {
        id_produk: this.id_produk,
        nama_produk: this.produk.nama_produk,
        sku: this.produk.sku,
        asuransi: this.produk.asuransi,
        minimum_order: this.produk.minimum_order,
        harga: this.produk.harga,
        berat: this.produk.berat,
        stok: this.produk.stok,
        deskripsi: this.produk.deskripsi,
        ctgi: this.produk.ctgi
      }
      this.$store.dispatch('actUpdateProduk', produk)
    },
    hapusProduk () {
      this.$store.dispatch('actHapusProduk', this.id_produk)
    }
  }
}
</script>

