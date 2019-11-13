<template lang="pug">
  form.section-block.edit-card.edit-card--works(@submit.prevent = 'newWork') 
    h2.edit-card__name Редактирование работы
    
    .edit-card__download-area
        label.inputfile__label(for="image")
          vueDropzone(id="drop1" :options="dropOptions")
          .inputfile__text Перетащите или нажмите для загрузки изображения
          input.inputfile(type="file" name='image' id="file" @change="processFile") 
          .button.button.button--submit загрузить
    .edit-card__content
        label.edit-card__label Название
            input( required placeholder = "Сайт для туристической компании" v-model="work.title").edit-card__input
        label.edit-card__label Ссылка
            input(required placeholder = "Anextour.com" v-model="work.link").edit-card__input
        label.edit-card__label Описание
            textarea( rows="5" v-model="work.description" required placeholder="Сайт для реализации вашей мечты, путешествия в дальние страны с невероятным уровнем сервиса").edit-card__textarea.edit-card__input
        label.edit-card__label Добавление тега
            input(v-model="work.techs" placeholder = "HTML" ).edit-card__input
        ul.edit-card__taglist
            buttonTag( v-for = "(tag, ind) in techArray" :tag = "tag" @deleteTag="deleteTag" :key="ind" )
        .edit-card__buttons
            button(type = "reset" @click="closeEditor").edit-card__reset Отмена
            button(type = "submit").button.button--submit.button--edit-submit сохранить
</template>

<script>
import {mapState, mapActions} from 'vuex';
import buttonTag from "./worksTagButton";
import $axios from "../requests";
import vueDropzone from "vue2-dropzone";
export default {
    data(){
        return{
         photoUrl:'',
         techString:'',
         work:{
            id:'',
            title: "",
            link:"",
            techs: "",
            description:"",
            photo:""},
            splitter : /\s*,\s*/,
        dropOptions:{
          url:"https://httpbin.org/post",
          maxFilesize:1.5,
          maxFiles:1,
          chunking:false,
          addRemoveLinks:false
        }
        }
    },

    components:{
      buttonTag,
      vueDropzone
      },

    computed:{
      techArray: function(){
        return this.work.techs.split(this.splitter)
        .filter(function(a){
          return  a.replace(/\s+/g, '')
          }
    )
    }
    },

    methods:{

      closeEditor(){
        this.$emit(
          'closeEditor'
          )
          },
    
    newWork(){this.addWork(this.work);
      this.closeEditor()},

    ...mapActions(['addWork']),

    processFile(e){
      const file = e.target.files[0];
      this.work.photo = file},
    
    deleteTag(tag){
      let fakeArray = this.techArray;
      fakeArray=fakeArray.filter(function(a){return a!==tag});
      let fakeString = fakeArray.join(', ');
      this.work.techs = fakeString
      },
      }
}
</script>