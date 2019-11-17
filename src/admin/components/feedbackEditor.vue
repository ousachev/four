<template lang="pug">
     form.section-block.edit-card.edit-card--feedback(@submit.prevent = "send")
        h2.edit-card__name Новый отзыв
        .edit-card__download-area.edit-card__download-area--feedback
          label.inputfile__label(for="userpic")
            input.inputfile(type="file" name='file' id="userpic" @change="appendFileAndRenderPhoto") 
            .userpic-bg
              .userpic-bg-empty(:class="{filled:renderedPhoto.length}" :style="{'backgroundImage':`url(${renderedPhoto})`}")
            .button.button--link Добавить фото
        
        .edit-card__content.edit-card__content--feedback
          .edit-card__row
            label.edit-card__label.edit-card__label--feedback Имя автора
              input( required placeholder = "Грегори Хаус" v-model="review.author").edit-card__input.edit-card__input--feedback
            label.edit-card__label.edit-card__label--feedback Статус
              input(required placeholder = "Доктор Медицины" v-model="review.occ").edit-card__input.edit-card__input--feedback
          .edit-card__row
            label.edit-card__label.edit-card__label--textarea Отзыв
              textarea( rows="5" required v-model="review.text" placeholder="Игнорируете меня? Или молча наслаждаетесь моим обаянием?").edit-card__textarea.edit-card__textarea--feedback
        
          .edit-card__buttons
            button(type = "reset" @click = "closeEditor").edit-card__reset Отмена
            button(type = "submit").button.button--submit.button--edit-submit сохранить
</template>

<script>
import {mapState, mapActions} from 'vuex';

import $axios from "../requests";

export default {
  data:() =>({
    renderedPhoto:"",
    review: {
      photo: "",
      author: "",
      occ: "",
      text: "",
    }
  }),

  methods:{
    closeEditor(){
      this.$emit(
        'closeEditor'
        )
        }, 

    ...mapActions(['addReview']),
    send(){
      this.addReview(this.review);
    },
    appendFileAndRenderPhoto(e){
      const file = e.target.files[0];
      this.review.photo=file;

      const reader = new FileReader();
   try{
     reader.readAsDataURL(file);
     reader.onload=()=>{
       this.renderedPhoto = reader.result;
     };
    }catch(error){
      //=(
    }

   }

    }
}
</script>

<style lang = "postcss" scoped>
.userpic-bg-empty {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #dee4ed;
  position: relative;
  &:before {
    content: "";
    height: 115px;
    width: 85px;
    background: svg-load("user.svg", fill=#fff) center center no-repeat;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.filled {
    background: center center no-repeat / cover;
    &:before {
      display: none;
    }
  }
}
</style>