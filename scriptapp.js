const API_URL =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";


//console.log(window)

Vue.component('goods-list', {

    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
        </div>
    `


});
Vue.component('goods-item', {

    props: ['goodProp'],
    template: `
        <div class="goods-item">
            <h3>Название товара: <br>{{goodProp.product_name}}</h3>
            <p>Цена: <br>{{goodProp.price}}</p>
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
    props: ['cartList'],
    template: `
        <div class="cart-list notVisible">
            <h3 class="cart-name">Корзина</h3>
            <cart-item v-for="goodEntity in cartList" :cartItem="goodEntity"></cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
        <div class="cart-item">
            <h3>Название товара: <br>{{cartItem.product_name}}</h3>
            <p>Цена: <br>{{cartItem.price}}</p>
            <p>Количество: <br>{{cartItem.quantity}}</p>
        </div>
    `
});

Vue.component('cart-display', {
    data() {
        return {
            cartList: [],
        }
    },
    props: ['isVisibleCart'],
    template: `
        <button class="cart-button" type="button" v-on:click="getcart">Корзина</button>
    `,
    methods: {
        getcart() {
            this.$emit('getcart', this.cartList);
        },
        
    }
});
Vue.component('error_server', {
    props:['error_s'],
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
            const responce = await fetch(`${API_URL}/catalogData.json`);
            if (responce.ok) {
                const catalogItems = await responce.json();
                this.goods = catalogItems;
                this.filteredGoods = catalogItems;
            } else {
                console.log(this.error_s);
                this.error_s = true;
            }
        },
        /*
        goods_add_tocart(product) {
        
            product = Object.assign({}, product, {quantity: 1});
            if (this.cartList.length == 0) {
                this.cartList.push(product);
            } else {
                this.cartList.forEach((item) => {
                if (item.id_product == product.id_product) {
                        item.quantity += 1;
                    } else {
                        this.cartList.push(product);
                    }
                });
            }   
            if (this.cartList.length == 1) {
                alert("Товар добавлен в корзину");
                console.dir(this.cartList);
                console.dir(product);
                return this.cartList;
            } else if (
                this.cartList.filter(function (value) {
                    return value.id_product === product.id_product;
                }).length > 1) {
                this.cartList.pop();
                alert("Товар добавлен в корзину");
                console.dir(this.cartList);
                console.dir(product);
                return this.cartList;
            } else {
                alert("Товар добавлен в корзину");
                console.dir(this.cartList);
                console.dir(product);
                return this.cartList;
            }
        },
        */
        
        
        cartdisplay() {
            
            document.querySelector('.goods-list').classList.add('notVisible');
            document.querySelector('.cart-list').classList.remove('notVisible');
            
            

            /*
            if (this.cartList.length != 0) {
                this.isVisibleCart = true;
           } else {
                this.isVisibleCart = false;
                document.querySelector('.goods-list').classList.add('notVisible');
                document.querySelector('.goods-list').insertAdjacentHTML('afterend', '<h3>Товаров в корзине нет</h3>');
            }
            */

            //return this.isVisibleCart;
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
        },

    },

    async mounted() {
        await this.getProducts();
    }
});