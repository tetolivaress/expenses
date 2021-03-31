const validationTextsMixin = {
  computed: {
    descriptionText () {
      return this.$t('description')
    },
    amountText () {
      return this.$t('amount')
    }
  }
}

export default validationTextsMixin
