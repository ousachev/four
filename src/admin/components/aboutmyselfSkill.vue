<template lang="pug">
        form.name__skills-form.name__skills-form--newskill(:class="{editing: this.isEditMode}" @submit.prevent = 'editSkill') 
            .form__add
                input( placeholder="Новый навык" v-model = "newSkill.title" required).new-skill.new-skill--rename
            .skill-box
                input(type="number" min="0" max="100%" v-model ="newSkill.percent").skill-value.value-bold.skill-value--edited
            .form-yesno-buttons
                button(type="submit" @click="editModeOn" v-if="!isEditMode").button.button--edit
                button(type="button" @click="deleteSkill" v-if="!isEditMode").button.button--delete
                button(type="submit" v-if="isEditMode").button.button--green 
                button(type="button" v-if="isEditMode" @click="editModeOff").button.button--cross

</template>

<script>
import {mapState, mapActions} from 'vuex';
import {mapMutations} from 'vuex';
import $axios from "../requests";


export default {
    props:{
        skill:{}
        },
    data(){return{
       

        
        isEditMode: false,
        
    }},
    computed:{newSkill: function(){
        return this.skill
        }
        },


    methods: {
        deleteSkill(){
           this.removeSkill(
                this.skill
            )
                        
                },

        editModeOn(){
            this.isEditMode = true
            },

        editModeOff(){
            this.isEditMode = false
            },

        editSkill(){
            this.isEditMode = false;
            this.redactSkill(
                this.newSkill
                )
                            },
                          
                            
    ...mapActions(['removeSkill','redactSkill'])
         
    }
    
}
</script>


<style lang="postcss" scoped>
.name__skills-form--newskill .skill-value--edited,.new-skill  {pointer-events:none; border-bottom: 1px transparent solid}
.name__skills-form{margin-bottom:10px}
.new-skill--rename{width:100%;}
.editing .skill-value--edited{pointer-events: all; border-bottom: 1px solid #000}
.editing .new-skill {pointer-events: all; border-bottom: 1px solid #000; text-align: center}

</style>