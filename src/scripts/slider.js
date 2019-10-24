import Vue from "vue"
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'




const quote = {
    template: "#quote",
    props: ["opinion"],
    components: { swiperSlide }
}




new Vue({
    el: '#five',

    components: {

        quote,
        swiper


    },
    data: () => ({

        quotes: [],

        swiperOption: {
            slidesPerView: 3,
            spaceBetween: 0,
            navigation: {
                nextEl: '.reviews-slider__btn--right',
                prevEl: '.reviews-slider__btn--left',
                disabledClass: 'reviews-slider__btn--disabled',
            },
            breakpoints: {
                2500:{
                    slidesPerView: 2,
                },
                768:{
                    slidesPerView: 2,
                },
                480: {
                    slidesPerView: 1,
                },
            }
        }


    }),

    methods: {
        addImagePaths(quotes) {
            return quotes.map(el => {
                let photo = require(`../images/content/loft/${el.photo}`);
                el.photo = photo
                return el
            })
        }
    },

    created() {
        const data = require("../data/quotes.json");
        this.quotes = this.addImagePaths(data)
    }



})