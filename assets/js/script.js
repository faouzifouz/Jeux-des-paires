//Je cree une constante cards pour selectionner les class memory-card
  const cards = document.querySelectorAll('.memory-card');

  //Je creer des variables pour l'etat de retournement ici retcarte1 et la fonction flipcard
  let retcarte1 = false;

  //Variable compteur d'essais
  let essais=0;

  //une variable pour empecher toute carte de basculer avant que les cartes ne soient cachées ou égales
  let blocard = false;

  //Ici les variable de carte1 et 2
  let carte1, carte2;

  //je cree une fonction pour acceder a classlist et flip class
//la variable this est la carte cliquée
//une fonction checkFormatch pour verifier si carte1 et carte 2 son ok
  function flipCard() {
    if (blocard) return;
    if (this === carte1) return;
  
    this.classList.add('flip');
    
  //Ici je vérifie mes variables sinon je retabli la valeur false
    if (!retcarte1) {
      retcarte1 = true;
      carte1 = this;
  
      return;
    }
  
    carte2 = this;
    checkForMatch();

  }
  //Je cree une fonction match en cas de correspondance disableCard est invoqué sinon unflipcard
  function checkForMatch() {
    let isMatch = carte1.dataset.framework === carte2.dataset.framework;
  
    isMatch ? disableCards() : unflipCards();

   if(carte1!=carte2){
    essais++;
    console.log(essais);
    document.getElementById("retry").innerHTML="C est pas bon ! ";
    document.getElementById("try").innerHTML="Nombre d'essais: "+ essais;
     setTimeout(function() {
      document.getElementById('retry').innerHTML = "";
    },1500);
   }
   if(essais>3){
     document.getElementById("fin").innerHTML="Vous avez perdu ! Appuyer sur rejouer";
   }
  }
  
  function disableCards() {
    carte1.removeEventListener('click', flipCard);
    carte2.removeEventListener('click', flipCard);
    
  
    resetcard();
  }
  
  function unflipCards() {
    blocard = true;
  
    setTimeout(() => {
      carte1.classList.remove('flip');
      carte2.classList.remove('flip');
  
      resetcard();
    }, 1500);
  }
  
  function resetcard() {//Ici fonction pour reinitialiser les cartes apres chaque tour
    [retcarte1, blocard] = [false, false];
    [carte1, carte2] = [null, null];
  }
  // Ici je génère des nombre aléatoire en 0 et 12 et les affecte a la proprieté flex-item order
 //La fonction sera invoqué tout de suite après sa déclaration
  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();
  //ajout d'evenenment pour parcourir mes cartes au click la fonction flipcard sera active
  cards.forEach(card => card.addEventListener('click', flipCard));
  //fonction pour rejouer mon jeu
  document.querySelector(".newgame").addEventListener('click', ()=>location.reload())


  //Bonus timer
