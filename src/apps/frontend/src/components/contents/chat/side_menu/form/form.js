/* globals Vue */
import jwt from '../../../../../utils/jwt.axios';

import template from './form.html';

export default Vue.extend({
  template,
  data() {
    return {
      title: '',
    };
  },
  methods: {
    createRoom() {
      if (!this.title) {
        throw new Error('Title must not be empty');
      }

      jwt.post('/api/room/create', {
        title: this.title,
        password: null,
        is_private: false,
        is_anonymous: true,
      })
      .then((response) => {
        this.title = '';
        this.$emit('create-room', response.data);
      })
      .catch(() => {
        this.$emit('error', new Error('Fail create Room'));
      });
    },
  },
});
