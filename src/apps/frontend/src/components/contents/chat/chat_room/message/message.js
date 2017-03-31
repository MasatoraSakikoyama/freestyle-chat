import template from './message.html';

export default {
    template: template,
    props: ['message', 'index'],
    computed: {
        number() {
            return (this.index + 1)
        }
    }
}
