//canvas logic inspired by http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

let cvs = document.querySelector("#cvs");
let ctx = cvs.getContext("2d");

//canvas fillStyle is black by default so we need to explictly set it white
ctx.fillStyle = "#ffffff"; 

let isPainting = false;

//start drawing
cvs.addEventListener("mousedown", function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;          
    isPainting = true;
    addClick(mouseX, mouseY);
    redraw();
});

//keep drawing
cvs.addEventListener("mousemove", function(e) {  
    if(isPainting){
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        addClick(mouseX, mouseY, true);
        redraw();
      }
});

//stop drawing in bounds
cvs.addEventListener("mouseup", function(e) {
    isPainting = false;
});

//stop drawing out of bounds
cvs.addEventListener("mouseleave", function(e) {
    isPainting = false;
});

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){

    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.lineWidth = 5;
              
    for(var i=0; i < clickX.length; i++) {		
        ctx.beginPath();
      if(clickDrag[i] && i){
        ctx.moveTo(clickX[i-1], clickY[i-1]);
       }else{
        ctx.moveTo(clickX[i]-1, clickY[i]);
       }
       ctx.lineTo(clickX[i], clickY[i]);
       ctx.closePath();
       ctx.stroke();
    }
}