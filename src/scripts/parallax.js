var parallax = (function(){
    var layer1 = document.querySelector('.layer-1');
    var layer2 = document.querySelector('.layer-2');
    var layer3 = document.querySelector('.layer-3');
    var layer4 = document.querySelector('.layer-4');
    var layer5 = document.querySelector('.layer-5');
    var layer6 = document.querySelector('.layer-6');
    var layer7 = document.querySelector('.layer-7');
    var layer8 = document.querySelector('.layer-8');
    var layer9 = document.querySelector('.hero__content');

    return{
        move:function(block,windowScroll,strafeAmount) {
            var strafe = windowScroll / -strafeAmount + '%';
            var transformString = 'translate3d(0,'+ strafe +',0)';
            var style = block.style;

            style.transform = transformString;
            style.webkitTransform = transformString;
        },

        init:function (wScroll){
            this.move(layer1,wScroll,40);
            this.move(layer2,wScroll,50);
            this.move(layer3,wScroll,-25);
            this.move(layer4,wScroll,25);
            this.move(layer5,wScroll,15);
            this.move(layer6,wScroll,25);
            this.move(layer7,wScroll,40);
            this.move(layer8,wScroll,40);
            this.move(layer9,wScroll,20);
         
        }
    }
}());





window.onscroll = function(){
    var wScroll=window.pageYOffset;

    parallax.init(wScroll);
}