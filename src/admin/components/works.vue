<template lang="pug">
    section.section--works
      .container
       h1.name__desc-text Блок &laquo;Работы&raquo;
       editor(v-if="this.openEditor" @closeEditor = "closeEditor")

       .edited-blocks
            button.button.button--add-card(@click = "edit" v-if="!openEditor")
              .button__pic +
              p.button__name Добавить работу
            work(v-for = "work in compts.works" :job = "work" :key="work.id" closeEditor="closeEditor")
</template>

<script>
import editor from "./worksEditor"
import work from './worksWork'
import {mapState} from 'vuex';
export default {
  data(){return{
    openEditor:false,
}},

  components:{
    editor, work
    },

  computed:{
    ...mapState(
      {
        compts: works => works.works
        }
        )
        },

  methods:{
    edit(){
      this.openEditor = true
      },

  closeEditor(){
    this.openEditor = false
    },
  }
}
</script>