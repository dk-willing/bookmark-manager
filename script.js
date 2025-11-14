const mainContentCards = document.querySelector(".main-content-cards");

// TAGS OBJECTS
const tagsArr = [
  { label: "AI", count: 0 },
  { label: "Community", count: 0 },
  { label: "Compatibility", count: 0 },
  { label: "CSS", count: 0 },
  { label: "Design", count: 0 },
  { label: "Framework", count: 0 },
  { label: "Git", count: 0 },
  { label: "HTML", count: 0 },
  { label: "JavaScript", count: 0 },
  { label: "Layout", count: 0 },
  { label: "Learning", count: 0 },
  { label: "Performance", count: 0 },
  { label: "Practice", count: 0 },
  { label: "Reference", count: 0 },
  { label: "Tips", count: 0 },
  { label: "Tools", count: 0 },
  { label: "Tutorials", count: 0 },
];

// Bookmark item blueprint
const bookmarkItems = [
  {
    title: "Learn With Dave",
    imageUrl:
      "https://w7.pngwing.com/pngs/713/815/png-transparent-whatsapp-iphone-whatsapp-logo-monochrome-black-thumbnail.png",
    pageLink: "bigfashion.com",
    description:
      "Performance & best practice: Use PurgeCSS or the built-in JIT mode to remove unused classes; learn about how to keepbundle size small.",
    tags: ["CSS", "Python", "JavaScript"],
    DateAdded: "12 / 11 / 26",
    TimeAdded: "12:32",
  },
];

// Creating and adding card to the UI
bookmarkItems.forEach((obj) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  cardDiv.appendChild(cardHeader);

  const cardHeaderImage = document.createElement("div");
  cardHeaderImage.classList.add("card-header-img");

  cardHeader.appendChild(cardHeaderImage);

  const cardImage = document.createElement("img");
  cardImage.src = obj.imageUrl;
  cardHeaderImage.appendChild(cardImage);

  const cardHeaderText = document.createElement("div");
  cardHeaderText.classList.add("card-header-text");

  cardHeader.appendChild(cardHeaderText);

  const h2 = document.createElement("h2");
  h2.textContent = obj.title;

  cardHeaderText.appendChild(h2);

  const cardLink = document.createElement("a");
  cardLink.href = obj.pageLink;
  cardLink.textContent = obj.pageLink;

  console.log(cardLink);

  cardHeaderText.appendChild(cardLink);

  const cardHeaderIcon = document.createElement("div");
  cardHeaderIcon.classList.add("card-header-icon");

  const divIcon = document.createElement("i");
  divIcon.classList.add("fa-solid", "fa-ellipsis-vertical");

  console.log(divIcon);

  cardHeaderIcon.appendChild(divIcon);

  const ul = document.createElement("ul");
  ul.classList.add("header-icon-menu-listen");

  const addLi = document.createElement("li");
  addLi.textContent = `Add Tag`;

  ul.appendChild(addLi);

  const editLi = document.createElement("li");
  editLi.textContent = `Edit`;
  ul.appendChild(editLi);

  const archieveLi = document.createElement("li");
  archieveLi.textContent = `Archieve`;
  ul.appendChild(archieveLi);

  const deleteLi = document.createElement("li");
  deleteLi.textContent = `Add Tag`;
  ul.appendChild(deleteLi);

  cardHeaderIcon.appendChild(ul);

  cardHeader.appendChild(cardHeaderIcon);

  mainContentCards.appendChild(cardDiv);
});

// DOM ELEMENTS
const tagsContainer = document.querySelector(".tags-container");
const mobileNavMenu = document.querySelector(".mobile-nav");
const sideBar = document.querySelector(".sidebar");
const menuBtns = document.querySelectorAll(".main-menu-items button");
const dropDownTop = document.querySelector(".dropdown");
const dropDownList = document.querySelector(".dropdown-list");
const cardHeaderIcon = document.querySelectorAll(".card-header-icon");

const headerMenu = document.querySelectorAll(".header-icon-menu-listen");

const addBookmarkBtn = document.querySelector(".bookmark-btn");
const formModal = document.querySelector(".form-modal");
const formModalBg = document.querySelector(".form-modal-bg");
const closeModalBtn = document.querySelector(".close-modal-btn");

// This creates and displays the tags label and count on the screen
tagsArr.forEach((el) => {
  const tagDiv = document.createElement("div"); // Creating the tag div
  tagDiv.classList.add("tag"); // Adding the tag class

  const tagInfo = document.createElement("div");
  tagInfo.classList.add("tag-info");

  const tagInput = document.createElement("input");
  tagInput.type = "checkbox";

  const tagLabel = document.createElement("label");
  tagLabel.textContent = el.label;

  const tagCount = document.createElement("div");
  tagCount.classList.add("tag-count");

  const countSpan = document.createElement("span");
  countSpan.textContent = el.count;

  tagCount.appendChild(countSpan);
  tagInfo.appendChild(tagInput);
  tagInfo.appendChild(tagLabel);

  tagDiv.appendChild(tagInfo);
  tagDiv.appendChild(tagCount);

  tagsContainer.appendChild(tagDiv);
});

// Mobile nav toggler
mobileNavMenu.addEventListener("click", () => {
  sideBar.classList.toggle("open");

  if (sideBar.classList.contains("open")) {
    mobileNavMenu.innerHTML = `<i class="fa-solid fa-x"></i>`;
  } else {
    mobileNavMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }
});

// This closes the nav sidebar when the home or archieve button is clicked
menuBtns.forEach((el) => {
  el.addEventListener("click", () => {
    sideBar.classList.remove("open");

    if (sideBar.classList.contains("open")) {
      mobileNavMenu.innerHTML = `<i class="fa-solid fa-x"></i>`;
    } else {
      mobileNavMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    }
  });
});

// This is where i show the sortby dropdown
dropDownTop.addEventListener("click", () => {
  dropDownList.classList.toggle("show");
});

cardHeaderIcon.forEach((el) =>
  el.addEventListener("click", () => {
    headerMenu.forEach((headerEl) => {
      if (el.lastElementChild === headerEl) {
        headerEl.classList.toggle("show-action");
      } else {
        headerEl.classList.remove("show-action");
      }
    });
  })
);

// This opens the modal for the bookmark form to be filled
addBookmarkBtn.addEventListener("click", () => {
  formModal.classList.add("show-modal");
});

formModalBg.addEventListener("click", () => {
  formModal.classList.remove("show-modal");
});
closeModalBtn.addEventListener("click", () => {
  formModal.classList.remove("show-modal");
});

// The edit functionality [DIRTY]

const editBookmarkBtn = document.querySelector("#edit-bookmark");
const titleText = document.getElementById("title-text");
const imageStr = document.getElementById("image-str");
const pageUrl = document.getElementById("page-url");
const tagArr = document.getElementById("tags-str");
const descriptionText = document.getElementById("description-text");

editBookmarkBtn.addEventListener("click", () => {
  formModal.classList.add("show-modal");

  titleText.value = "This is dummy";
  imageStr.value = "This is also dummy";
  descriptionText.value = "This is a dummy description";

  tagArr.value = "This is a sample";
});
