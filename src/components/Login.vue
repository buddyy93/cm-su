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
            <v-text-field name="input-10-1"
              label="Enter your password"
              hint="At least 8 characters"
              v-model="password"
              min="8"
              :append-icon="see ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (see = !see)"
              :type="see ? 'password' : 'text'"
              counter></v-text-field>
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
      message: 'hello',
      see: true
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

