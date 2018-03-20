
//========================================
//FIRST ATTEMPT
//====================================
var boulders;
var table;

var j=300;
var k=100;
var speed=5;

function preload() {
  table = loadTable("Data/boulders.csv", "header");
}


function setup (){
  loadData();
  bg = loadImage("Background/star.jpg");
  createCanvas(windowWidth,windowHeight);
  frameRate(5);
}


function draw (){
 background (bg);

//moving text
k += speed; 
if(k > height){
  k = 0; 
}
textSize(100);
textStyle(ITALIC);
fill(random(0, 255), random(0, 255), 0);
text('take up space', j, k); 



 // for the blinking stars at the background //
 for (var i = 0; i < 50; i++) {
var x = random(windowWidth);
var y = random(windowHeight);
noStroke();
fill(255,255,255);
ellipse(x, y, 4, 4);}


//mountain  
stroke(color(0, 0, 255));
strokeWeight(4);
noFill();
triangle(2,400,200,150,397,400);
triangle(402,400,600,150,797,400);
triangle(802,400,1000,50,1197,400);


//mountain peek
noStroke();
fill(245,248,240);
quad(143,220,200,150,250,210,200,190);
quad(543,220,600,150,650,210,600,190);
quad(903,220,1000,50,1090,210,960,190);



//display the success sign
// add in push and pop 
if (mouseX > 850) {
 
textSize(20);
fill(random(0,255), random(0,255), 255);
text('success', 1000, 50);  
 }


 // display the boulders
 for (var i = 0; i < boulders.length; i++) {
  boulders[i].display();
  boulders[i].rollover(mouseX, mouseY);
}

}

 function loadData() {
  // Load CSV file into a Table object
  // "header" option indicates the file has a header row

  // The size of the array of boulder objects is determined by the total number of rows in the CSV
  boulders = []; 

  // You can access iterate over all the rows in a table
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    // You can access the fields via their column name (or index)
    var x = row.get("x");
    var y = row.get("y");
    var d = row.get("diameter");
    var n = row.get("quote");
    // Make a boulder object out of the data read
    boulders[i] = new Boulder(x, y, d, n);
  }
}



 class Boulder {
  constructor(x, y, diameter, s) {
    this.x = Number(x);
    this.y = Number(y);
    this.diameter = Number(diameter);
    this.name = String(s);
    this.over = false;
  }

  // Checking if mouse is over the boudler
  rollover(px, py) {
    var d = dist(px, py, this.x, this.y);
    if (d < this.diameter/2) {
      this.over = true;
    } else {
      this.over = false;
    }
  }

  // Display the boulder
  display() {
    stroke(0);
    strokeWeight(2);
    fill(139,69,19);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      textAlign(CENTER);
      noStroke();
      textSize(20);
  fill(255, 255, 255);
      text(this.name, this.x, this.y + this.diameter/2 + 20);
    }
  }
}