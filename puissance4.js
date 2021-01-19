var popUp_div = document.getElementById('popUp');
var userName_div = document.getElementById('userName')
var fillIn_span = document.getElementById('fillIn');
var confirmer_div = document.getElementById('confirmer');
var nameCount = false;

confirmer_div.addEventListener('click', register);

var spawnCell0_div =  document.getElementById('spawnCell0');
var spawnCell1_div =  document.getElementById('spawnCell1');
var spawnCell2_div =  document.getElementById('spawnCell2');
var spawnCell3_div =  document.getElementById('spawnCell3');
var spawnCell4_div =  document.getElementById('spawnCell4');
var spawnCell5_div =  document.getElementById('spawnCell5');
var spawnCell6_div =  document.getElementById('spawnCell6');
var blocker_div = document.getElementById('blocker');

var joueurA_h1 = document.getElementById('joueurA');
var joueurB_h1 = document.getElementById('joueurB');
var pointsA_h2 = document.getElementById('pointsA');
var pointsB_h2 = document.getElementById('pointsB');
var reset_h1 = document.getElementById('reset');
var joueurA;
var joueurB;
reset_h1.addEventListener('click', reset);

function reset()
{

      for(i = 0; i < 7; i ++)
      {
        compteurParColonne[i] = 5;    //reset compteurParColonne
        for(j = 0; j < 6; j ++)
        {
          tableau[j][i] = 0;         //reset tableau
        }
      }
      for(k = comptePièce - 1; k > -1; k --)
      {
        var id = '#pièce' + k;
        var elem = document.querySelector(id);
        elem.parentNode.removeChild(elem);
      }
      comptePièce = 0;
      blocker_div.style.display = 'none';

}

var comptePointsA = 0;
var comptePointsB = 0;
var tableau = [ [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]];
var joueur = true;                                                    //true === joueur A, false === joueurB
var compteurParColonne = [5, 5, 5, 5, 5, 5, 5];                       // compte les cases vides dans chaque colonnes 0 = 1 case vide / valeur = rangée
var comptePièce = 0;



function spawn(element)
{


  var numColonne = parseInt(element.id[element.id.length - 1], 10);   //trouver no de collonne jouée avec l'id de la case cliquée ->'spawnCell[0] '

  if(compteurParColonne[numColonne] > -1)                             //vérifier s'il reste une place libre dans la colonne ( 0 = 1 place libre)
  {
    blocker_div.style.display = 'flex';
    const newPiece = document.createElement('div');                   //créer nouvelle pièce
    newPiece.id  = 'pièce' + comptePièce;                             // ajouter id pour nouvelle pièce
    if(joueur)
    {
      newPiece.classList.add('pièces', 'pièceA');                               // ajouter class  IL FAUDRAIT AJOUTER UN TIMEOUT() POUR QUE LA COULEUR CHANGE APRES L4ANIMATUION DE LA CHUTE
      joueurA_h1.style.color = 'white';
      joueurB_h1.style.color = 'orange';
      tableau[compteurParColonne[numColonne]][numColonne] = 1;
    }
    if(!joueur)
    {
      newPiece.classList.add('pièces', 'pièceB');                               // ajouter class
      joueurA_h1.style.color = 'orange';
      joueurB_h1.style.color = 'white';
      tableau[compteurParColonne[numColonne]][numColonne] = 2;
    }
    element.appendChild(newPiece);                                    //ajouter nouvellepièce au Document
    chuteDePièce(parseInt(numColonne), newPiece.id);
    vérifierGagnant();
    compteurParColonne[parseInt(element.id[element.id.length - 1], 10)] --;
    comptePièce ++;                                                   // compte les pièces jouées pour créer de nouveaux ID à chaque nouvelle pièce
    joueur = !joueur;                                                 // tour au prochain joueur
  }
}

function chuteDePièce(colonne, id)
{                      //colonne == no de la colonne, class = id de la nouvelle pièce

  var chute = ((compteurParColonne[colonne] + 1) * 130) + 'px';
  document.getElementById(id).animate([
      {transform: 'translateY(0px)'},
      {transform: `translateY(${chute})`}
  ],
    { duration: 350,
      iteration: 1,
      easing: 'cubic-bezier(.96,-0.01,.93,.66)',
      fill: 'forwards'
    });
}


