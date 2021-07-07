



/*
Cette fonction modifie la taille de police d'un texte jusqu'à temps
que sa largeur corresponde à la largeur défini par l'utilisateur.
Cette largeur est exprimée en pourcentage par rapport à la largeur de 
l'élément parent.

-Inclure ce fichier dans le fichier HTML

-inclure un event handler:

    window.addEventListener('resize', function(){
        largeurRedimentionnable(minSize,cible, parent, largeur);
    });

-appeler la fonction ' largeurRedimentionnable()' avec 
ces 4 arguments:

    minSize:    taille de police minimum        - nombre entier -
    cible:        élément texte à dimentioner   - DOM element -
    parent:  élément parent de référence        - DOM element -
    largeur:      % du container à remplir      - nombre de 0 à 1 - (sera enregistré dans 'let largeurInput')


*/




function largeurRedimentionnable(minSize,cible, parent, largeur)
{
    let minSizeInput = fontSizeCount = minSize;
    let texteCibleInput = cible;
    let parentInput = parent;

    rechercheLargeur();

function rechercheLargeur()
    {
        texteCibleInput.style.fontSize = fontSizeCount + 'px';
        if(texteCibleInput.offsetWidth < parentInput.offsetWidth * largeur)
        {
            fontSizeCount ++;
            rechercheLargeur();
        }
        else
        {
            fontSizeCount = minSizeInput;
        }
    }

}