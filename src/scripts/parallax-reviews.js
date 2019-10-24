const parallax = document.querySelector(".reviews-section");
const layers = parallax.children;

function moveLayersDependsOnScroll(wScroll){

    Array.from(layers).forEach(layer =>{

        const divider =layer.dataset.speed;
        const strafe = wScroll * divider/10;
        layer.style.transform = `translateX(-${strafe}%)`;
    });

}

window.addEventListener("scroll", e =>{
    const wScroll = window.pageYOffset;
    moveLayersDependsOnScroll(wScroll);
});