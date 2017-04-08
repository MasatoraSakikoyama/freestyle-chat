/* globals Vue, axios */
import text from './templates/text.html';
import password from './templates/password.html';
import textarea from './templates/textarea.html';
import {} from './input.css';

const templates = { text, password, textarea };

export default (inputType) => {
  const template = templates[inputType];
  return Vue.extend({
    template,
    props: {
      model: {
        type: Object,
        required: true,
        key: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
        isValid: {
          type: Boolean,
          required: true,
        },
        rules: {
          type: Array,
          required: true,
        },
      },
    },
    data() {
      return {
        message: null,
        validation: {
          NotEmpty: this.notEmpty,
          MaxLength: this.maxLength,
        },
      };
    },
    computed: {
      target() {
        return this.model.value;
      },
    },
    watch: {
      target: {
        handler() {
          this.model.rules.some((rule) => {
            const isValid = this.validation[rule.name](rule.param);
            return !isValid;
          });
        },
      },
    },
    methods: {
      notEmpty() {
        if (!this.target) {
          this.message = `${this.model.key} must not be empty`;
          this.model.isValid = false;
        } else {
          this.message = null;
          this.model.isValid = true;
        }
        return this.model.isValid;
      },
      maxLength(length) {
        if (this.target.length > length) {
          this.message = `${this.model.key} is too long`;
          this.model.isValid = false;
        } else {
          this.message = null;
          this.model.isValid = true;
        }
        return this.model.isValid;
      },
    },
  });
};
