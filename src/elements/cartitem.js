export default Vue.component('cart-item', {

    props: ['cartItem'],
    methods: {
        async deletefromcart() {
            const response = await fetch(`${"http://localhost:3000"}/deletefromcart`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.cartItem)
            });
            this.$root.cartdisplay();
        },
    },
    template: `
        <div class="cart-item">
            <h3>Название товара: <br>{{cartItem.product_name}}</h3>
            <p>Цена: <br>{{cartItem.price}}</p>
            <p>Количество: <br>{{cartItem.quantity}}</p>
            <button class="goods-item__delete" type="button" @click=deletefromcart>Удалить из корзины</button>

        </div>
    `
});