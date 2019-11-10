<template lang="pug">
.workCard
    .section-block.edited-card(v-if="!isEditMode")
            .edited-card__picture-box
                img(:src='picture').edited-card__picture
                ul.edited-card__taglist
                  tag.edited-card__tags(v-for ="(tag, ind) in techArray" :tag ="tag" :key="ind")
     
            .edited-card__description
                .edited-card__name {{work.title}}
               
                .edited-card__text {{work.description}}
               
               
                a(:href="work.link" ).edited-card__link {{work.link}}
                
                .edited-card__buttons
                    button(type="button" @click = "editWork" ).button.button--edit-edited Править
                    button(type="button" @click="deleteWork" ).button.button--delete
         

    form.section-block.edit-card.edit-card--works(@submit.prevent = "confirmChanges" v-if="isEditMode") 
            h2.edit-card__name Редактирование работы
            .edit-card__download-area
              input.inputfile(type="file"  name="file" id="file" @change="processFile") 
              label.inputfile__label(for="file")
                .inputfile__text Перетащите или нажмите для загрузки изображения
                
            .edit-card__content
              label.edit-card__label Название
                input(required placeholder = "Сайт для туристической компании" v-model = "work.title").edit-card__input
              label.edit-card__label Ссылка
                input(required placeholder = "Anextour.com" v-model="work.link").edit-card__input
              label.edit-card__label Описание
                textarea( rows="5" required placeholder="Сайт для реализации вашей мечты, путешествия в дальние страны с невероятным уровнем сервиса" v-model="work.description").edit-card__textarea
              label.edit-card__label Добавление тега
                input(required placeholder = "HTML," v-model = "work.techs").edit-card__input
              
              ul.edit-card__taglist
                buttonTag(v-for = "(tag, ind) in techArray" :tag = "tag" @deleteTag= "deleteTag" :key="ind")
              .edit-card__buttons
                button(type = "reset" @click = "closeEditor").edit-card__reset Отмена
                button(type = "submit").button.button--submit.button--edit-submit сохранить
</template>


<script>
import {mapState, mapActions} from 'vuex';


import tag from "./worksTag"
import buttonTag from "./worksTagButton"
import $axios from "../requests";
export default {
  data(){return{isEditMode:false,
  splitter : /\s*,\s*/}},
    props: {job:{}},
    components:{buttonTag, tag},
    


    computed:{
    work: function(){return this.job},

    techArray: function(){
        return this.work.techs.split(this.splitter)
        .filter(function(a){
          return  a.replace(/\s+/g, '')
          })},
 
    picture: function(){return `https://webdev-api.loftschool.com/${this.work.photo}` },},

  

    methods:{
    ...mapActions(['removeWork', 'redactWork']),

    deleteWork(){this.removeWork(this.work)},

    editWork(){this.isEditMode=true},

    closeEditor(){this.isEditMode=false},

    processFile(e){
      const file = e.target.files[0];
      this.work.photo = file},

     confirmChanges(){
      this.redactWork(this.work); this.isEditMode=false;},

     deleteTag(tag){
      let fakeArray = this.techArray;
     
      fakeArray=fakeArray.filter(function(a){return a!==tag});

      let fakeString = fakeArray.join(', ');
    
      this.work.techs = fakeString
    
      
      
      
    }},

   

    

}
</script>












<style lang="postcss" scoped>
.edited-card__picture-box{position: relative}

.edit-card__download-area{padding:5px; cursor:pointer; width: 100%}
.inputfile__text{cursor: pointer;}

//.edit-card--works{position:absolute; top:0; left:0; width:100%; height: 100%}
</style>