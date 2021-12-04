// Show and hide the regenerate buttons

let secondary_btns = document.getElementsByClassName("secondary-btns")[0];

let re_btn = document.getElementById("regenerate-btn");

re_btn.addEventListener("click", showHideFun);

function showHideFun() {
  if (secondary_btns.style.display == "none") {
    secondary_btns.style.display = "block";
  } else secondary_btns.style.display = "none";
}

// Create a canvas when the page loads

function CreateCanvasWithImageAndQuote() {
  // set the canvas size according to the device screen size

  let width = "1440";

  if (window.screen.width >= 1024) {
    width = "1920";
  } else if (window.screen.width >= 768) {
    width = "2048";
  }

  height = Math.round((width * window.screen.height) / window.screen.width);

  let img = new Image();
  img.src = localStorage.getItem("BG");
  img.crossOrigin = "Anonymous";

  // create new canvas with the image as a background and the quote from the localStorage on it

  let newcanvas = document.createElement("canvas");
  newcanvas.setAttribute("id", "canvas");
  newcanvas.setAttribute("width", width);
  newcanvas.setAttribute("height", height);
  document.body.prepend(newcanvas);
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  img.onload = drawImageAndQuoteInsideCanvas.bind(null, img, ctx);
}

// The function which draws the image and the text on the canvas

function drawImageAndQuoteInsideCanvas(img, ctx) {
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

  canvas = ctx.canvas;

  let hRatio = canvas.width / img.width;
  let vRatio = canvas.height / img.height;
  let ratio = Math.min(hRatio, vRatio);
  let centerShift_x = (canvas.width - img.width * ratio) / 2;
  let centerShift_y = (canvas.height - img.height * ratio) / 2;
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
  let lineheight = 50;
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

CreateCanvasWithImageAndQuote();

// regenerate only the image

async function reGenerateImage() {
  // set the width and the size for the new photo

  let width = "1440";

  if (window.screen.width >= 1024) {
    width = "1920";
  } else if (window.screen.width >= 768) {
    width = "2048";
  }
  height = Math.round((width * window.screen.height) / window.screen.width);

  await fetch(`https://picsum.photos/${width}/${height}`)
    .then((res) => {
      localStorage.setItem("BG", res.url);
    })
    .catch((err) => err);

  // generate new ID
  let id = new Date().valueOf();
  localStorage.setItem("id", id);

  canvas.remove(); // remove the old canvas
  CreateCanvasWithImageAndQuote(); // build new canvas
}

// Generate random number

function generateRanodmNum(max) {
  return Math.floor(Math.random() * max);
}

// regenerate only the quote

async function reGenerateQuotation() {
  await fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((res) => {
      localStorage.setItem("quote", res[generateRanodmNum(res.length)].text);
    })
    .catch((err) => err);

  // generate new ID
  let id = new Date().valueOf();
  localStorage.setItem("id", id);

  canvas.remove(); // remove the old canvas
  CreateCanvasWithImageAndQuote(); // build new canvas
}

//  regenerate both the image and the quote

function reGenerateAll() {
  // generate new ID
  let id = new Date().valueOf();
  localStorage.setItem("id", id);

  reGenerateImage();
  reGenerateQuotation();
}

function saveToDevice() {
  let quote = localStorage.getItem("quote");
  let arrayOfQuoteWords = quote.split(" ");
  let imageURL = localStorage.getItem("BG");
  let imageId = imageURL.substring(
    imageURL.indexOf(".jpg"),
    imageURL.lastIndexOf("/") + 1
  );

  let a = document.createElement("a");
  document.body.appendChild(a);
  a.href = canvas.toDataURL("image/jpeg", 1.0);
  a.download = `${arrayOfQuoteWords[0]} ${arrayOfQuoteWords[1]} ${arrayOfQuoteWords[2]} ${imageId}`;
  a.click();
  document.body.removeChild(a);
}

function bookmark() {
  if (localStorage.getItem("favorites") == null) {
    localStorage.setItem("favorites", "[]");
  }

  let img = localStorage.getItem("BG");
  let quote = localStorage.getItem("quote");
  let id = localStorage.getItem("id");

  let list = JSON.parse(localStorage.getItem("favorites"));
  let index = list.findIndex((item) => item.includes(id));

  if (index != null && index >= 0) {
    list.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(list));
    ShowSnackBar("Removed from the bookmarkes");
  } else {
    list.push([img, quote, id]);
    localStorage.setItem("favorites", JSON.stringify(list));
    ShowSnackBar("Bookmarked");
  }
}

function ShowSnackBar(msg) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // show my message
  x.textContent = msg;
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
