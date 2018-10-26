function distancetoClicks(dist) { //in mm
  //wheel circum: 450mm, clicks per rotation:360
  return (dist / 450) * 360;
}

function turnbut(dir){
 var angle = document.getElementById("ang").value;
 var radius = document.getElementById("rad").value;
 turn(dir,parseInt(radius),parseInt(angle));
}

function turn(dir, turnRad, deg) {
  var c = document.getElementById("outvas");
  var ctx = c.getContext("2d");
  var offset = 0;
  var robotWidth = 28;
  offset = robotWidth / 2;
  var leftwheelDist = 2 * Math.PI * (turnRad + offset) * (deg / 360);
  var rightwheelDist = 2 * Math.PI * (turnRad - offset) * (deg / 360);
  var lclicks = distancetoClicks(leftwheelDist);
  var rclicks = distancetoClicks(rightwheelDist);
  var ldperc = leftwheelDist / lclicks;
  var rdperc = rightwheelDist / rclicks;
  var clickmax = Math.max(lclicks, rclicks);
  var pathmax = Math.max(leftwheelDist, rightwheelDist);
  var path = [pathmax];
  var offx = 300;
  var offy = 200;
  document.getElementById("notes").innerHTML = "Path Length:" + pathmax.toFixed(0);
  
  ctx.moveTo(offx,offy);
  for (var i = 0; i < pathmax; i+=10) {
    var llen = (leftwheelDist / pathmax) * i;
    var rlen = (rightwheelDist / pathmax) * i;
    var clen = Math.max(llen,rlen) - Math.abs(llen-rlen);
    var langle = llen / (turnRad+offset);// * 180 / Math.PI;
    var rangle = rlen / (turnRad-offset);
    var cangle = clen / (turnRad-offset);
    //left wheel
    var lya = Math.cos(langle) * (turnRad+offset); 
    var ly = Math.sin(langle) * (turnRad+offset);
    var lx0 = -(turnRad+offset) + lya; //left
    var lx1 = (turnRad+offset) - lya; //right
    //right wheel 
    var rya = Math.cos(rangle) * (turnRad-offset); 
    var ry = Math.sin(rangle) * (turnRad-offset);
    var rx0 = -(turnRad+offset) + rya; //left
    var rx1 = (turnRad+offset) - rya; //right
    //centre
    var cya = Math.cos(cangle) * (turnRad); 
    var cy = Math.sin(cangle) * (turnRad);
    var cx0 = -(turnRad+offset) + cya -2 ; //left
    var cx1 = (turnRad+offset) - cya -2; //right
    
    var lx = 0;
    var rx = 0;
    var cx = 0;
    if (dir == 1) {
      lx = lx0;
      rx = rx0;
      cx = cx0;
      } else {
      lx = lx1;
      rx = rx1;
      cx = cx1;
     }
    path[i] = {
      "lclick": distancetoClicks(llen),
      "rclick": distancetoClicks(rlen),
      "lx": lx,
      "ly": ly,
      "rx":rx,
      "ry":ry,
      "cx":cx,
      "cy":cy,
      "angle": cangle * 180 / Math.PI
    };
    ctx.beginPath();
    ctx.strokeStyle="#0000FF";
    ctx.moveTo(rx+offx,offy-ry);
    ctx.arc(rx+offx-2,offy-ry,2,0,2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.strokeStyle="#00ff00";
    ctx.moveTo(lx+offx,offy-ly);
    ctx.arc(lx+offx-2,offy-ly,2,0,2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.strokeStyle="#ff0000";
    if (dir == 1) {
      ctx.moveTo(cx+offx,offy-cy);
      ctx.arc(cx+offx,offy-cy,1,0,2*Math.PI);
    }else{
      ctx.moveTo(cx+offx,offy-cy);
      ctx.arc(cx+offx,offy-cy,1,0,2*Math.PI);
    }
    ctx.closePath();
    ctx.stroke();
    
    document.getElementById("output").innerHTML += 
    "L:" + distancetoClicks(llen).toFixed(2) + "&nbsp;&nbsp;&nbsp; R:" + distancetoClicks(rlen).toFixed(2) + "&nbsp;&nbsp;&nbsp; &thetasym;:" + (cangle* 180 / Math.PI).toFixed(2) + "<br/>";
  }
}

function showpath(){

}

function clears(){
 document.getElementById("notes").innerHTML = "";
 document.getElementById("output").innerHTML ="";
 //document.getElementById("output").innerHTML = "Moo";
 var c = document.getElementById("outvas");
 var ctx = c.getContext("2d");
 ctx.clearRect(0,0,c.width,c.height);
}
