<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" md="6">
        <!-- <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <br>
          <br>
          <br>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            required
          ></v-text-field>
        </v-form> -->
      </v-col>
    </v-row>
    <v-row justify="center">
      <!-- <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="signUserIn({email, password})"
      >
        SignIn
      </v-btn>
      <router-link to="/signup">
        <v-btn
          color="red"
        >
          SignUp
        </v-btn>
      </router-link> -->
    </v-row>
    <v-row>
      <v-btn
        color=""
        class="mt-4"
        @click="signInWithGoogle"
      >
        signInWithGoogle
      </v-btn>
    </v-row>
    <v-row>
      <v-btn
        color="blue"
        class="mt-4"
        @click="signUserInFacebook"
      >
        Login Facebook
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    valid: true,
    name: '',
    password: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    ...mapActions('user', ['signInWithGoogle', 'signUserInFacebook'])
  }
}
</script>
