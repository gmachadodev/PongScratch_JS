// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

// variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 15;
let raqueteAltura = 100;
let velocidadeRaquete = 5;

// variaveis do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;
let zoop;

function preload(){
  trilha = loadSound("Trilha_sonora.wav");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  zoop = loadSound("Zoop.wav");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  colisaoRaqueteBordas();
  
  //colisaoBolinhaRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  
  movimentaRaqueteOponente();
  
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBorda(){
  if(xBolinha > width-raio || xBolinha < 0+raio){
    velocidadeXBolinha *= -1;
  }
  
  if(yBolinha+raio > height || yBolinha-raio < 0){
    velocidadeYBolinha *= -1;
  }
  
  //if(xBolinha == 600){
  //  velocidadeXBolinha = -5
  //} else if(xBolinha == 0){
  //  velocidadeXBolinha = 5;
  //}
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= velocidadeRaquete;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += velocidadeRaquete;
  }
}

function colisaoRaqueteBordas(){
  if(yRaquete<0){
    yRaquete = 0;
  } else if(yRaquete+raqueteAltura > 400){
    yRaquete = height - raqueteAltura;
  }
}

function colisaoBolinhaRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha - raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 25;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar(){
  if(pontosDoOponente >= meusPontos){
    chanceDeErrar++;
    if(chanceDeErrar >= 49){
      chanceDeErrar = 50;
    }
    else{
      chanceDeErrar--;
      if(chanceDeErrar <= 25){
        chanceDeErrar = 25;
      }
    }
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(32);
  fill(color(0, 206, 209));
  rect(175, 9, 50, 30);
  fill(255);
  text(meusPontos, 200, 35);
  fill(color(0, 206, 209));
  rect(375, 9, 50, 30);
  fill(255);
  text(pontosDoOponente, 400, 35);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos++;
    xBolinha = 300;
    yBolinha = 200;
    zoop.play();
  }
  if(xBolinha < 10){
    pontosDoOponente++;
    xBolinha = 300;
    yBolinha = 200;
    zoop.play();
  }
}




