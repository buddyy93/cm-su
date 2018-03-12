<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex row wrap class="py-2 px-2" xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div>
              Bukalapak
            </div>
            <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn v-if="!user" @click="blDialog = true">Login</v-btn>
            <v-btn v-if="user">Pending</v-btn>
          </v-card-actions>
          </v-card-title>
        </v-card>
        <v-dialog v-model="blDialog" persistent max-width="500px">
          <v-card>
            <v-card-title>Login Bukalapak</v-card-title>
            <v-card-text>
              <v-text-field label="email" v-model="emailBl"></v-text-field>
              <v-text-field label="password" v-model="passBl"></v-text-field>
            </v-card-text>
            <v-card-actions>
               <v-btn @click="loginBl">Login</v-btn>
              <v-btn @click="blDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex row wrap class="py-2 px-2" xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div>
              Tokopedia
            </div>
            <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn @click="tpDialog = true">Login</v-btn>
          </v-card-actions>
          </v-card-title>
        </v-card>
        <v-dialog v-model="tpDialog" persistent max-width="500px">
          <v-card>
            <v-card-title>Login Tokopedia</v-card-title>
            <v-card-text>
              <v-text-field label="email" v-model="emailTp"></v-text-field>
              <v-text-field label="password" v-model="passTp"></v-text-field>
            </v-card-text>
            <v-card-actions>
               <v-btn @click="loginTp">Login</v-btn>
              <v-btn @click="tpDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex row wrap class="py-2 px-2" xs12 md4>
        <v-card>
          <v-card-title primary-title>
            <div>
              Shopee
            </div>
            <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn @click="spDialog = true">Login</v-btn>
          </v-card-actions>
          </v-card-title>
        </v-card>
        <v-dialog v-model="spDialog" persistent max-width="500px">
          <v-card>
            <v-card-title>Login Bukalapak</v-card-title>
            <v-card-text>
              <v-text-field label="email" v-model="emailSp"></v-text-field>
              <v-text-field label="password" v-model="passSp"></v-text-field>
            </v-card-text>
            <v-card-actions>
               <v-btn @click="loginSp">Login</v-btn>
              <v-btn @click="spDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      blDialog: false,
      emailBl: '',
      passBl: '',
      tpDialog: false,
      emailTp: '',
      passTp: '',
      spDialog: false,
      emailSp: '',
      passSp: ''
    }
  },
  methods: {
    click (dl) {
      this.dl = true
    },
    loginBl () {
      const userBl = {
        email: this.emailBl,
        pass: this.passBl
      }
      this.blDialog = false
      this.$store.dispatch('actLoginBl', userBl)
    },
    loginTp () {
      const userTp = {
        email: this.emailTp,
        pass: this.passTp
      }
      this.$store.dispatch('actLoginTp', userTp)
    },
    loginSp () {
      const userSp = {
        email: this.emailSp,
        pass: this.passSp
      }
      this.$store.dispatch('actLoginSp', userSp)
    }
  },
  computed: {
    user () {
      return this.$store.getters.user.statusBl !== undefined && this.$store.getters.user.statusBl !== null
    }
  }
}
</script>