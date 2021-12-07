// get the user's device-screen size

let myDevice = "M";

if (window.screen.width >= 1024) {
  myDevice = "D";
} else if (window.screen.width >= 768) {
  myDevice = "T";
}

// fetching images from api according to categories

let userCategory = localStorage.getItem("imageCategory");

let category = "nature";
if (userCategory == "Cosmo") {
  category = "cosmo";
} else if (userCategory == "Minimal") {
  category = "minimal";
} else if (userCategory == "Abstract") {
  category = "abstract";
}

// show category name in html page

let DisplayCategory = document.getElementById("display-category");
DisplayCategory.textContent = category.toUpperCase();

const body = document.querySelector("body");
const cards = document.createElement("div");
cards.setAttribute("class", "my-collection");
body.appendChild(cards);

// get image from api
fetch(
  `https://imageforfinal.000webhostapp.com/api/api.php?cate=${category}&dev=${myDevice}`
)
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < 12 && i < data.length; i++) {
      const dev = document.createElement("div");
      cards.appendChild(dev);
      dev.classList.add("images");
      const image = document.createElement("img");
      dev.appendChild(image);
      image.classList.add("my-imgs");
      image.src = data[i].img;
      dev.addEventListener("click", download);
    }
  });

// save image url in loacalstorage and move to download page
function download(event) {
  localStorage.setItem("BG", event.target.src);
  localStorage.setItem("quote", "");
  location.href = "download.html";
}
