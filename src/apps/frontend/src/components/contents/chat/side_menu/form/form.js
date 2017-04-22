/* globals Vue */
import jwt from '../../../../../utils/jwt.axios';
import template from './form.html';
import {} from './form.css';
import factory from '../../../../common/input/component.factory';

export default Vue.extend({
  template,
  data() {
    return {
      model: {
        key: 'Title',
        value: null,
        isValid: false,
        rules: [
          { name: 'NotEmpty' },
          { name: 'MaxLength', param: 255 },
        ],
      },
    };
  },
  components: {
    'text-input': factory('text'),
  },
  methods: {
    createRoom() {
      if (!this.model.isValid) {
        return;
      }
      jwt.post('/api/room/create', {
        title: this.model.value,
        password: null,
        is_private: false,
        is_anonymous: true,
      })
      .then((response) => {
        this.model.value = null;
        this.$emit('create-room', response.data);
      })
      .catch(() => {
        // this.$emit('error', {
        //   title: 'Room',
        //   message: 'Fail create',
        // });
      });
    },
  },
});
