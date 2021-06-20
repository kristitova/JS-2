const API_URL =
    "http://localhost:3000";

Vue.component('goods-list', {

    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
        </div>
    `


});


//import search from "./search.js"


Vue.component('goods-item', {

    props: ['goodProp'],
    methods: {
        async addToCart() {
            const response = await fetch(`${API_URL}/addToCart`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.goodProp)
            });
        },
    },
    template: `
        <div class="goods-item">
            <h3>Название товара: <br>{{goodProp.product_name}}</h3>
            <p>Цена: <br>{{goodProp.price}}</p>
            <button class="goods-item__add" type="button" @click=addToCart>Добавить в корзину</button>
        </div>
    `

});

Vue.component('search', {
    data() {
        return {
            search: ''
        }
    },
    template: `
        <div>
            <input type="text" class="goods-search"  v-model="search"/>
            <button class="search-button" type="button" v-on:click="searching">Искать</button>
        </div>
    `,
    methods: {
        searching() {
            this.$emit('searching', this.search);
        },

    }
});


Vue.component('cart-list', {


    props: ['cartgoods'],

    template: `
        <div class="cart-list notVisible">
            <h3 class="cart-name">Корзина</h3>
            <cart-item v-for="cartEntity in cartgoods" :cartItem="cartEntity"></cart-item>
        </div>
    `

});

Vue.component('cart-item', {

    props: ['cartItem'],
    methods: {
        async deletefromcart() {
            const response = await fetch(`${API_URL}/deletefromcart`, {
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

Vue.component('cart-display', {
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

Vue.component('error_server', {
    props: ['error_s'],
    template: `
    <div>
        <h3 class="error_server" v-if="error_s" >Ошибка при соединении с сервером</h3>
    </div>
    `
});

const app = new Vue({

    el: "#app",

    data: {
        goods: [],
        filteredGoods: [],
        // searchLine: '',
        cartList: [],
        error_s: false

    },


    methods: {
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData`);
            if (responce.ok) {
                const catalogItems = await responce.json();
                this.goods = catalogItems;
                this.filteredGoods = catalogItems;
            } else {
                alert("Ошибка при соединении с сервером");
            }
        },
        async cartdisplay() {
            const responce = await fetch(`${API_URL}/cartData`);
            if (responce.ok) {
                const cartItems = await responce.json();
                this.cartList = cartItems;

                if (this.cartList.length != 0) {
                    document.querySelector('.goods-list').classList.add('notVisible');
                    document.querySelector('.cart-list').classList.remove('notVisible');

                } else {
                    document.querySelector('.goods-list').classList.add('notVisible');
                    document.querySelector('.cart-name').classList.add('notVisible');
                    document.querySelector('.goods-list').insertAdjacentHTML('afterend', '<h3>Товаров в корзине нет</h3>');
                }

            } else {
                alert("Ошибка при соединении с сервером");
            }

        },

        filterGoods(value) {
            const regExp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));

            if (this.filteredGoods.length != 0) {
                return this.filteredGoods;
            } else {
                document.querySelector('header').classList.add('notVisible');
                return document.querySelector('.goods-list').insertAdjacentHTML('afterend', '<h3>Нет данных</h3>')
            }
        }
    },
    async mounted() {
        await this.getProducts();
    }
});
