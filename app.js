'use strict'
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: "Shirt", price: 150 },
            { title: "Socks", price: 50 },
            { title: "Jacket", price: 350 },
            { title: "Shoes", price: 250 },
        ];
    }

    sumPrice() {
        let sum = 0;
        this.goods.forEach((good) => {
            sum += good.price;
        });
        return sum;
    }

    render() {

        let listHtml = "";
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });

        document.querySelector(".goods-list").innerHTML = `${listHtml}<br>Общая стоимость товаров составляет: ${this.sumPrice()}`;
    }


}

class CartItem extends GoodsItem {
    constructor(title, price, quantity) {
        super(title, price);
        this.quantity = quantity;
    }
}

class Cart extends GoodsList {
    constructor(goods) {
        super(goods);
    }

    /* addItem() {
         document.querySelector('.goods-item').insertAdjacentHTML = ('beforeend', '<button class="cart-button-item" type="button">Добавить в корзину</button>');
         document.querySelector('.cart-button-item').addEventListener('click', function (event) {
           this.quantity++;
           alert("Товар добавлен в корзину");

         });
     }
       deleteItem() {
           
       }
       
     */
}


const init = () => {

    const list = new GoodsList();
    list.fetchGoods();
    list.render();
    list.sumPrice();

}
window.onload = init;
