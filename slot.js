// Slot machine (Enrico Fasoli)

// Utility:
function get(a){ return window.localStorage.getItem(a); }
function set(a,b){ return window.localStorage.setItem(a,b); }

// Inizializzazione programma:

if(get("coins") || get("risultati")){
  document.getElementById("msg_up").innerHTML = "Partita caricata!"
  if(coins() == 0) document.getElementById("butt").innerHTML = "Concludi";
} else document.getElementById("msg_up").innerHTML = "Inizia una nuova partita!"

var slots = [ // Elementi del DOM con i valori della slot machine
  document.getElementById("1"),
  document.getElementById("2"),
  document.getElementById("3")
]

var semaforo = true; // Impedisce di fare una giocata durante un'altra giocata
var risultati = JSON.parse(get("risultati")) || {
  coppie: 0, jackpot: 0
}
var ncoins = get("coins") || 5
coins(ncoins) // Imposto il numero di gettoni

// Funzioni:

function restart(){ // Nuova partita
  localStorage.removeItem("coins"); localStorage.removeItem("risultati");
  coins(10);
  risultati = { coppie: 0, jackpot: 0 };
}

function coins(x){ // Getter/Setter gettoni
  if(x != undefined){
    if(isNaN(x)) x = 0;
    if(x < 0) x = 0
    document.getElementById("msg_coin").innerHTML = "hai "+x+" gettoni"
    set("coins",x)
  }
  return x || get("coins")
}

function punteggio(){ // Calcola i risultati di 1 giocata
  var l = slots.map(function(a){ return a.innerHTML; })
  if(l[0] == l[1] && l[1] == l[2]){
    risultati.jackpot++;
    coins(parseInt(coins())+10)
    return "JACKPOT!! 10 Gettoni GRATIS!"
  }
  if(l[0] == l[1] || l[1] == l[2] || l[0] == l[2]){
    risultati.coppie++;
    coins(parseInt(coins())+1)
    return "COPPIA! hai vinto 1 gettone"
  }
  console.log(risultati);
  set("risultati",JSON.stringify(risultati));
  return "Magari la prossima volta!"
}

function fastspin(arg){ // Fa partire la rotazione dei numeri e ritona l'handler
  return window.setInterval(function(){
    arg.innerHTML = Math.ceil(Math.random() * 7)
  },50)
}

// Esegui una giocata di slot machine (serve un gettone)
var gioca = function(){
  if(!semaforo)
    return document.getElementById("msg_up").innerHTML = "Pazienza!!"
  if(coins() == 0){ // Fine partita
    document.getElementById("msg_up").innerHTML = "Hai finito i gettoni! \
    I tuoi risultati sono: "+risultati.coppie+" coppie e "+risultati.jackpot+" \
    jackpot!";
    return restart();
  }
  coins(coins()-1);
  document.getElementById("msg_up").innerHTML = "..."
  semaforo = false; // Semaforo rosso
  var spins = slots.map(fastspin); // faccio partire la rotazione per tutti
  slots.forEach(function(item,index){ // Fermo la rotazione per ogni numero
    window.setTimeout(function(){
      window.clearInterval(spins[index]) // Fermo la rotazione del numero
      if(index == 2){ // Ultimo numero: fine della giocata
        document.getElementById("msg_up").innerHTML = punteggio();
        // Fra 1 secondo posso giocare di nuovo:
        window.setTimeout(function(){semaforo = true;},500);
      }
    },500+500*index,item)
  })
  if(coins() == 0){ // Conclusione partita...
    localStorage.removeItem("coins"); localStorage.removeItem("risultati");
    document.getElementById("butt").innerHTML = "Concludi"
  }
}
