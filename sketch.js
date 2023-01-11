





//bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 22;
let raio =  diametro/2;

//velocidade da bolinha
let velocidade = 5;
let velocidadeXbolinha = 1 + velocidade;
let velocidadeYbolinha = 1 + velocidade;


//raquete
let xRaquete = 10 
let yRaquete = 110 
let comprimentoRaquete = 10
let alturaraquete  = 90

//raquete do oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 110 
let velocidadeYoponente;


//Colisao
let colidiu  = false;

//placar
let meuPontos = 0;
let pontosOponentes = 0;



//son do jogo
let raquetada;
let ponto;
let trilha;


function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

const mostrarbolinha = () =>{
  circle(xBolinha, yBolinha, diametro)
}


const movimentaBilinha = () =>{
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}


const verficaColisaoBolinha = () =>{
    
  if(xBolinha+raio > width || xBolinha - raio < 0){
    velocidadeXbolinha *=-1  
  }
  if(yBolinha+raio > height || yBolinha - raio < 0){
    velocidadeYbolinha *=-1
     
  }
}

const raquete = (x, y) =>{
  rect(x, y, comprimentoRaquete, alturaraquete )
}




const movimentaMinhaRaquete = () =>{
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  
}


const movimentaMinhaRaqueteOponente = () =>{
  // velocidadeYoponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 80
  // yRaqueteOponente += velocidadeYoponente;
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}



const verificaColisaoRaquete = () =>{
  if (xBolinha - raio < xRaquete + comprimentoRaquete
        && yBolinha - raio < yRaquete + alturaraquete
        && yBolinha + raio > yRaquete){
    velocidadeXbolinha *= -1;
    raquetada.play()
  }
}


const colisaoraquetebiblioteca = (x,y) =>{
  colidiu = collideRectCircle(x, y, comprimentoRaquete,alturaraquete,xBolinha, yBolinha, raio )
  
  if (colidiu){
      velocidadeXbolinha *= -1;
    raquetada.play()
     
  }
  
  
}


const incluirPlacar = () => {
  stroke(255)
  
  textAlign(CENTER)
  textSize(16)
  
  fill(255,140,0)
  rect(150,10,40,20)
  fill(255)
  text(meuPontos, 170,26)
  
  
  fill(255,140,0)
  rect(450,10,40,20)
  fill(255)
  text(pontosOponentes, 470,26)
}



const marcaPonto = () =>{
  if(xBolinha > 590) {
    meuPontos += 1;
    ponto.play()
  }
  if(xBolinha < 11) {
    pontosOponentes += 1;
    ponto.play()
  }
}


function draw() {
  background(0);
  mostrarbolinha()
  movimentaBilinha()
  marcaPonto()
  verficaColisaoBolinha()
  raquete(xRaquete, yRaquete);
  raquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete()
  // verificaColisaoRaquete()
  colisaoraquetebiblioteca(xRaquete, yRaquete)
  colisaoraquetebiblioteca(xRaqueteOponente, yRaqueteOponente)
  movimentaMinhaRaqueteOponente()
  bolinhaNaoFicaPresa()
  
  incluirPlacar()
  

  

  
}