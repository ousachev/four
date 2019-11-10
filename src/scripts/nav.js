import Vue from "vue";

new Vue({
    el:"#navs",
    data:{
        navigation:[
        {link:'#first',name:'Главная'},
        {link:'#second',name:'Обо мне'},
        {link:'#third',name:'Навыки'},
        {link:'#four',name:'Работы'},
        {link:'#five',name:'Отзывы'},
        {link:'#six',name:'Связаться'}
    ]
    }
});