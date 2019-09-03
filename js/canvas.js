$(document).ready(function() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  var circles = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //When the user opens the browser, we generate 50 random circles and we start drawing and animating them.
  generateCircle(50);
  draw();
  animateCircles();

  //Functions for later. Balls will change color
  /*function mixColors(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
  }

  function hexToRGB(hex) {
    var res = hex.match(/[a-f0-9]{2}/gi);
    return res && res.length === 3 ? res.map(function(v) {return parseInt(v, 16)}) : null;
  }*/

  function generateCircle(howMany, x = 0, y = 0) {
    for(i=0; i<howMany; i++) {//Generate a random circle somwhere in the canvas and of a range from 1-5 pixels.
      if(x == 0)
        var circleX = Math.random() * canvas.width;
      else
        var circleX = x;

      if(y == 0)
        var circleY = Math.random() * canvas.height;
      else
        var circleY = y;

      var circleR = 1 + Math.random() * 10;

      var circle = [];
      circle.push(circleX);
      circle.push(circleY);
      circle.push(circleR);
      circle.push(0);
      circle.push(0);
      circle.push(0);

      //Add the circle to the circles array so we can access it later.
      circles.push(circle);

    }
  }

  function animateCircles() {
    for(i=0; i<circles.length; i++) {
      //Instead of choosing the same direction, we could choose random directions
      //var chooseDirection = Math.round(Math.random());

      //If the ball has traveled for circles[i][5] frames (Disabled) or if it hit the edge (Enabled) get a new trajectory for circles[i][5] frames.
      if(!circles[i][5]) {

        //vx = x-axis speed and direction
        //vy = y-axis speed and direction
        var vx = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
        var vy = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));

        //Save the speed and direction for x and y axis and add it to the current location for x and y axis.
        circles[i][3] = vx;
        circles[i][4] = vy;
        circles[i][0] += vx;
        circles[i][1] += vy;

        circles[i][5] = Math.floor(200 + Math.random() * 200);
      } else { //If it didnt hit the edge or if still has frames to play, just move the location with the last speed and direction.
        //circles[i][5] -= 1;
        circles[i][0] += circles[i][3];
        circles[i][1] += circles[i][4];
      }

      //If it hit the edge get a new speed and direction
      if(circles[i][0] > canvas.width || circles[i][1] > canvas.height || circles[i][1] < 0 || circles[i][0] < 0) {
        circles[i][5] = 0;
        i -= 1;
      }
    }

    //Draw the new locations and animate again in 40 miliseconds (roughly 25 fps).
    draw();
    setTimeout(function(){ animateCircles(); }, 40);
  }

  window.addEventListener('resize', resizeCanvas, false);

  //When the user clicks anywhere generate a new circle where the user clicked, and if there are more than 70 circles, delete one at random.
  $(window).click(function(e) {
    if(circles.length > 70) {
      circles.splice(Math.floor(Math.random() * circles.length), 1);
    }

    generateCircle(1, e.pageX, e.pageY);
    draw();
  });

  function resizeCanvas() { //If the user resizes the window, we regenerate the circles.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    circles = [];
    generateCircle(50);

    draw();
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //Clear the canvas

    for(var i=0; i < circles.length; i++) { //Start drawing each circle
      context.beginPath();
      context.arc(circles[i][0], circles[i][1], circles[i][2], 0, 2 * Math.PI);
      context.fillStyle="#000000";
      context.fill();
      context.stroke();
    }
  }
});
