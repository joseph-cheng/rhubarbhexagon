window.onload = init;

var prev_x = -1;
var prev_y = -1;
var distance_travelled = 0;

function calc_rgb(distance)
{
  var r_sin = Math.sin(distance / 500 - Math.PI/2);
  var g_sin = Math.sin(distance / 700 - Math.PI/2);
  var b_sin = Math.sin(distance / 900 - Math.PI/2);
  return [
    (r_sin + 1 /2) * 75,
    (g_sin + 1 /2) * 75,
    (b_sin + 1 /2) * 75,
  ];
}

function calc_inverse_rgb(distance)
{
  var rgb = calc_rgb(distance);
  return [255 - rgb[0], 255 - rgb[1], 255 - rgb[2]];
}

function init() {
  document.onmousemove = handleMouseMove;

  var tl = document.querySelector(".top-level");
  var width = window.innerWidth;
  var height = window.innerHeight;
  var line_size = 75;
  for (x = 0; x < width / line_size; x++) {
    for (y = 0; y < height / line_size; y++) {
      var line = document.createElement("div");
      line.style.left = x * line_size + "px";
      line.style.top = y * line_size + "px";
      line.style.height = line_size + "px";
      line.className = "line";
      line.angle = 0;
      tl.appendChild(line);
    }
  }


  setInterval(wiggle, 16);

}
function handleMouseMove(event) {
  var eventDoc, doc, body;

  event = event || window.event; // IE-ism

  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX = event.clientX +
      (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
      (doc && doc.clientLeft || body && body.clientLeft || 0);
    event.pageY = event.clientY +
      (doc && doc.scrollTop || body && body.scrollTop || 0) -
      (doc && doc.clientTop || body && body.clientTop || 0);
  }

  if (prev_x != -1) {
    distance_travelled += Math.sqrt((prev_x - event.pageX) ** 2 + (prev_y - event.pageY) ** 2);
  }
  prev_x = event.pageX;
  prev_y = event.pageY;


  var lines = document.querySelectorAll(".line");

  lines.forEach(line => {
    var bb = line.getBoundingClientRect();
    var center = {
      x: bb.left + bb.width / 2,
      y: bb.top + bb.height / 2,
    };
    var angle = Math.atan2(event.pageX - center.x, -(event.pageY - center.y)) * (180 / Math.PI);
    var distance = Math.sqrt((center.x - event.pageX)**2 + (center.y - event.pageY)**2);
    line.style.width = 10 - distance / 100 + "px";

    line.angle = angle;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.background = "rgba(" + calc_rgb(distance_travelled).join(",") + ",1)";
    document.body.style.background = "rgba(" + calc_inverse_rgb(distance_travelled).join(",") + ",1)";
  });
}

function wiggle() {
  var lines = document.querySelectorAll(".line");

  lines.forEach(line => {
    var angle = line.angle + (Math.random() - 0.5) * 2;;
    line.style.transform = `rotate(${angle}deg)`;
  });
}



