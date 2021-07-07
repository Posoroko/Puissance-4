const btn_buttton = document.querySelector('.play');
btn_buttton.addEventListener('click', startGame);



function startGame(){
    loader_section.animate([
        {opacity: 1},
        {opacity: 0}
    ],{ 
        duration: 350,
        easing: 'ease-in',
        iterations: 1,
        fill: 'forwards'
    });
    prompterIn();
    setTimeout(out, 350);
    function out()
    {
        loader_section.style.display = 'none';
    }
}
window.addEventListener('resize', function(){
    largeurRedimentionnable(12, titre_h1, loader_section, 0.8);
});
largeurRedimentionnable(12, titre_h1, loader_section, 0.8);

