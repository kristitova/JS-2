
export default Vue.component('error_server', {
    props: ['error_s'],
    template: `
    <div>
        <h3 class="error_server" v-if="error_s" >Ошибка при соединении с сервером</h3>
    </div>
    `
});