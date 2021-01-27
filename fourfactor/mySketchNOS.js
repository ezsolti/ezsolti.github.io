//var socket;
let eq1;
let eq2;
let eq3;
let eq4;
let eq5;
let eq6;
let eq7;
let eq8;
let eq9;
let eq10;
let eq11;
let eq12;
let eq13;
let eq14;
let eq15;
let eq16;

let eqs=[];
let inps=[];

let imgbg;
function preload() {
  imgbg = loadImage('candu-cell-toprint.png');
  imgeps = loadImage('epsm.png');
  imgeta = loadImage('etam.png');
  imgp = loadImage('pm.png');
  imgf = loadImage('fm.png');
  imgfn = loadImage('fastneutrons.png');
  imgtn = loadImage('thermalneutrons.png');
  imgen = loadImage('epineutrons.png');
  imgff = loadImage('fastfission.png');
  imgtf = loadImage('thermalfission.png');
  imgrc = loadImage('resonancecapture.png');
  imgtc = loadImage('thermalcapture.png');
  imgpc = loadImage('parasiticcapture.png');
  imgpe = loadImage('peq.png');
  imgee = loadImage('eeq.png');
  imgfe = loadImage('feq.png');
  imgne = loadImage('neq.png');
  imgps = loadImage('ps.png');
  imgepss = loadImage('epss.png');
  imgfs = loadImage('fs.png');
  imgetas = loadImage('etas.png');
}

function setup() {
    createCanvas(1200, 1000);
    background(255);
    image(imgbg, 0, 0);


    let x = 200;
    let y = 200;
    let w = 50;
    let h = 50;
    eq1 = new Equation(x-100,y,w,h,imgf,0);
    eq2 = new Equation(x-100,y+100,w,h,imgeta,1);
    eq3 = new Equation(x-100,y+200,w,h,imgp,2);
    eq4 = new Equation(x-100,y+300,w,h,imgeps,3);
    eq5 = new Equation(x,y+450,w*2,h,imgfn,4);
    eq6 = new Equation(x+150,y+450,w*2,h,imgtn,5);
    eq7 = new Equation(x+300,y+450,w*2,h,imgen,6);
    eq8 = new Equation(x,y+500,w*2,h,imgtf,7);
    eq9 = new Equation(x+150,y+500,w*2,h,imgff,8);
    eq10 = new Equation(x+300,y+500,w*2,h,imgpc,9);
    eq11 = new Equation(x+450,y+500,w*2,h,imgtc,10);
    eq12 = new Equation(x+460,y+450,w*2,h,imgrc,11);

    eq13 = new Equation(x+650,y+430,w*4,h*1.5,imgpe,12);
    eq14 = new Equation(x+650,y+525,w*4,h*1.5,imgee,13);
    eq15 = new Equation(x+650,y+620,w*4,h*1.5,imgfe,14);
    eq16 = new Equation(x+650,y+715,w*4,h*1.5,imgne,15);


    image(imgepss,x-100,y+550);
    image(imgetas,x+400,y+550);
    image(imgfs,x-100,y+670);
    image(imgps,x+400,y+670);
    //var eqs = [eq1,eq2];
    eqs = [eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10,eq11,eq12,eq13,eq14,eq15,eq16];

    inp1 = createInput();
    inp1.position(560, 260);
    inp1.size(45);
    inp1.id(0)
    inp1.input(myInputEvent);

    inp2 = createInput();
    inp2.position(680, 330);
    inp2.size(45);
    inp2.input(myInputEvent);
    inp2.id(1)

    inp3 = createInput();
    inp3.position(595, 430);
    inp3.size(45);
    inp3.input(myInputEvent);
    inp3.id(2)

    inp4 = createInput();
    inp4.position(410, 753);
    inp4.size(59);
    inp4.input(myInputEvent);
    inp4.id(3)

    inp5 = createInput();
    inp5.position(800, 753);
    inp5.size(59);
    inp5.input(myInputEvent);
    inp5.id(4)

    inp6 = createInput();
    inp6.position(410, 873);
    inp6.size(59);
    inp6.input(myInputEvent);
    inp6.id(5)

    inp7 = createInput();
    inp7.position(800, 873);
    inp7.size(59);
    inp7.input(myInputEvent);
    inp7.id(6)

    inps=[inp1,inp2,inp3,inp4,inp5,inp6,inp7]


//    socket = io.connect('http://localhost:3000');
//    socket.on('mouse',newDrawing);
//    socket.on('inp',inpUp);
}

function myInputEvent() {
//  console.log('you are typing: ', this.value());
  var data = {idx: this.id(),value: this.value()};
//  socket.emit('inp', data);
}

//function inpUp(data) {
//  inps[data.idx].value(data.value); 
//}

//function newDrawing(data) {
//    console.log(data.idx);
//    eqs[data.idx].x = data.x;
//    eqs[data.idx].y = data.y;
//}

//function mouseDragged() {
//    console.log('Sending: ' + mouseX + ',' + mouseY);

//    var data = {
//        x: mouseX,
//        y: mouseY
//    }
//
//    socket.emit('mouse', data);
//    
//    background(255);
//    noStroke();
//    fill(51);
//    eq1.show(mouseX,mouseY);
//}

function draw() {
  background(255); 
  image(imgbg, 0, 0);
    image(imgepss,100,200+550);
    image(imgetas,500,200+550);
    image(imgfs,100,200+670);
    image(imgps,500,200+670);
   
  for (i=0; i<eqs.length;  i++) {
      eqs[i].show(mouseX, mouseY);
  }
}


function mousePressed() {
  for (i=0; i<eqs.length;  i++) {
      eqs[i].pressed(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (i=0; i<eqs.length;  i++) {
      eqs[i].notPressed(mouseX, mouseY);
  }

}

class Equation {
  constructor(x, y, w, h, img, idx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.idx = idx;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
//      console.log('Sending: ' + this.x + ',' + this.y);
//
//       var data = {
//        x: this.x,
//        y: this.y,
//        idx: this.idx
//       }
//
//       socket.emit('mouse', data);
    }

    stroke(133);
    fill(133);
    image(this.img,this.x, this.y);
  }

  pressed(px, py) {
    if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
//      print("clicked on rect");
      this.dragging = true;
      this.offsetX = this.x - px;
      // print(this.offsetX);
      this.offsetY = this.y - py;
      // print(this.offsetY);

    }
  }

  notPressed(px, py) {
//    	print("mouse was released");
      this.dragging = false;
  }
}
