var monkey , monkey_running,mokeyStop;
var banana ,bananaImage, stoneImg;
var FoodGroup, obstacleGroup;
var score;
var ground,groundImage;
var invisibleGround;
var score = 0;
var gameState = "play";
var obstaclesGroup;
var gameOver,gameOverImage;
var retry,retryImage;
var points=0;
var bananaImage;
var bananaGroup;
var noOfTime=false;
function preload(){
  
  
  monkey_running =loadAnimation("monkey_01.png","monkey_02.png","monkey_03.png","monkey_04.png","monkey_05.png","monkey_06.png","monkey_07.png","monkey_08.png","monkey_09.png");
  monkeyStop = ("monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  groundImage = loadImage("jungle.jpg");
  gameOverImage = loadImage("gameOver.png");
}


function setup() {
  createCanvas(600,400);
  ground = createSprite(200,200,400,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;

  monkey = createSprite(44,200,20,200);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("monkeyStop",monkeyStop);
  
  invisibleGround = createSprite(200,370,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  gameOver = createSprite(200,200,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale=0.8;
  monkey.setCollider("circle",0,0,150);

  bananaGroup = createGroup();
}
function draw() {
  background(220);
  if(gameState==="play"){
       score = Math.ceil(frameCount / frameRate());
     ground.velocityX = -4;
  if(ground.x<100){
   ground.x = ground.width/2;
  }
    
      monkey.velocityY = monkey.velocityY+0.5;
  if(keyDown("space")&&monkey.y>=315){
    monkey.velocityY = -12;
  }
      monkey.collide(invisibleGround);
  obstacles();
    bananas();
    
    if(monkey.isTouching(bananaGroup)){
    points = points+2;
    
      bananaGroup.destroyEach();
    }
    
    
 if(monkey.isTouching(obstaclesGroup)){
   obstaclesGroup.destroyEach();
    if(noOfTime===true){
      gameState="end";
    }else{
      monkey.scale=0.05;
     noOfTime=true;
        
    }
    
   
 
 }
   
   switch(points){
      case 1: monkey.scale=0.12;
        break;
        case 2: monkey.scale=0.14;
        break;
        case 3: monkey.scale=0.16;
        break;
        case 4: monkey.scale=0.18;
        break;
        default:break;
    }
  
   }
  
  drawSprites();
  
  fill("red");
  textSize(28);
  
  text("score: "+points,300,20);
  
   if(gameState === "end"){
   
  gameOver.visible = true;
     
   //noOfTime=1;
   
   monkey.velocityY=0;
   ground.velocityX = 0;
        
   
   fill("white");
   textSize(28)
   
   //text("Press Reload Button to \nrestart!!",100,120);
     text("score: "+points,35,275);
   
   obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);   monkey.changeAnimation("monkeyStop",monkeyStop);
   
   obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     bananaGroup.destroyEach();
 }
  if(mousePressedOver(retry)){
    restart();
  }
  
}

/*function restart(){
        gameState = "play";
        retry.visible = false;
        gameOver.visible = false;
        obstaclesGroup.destroyEach();
        monkey.changeAnimation("monkey",monkey_running);
        monkey.scale=0.1;
        score = 0;
        points = 0;
noOfTime=false;
}*/
function obstacles(){

   if(frameCount % 80 === 0){

             var obstacle = createSprite(400,370,10,10);
             obstacle.addImage("obstacle",stoneImg);
             obstacle.scale = 0.1;
             obstacle.velocityX = -(4+score/100);
             obstacle.lifetime = 100;
     
     
     obstaclesGroup.add(obstacle);
   
   } 
}
function bananas(){
  if(frameCount % 80 === 0){
        var banana = createSprite(400,230,10,10);
        banana.y = Math.round(random(140, 200));
        banana.addImage(bananaImage);
        banana.velocityX= -5;
        banana.scale=0.07;
        bananaGroup.add(banana);
  }
}
     