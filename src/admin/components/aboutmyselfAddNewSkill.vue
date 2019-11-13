<template lang="pug">
    
      form.skills-form.skills-form--newskill(@submit.prevent = 'newSkill') 
        input( placeholder="Новый навык" v-model = "skill.title" required).new-skill
        input( type="number" max = "100" min="0" placeholder="%" required v-model ="skill.percent").skill-value
        button(type="submit").button.button--big
            .button--text +
</template>

<script>
import {mapState, mapActions} from 'vuex';

import $axios from "../requests";




export default {
    
    props: {id:""},
    data(){
        return{

        skill:
        {
        title: "",
        percent: '',
        category: this.id
        },
        
    computed:
    {
        ...mapState(
            {
                compts: state => state.skills
                }
            )
        },
    }
    },
    methods:{
        newSkill(){
          this.createSkill(
              this.skill
              );
            this.skill = {
                title: '', percent: ''
                                 }
        },
                                

        ...mapActions(['createSkill'])
    },


    updated(){
        this.skill.category = this.id
        }
}
</script>