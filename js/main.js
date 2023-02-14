const elForm = document.querySelector(".js_form");
const elInput = document.querySelector(".js_input");
const elTemp = document.querySelector(".form_temp").content;
const elList = document.querySelector(".list");
const filmSelect = document.querySelector("[film-select]");
const dataProsmotr = document.querySelector("[data-prosmotr]");
const newFragment = new DocumentFragment();

let shoppingMovies = [];

//Ganres - jarnlarni selectlarga chiqazish
function selectGenerator() {
  let arr = [];
  kinole.forEach((v) => {
    arr.push(v.genres);
  });
  
  let flattedArr = arr.flat(Infinity);
  let unique = new Set([...flattedArr]);
  
  unique.forEach((janr) => {
    const option = document.createElement("option");
    option.value = janr;
    option.textContent = janr;
    filmSelect.append(option);
  });
}

//modalni render qilish
function modalRender() {
  const mBody = document.querySelector(".modal-body");
  let res = "";
  shoppingMovies?.map((kino, index) => {
    console.log(index)
    if (index < 1) {
      res += `
      <img width="100" src="${kino.poster}">
      <p>${kino.title}</p>
      <span class="index-box">${index+1}</span>
      `;
    } else if (index + 1 > 1) {
      false
    }
  });
  mBody.innerHTML = res;
}

//Api dagi malumotni render qilish
function render(data) {
  elList.innerHTML = null;
  data.forEach((kino) => {
    const elClone = elTemp.cloneNode(true);
    
    elClone.querySelector(".card-img-top").src = kino.poster;
    elClone.querySelector(".card-title").textContent = kino.title;
    elClone.querySelector(".card-text").textContent =
    kino.overview.slice(0, 50) + "...";
    
    const hours = Math.floor(+kino.filmLength / 60);
    const minutes = +kino.filmLength % 60;
    elClone.querySelector("#min").textContent = `${hours}h, ${minutes}min`;
    elClone.querySelector("#btn").addEventListener("click", () => {
      shoppingMovies.push(kino);
      console.log(shoppingMovies);
      modalRender();
    });
    newFragment.appendChild(elClone);
  });
  
  elList.appendChild(newFragment);
}

//Input search qilish
elInput.addEventListener("input", function () {
  const searchQuery = new RegExp(elInput.value, "gi");
  console.log(searchQuery);
  const search = kinole.filter((kino) => {
    return String(kino.title).match(searchQuery);
  });
  render(search);
});

//select orqali search
filmSelect.addEventListener("input", function () {
  const searchQuery = new RegExp(filmSelect.value, "gi");
  console.log(searchQuery);
  const search = kinole.filter((kino) => {
    return String(kino.genres).match(searchQuery);
  });
  render(search);
});

//datalistga prosmotri kop bo'lgan kinolarni chiqazish
kinole.forEach((v) => {
  if (v.prosmotr > 1000) {
    const option = document.createElement("option");
    option.value = v.title;
    option.textContent = v.title;
    dataProsmotr.append(option);
  }
});

render(kinole);
selectGenerator();
modalRender();
