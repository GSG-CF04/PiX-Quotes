// get the device size before get the image

let width = "1440";

if (window.screen.width >= 1024) {
  width = "1920";
} else if (window.screen.width >= 768) {
  width = "2048";
}

let height = Math.round((width * window.screen.height) / window.screen.width);

async function generateRandomImageAndQuote() {
  // Get an image according to device size and store it's URL in the locaStorage with the key (BG)

  await fetch(`https://picsum.photos/${width}/${height}`)
    .then((res) => {
      localStorage.setItem("BG", res.url);
    })
    .catch((err) => err);

  //  Generate Random Number
  function generateRanodmNum(max) {
    return Math.floor(Math.random() * max);
  }

  // Get random quote or what the user inserted (if he did) then store it in the localStorage with the key of (quote)

  let txt = "";

  await fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((res) => {
      let quoteInput = document.getElementById("quote-input");

      if (quoteInput.value.length != 0) {
        txt = quoteInput.value;
      } else {
        txt = res[generateRanodmNum(res.length)].text;
      }
      localStorage.setItem("quote", txt);
    })
    .catch((err) => err);

  // create random ID for every wallpaper

  let id = new Date().valueOf();
  localStorage.setItem("id", id);

  location.href = "download.html";
}
