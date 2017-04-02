/* globals Vue */
import template from './input.html';

export default Vue.extend({
  template,
  props: {
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      model: null,
    };
  },
  computed: {},
  methods: {},
});
