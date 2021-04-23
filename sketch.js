//Create variables here
var dog, happyDog;
var foodS, foodStock;
var database;
var dogImg, dogImg1;

function preload()
{
	 dogImg = loadImage("images/dogImg.png");
   dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  dog = createSprite(320,250,30,45);
  dog.addImage(dogImg);
  dog.scale = 0.25;


  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  textSize(20)
}


function draw() {  
   background(46, 139, 87);
   
  if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(dogImg1);
  }

  drawSprites();
  //add styles here
  fill("blue");
  textSize(20);
  stroke('black');
   text("Food remaining: "+ foodS, 170, 100);
   
  
  text("Prees up arrow key to feed timmy!",130,10,300,20);
  
}

function readStock(data){
  foodS = data.val();
}

 function writeStock(x){
   if(x<=0){
      x = 0;
   } else {
      x = x-1;
  }

   database.ref('/').update({
     Food:x
   })
 }