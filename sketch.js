// // image 
//var img1;
//var img2;
var img = [];

// A Table object
var table;

function preload() {
  table = loadTable("Data/planets.csv", "header");
  for(var i=0; i<6; i++){
    img[i] = loadImage('images/' + i + '.jpg');
  }
  
}

function setup() {
    // img= loadImage("images/oprah.jpg");
  createCanvas(windowWidth, windowHeight);

  //img1 = loadImage('images/oprah.jpg');
  //img2 = loadImage('images/sherryl.jpg');
  

  loadData();
  frameRate(5);
}

function draw() {
  background("black");



  // //solar system 
  // nofill();
  // stroke("white");
  // strokeWeight(4);
  // ellipse (700,400, 1000,600);
  // ellipse (700,400, 700,300 )
  
 // for the blinking stars at the background //
 for (var i = 0; i < 50; i++) {
  var x = random(windowWidth);
  var y = random(windowHeight);
  noStroke();
  fill(255,255,255);
  ellipse(x, y, 4, 4);}
  
  // Display all bubbles
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].rollover(mouseX, mouseY);
  
  }

}

function loadData() {
  // Load CSV file into a Table object
  // "header" option indicates the file has a header row

  // The size of the array of Bubble objects is determined by the total number of rows in the CSV
  bubbles = []; 

  // You can access iterate over all the rows in a table
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    // You can access the fields via their column name (or index)
    var x = row.get("x");
    var y = row.get("y");
    var d = row.get("diameter");
    var n = row.get("quote");
    // Make a Bubble object out of the data read
    bubbles[i] = new Bubble(x, y, d, n, img[i]);
  }
}

class Bubble {
  constructor(x, y, diameter, s, tempImg) {
    this.x = Number(x);
    this.y = Number(y);
    this.diameter = Number(diameter);
    this.quote = s;
    this.img = tempImg;
    this.over = false;

  }

  // Checking if mouse is over the Bubble
  rollover(px, py) {
    var d = dist(px, py, this.x, this.y);
    if (d < this.diameter/2) {
      this.over = true;
    } else {
      this.over = false;
    }
  }

  // Display the Bubble
  display() {
    stroke(0);
    strokeWeight(10);
    noFill();
    image(this.img,this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      textAlign(CENTER);
      noStroke();
      fill(random(0, 255), random(0, 255), random(0, 255));
      textSize(25)
      text(this.quote, this.x, this.y + this.diameter/2 + 20);
    }
  }
}


