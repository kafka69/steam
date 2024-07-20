const url = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games";

// get games data from url
async function getData() {
  try {
    let games;
    for (let i = 1; i < 5; i++) {
      url_index = url + `/?page=${i}`;
      let response = await fetch(url_index);
      let data = await response.json();
      if (!games) {
        games = data.data;
      } else {
        games = games.concat(data.data);
      }
    }
    return games;
  } catch (error) {
    console.error(error);
  }
}

// render 40 games
async function render40Games() {
  const games_container = document.querySelector(".games_container");
  const data = await getData();
  if (!data) {
    console.log("not loaded");
    return;
  }
  games_container.innerHTML = "";
  data.forEach((item) => {
    // console.log(item._id)
    let header_img = item.header_image;
    let badges = item.genres
      .map((badge) => {
        let bs = `<span class="text-xs bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
        ${badge}
      </span>`;
        return bs;
      })
      .join("");
    card = `<div class="card flex flex-col rounded-xl"
        onclick ="showGameInfo('${String(item.appid)}')">
        <img class="w-full h-28 rounded-t-xl" src=${header_img} alt="Image Description">
        <div class="md:p-3 card-bottom rounded-b-xl">
          <h3 class=" text-lg font-bold text-white dark:text-white mb-2 truncate">
            ${item.name}
          </h3>
          <div class="flex items-center justify-end">
            <div class="bg-green-500 text-white px-2 py-2">
              -25%
            </div>
            <div class="text-right text-xs bg-gray-700 px-5 py-1">
              <div class="text-gray-500 line-through">$20.00</div>
              <div class="text-white dark:text-white">$${item.price}</div>
            </div>
          </div>
        <div class="tooltipdiv flex flex-col justify-center items-center">
        <div class="arrow"></div>
        <div>${item.name}</div>
        <img src=${header_img} class="tooltip-img max-w-36" />
        <div class="text-left">
        <p>Overall user reviews:</p>
        <p><span class="text-blue-800">Positive </span>(${
          item.positive_ratings
        })</p>
        <p>User tags</p>
        <div class="w-full overflow-hidden">${badges}</div>
        </div>
        
        </div>`;
    games_container.innerHTML += card;
  });
}

// render 10 games
async function render10Games() {
  const games_container = document.querySelector(".games_container");
  const data = await getData();
  if (!data) {
    console.log("not loaded");
    return;
  }
  games_container.innerHTML = "";
  for (let i = 0; i < data.length && i < 10; i++) {
    const item = data[i];
    const header_img = item.header_image;
    let badges = item.genres
      .map((badge) => {
        let bs = `<span class="text-xs bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
        ${badge}
      </span>`;
        return bs;
      })
      .join("");
    const card = `<div class="card flex flex-col rounded-xl"
    onclick ="showGameInfo('${String(item.appid)}')">
    <img class="w-full h-28 rounded-t-xl" src=${header_img} alt="Image Description">
    <div class="md:p-3 card-bottom rounded-b-xl">
      <h3 class=" text-lg font-bold text-white dark:text-white mb-2 truncate">
        ${item.name}
      </h3>
      <div class="flex items-center justify-end">
        <div class="bg-green-500 text-white px-2 py-2">
          -25%
        </div>
        <div class="text-right text-xs bg-gray-700 px-5 py-1">
          <div class="text-gray-500 line-through">$20.00</div>
          <div class="text-white dark:text-white">$${item.price}</div>
        </div>
      </div>
    <div class="tooltipdiv flex flex-col justify-center items-center">
    <div class="arrow"></div>
    <div>${item.name}</div>
    <img src=${header_img} class="tooltip-img max-w-36" />
    <div class="text-left">
    <p>Overall user reviews:</p>
    <p><span class="text-blue-800">Positive </span>(${
      item.positive_ratings
    })</p>
    <p>User tags</p>
    <div class="w-full overflow-hidden">${badges}</div>
    </div>
    
    </div>`;
    games_container.innerHTML += card;
  }
}
render10Games();
// render40Games()
let moreGame = false;
const seeMoreBtn = document.querySelector(".see-more");
seeMoreBtn.addEventListener("click", () => {
  moreGame = !moreGame;
  if (moreGame) {
    render40Games();
  } else {
    render10Games();
  }
});

// showing the see more btn
function displaybtn(show) {
  let btn = document.querySelector(".see-more");
  if (!show) {
    btn.style.display = "none";
  } else {
    btn.style.display = "inline-flex";
  }
}

