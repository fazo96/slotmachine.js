// Slot machine (Enrico Fasoli)

var slots = [
  document.getElementById("1"),
  document.getElementById("2"),
  document.getElementById("3")
]

var contatore = 0, semaforo = true;

function punteggio(){
  contatore++;
  document.getElementById("msg2").innerHTML = easteregg();
  var l = slots.map(function(a){ return a.innerHTML; })
  if(l[0] == l[1] && l[1] == l[2]) return "JACKPOT!!"
  if(l[0] == l[1] || l[1] == l[2] || l[0] == l[2]) return "COPPIA!"
  return "Magari la prossima volta!"
}

function fastspin(arg){
  return window.setInterval(function(){
    arg.innerHTML = Math.ceil(Math.random() * 7)
  },50)
}

var gioca = function(){
  if(!semaforo) return document.getElementById("msg").innerHTML = "Pazienza!!"
  document.getElementById("msg").innerHTML = "..."
  semaforo = false;
  // Creo un array con gli ID degli intervalli
  var spins = slots.map(fastspin);
  slots.forEach(function(item,index){
    window.setTimeout(function(){
      window.clearInterval(spins[index])
      if(index == 2){ // Fine della giocata
        document.getElementById("msg").innerHTML = punteggio();
        semaforo = true;
      }
    },500+500*index,item)
  })
}




























































// -------------------------
function easteregg(){
  /*if(Math.random()*100 < 0.1)
    document.getElementById("h1").innerHTML = "Slut Machine"*/
  if(contatore > 50) return "Hai giocato "+contatore+" volte di fila. Fossi in \
  te, cercherei aiuto professionale...";
  if(contatore > 30) return "Prima o poi ti stufi...";
  if(contatore > 10) return "E' bello sapere che il proprio software è \
    apprezzato!";
  return ""
}
