window.onload = init;
function init()
{
  document.onmousemove = handleMouseMove;

  function generate_lines() {
    var tl = document.querySelector(".top-level");
    var line_size = 75;
    var width = window.innerWidth;
    var height = window.innerHeight;
    for (x = 0; x < width / line_size; x++) {
      for (y = 0; y < height / line_size; y++) {
        var line = document.createElement("div");
        line.style.left = x * line_size + "px";
        line.style.top = y * line_size + "px";
        line.style.height = line_size + "px";
        line.className = "line";
        tl.appendChild(line);
      }
    }
  }

  generate_lines();

  setInterval(wiggle, 30);

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

  var lines = document.querySelectorAll(".line");

  lines.forEach(line => {
    var bb = line.getBoundingClientRect();
    var center = {
      x: bb.left + bb.width/2,
      y: bb.top + bb.height/2,
    };
    var angle = Math.atan2(event.pageX - center.x, -(event.pageY - center.y)) * (180 / Math.PI);
    line.angle = angle;
    line.style.transform = `rotate(${angle}deg)`;
  });
}

function wiggle()
{
  var lines = document.querySelectorAll(".line");

  lines.forEach(line => {
    line.style.tra
    var angle = line.angle + (Math.random() - 0.5) * 10;;
    line.style.transform = `rotate(${angle}deg)`;
  });
}