// get data of detailed game through api
async function getGameDetail(id) {
  try {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
// render the detailed game
function renderDetail(item) {
  displaybtn(false);
  const games_container = document.querySelector(".games_container");
  games_container.innerHTML = "";
  // render badges
  let badges_lim = 3;
  let badges = item.categories
    .map((badge) => {
      let bs = `<span class="text-xs bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
        ${badge}
      </span>`;
      if (badges_lim != 0) {
        badges_lim -= 1;
        return bs;
      }
      return ``;
    })
    .join("");
  badges += `<span class="text-xs bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">+</span>`;
  // get date
  const dateObj = new Date(item.release_date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;
  // render dev
  const developerName =
    item.developer.length > 1 ? item.developer[1] : item.developer[0];
  // render all the info
  const info = `<div class="container mt-10 flex justify-center content-center">
  <div class="square-bg"></div>
  <div class="">
    <img src="${item.header_image}" alt="Image Description" class="h-auto pt-10 pr-10">
  </div>
  <div class="w-1/3 p-4 text-white">
    <h2 class="text-lg font-bold mb-2">${item.name}</h2>
    <p class="mb-2">${item.description}</p>
    <p class="text-sm">RECENT REVIEWS: <span class="text-blue-700">Very Positive</span></p>
    <p class="text-sm">ALL REVIEWS: <span class="text-blue-700">Very Positive</span></p>
    <p class="text-sm">RELEASE DATE: <span class="text-blue-700">${formattedDate}</span></p>
    <p class="text-sm">DEVELOPER: <span class="text-blue-700">${item.developer[0]}</span></p>
    <p class="text-sm mb-2">PUBLISHER: <span class="text-blue-700">${developerName}</span></p>
    <div class="flex list-none">
      ${badges}
    </div>
  </div>
</div>`;
  games_container.innerHTML = info;
}
async function showGameInfo(item) {
  let gameDetail = await getGameDetail(item);
  if (!gameDetail) {
    console.log("not loaded");
    return;
  }
  renderDetail(gameDetail.data);
}
// general general
function renderGamesWthInput(input) {
  // displaybtn(true)
  let data = input;
  const games_container = document.querySelector(".games_container");
  if (!data) {
    console.log("not loaded");
    return;
  }
  console.log("clicked");
  games_container.innerHTML = "";
  console.log(data);
  data.forEach((item) => {
    let header_img = item.header_image;
    let badges = item.genres
      .map((badge) => {
        let bs = `<span class="text-xs bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
        ${badge}
      </span>`;
        return bs;
      })
      .join("");
    card = `<div class="card flex flex-col rounded-xl"
    onclick ="showGameInfo('${String(item.appid)}')">
    <img class="w-full h-28 rounded-t-xl" src=${header_img} alt="Image Description">
    <div class="md:p-3 card-bottom rounded-b-xl">
      <h3 class=" text-lg font-bold text-white dark:text-white mb-2 truncate">
        ${item.name}
      </h3>
      <div class="flex items-center justify-end">
        <div class="bg-green-500 text-white px-2 py-2">
          -25%
        </div>
        <div class="text-right text-xs bg-gray-700 px-5 py-1">
          <div class="text-gray-500 line-through">$20.00</div>
          <div class="text-white dark:text-white">$${item.price}</div>
        </div>
      </div>
    <div class="tooltipdiv flex flex-col justify-center items-center">
    <div class="arrow"></div>
    <div>${item.name}</div>
    <img src=${header_img} class="tooltip-img max-w-36" />
    <div class="text-left">
    <p>Overall user reviews:</p>
    <p><span class="text-blue-800">Positive </span>(${
      item.positive_ratings
    })</p>
    <p>User tags</p>
    <div class="w-full overflow-hidden">${badges}</div>
    </div>
    
    </div>`;
    games_container.innerHTML += card;
  });
}

// api function
async function getApiData(req, query) {
  let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/${req}/${query}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}
// https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games/?genres=action
// render games by category
async function getCategory() {
  let cat = await getApiData("genres", "");
  cat = cat.data;
  let html_cat = document.querySelector(".category");

  cat.forEach((category) => {
    let tag = document.createElement("div");
    tag.className =
      "pt-1 cursor-pointer text-base text-gray-400 hover:text-white";
    tag.innerText = category.name;
    tag.setAttribute("data-category", category.name);
    tag.addEventListener("click", handleGameCat);
    html_cat.appendChild(tag);
  });
}
getCategory();

// render cat games function
async function handleGameCat(event) {
  const catName = event.currentTarget
    .getAttribute("data-category")
    .replace(/\s+/g, "%20")
    .replace(/&/g, "%26");
  const data = await getApiData("games", `?limit=20&genres=${catName}`);
  displaybtn(true);
  renderGamesWthInput(data.data);
}

// render games by search
document
  .querySelector(".form-search")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });
searchBtn = document.querySelector(".search-button");
searchBtn.addEventListener("click", async () => {
  let inputVal = document.querySelector(".search-input").value;
  if (inputVal.trim != "") {
    inputVal = inputVal.trim().replace(/\s+/g, "%20").replace(/&/g, "%26");
    console.log(inputVal);
    const data = await getApiData("games", `?q=${inputVal}`);
    renderGamesWthInput(data.data);
  } else {
    // return;
  }
});
