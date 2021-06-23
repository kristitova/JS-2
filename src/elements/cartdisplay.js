export default Vue.component('cart-display', {
    data() {
        return {
            cartgoods: []
        }
    },

    //props: ['cartgoods'],

    template: `
        <button class="cart-button" type="button" v-on:click="getcart">Корзина</button>
    `,

    methods: {

        getcart() {
            this.$emit('getcart', this.cartgoods);

        }
    },

});