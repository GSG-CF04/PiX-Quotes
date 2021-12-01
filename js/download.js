// Show and hide the regenerate buttons

let secondary_btns = document.getElementsByClassName("secondary-btns")[0];

let re_btn = document.getElementById("regenerate-btn");

re_btn.addEventListener("click", showHideFun);

function showHideFun() {
  if (secondary_btns.style.display == "none") {
    secondary_btns.style.display = "block";
  } else secondary_btns.style.display = "none";
}
