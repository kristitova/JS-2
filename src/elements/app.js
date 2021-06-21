const API_URL =
    "http://localhost:3000";



//const { search } = require('./search')

import goodlist from "./goodlist.js";
import gooditem from "./gooditem.js";
import search from "./search.js";
import cartlist from "./cartlist.js";
import cartitem from "./cartitem.js";
import cartdisplay from "./cartdisplay.js";
import error from "./error.js";


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
//export default {
 //   app: app
//}
