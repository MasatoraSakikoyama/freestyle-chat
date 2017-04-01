import template from './contents.html';

export default {
    template: template,
    props: {
        router: {
            type: Object,
            required: true
        },
        isLogin: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        login() {
            this.$emit('login');
        }
    }
}
