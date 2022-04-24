
var Cred, red
var RoadImg, road
var Cwhite, white
var Cblue, blue
var smokeC, smoke
var gameState="play"

function preload(){
 Cred = loadImage("red-car.png");
 RoadImg = loadImage("road.png");
 Cwhite = loadImage("white-car.png");
 Cblue = loadImage("blue-car.png");
 smokeC = loadImage("Smoke-cloud.png")
}

function setup() {
 createCanvas(windowWidth,windowHeight);
 road = createSprite(width/2,height/2);
 road.addImage("road", RoadImg);
 road.velocityY = 3
 road.scale=1.2

 carsGroup = new Group();

 red= createSprite(400,height-200,50,50);
 red.scale = 0.5
 red.addImage("red",Cred)
 red.debug=false
 red.setCollider("rectangle",0,0,200,430)
}

function draw() {
    background("white")
    drawSprites()
    if (gameState === "play") {
    
        if(keyDown("left")){
          red.x-=10
          
        }
        if(keyDown("right")){
          red.x+=10
        
        }

        spawnCars();

        if(road.y>height){
            road.y=height/2
        }
        if(carsGroup.isTouching(red)){
            smoke = createSprite(200,200)
            smoke.addImage(smokeC)
            smoke.x=red.x+100
            smoke.y=red.y+3
            gameState="end"
        }
    }
        if (gameState === "end"){
            carsGroup.setVelocityEach(0,0)
            road.velocityY=0
            textAlign(CENTER)
            stroke("yellow");
            fill("black");
            textSize(50);
            text("Game Over", width/2,height/2)
        }


}

function spawnCars(){
  if (frameCount % 240 === 0) {
    var blue = createSprite(200, -50);
    blue.x=random(100,width-100)
    blue.addImage(Cblue)
    
    blue.velocityY = 3;
    blue.debug=false
    blue.setCollider("rectangle",0,0,100,200)

    blue.lifetime=1000

    carsGroup.add(blue)
  }

  if (frameCount % 160 === 0) {
    var white = createSprite(350, -50);
    
    white.x=random(100,width-100)
    white.addImage(Cwhite)

    white.lifetime=1000
    
    carsGroup.add(white)

    white.velocityY = 3
    white.debug=false
    white.setCollider("rectangle",0,0,100,200)
  }

}