function vérifierGagnant()
{
    var compteurA = 0;
    var compteurB = 0;
    var gagné = false;

/* recherche de combinaison horizontale */
    for(i = 5; i > -1; i--)                     // loop de rangée
    {
          for(j = 0; j < 4; j ++)               // loop de colonne de départ
          {
                for(k = 0; k < 4; k++)          // loop des 4 voisins identiques vers la droite
                {
                      switch(tableau[i][j + k])
                      {
                        case 1: compteurA ++;
                                break;
                        case 2: compteurB ++;
                                break;
                        case 0: break;
                      }

                }
                if(afficherGagnant(compteurA, compteurB))
                {
                  gagné = true;
                  compteurA = 0;
                  compteurB = 0;
                  break;
                }
                else
                {
                  compteurA = 0;
                  compteurB = 0;
                }
          }
          if(gagné)
          {
            break;

          }
    }
  /* recherche de combinaison verticale */

    for(m = 0; m < 7; m ++)                                     //loop de colonnes
    {
          for(n = 5; n > 2; n --)                               //loop de rangée de départ
          {
                for(o = 0; o < 4; o ++)                         //loop des 4 voisins vers le haut
                {
                  switch(tableau[n - o][m])
                  {
                    case 1: compteurA ++;
                            break;
                    case 2: compteurB ++;
                            break;
                    case 0: break;
                  }
                }
                if(afficherGagnant(compteurA, compteurB))
                {
                  gagné = true;
                  compteurA = 0;
                  compteurB = 0;
                  break;
                }
                else
                {
                  compteurA = 0;
                  compteurB = 0;
                }
          }
          if(gagné)
          {
            break;
          }

    }

    /* recherceh de combinaisons nord-est */

    for(s = 5; s > 2; s--)                                              //loop de rangée
    {
          for(t = 0; t < 4; t++)                                        //loop de colonnes
          {
                for(u = 0; u < 4; u++)                                  // loop de 4 voisins nord-est
                {
                  switch(tableau[s - u][t + u])
                  {
                    case 1: compteurA ++;
                            break;
                    case 2: compteurB ++;
                            break;
                    case 0: break;
                  }
                }
                if(afficherGagnant(compteurA, compteurB))
                {
                  gagné = true;
                  compteurA = 0;
                  compteurB = 0;
                  break;
                }
                else
                {
                  compteurA = 0;
                  compteurB = 0;
                }
          }
          if(gagné)
          {
            break;
          }
    }

    /* recherceh de combinaisons nord-ouest */

    for(s = 5; s > 2; s--)                                              //loop de rangée
    {
          for(t = 6; t > 2; t --)                                        //loop de colonnes
          {
                for(u = 0; u < 4; u++)                                  // loop de 4 voisins nord-est
                {
                  switch(tableau[s - u][t - u])
                  {
                    case 1: compteurA ++;
                            break;
                    case 2: compteurB ++;
                            break;
                    case 0: break;
                  }
                }
                if(afficherGagnant(compteurA, compteurB))
                {
                  gagné = true;
                  compteurA = 0;
                  compteurB = 0;
                  break;
                }
                else
                {
                  compteurA = 0;
                  compteurB = 0;
                }
          }
          if(gagné)
          {
            break;
          }
    }


function afficherGagnant(a, b)
{
  if(a == 4)
  {
    comptePointsA ++;
    pointsA_h2.innerHTML = comptePointsA;
    alert(joueurA + ' a gagné!!!');
    reset_h1.style.display = 'grid';
    return true;
  }
  else if(b == 4)
  {
    comptePointsB ++;
    pointsB_h2.innerHTML = comptePointsB;
    alert(joueurB + ' a gagné!!!');
    reset_h1.style.display = 'grid';
    return true;
  }
  else
  {
    return false;
  }

}
    if(!gagné)
    {
    blocker_div.style.display = 'none';
    }
}

function register()
{
  if(nameCount)
  {
    if(userName_div.innerHTLML.length > 0 && input_div.innerHTLML.length < 9)
    {
      joueurA = input_div.innerHTLML
    }
  }
  else {
    {
      if(userName_div.innerHTLML.length > 0 && input_div.innerHTLML.length < 9)
      {
        joueurA = input_div.innerHTLML
      }
    }
  }


}

function loadGame()
{
  var board = document.getElementById('boardContainer');
  var item = document.getElementById('svg-container');

  for(i = 0; i < 41; i ++)
  {
    var clone = item.cloneNode(true);
    board.appendChild(clone);
  }
  //popUp_div.style.display = 'grid';
  joueurA = prompt("Nom du joueur A:");
  joueurA_h1.innerHTML = joueurA;
  joueurB = prompt("Nom du joueur B:");
  joueurB_h1.innerHTML = joueurB;

  joueurA_h1.style.color = 'orange';
  joueurB_h1.style.color = 'white';
}
loadGame();
