var mapArray = [];
perimeterArray = [];
var playerY = 4;
var playerX = 4;


function initializeMap() {
  for(y = 0; y < 9; ++y){
    mapArray[y] = [];
    for(x = 0; x < 9; ++x){
      if((Math.floor(Math.random() * (30   - 1)) + 1) <= 3){
        mapArray[y][x] = "#";
      }else{
        mapArray[y][x] = "*";
      }
      if(x === 0 || x === 8 || y === 0 || y === 8){
        perimeterArray.push([y,x]);
      }
    }
  }
  mapArray[4][4] = "<span id='player'>@<span>"
}

function drawMap() {
  $("#main_con").text("");
  for(y = 0; y < 9; ++y){
    for(x = 0; x < 9; ++x){
      if(mapArray[y][x] === "#"){
        $("#main_con").append("<span id='block'>" + mapArray[y][x] + "<span>");
      }else{
        $("#main_con").append(mapArray[y][x]);
      }
    }
  $("#main_con").append("<br>");
  }
}

var drawline = function(x0,y0,x1,y1){
	var tmp;
	var steep = Math.abs(y1-y0) > Math.abs(x1-x0);
  if(steep){
  	//swap x0,y0
  	tmp=x0; x0=y0; y0=tmp;
    //swap x1,y1
    tmp=x1; x1=y1; y1=tmp;
  }

  var sign = 1;
	if(x0>x1){
    sign = -1;
    x0 *= -1;
    x1 *= -1;
  }
  var dx = x1-x0;
  var dy = Math.abs(y1-y0);
  var err = ((dx/2));
  var ystep = y0 < y1 ? 1:-1;
  var y = y0;

  for(var x=x0;x<=x1;x++){
  	if(!(steep ? plot(y,sign*x) : plot(sign*x,y))) return;
    err = (err - dy);
    if(err < 0){
    	y+=ystep;
      err+=dx;
    }

  }
}

var plot = function(x,y){
	console.log("X: " + x + " Y: " + y);
  console.log("Element: " + mapArray[4+x][4+y])
  if(mapArray[playerX+x][playerY+y] !== "#"){
    mapArray[playerX+x][playerY+y] = "<span id='line'>^</span>"
    return true;
  }
  else{
    return false;
  }
}

function checkSight(offset) {
  for(var i = 0; i < perimeterArray.length ; ++i){
    drawline(0,0,perimeterArray[i][1] - offset,perimeterArray[i][0] - offset);
    drawMap();
  }
}

$(document).ready(function() {
  initializeMap();
  drawMap();
  checkSight(4);
  // drawline(0,0,-4,-4);
  drawMap();
})
