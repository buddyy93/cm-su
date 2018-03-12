<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-card-title>
            <h2>Login ke Markethub</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="email" label="email"></v-text-field>
            <v-text-field v-model="password" label="password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="login()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      message: 'hello'
    }
  },
  methods: {
    login () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('actLogin', user)
    }
  }
}
</script>

