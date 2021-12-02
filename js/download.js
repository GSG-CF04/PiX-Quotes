// Show and hide the regenerate buttons

let secondary_btns = document.getElementsByClassName("secondary-btns")[0];

let re_btn = document.getElementById("regenerate-btn");

re_btn.addEventListener("click", showHideFun);

function showHideFun() {
  if (secondary_btns.style.display == "none") {
    secondary_btns.style.display = "block";
  } else secondary_btns.style.display = "none";
}

// set the canvas size according to the device screen size
let width = "1440";

if (window.screen.width >= 1024) {
  width = "1920";
} else if (window.screen.width >= 768) {
  width = "2048";
}

let height = Math.round((width * window.screen.height) / window.screen.width);

// get the img URL from the localStorage

var img = new Image();
img.src = localStorage.getItem("BG");
img.crossOrigin = "Anonymous";

// create canvas with the image as a background and the quote from the localStorage on it

var canvas = document.getElementById("canvas");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
var ctx = canvas.getContext("2d");
img.onload = drawImageAndQuote.bind(null, img, ctx);

// Split the quote from localStorage into multiple lines (3 words length lines)

let wordsArray = localStorage.getItem("quote").split(" ");
let QuoteLines = [];

for (i = 0; i < wordsArray.length; i += 3) {
  QuoteLines.push(
    `${wordsArray[i]} ${wordsArray[i + 1] ? wordsArray[i + 1] : ""} ${
      wordsArray[i + 2] ? wordsArray[i + 2] : ""
    }`.trim()
  );
}


console.log(QuoteLines)
// The function which draws the image and the text on the canvas

function drawImageAndQuote(img, ctx) {
  canvas = ctx.canvas;

  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 17;
  var lineheight = 50;
  ctx.font = "170px Fearlessly";
  ctx.lineWidth = 7;
  let offset = 750;

  if (window.screen.width >= 1024) {
    ctx.font = "60px Fearlessly";
    lineheight = 60;
    ctx.shadowBlur = 5;
    ctx.lineWidth = 7;
    offset = 250;
  } else if (window.screen.width >= 768) {
    ctx.font = "100px Fearlessly";
    lineheight = 100;
    ctx.shadowBlur = 5;
    ctx.lineWidth = 7;
    offset = 350;
  } else {
    ctx.font = "170px Fearlessly";
    lineheight = 150;
    ctx.lineWidth = 7;
    offset = 750;
  }

  for (i = 0; i < QuoteLines.length; i++) {
    ctx.strokeText(
      QuoteLines[i],
      canvas.width / 2,
      canvas.height / 2 + i * lineheight - offset
    );
    ctx.fillText(
      QuoteLines[i],
      canvas.width / 2,
      canvas.height / 2 + i * lineheight - offset
    );
  }
}
