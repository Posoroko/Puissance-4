prompter_section = document.querySelector('.prompter');
promptContainer_div = document.querySelector('.promptContainer');
promptTitle_h1 = document.querySelector('.promptTitle');
joueurInput_span = document.querySelector('.joueurInput');
confirmer_button = document.querySelector('.confirmer');

window.addEventListener('resize', function(){
    largeurRedimentionnable(12, promptTitle_h1, promptContainer_div, 0.8);
});
confirmer_button.addEventListener('click', loadName);



function prompterIn(){
    promptContainer_div.animate([
        {opacity: 0},
        {opacity: 1}
    ],{
        duration: 350,
        easing: 'ease-in',
        fill: 'forwards'
    })
    getNames();
}

var nameInputCount = 0;
const textePrompterJoueurs = ['premier joueur', 'deuxième joueur'];

function getNames()
{
    joueurInput_span.innerHTML = textePrompterJoueurs[nameInputCount];
    largeurRedimentionnable(12, promptTitle_h1, promptContainer_div, 0.8);
    document.querySelector('.promptInput').value = '';
}

function loadName(){
    if(nameInputCount === 0)
    {
        nomJoueurA_h1.innerHTML =playerNames.joueurA = document.querySelector('.promptInput').value;
        
        nameInputCount = 1;
        loadNextPrompt();
    }
    else if(nameInputCount === 1)
    {
        nomJoueurB_h1.innerHTML =playerNames.joueurB = document.querySelector('.promptInput').value;
        
        prompter_section.animate([
            {opacity: 1},
            {opacity: 0},
        ],{
            duration: 700,
            easing: 'ease-in',
            fill: 'forwards'
        });
        setTimeout(function(){prompter_section.style.display = 'none'}, 700);
    }
    
}

function loadNextPrompt()
{
    promptContainer_div.animate([
        {opacity: 1},
        {opacity: 0},
        {opacity: 1}
    ],{
        duration: 700,
        easing: 'ease-in-out',
        fill: 'forwards'
    })
    setTimeout(getNames, 350);
}