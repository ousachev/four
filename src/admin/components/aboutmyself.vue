<template lang="pug">
  .container.container--maincontent
      section.name
          .name__desc
            h1.name__desc-text Блок &laquo;Обо мне&raquo;
            button(type='button' @click="newGroup").button.button--plus Добавить группу
      section.name__skills

            aboutmyselfCard(v-for="cat in compts.categories" :cat="cat" :key="cat.id")
</template>



<script>

import aboutmyselfCard from "./aboutmyselfCard";

import $axios from "../requests";
import {mapState, mapActions} from 'vuex';


export default {
    components: {
        aboutmyselfCard
        },
    computed:{
        ...mapState({compts: state => state.skills
        }
        )
        },
    methods: {
        
    newGroup(){
        this.addCat()
        },

    ...mapActions(['addCat'])
    
    
    
    
    
    },
    

}
</script>