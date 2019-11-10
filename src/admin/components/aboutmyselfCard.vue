<template lang="pug">
    .name__skills-card.section-block 
        form.name__skills-form.skill-form--name(@submit.prevent = 'editCat' :class="{editing:this.isEditMode}") 
            input(v-model="currentCat.category" required).skill-name.value-bold
            .form-yesno-buttons
                 button(type="button" @click="editModeOn" v-if="!isEditMode").button.button--edit
                 button(type="submit" v-if="isEditMode").button.button--green 
                 button(type="button" v-if="isEditMode" @click="editModeOff").button.button--cross 
                 button(type="button" v-if="isEditMode" @click = "deleteCat").button.button--delete
        hr.form-divider
        skill(:skill="skill" v-for = "skill in currentCat.skills" :key = "skill.id")
        addSkill(:id = "currentCat.id")
</template>

<script>
import addSkill from "./aboutmyselfAdd"
import skill from './aboutmyselfSkill'
import {mapState, mapActions} from 'vuex';
import $axios from "../requests";


export default {
  data()
  {return{

   isEditMode: false,
  }
  },

  computed:{
    currentCat: function(){
      return this.cat
      }
      },

  props: {
    cat:{}
  },

  methods: {

    deleteCat(){
     this.isEditMode=false;
     this.removeCat(
          this.cat
          )
    },

    editModeOn(){
      this.isEditMode=true
    },

    editModeOff(){
     this.isEditMode=false
    }, //переключатель режима редактирования

    editCat(){
      let editedCat={
        ...this.currentCat
        }; //создаем копию изменяемой категории
      editedCat.title=this.currentCat.category; //меняем в копии заголовок
      this.isEditMode = false;
      this.redactCat(editedCat) //выключаем редактор
     },
    ...mapActions(['removeCat', 'redactCat'])
    },
  
   created(){
    if (this.cat.category === "Введите название тут"){
      this.isEditMode = true, this.cat.category = " "}
    }, 

    updated(){
      if (this.cat.category === "Введите название тут"){
       this.isEditMode = true, this.cat.category = " "}
    },
       //эти две функции меняют имя-заглушку на пустую строку

  components: {
    skill, addSkill
    },

}
</script>

<style lang="postcss" scoped>
.skill-name{pointer-events: none; border-bottom: 1px solid transparent}
.editing .skill-name {pointer-events: all; border-bottom: 1px solid #000; text-align: center}

</style>