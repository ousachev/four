import Vue from 'vue';

new Vue({
    el:".form",
    data:{
        name:'',
        email:'',
        message:'',
        nameValid:true,
        emailValid:true,
        messageValid:true,
        nameError:'',
        emailError:'',
        messageError:'',
        overlayHidden:true,
        resultMessage:''
    },
    methods:{
        validateName(){
            this.name=this.$el.querySelector('.contact__input--name').value;
            if (this.name.lenght<3){
                this.nameValid = false;
                this.nameError = 'Слишком короткое имя';
            }else{
                this.nameValid = true;
                this.nameError='';
            }
            return this.nameValid;
        },
        validateEmail(){
            var regex = /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/;
            this.email = this.$el.querySelector('.contact__input--email').value;
            if (this.email.length <8){
                this.emailValid = false;
                this.emailError = 'Короткий email';
            }else if (!regex.test(this.email)){
                this.emailValid = false;
                this.emailError = 'Неверный email';
            }else {
                this.emailValid = true;
                this.email.Error = '';
            }
            return this.emailValid;
        },
        validateMessage (){
            this.message = this.$el.querySelector('.contact__input--message').value;
            if (this.message.lenght<20){
                this.messageValid = false;
                this.messageError = 'Слишком короткое собщение';
            }else{
                this.messageValid = true;
                this.messageError='';
            }
            return this.messageValid;
        },
        submitForm (){
            var nameValid = this.validateName(),
                emailValid = this.validateEmail(),
                messageValid = this.validateMessage();
            if(nameValid &&emailValid &&messageValid){
                var userData = {
                    username:this.name,
                    email:this.email,
                    message:this.message
                }
                fetch('src/data/success.txt',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(userData)
                }).then( (response)=>{
                    this.resultMessage = "Сообщение отправлено";
                    this.overlayHidden = false;
                    setTimeout(this.hideOverlay,3000);
                });
            }
        },
        hideOverlay(){
            this.overlayHidden = true;
        }
    }
});