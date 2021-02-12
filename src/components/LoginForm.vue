<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-16 pt-16">
      <v-btn
        x-large
        color=""
        class="mt-4"
        @click="signInWithGoogle"
      >
        Login Google
      </v-btn>
    </v-row>
    <v-row align="center" justify="center" class="mt-8">
      <v-btn
        x-large
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
