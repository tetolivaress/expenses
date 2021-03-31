const validationTextsMixin = {
  computed: {
    nameRule () {
      return v => !v.length ? this.$t('validations.required', { field: this.$t('description') }) : true
    },
    requiredRule () {
      return v => !v.trim() ? this.$t('validations.required', { field: this.$t('amount') }) : true
    },
    numberRule () {
      return v => isNaN(parseFloat(v)) ? this.$t('validations.range', { field: this.$t('amount'), min: 0, max: 999999999 }) : true
    },
    rangeRule () {
      return v => !(v >= 0 && v <= 999999999) ? this.$t('validations.range', { field: this.$t('amount'), min: 0, max: 999999999 }) : true
    }
  }
}

export default validationTextsMixin
