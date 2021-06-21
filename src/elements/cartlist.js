export default Vue.component('cart-list', {


    props: ['cartgoods'],

    template: `
        <div class="cart-list notVisible">
            <h3 class="cart-name">Корзина</h3>
            <cart-item v-for="cartEntity in cartgoods" :cartItem="cartEntity"></cart-item>
        </div>
    `

});