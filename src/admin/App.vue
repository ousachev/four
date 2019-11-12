<template lang="pug">
  .wrapper
    .wrapper__filter(v-if="isLoggedIn")
      header.header
        .container.container--header
          .userpic
            .userpic__photo
              img(src="../images/content/avatar.png" class='userjpg' alt="мое лицо")
            .userpic__name Усачев Олег
          .admin Панель администрирования
          a(href="#" @click = "logout").exit Выйти
      nav.navigation
        .container.container--navigation
          ul.navigation__list
            li.navigation__item(:class="{active:this.currentMenu === 'aboutmmyself'}")
              a(href="#" @click = "aboutmyself").navigation__link Обо мне
            li.navigation__item(:class="{active:this.currentMenu === 'works'}")
              a(href="#" @click = "works").navigation__link  Работы
            li.navigation__item(:class="{active:this.currentMenu === 'feedback'}")
              a(href="#" @click = "feedback").navigation__link Отзывы
      main.maincontent
        
          aboutmyself(v-if ="currentMenu ==='aboutmyself'")
          works(v-if ="currentMenu === 'works'")
          feedback(v-if ="currentMenu === 'feedback'")


    .popup(v-if = "!isLoggedIn")
      .popup__filter
        .container.container--popup
          form.form-login(@submit.prevent="login")
            h2.form-login__headline Авторизация
            label.form-login__label.form-login__label--login {{loginError.user}}
              input(required v-model = "user.name").form-login__input
            label.form-login__label.form-login__label--password Пароль
              input(required v-model = "user.password").form-login__input
            button(type= "submit").button.button-login-submit Отправить
            button(type = "button").button.button-login-exit    
</template>

<script>
import aboutmyself from './components/aboutmyself';
import works from './components/works';
import feedback from './components/feedback';
import {mapActions} from 'vuex';
import $axios from "./requests";


export default {
  data: function () {
      return {
        
    
        user: {},
        loginError: {user: "Имя пользователя", pass: "Введите пароль"},
     
        isLoggedIn: true,
        currentMenu:'aboutmyself',

      };
    
    },
    
  components: {
    aboutmyself, works, feedback
    },
 
  methods: {

    fetchGroups(user) {
      $axios.get(
        `/categories/${user}`
      )
      .then(
        response=>{
          this.categories = response.data,
          this.getCategories(
            response.data
          )
        }
      )
  }, //обновление данных по скиллам 

  fetchWorks(user) {
    $axios.get(
      `/works/${user}`
      )
      .then(
         response=>{
            this.getWorks(
              response.data
            )
          }
      )
  }, //обновление данных по портфолио работ 
  
  fetchFeedback(user){
    $axios.get(
      `/reviews/${user}`
      )
      .then(
        response=>{
          this.getFeedback(
           response.data
          )
        }
      )
  }, //обновление данных по отзывам 
            
  login(){
    $axios.post(
      '/login',this.user
    )
    .then(
      response => {
          let token=response.data.token;
            localStorage.setItem(
              "token", token
              ); 
              this.isLoggedIn = true;
          
              $axios.defaults.headers['Authorization'] = `Bearer ${token}`;
                $axios.get(
                  '/user'
                  )
                  .then(
                    response=>{
                      let userId=response.data.user.id;
                     
                       this.fetchGroups(
                         userId
                         );
                       this.fetchWorks(
                         userId
                         ); 
                       this.fetchFeedback(
                         userId
                         )
                         }
                         ) 
                }
    )
    .catch(
      error=>{
       this.loginError.user = error.response.data.error,
        this.loginError.pass = error.response.data.error
        }
         ),
       this.user = {}
    }, 

  logout(){
    this.isLoggedIn = false,
     $axios.defaults.headers['Authorization'] = ``;
      localStorage.clear();
      console.log (localStorage)
  }, //выход из админки, удаляет токен из localStorage

  aboutmyself(){
    this.currentMenu = 'aboutmyself'},
  works(){
    this.currentMenu = 'works'},
  feedback(){
    this.currentMenu = 'feedback'}, //блок навигации по меню

  getUserId(){$axios.get('/user').then(resp => {
      const userId = resp.data.user.id;
      this.isLoggedIn=true;
      this.fetchGroups(userId);
      this.fetchWorks(userId); 
      this.fetchFeedback(userId)
   }).catch(this.isLoggedIn=false);},


  ...mapActions(['getCategories', 'getWorks', 'getFeedback']),
 
 },
 created() {
   $axios.get('/user').then(resp => {
      const userId = resp.data.user.id;
      this.isLoggedIn=true;
      this.fetchGroups(userId);
      this.fetchWorks(userId); 
      this.fetchFeedback(userId)
   }).catch(this.isLoggedIn=false);
 }

}
</script>



