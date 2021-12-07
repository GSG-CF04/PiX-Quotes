let cardsContainer = document.getElementById("cards-container");
let favoritesList = JSON.parse(localStorage.getItem("favorites"));

let mobileFavoriteList = favoritesList.filter((item) => {
  return item[3] == "M";
});

let tabletFavoriteList = favoritesList.filter((item) => {
  return item[3] == "T";
});

let desktopFavoriteList = favoritesList.filter((item) => {
  return item[3] == "D";
});

function showMobileFavorites() {
  cardsContainer.innerHTML = "";

  for (i = 0; i < mobileFavoriteList.length; i++) {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    cardDiv.setAttribute("id", mobileFavoriteList[i][2]);
    cardDiv.setAttribute(
      "onclick",
      `navigateToDownload(${mobileFavoriteList[i][2]})`
    );
    let cardImage = document.createElement("img");
    cardImage.setAttribute("class", "card-img");
    cardImage.src = mobileFavoriteList[i][0];

    let cardQuote = document.createElement("p");
    cardQuote.setAttribute("class", "card-quote");
    cardQuote.textContent = mobileFavoriteList[i][1];

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardQuote);
    cardsContainer.prepend(cardDiv);
  }
}

function showTabletFavorites() {
  cardsContainer.innerHTML = "";

  for (i = 0; i < tabletFavoriteList.length; i++) {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    cardDiv.setAttribute("id", tabletFavoriteList[i][2]);
    cardDiv.setAttribute(
      "onclick",
      `navigateToDownload(${tabletFavoriteList[i][2]})`
    );
    let cardImage = document.createElement("img");
    cardImage.setAttribute("class", "card-img");
    cardImage.src = tabletFavoriteList[i][0];

    let cardQuote = document.createElement("p");
    cardQuote.setAttribute("class", "card-quote");
    cardQuote.textContent = tabletFavoriteList[i][1];

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardQuote);
    cardsContainer.prepend(cardDiv);
  }
}

function showDesktopFavorites() {
  cardsContainer.innerHTML = "";

  for (i = 0; i < desktopFavoriteList.length; i++) {
    let cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    cardDiv.setAttribute("id", desktopFavoriteList[i][2]);
    cardDiv.setAttribute(
      "onclick",
      `navigateToDownload(${desktopFavoriteList[i][2]})`
    );
    let cardImage = document.createElement("img");
    cardImage.setAttribute("class", "card-img");
    cardImage.src = desktopFavoriteList[i][0];

    let cardQuote = document.createElement("p");
    cardQuote.setAttribute("class", "card-quote");
    cardQuote.textContent = desktopFavoriteList[i][1];

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardQuote);
    cardsContainer.prepend(cardDiv);
  }
}

if (window.screen.width >= 1024) {
  showDesktopFavorites();
} else if (window.screen.width >= 768) {
  showTabletFavorites();
} else {
  showMobileFavorites();
}

function navigateToDownload(id) {
  let index = favoritesList.findIndex((wallpaper) => wallpaper[2] == id);

  localStorage.setItem("BG", favoritesList[index][0]);
  localStorage.setItem("quote", favoritesList[index][1]);

  location.href = "download.html";
}

let desktopFooter = document.querySelector("#desktop");
let tabletFooter = document.querySelector("#tablet");
let mobileFooter = document.querySelector("#mobile");

let desktopNav = document.querySelector("#desktop-nav");
let tabletNav = document.querySelector("#tablet-nav");
let mobileNav = document.querySelector("#mobile-nav");

function Tabs(tabNum) {
  if (tabNum === 1) {
    showMobileFavorites();

    desktopNav.style = "color: black !important; background-color: #b9b9b9;";
    tabletNav.style = "color: black !important; background-color: #b9b9b9;";
    mobileNav.style = "color: white !important; background-color: #b96a6a;";

    desktopFooter.style =
      "color: white !important; background-color: transparent;";
    tabletFooter.style =
      "color: white !important; background-color: transparent;";
    mobileFooter.style = "color: black !important; background-color: White;";
  }
  if (tabNum === 2) {
    showTabletFavorites();

    desktopNav.style = "color: black !important; background-color: #b9b9b9;";
    tabletNav.style = "color: white !important; background-color: #b96a6a;";
    mobileNav.style = "color: black !important; background-color: #b9b9b9;";

    desktopFooter.style =
      "color: white !important; background-color: transparent;";
    tabletFooter.style = "color: black !important; background-color: White;";
    mobileFooter.style =
      "color: white !important; background-color: transparent;";
  }
  if (tabNum === 3) {
    showDesktopFavorites();

    desktopNav.style = "color: white !important; background-color: #b96a6a;";
    tabletNav.style = "color: black !important; background-color: #b9b9b9;";
    mobileNav.style = "color: black !important; background-color: #b9b9b9;";

    desktopFooter.style = "color: black !important; background-color: White;";
    tabletFooter.style =
      "color: white !important; background-color: transparent;";
    mobileFooter.style =
      "color: white !important; background-color: transparent;";
  }
}
