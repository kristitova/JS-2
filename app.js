const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
]

const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><h3>Название товара:</h3><h3>${title}</h3><p>Цена товара: ${price}</p></div>`
}

const renderGoodsList = list => {
    let goodsList = '';
    goods.forEach(item => {
        goodsList += renderGoodsItem(item.title, item.price);
    });
    //let goodsList = list.map(item => renderGoodsItem(item.title, item.price))

    //   const goodsListDiv = document.querySelector('.goods-list')
    //   goodsListDiv.innerHTML = goodsList

    document.querySelector('.goods-list').innerHTML = goodsList

}

const init = () => {
    renderGoodsList(goods)
}

window.onload = init