// get the device size before get the image

let width = "1440";
let height = "2960";

if (window.screen.width >= 1024) {
  width = "1920";
  height = "1080";
} else if (window.screen.width >= 768) {
  width = "2048";
  height = "1536";
} else {
  width = "1440";
  height = "2960";
}

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
        txt = res[generateRanodmNum(res.length - 1)].text;
      }
      console.log(txt);
      localStorage.setItem("quote", txt);
    })
    .catch((err) => err);

  location.href = "download.html";
}
