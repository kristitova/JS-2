const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";


console.log(window)

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false,
    cartList: [],
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData.json`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        alert("Ошибка при соединении с сервером");
      }
    },
    filterGoods(value) {
        const regExp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));

        if(this.filteredGoods.length != 0 ){
            return this.filteredGoods;
        } else {
            document.querySelector('header').classList.add('notVisible');
            return document.querySelector('.goods-list').insertAdjacentHTML('afterend', '<h3>Нет данных</h3>')
        }
    },

    goods_add_tocart(product) {
        product = Object.assign({}, product, {quantity : 1});
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
            return this.cartList;
        } else if (
            this.cartList.filter(function (value) {
                return value.id_product === product.id_product;
            }).length > 1) {
            this.cartList.pop();
            alert("Товар добавлен в корзину");
            return this.cartList;
        } else {
            alert("Товар добавлен в корзину");
            return this.cartList;
        }

    },
  
    cartdisplay() {

        if(this.cartList.length != 0) {
            this.isVisibleCart = true;
        } else {
            this.isVisibleCart = false;
            document.querySelector('.goods-list').classList.add('notVisible');
            document.querySelector('.goods-list').insertAdjacentHTML('afterend', '<h3>Товаров в корзине нет</h3>');
        }

        return this.isVisibleCart;
    }
},

  async mounted() {
    await this.getProducts();
  }
});