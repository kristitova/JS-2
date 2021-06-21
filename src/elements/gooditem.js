export default Vue.component('goods-item', {

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