const body = document.querySelector("body")
const abstractBtn = document.getElementById("abstract-btn");
const natureBtn = document.getElementById("nature-btn");
const cosmoBtn = document.getElementById("cosmo-btn");
const minimalBtn = document.getElementById("minimal-btn");
abstractBtn.addEventListener("click", buttonName)
natureBtn.addEventListener("click", buttonName)
cosmoBtn.addEventListener("click", buttonName)
minimalBtn.addEventListener("click", buttonName)


function buttonName(event) {
    localStorage.setItem('imageCategory', event.target.textContent)
    location.href = 'category.html'
}



// choose a screen the user is using 
let screenType = "phone";

if (window.screen.width >= 1024) {
    screenType = "desktop"
}
else if (window.screen.width >= 768) {
    screenType = "tablet"
}
const cards = document.createElement('div')
cards.setAttribute('class', 'cards')
body.appendChild(cards)

//random image from api
fetch(`https://api.codetabs.com/v1/proxy/?quest=https://imsea.herokuapp.com/api/1?q=hd%20${screenType}%20wallpapers`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < 12; i += 2) {
            const figure = document.createElement("figure");
            cards.appendChild(figure);
            figure.classList.add("images")
            const image = document.createElement("img")
            figure.appendChild(image)
            image.classList.add("randomImage")
            image.src = data.results[i];
            figure.addEventListener("click", download)
        }

    })
// save image url in loacalstorage and move to download page
function download(event) {
    localStorage.setItem('imageUrl', event.target.src)
    location.href = 'download.html'
}
