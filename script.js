'use strict';
const API_URL =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
    constructor(id_product, product_name, price) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="goods-item" data-itemId=${this.id_product}  data-name=${this.product_name} data-price=${this.price}><h3>Название товара: </h3><h3>${this.product_name}</h3><p><h3>Цена товара: </h3>${this.price}</p><button class="goods-item__add" type="button">Добавить в корзину</button></div>`;
    }
}


class GoodsList {
    constructor() {
        this.goods = [];
    }

    async fetchGoods() {
        const responce = await fetch(`${API_URL}/catalogData.json`);
        if (responce.ok) {
            const catalogItems = await responce.json();
            this.goods = catalogItems;
        } else {
            alert("Ошибка при соединении с сервером");
        }
    }

    sumPrice() {
        let sum = 0;
        this.goods.forEach((good) => {
            sum += good.price;
        });
        return sum;
    }

    render(cartlist) {

        let listHtml = "";
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        let cartrange = [];
        document.querySelector(".goods-list").innerHTML = `${listHtml}<br>Общая стоимость товаров составляет: ${this.sumPrice()}`;
        document.querySelectorAll('.goods-item__add').forEach(function (button) {
            button.addEventListener('click', (event) => {
                let product = event.target.parentNode;
                let productId = product.dataset.itemid;
                let productName = product.dataset.name;
                let productPrice = product.dataset.price;
                let quantity = 1;
                let cartItem = new CartItem(productId, productName, productPrice, quantity);
                alert("Товар добавлен в корзину");
                cartrange.push(cartlist.add(cartItem));
            });
        });
        cartlist.cartdisplay(cartrange, cartlist);
        // cartlist.cartupdate(cartlist.cartdisplay(cartrange, cartlist));

    }


}

class CartItem extends GoodsItem {
    constructor(id_product, product_name, price, quantity) {
        super(id_product, product_name, price);
        this.quantity = quantity;
    }

    render() {
        return `<div class="cart-item" data-itemId=${this.id_product}  data-name=${this.product_name} data-price=${this.price} data-quantity=${this.quantity}><h3>Название товара: </h3><h3>${this.product_name}</h3><p><h3>Цена товара: </h3>${this.price}<h3>Количество товара: </h3>${this.quantity}</p><button class="goods-item__remove" type="button">Удалить из корзины</button></div>`;
    }
}

class CartList {
    constructor() {

        this.cartList = [];
    }

    add(product) {
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
            return this.cartList;
        } else if (
            this.cartList.filter(function (value) {
                return value.id_product === product.id_product;
            }).length > 1) {
            this.cartList.pop();
            return this.cartList;
        } else {
            return this.cartList;
        }
    }


    delete(product) {



        for (let i = 0; i <= this.cartList.length - 1; i++) {
            if (this.cartList[i].quantity == 1 && this.cartList[i].id_product == product.dataset.itemid) {
                let itemind = 0;
                itemind = this.cartList.indexOf(this.cartList[i]);
                this.cartList.splice(itemind, 1);

                console.log(this.cartList);
                //this.cartList[i].render();

                return this.cartList;
            } else if (this.cartList[i].quantity > 1 && this.cartList[i].id_product == product.dataset.itemid) {
                this.cartList[i].quantity -= 1;

                console.log(this.cartList);
                //this.cartList[i].render();

                return this.cartList;
            }
        }



    }

    cartdisplay(cartrange, cartlist) {
        let button_cart = document.querySelector('.cart-button');
        button_cart.addEventListener('click', function () {
            let cart = '';
            for (let i = 0; i <= cartrange[cartrange.length - 1].length - 1; i++) {
                cart += cartrange[cartrange.length - 1][i].render();
            }
            //let cartrangeupdate = [];
            document.querySelector('.cart-list').insertAdjacentHTML('afterbegin', `<h3>Корзина: </h3><br> ${cart}`);
            document.querySelectorAll('.goods-item__remove').forEach((button) => {
                button.addEventListener('click', (event) => {

                    let product = event.target.parentNode;
                    cartlist.delete(product);

                });
            });
        });

    }
    /*
        cartupdate(cartrangeupdate) {
            document.querySelector('.cart-list').innerHTML = '';
            console.log(cartrangeupdate);
    
            let cart = '';
            for (let i = 0; i <= cartrangeupdate.length - 1; i++) {
                cart += cartrangeupdate[i].render();
            }
            return document.querySelector('.cart-list').insertAdjacentHTML('afterbegin', `<h3>Корзина: </h3><br> ${cart}`);
        }

     */


}






const init = async () => {

    const goodlist = new GoodsList();
    let cartlist = new CartList();
    await goodlist.fetchGoods();
    goodlist.render(cartlist);
    goodlist.sumPrice();


}
window.onload = init;