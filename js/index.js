const abstractBtn = document.getElementById("abstract-btn");
const natureBtn = document.getElementById("nature-btn");
const cosmoBtn = document.getElementById("cosmo-btn");
const minimalBtn = document.getElementById("minimal-btn");
abstractBtn.addEventListener("click", buttonName)
natureBtn.addEventListener("click", buttonName)
cosmoBtn.addEventListener("click", buttonName)
minimalBtn.addEventListener("click",buttonName)


function buttonName(event){
    localStorage.setItem('name', event.target.textContent)
    location.href = 'category.html'
    }
    