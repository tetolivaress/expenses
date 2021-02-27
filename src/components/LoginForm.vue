<template lang="pug">
  v-container
    v-row(align="center" justify="center" class="mt-16 pt-16")
      v-btn(
        x-large
        color=""
        class="mt-4"
        @click="signInWithGoogle"
      )
        | {{$t('googleLogin')}}
    v-row(align="center" justify="center" class="mt-8")
      v-btn(
        x-large
        color="blue"
        class="mt-4 white--text"
        @click="signUserInFacebook"
      )
        | {{$t('facebookLogin')}}
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
