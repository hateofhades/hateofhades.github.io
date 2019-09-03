$(document).ready(function() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  var circles = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  generateCircle(50);
  draw();
  animateCircles();

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

      circles.push(circle);

    }
  }

  function animateCircles() {
    for(i=0; i<circles.length; i++) {
      var chooseDirection = Math.round(Math.random());

      if(!circles[i][5]) {
        var vx = Math.random() * 3 * Math.pow(-1, chooseDirection);
        var vy = Math.random() * 3 * Math.pow(-1, chooseDirection);

        circles[i][3] = vx;
        circles[i][4] = vy;
        circles[i][0] += vx;
        circles[i][1] += vy;


        circles[i][5] = Math.floor(200 + Math.random() * 200);
      } else {
        circles[i][5] -= 1;
        circles[i][0] += circles[i][3];
        circles[i][1] += circles[i][4];
      }

      if(circles[i][0] > canvas.width || circles[i][1] > canvas.height || circles[i][1] < 0 || circles[i][0] < 0) {
        circles[i][5] = 0;
        i -= 1;
      }
    }

    draw();
    setTimeout(function(){ animateCircles(); }, 39);
  }

  window.addEventListener('resize', resizeCanvas, false);

  $(window).click(function(e) {
    if(circles.length > 70) {
      circles.splice(Math.floor(Math.random() * circles.length), 1);
      console.log("Deleting a circle");
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

    for(var i=0; i < circles.length; i++) { //Draw a black circle
      context.beginPath();
      context.arc(circles[i][0], circles[i][1], circles[i][2], 0, 2 * Math.PI);
      context.fillStyle="#000000";
      context.fill();
      context.stroke();
    }
  }
});