<style lang = "postcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/*.pcss";
/*Wrapper Настройки*/

.wrapper {
  font-family: "Open Sans", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.42;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-color;
  background: url("../images/content/cloud.jpg") no-repeat center;
  background-size: cover;
}
.wrapper__filter {
  background: rgba(255, 255, 255, 0.9);
  position: absolute;
  width: 100%;
  height: 100%;
}
.container {
  @include phones {
    width: 100%;
  }
}

/* Настройки */
.container--maincontent {
  width: 95%;
  min-height: 100vh;
  @include tablets {
    width: 96%;
  }
  @include phones {
    width: 94%;
  }
}
input {
  outline: none;
  border: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
button {
  background: transparent;
  font-weight: bold;
}
::placeholder {
  background: white;
  @include tablets {
    word-wrap: wrap;
  }
  opacity: 0.6;
}
.value-bold {
  &::-webkit-input-placeholder {
    font-weight: 400;
    opacity: 1;
  }
}

.skills-form{padding: 15px 0; border-bottom: 1px solid #dedee0; display: flex; justify-content: space-between; align-items: center};
.skill-name {
  grid-area: name; align-items: center; color: #4e586d; font-size: 18px; font-weight: 700;
  &::-webkit-input-placeholder {
    color: $admin;
    font-weight: 600;
    opacity: 1;
  }
}
.skill-name--editing {
  &::-webkit-input-placeholder {
    font-weight: 400;
    opacity: 0.6;
  }
}
.edit-card__input {
  &::-webkit-input-placeholder {
    color: $admin;
    opacity: 1;
    font-weight: 600;
  }
}
/* Окно Авторизации*/

.popup {
  height: 100vh;
  width: 100%;
  background: url("../images/content/background.png") no-repeat center;
  background-size: cover;
  z-index: -2;
}
.popup__filter {
  background: #3c4b5e;
  opacity: 0.9;
  height: 100%;
  width: 100%;
  z-index: -1;
}
.container--popup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 10;
}
.form-login {
  background: #fff;
  position: relative;
  padding: 50px;
  text-align: center;
  @include phones {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.form-login__label {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  color: #d3d4d9;
  padding: 5px 5px 15px;
  padding-left: 40px;
  text-align: left;
  @include phones {
    margin-bottom: 50px;
  }
  border-bottom: 1px solid #414d63;
}
.form-login__input {
  margin-top: 20px;
  color: #414d63;
  font-weight: 700;
}
.form-login__label--login:before {
  content: "";
  position: absolute;
  height: 30px;
  width: 30px;
  background: svg-load("user.svg", fill = #d3d4d9, width = 100%, height = 100%)
    no-repeat center;
  bottom: 15px;
  left: 0;
}
.form-login__label--password:before {
  content: "";
  position: absolute;
  height: 30px;
  width: 30px;
  background: svg-load("key.svg", fill = #d3d4d9, width = 100%, height = 100%)
    no-repeat center;
  bottom: 15px;
  left: 0;
}
.button-login-exit {
  position: absolute;
  top: 15px;
  right: 15px;
  height: 15px;
  width: 15px;
  background: svg-load("close.svg", fill = #454c5f, width = 100%, height = 100%)
    no-repeat center;
}
.form-login__headline {
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
  @include phones {
    margin-bottom: 50px;
  }
}
.button-login-submit {
  border-radius: 40px 5px;
  background: linear-gradient(
    90deg,
    rgb(147, 0, 232) 0%,
    rgb(111, 0, 235) 48%,
    rgb(74, 0, 237) 100%
  );
  padding: 25px 20px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.3s;
  &:hover {
    background: linear-gradient(
      90deg,
      rgb(147, 0, 232) 60%,
      rgb(111, 0, 235) 100%
    );
    transition: 0.3s;
  }
}

/* Header */

.header {
  background: #44436c;
  color: #fff;
  padding: 10px 0px;
}
.container--header {
  display: grid;
  align-items: center;
  grid-template-columns: 1.2fr 1.5fr 2.5fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "userpic admin . exit";
  @include phones {
    width: 94%;
  }
}
.userpic {
  grid-area: userpic;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.userpic__photo {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  flex-shrink: 0;
}
.userjpg {
  max-width: 100%;
}
.userpic__name {
  font-size: 18px;
}
.admin {
  grid-area: admin;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  padding-left: 20px;
}
.exit {
  grid-area: exit;
  color: rgba(255, 255, 255, 0.5);
  text-align: right;
  font-size: 16px;
  text-decoration: underline;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
}

/* Навигация */
.container--navigation {
  @include phones {
    width: 94%;
    padding: 20px 0;
  }
}
.navigation {
  background: #fff;
}
.navigation__list {
  display: flex;
  list-style: none;
  color: #60697c;
  padding: 0;
}
.navigation__item {
  border-bottom: 2px solid transparent;
  padding: 15px;
  margin-right: 15px;
  &:hover,
  &:focus {
    border-bottom: 2px solid #383ace;
    color: #383ace;
  }
  &:last-child {
    margin-right: 0;
  }
}
.navigation__item--active {
  border-bottom: 2px solid #383ace;
  color: #383ace;
}

/* Блок Обо мне*/

.name__desc {
  display: flex;
  align-items: baseline;
}
@include phones {
  .name__desc {
    flex-direction: column;
    margin-bottom: 40px;
    align-items: flex-start;
  }
}
.name__desc-text {
  font-weight: 700;
  font-size: 21px;
  padding: 30px 0 0 10px;
  margin: 10px 60px 50px 0;
  @include phones {
    padding: 15px 0 5px;
    margin: 10px 0 20px 0;
  }
}
.button--plus {
  position: relative;
  margin-left: 25px;
  margin-bottom: -11px;
  color: #383bcf;
  &:before {
    position: absolute;
    content: " ";
    left: -25px;
    height: 20px;
    width: 20px;
    background: url("../images/content/button.png") no-repeat center;
    background-size: contain;
  }
  &:hover,
  &:focus {
    text-decoration: underline;
    color: #383ace;
  }
}
.button--big {
  height: 35px;
  width: 35px;
  margin-left: 15px;
  background: linear-gradient(to right, #006aed, #3f35cb);
  border-radius: 50%;
  position: relative;
}
.button--text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 25px;
  font-weight: 600;
}
.button--green {
  height: 20px;
  width: 20px;
  margin-right: 20px;
  background: svg-load("tick.svg", fill = #02d70c, width = 100%, height = 100%)
    no-repeat center;
}
.button--cross {
  height: 20px;
  width: 20px;
  background: svg-load("close.svg", fill = #bf2929, width = 100%, height = 100%)
    no-repeat center;
}
.button--edit {
  height: 20px;
  width: 20px;
  background: svg-load(
      "pencil.svg",
      fill = #b4b8c1,
      width = 100%,
      height = 100%
    )
    no-repeat center;
}
.button--edit:hover,
.button--edit:focus {
  background: svg-load(
    "pencil.svg",
    fill = #383bcf,
    width = 100%,
    height = 100%;
  );
}
.button--delete {
  height: 20px;
  width: 20px;
  background: svg-load("trash.svg", fill = #b4b8c1, width = 100%, height = 100%)
    no-repeat center;
  margin-left: 20px;
}
.button--delete:focus,
.button--delete:hover {
  background: svg-load("trash.svg", fill = $yellow, width = 100%, height = 100%)
    no-repeat center;
}
.form-divider {
  width: 100%;
  color: #dedee0;
  opacity: 0.4;
  border-width: thin;
}
.form__content {
  flex: 1;
  width: 100%;
  padding-bottom: 45px;
}
.name__skills {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  @include phones {
    grid-template-columns: 1fr;
  }
}
.form-yesno-buttons{
  display: flex;
}

.button--submit {
  background: linear-gradient(
    0deg,
    rgb(0, 106, 237) 0%,
    rgb(32, 80, 220) 48%,
    rgb(63, 53, 203) 100%
  );
  color: #fff;
  padding: 19px 42px;
  border-radius: 35px;
  text-transform: uppercase;
  margin: 0 auto;
  cursor: pointer;
  &:hover,
  &:focus {
    background: linear-gradient(
      0deg,
      rgb(63, 53, 203) 0%,
      rgb(32, 80, 220) 48%,
      rgb(0, 106, 237) 100%
    );
  }
}
.section-block {
  background: #fff;
  padding: 25px;
  margin: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  @include phones {
    margin: 10px -18px;
    padding: 10px;
  }
}
.name__skills-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.name__skills-card--new {
  @include tablets {
    display: none;
  }
}
.name__skills-form {
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.name__skills-form--skill {
  padding: 15px 0;
}
.skill-form--name {
  align-items: center;
  color: #4e586d;
  font-size: 18px;
  font-weight: 700;
}
.name__skills-form--newskill {
  grid-area: new; 
  display: flex;
  align-items: end;
  justify-content: space-between;
}
.skill-box {
  width: 20%;
  text-align: center;
  position: relative;
  align-items: center;
}
.skill-box::after {
  content: "%";
  position: absolute;
  left: 76%;
  top: -3%;
  display: block;
  color: #000;
  font-size: 17px;
  @include desktop {
    margin-left: 10px;
  }
  @include tablets {
    margin-left: 20px;
  }
}
.skill-name {
  width: 60%;
  border-bottom: 1px solid transparent;
  margin-left: 10px;
  padding-bottom: 10px;
}
.skill-name--editing {
  width: 60%;
  border-bottom: 1px solid #000;
  margin-left: 10px;
  @include desktop {
    width: 77%;
  }
}
.form-radio {
  display: flex;
}
.form-radiobutton {
  margin: 10px;
}
.new-skill {
  width: 46%;
  border-bottom: 1px solid #000;
  margin-left: 10px;
  padding: 0 12px 10px;
}
.skill-value {
  border-bottom: 1px solid #000;
  margin-left: 10px;
  padding: 0 12px 10px;
}
.work-skill {
  margin-left: 15px;
  font-size: 18px;
  width: 50%;
  background: white;
}
@include tablets {
  .work-skill {
    width: 30%;
  }
}
.skill-value--edited {
  border-bottom: 1px solid transparent;
  font-size: 18px;
  text-align: center;
  position: relative;
}

/* Блок Работы*/

.edit-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 3fr 2fr;
  grid-template-areas:
    "name name"
    "download content"
    ". content";
  grid-column-gap: 20px;
  @include tablets {
    grid-template-rows: 0.3fr 1fr 2fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "name"
      "download"
      "content";
  }
}
.edit-card__name {
  border-bottom: 1px solid #dedee0;
  padding-bottom: 20px;
  margin-bottom: 20px;
  grid-area: name;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.89;
  @include phones {
    align-self: center;
    padding: 20px 10px;
  }
}
.edit-card__download-area {
  align-self: center;
  background: #dee4ed;
  left: 0;
  border: #a1a1a1 1px dashed;
  padding: 68px 155px;
  text-align: center;
  grid-area: download;
  width: 96%;
  justify-self: center;
  @include desktop {
    padding: 68px 90px;
  }
  @include tablets {
    width: 80%;
  }
  @include phones {
    width: 90%;
    height: 65%;
    padding: 20px 20px;
  }
}
.inputfile {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile__text {
  margin-bottom: 20px;
  color: rgba(40, 51, 64, 0.4);
  font-weight: 600;
  line-height: 2.12;
  @include phones {
    margin: 0;
  }
}
.edit-card__content {
  grid-area: content;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  @include tablets {
    padding: 0 70px;
  }
  @include phones {
    padding: 0 25px;
  }
}
.edit-card__label {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  color: rgba(65, 76, 99, 0.5);
  font-weight: 700;
}
.edit-card__input {
  padding: 14px 0;
  border-bottom: 1px solid $admin;
  &:focus {
    border-bottom: 1px solid $admin;
  }
}
.edit-card__textarea {
  padding: 20px;
  margin: 20px 5px;
}
.edit-card__taglist {
  display: flex;
}
.edit-card__tag {
  margin-right: 10px;
  background: #f4f4f4;
  padding: 5px 15px;
  border-radius: 30px;
  display: flex;
  align-items: center;
}
.edit-card__description {
  font-size: 13px;
  color: rgba(40, 51, 64, 0.7);
  font-weight: 700;
}
.edit-card__cross {
  height: 10px;
  width: 10px;
  background: svg-load("close.svg", fill = $admin, width = 100%, height = 100%)
    no-repeat center;
  margin-left: 10px;
}
.edit-card__buttons {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  @include tablets {
    justify-content: center;
  }
}
.button--edit-submit {
  margin: 0 0;
  margin-left: 40px;
  padding: 20px 40px;
}
.edit-card__reset {
  color: #383bcf;
}

/* Добавить работу Блок */

.edited-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  @include tablets {
    grid-template-columns: 1fr 1fr;
  }
  @include phones {
    grid-template-columns: 1fr;
    margin: 0 -30px;
  }
}

.button--add-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  padding: 200px 30px;
  background: linear-gradient(
    0deg,
    rgb(0, 106, 237) 0%,
    rgb(32, 80, 220) 48%,
    rgb(63, 53, 203) 100%
  );
  color: #fff;
  @include phones {
    margin: 0;
    padding: 40px 0px;
    flex-direction: row;
  }
}

.button__pic {
  border-radius: 50%;
  font-size: 60px;
  border: 2px solid #fff;
  width: 60px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  @include phones {
    margin: 0;
  }
}
.button__name {
  padding: 0 80px;
  line-height: 1.67;
  @include phones {
    padding: 0 40px;
  }
}
.edited-card {
  margin: 14px;
  padding: 0;
}
.edited-card__picture {
  max-width: 100%;
}
.edited-card__description {
  padding: 25px 14px 25px 30px;
}
.edited-card__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #a0a5b1;
  margin-top: 20px;
}
.button--edit-edited {
  position: relative;
  color: rgba(65, 76, 99, 0.5);
  &:after {
    content: "";
    position: absolute;
    margin-left: 10px;
    bottom: 3px;
    height: 15px;
    width: 15px;
    background: svg-load(
        "pencil.svg",
        fill = #383bcf,
        width = 100%,
        height = 100%
      )
      no-repeat center;
  }
}
.button--delete-edited {
  position: relative;
  margin-right: 20px;
  color: rgba(65, 76, 99, 0.5);
  &:after {
    content: "";
    position: absolute;
    margin-left: 10px;
    bottom: 1px;
    height: 15px;
    width: 15px;
    background: svg-load(
        "close.svg",
        fill = #c92e2e,
        width = 100%,
        height = 100%
      )
      no-repeat center;
  }
}
.edited-card__text {
  color: #7a8191;
  margin: 24px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.88;
  text-align: left;
  color: rgba(65, 76, 99, 0.7);
  padding-right: 30px;
}
.edited-card__name {
  font-weight: 700;
  font-size: 18px;
  color: $admin;
  margin: 10px 0;
}
.edited-card__link {
  color: #383bcf;
  margin-top: 20px;
  font-weight: 600;
  line-height: 1.88;
}

/* Блок Отзывы */

.edited-card--feedback {
  padding: 15px;
  @include tablets {
    padding: 35px;
  }
}
.button--add-card--feedback {
  padding: 124px 30px;
  @include phones {
    padding: 2, 5rem 0rem;
  }
}

.edited-card__description--feedback {
  padding: 0;
}
.edited-card__speaker-info {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid #b9bdc5;
  align-items: center;
  justify-content: center;
}
.edited-card__speaker-picture-box {
  border-radius: 50%;
  overflow: hidden;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edited-card__speaker-picture {
  max-width: 200%;
  transform: translateY(30%);
}
.edited-card__speaker-textinfo {
  margin-left: 20px;
}
.edited-card__speaker-name {
  font-weight: 600;
}
.edit-card--feedback {
  grid-template-columns: 1fr 2fr 0.4fr;
  @include tablets {
    grid-template-rows: 0.1fr 1.1fr 1.2fr;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      "name"
      "download"
      "content";
  }
  @include phones {
    grid-template-rows: 0.1fr 0.7fr 1.2fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "name"
      "download"
      "content";
  }
}
.edit-card__download-area--feedback {
  border: none;
  background: inherit;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-card__content--feedback {
  @include tablets {
    padding: 0;
    padding-top: 20px;
  }
}
.userpic-bg {
  cursor: pointer;
  background: #dee4ed;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userpic-svg {
  height: 100px;
  width: 100px;
  background: svg-load("user.svg", fill = #fff, width = 100%, height = 100%)
    no-repeat center;
}
.button--link {
  color: #383bcf;
  margin-top: 30px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  text-align: center;
}
.edit-card__row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  @include tablets {
    flex-direction: column;
  }
}
.edit-card__label--feedback {
  width: 48%;
  @include tablets {
    width: 74%;
    margin-bottom: 35px;
  }
  @include phones {
    width: 100%;
  }
}
.edit-card__input--feedback {
  padding-left: 0;
}
.edit-card__textarea--feedback {
  margin-left: 0;
  margin-right: 0;
  @include tablets {
    height: 155px;
    resize: none;
  }
}
.text-feedback {
  margin-bottom: 60px;
}
.edited-card__speaker-occ {
  color: rgba(65, 76, 99, 0.5);
}
</style>









