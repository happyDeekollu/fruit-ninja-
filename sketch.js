var PLAY = 1;
var END = 0;
var gameState = PLAY;
var enemyImage,fruit1,fruit2,fruit3,fruit4,swordImage,gameOverImage;
var sword,fruit,enemy,fruitGroup,enemyGroup,score,r,randomFruit;
var overSound,swordSound, restartImage;

function preload(){
  swordImage = loadImage("sword.png");
  enemyImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");
  
  overSound = loadSound("gameover.mp3");
  swordSound = loadSound("knifeSwooshSound.mp3");
}

function setup(){
createCanvas(600,600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7
  sword.setCollider("rectangle",0,0,40,40);
  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  gameover = createSprite(300,200,20,20);
  gameover.addImage("gameOver",gameOverImage);
  gameover.visible = false;
  restart = createSprite(300,300,20,20);
  restart.addImage("restart",restartImage);
  restart.scale=0.5;
  restart.visible = false;
  
}
function draw(){
  background("pink");
 
  if(gameState===PLAY){
    fruits();
    Enemy();
   
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      swordSound.play();
    }
    else
    {
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        sword.visible = false;
        sword.x=200;
        sword.y=200;
        restart.visible = true;
        gameover.visible = true;
        overSound.play();
      
    }
  }
}
  drawSprites();
text("Score : "+ score,300,30);
}
function Enemy(){
  if(World.frameCount%200===0){
    enemy=createSprite(400,200,20,20);
    enemy.addAnimation("moving", enemyImage);
    enemy.y=Math.round(random(100,300));
    enemy.velocityX=-(8+(score/10));
    enemy.setLifetime=50;
    enemyGroup.add(enemy);
  }
}

function fruits(){
  if(World.frameCount%40===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
    if(position==1){
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==-1){
      fruit.x=0;
      fruit.velocityX= (7+(score/4));
      }
    }
     fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else if (r == 4){
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-(7+(score/15));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
