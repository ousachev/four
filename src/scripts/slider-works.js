import Vue from "vue";


const previews = {
    template:"#slider-previews",
    props:["works","currentWork"]
};

const btns = {
    template:"#slider-btns"
};

const display = {
    template:"#slider-display",
    components:{previews, btns},
    props:["works","currentWork","currentIndex"]
};

const tags = {
    template:"#slider-tags",
    props:["tags"]
};

const info = {
    template:"#slider-info",
    components:{tags},
    props:["currentWork"],
    computed: {
        tagsArray(){
            return this.currentWork.skills.split(', ');
        }
    }
};


new Vue({
    el: "#slider-component",
    template:"#slider-container",
    components:{display,info},
    data:()=>({
        works:[],
        currentIndex:0
    }),
    computed:{
        currentWork(){
            return this.works[this.currentIndex];
        }
    },
    watch:{
        currentIndex(value){
            this.makeInfiniteLoop(value);
        }
    },
    methods:{
        makeInfiniteLoop(value){
            const worksAmount = this.works.length-1;
            if (value < 0) this.currentIndex = worksAmount;
            if(value > worksAmount)this.currentIndex = 0;
        },
        makeArrWithRequiredImages(data){
            return data.map(item =>{
                const requiredPic = require(`../images/content/slider/${item.photo}`);
                item.photo = requiredPic;
                return item
            });
        },
        handleSlide(direction){
            switch(direction){
                case "next":
                    this.currentIndex++;
                    break;
                case "prev":
                    this.currentIndex--;
                    break;
            }
        },
        handlePreviewClick(previewId){
            this.currentIndex = previewId - 1;
        },
    },
    created(){
        const data = require('../data/works.json');
        this.works = this.makeArrWithRequiredImages(data);
    }
});