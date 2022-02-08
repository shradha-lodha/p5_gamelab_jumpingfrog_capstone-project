var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);


  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  coinGroup= new Group();
  climbersGroup= new Group();
  score=0;

}

function draw(){
  background(oceanImg);
  drawSprites();
  textSize(25);
  text("Score :" +score,400,50); 


  if (gameState === "play")
  {
    ocean.setVelocity(0,-2);
    if( ocean.position.y<180)
    {
      ocean.position.y= 300;
    }
    
   spawnCoin();

   //frog jump
   if(keyDown("space"))
   {
     frog.setVelocity(0,-2);
   }
   else
   {
     frog.setVelocity(0,2);
   }
   
   if(keyDown("right")&& frog.position.x<550)
   {
     frog.position.x +=4;
     frog.setVelocity(0,0);
   }
   if(keyDown("left")&& frog.position.x<550)
   {
     frog.position.x -=4;
     frog.setVelocity(0,0);
   }
      
  }

  if(coinGroup.isTouching(frog)){
    frog.setVelocity(0,0);
    score=score+1;
    coinGroup.destroyEach();
  }

  if(frog.position.y>500)
  {
    gameState="end";
  }
  
  if (gameState === "end"){
      
      textSize(20);
      fill("black");
      text("GAME OVER",200,200);
      text("YOUR SCORE :"+score,200,230);
      frog.setVelocity(0,0);
      ocean.setVelocity(0,0);
      climbersGroup.destroyEach();

  }
  

}



// create the coin and climber in the same function
function spawnCoin() {
    
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
    climber=createSprite(Math.round(random(50,500)),80,200,50);
    climber.addImage("Seaweed",climberImg);
    climber.setVelocity(0,2);
    climber.scale=0.3;
    climbersGroup.add(climber);
    climber.lifetime=150;
        
    coin= createSprite(climber.x,40,20,20);
    coin.addImage("coin",coinImg)
    coin.setVelocity(0,2);
    coin.scale=0.1;
    coin.lifetime=150;
    coinGroup.add(coin);
  }
}

