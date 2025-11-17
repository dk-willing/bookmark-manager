import { tagsArr, renderTags, displayCard, setupTheme } from "./utils.js";
let onArchivePage = false;
let theme = "light";

theme = localStorage.getItem("myTheme") || "light";
const mainContentCards = document.querySelector(".main-content-cards");
const alphaSort = document.querySelector(".alpha");
const dateSort = document.querySelector(".sort-date");
const searchBookmarks = document.querySelector("#search-bookmarks");
const tagsForBookmark = document.querySelector("#tag-input");

const homeScreen = document.querySelector("#home-screen");
const archieveScreen = document.querySelector("#archieve-screen");
const mainContentDown = document.querySelector(".main-content-down");

// Global Variables
let isEditMode = false;
let selectedTags = [];

tagsArr.forEach((tag) => {
  const button = document.createElement("button");
  button.textContent = tag.label;
  button.dataset.value = tag.label;
  button.classList.add("tag-id");
  tagsForBookmark.appendChild(button);

  button.addEventListener("click", (e) => {
    e.preventDefault();

    if (!selectedTags.includes(button.dataset.value)) {
      button.classList.add("selected-tags");
      selectedTags.push(button.dataset.value);
    } else {
      button.classList.remove("selected-tags");
      selectedTags = selectedTags.filter((el) => el !== button.dataset.value);
    }
  });
});

// Creating and adding card to the UI

let bookmarkItemsFetched = getItemsFromLocalStorage() || [];
displayCard("mainCard", bookmarkItemsFetched, mainContentCards);

// Bookmark item blueprint
const bookmarkItems = [];

// DOM ELEMENTS
const tagsContainer = document.querySelector(".tags-container");
const mobileNavMenu = document.querySelector(".mobile-nav");
const sideBar = document.querySelector(".sidebar");
const menuBtns = document.querySelectorAll(".main-menu-items button");
const dropDownTop = document.querySelector(".dropdown");
const dropDownList = document.querySelector(".dropdown-list");
const cardHeaderIcon = document.querySelectorAll(".card-header-icon");

const headerMenu = document.querySelectorAll(".header-icon-menu-listen");

const bookmarkForm = document.getElementById("bookmark-form");
const addBookmarkBtn = document.querySelector(".bookmark-btn");
const formModal = document.querySelector(".form-modal");
const formModalBg = document.querySelector(".form-modal-bg");
const closeModalBtn = document.querySelector(".close-modal-btn");

// This creates and displays the tags label and count on the screen
renderTags(tagsArr, tagsContainer, "bookmarks");

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
  titleText.value = "";
  imageStr.value = "";
  pageUrl.value = "";
  descriptionText.value = "";
  formModal.classList.add("show-modal");
});

formModalBg.addEventListener("click", () => {
  formModal.classList.remove("show-modal");
});
closeModalBtn.addEventListener("click", () => {
  formModal.classList.remove("show-modal");
});

// The edit functionality [DIRTY]

// Check if item title already exits

// Create And Add Bookmarks with the form
bookmarkForm.addEventListener("submit", onFormSubmit);

const editBookmarkBtn = document.querySelectorAll("#edit-bookmark");
const deleteBookMark = document.querySelectorAll(".delete-action");
const titleText = document.getElementById("title-text");
const imageStr = document.getElementById("image-str");
const pageUrl = document.getElementById("page-url");
const tagArr = document.getElementById("tags-str");
const addArchive = document.querySelectorAll("#add-archive");
const descriptionText = document.getElementById("description-text");
const pinBookmark = document.querySelectorAll(".pin-bookmark");
const addTag = document.querySelectorAll("#add-tag");
const sortTags = document.querySelector(".sort-tag");

// This would delete a bookmark card
deleteBookMark.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (
      confirm(
        "Deleting this bookmark would delete all associated data. Are you sure you want to delete it?"
      )
    ) {
      console.log(
        el.parentElement.parentElement.parentElement.firstElementChild
          .nextElementSibling.firstElementChild.textContent
      );
      removeFromLocalStorage(
        el.parentElement.parentElement.parentElement.firstElementChild
          .nextElementSibling.firstElementChild.textContent
      );
      window.location.reload();
    }
  });
});

pinBookmark.forEach((el) => {
  el.addEventListener("click", () => {
    let savedBookmarks = getItemsFromLocalStorage();
    console.log();

    savedBookmarks.forEach((obj) => {
      if (
        obj.title ===
        el.parentElement.parentElement.parentElement.firstElementChild
          .firstElementChild.nextElementSibling.firstElementChild.textContent
      ) {
        const idx = savedBookmarks.indexOf(obj);
        const pinItem = savedBookmarks[idx];
        savedBookmarks.splice(idx, 1);
        savedBookmarks.unshift(pinItem);

        localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));
        displayCard("mainCard", savedBookmarks, mainContentCards);

        window.location.reload();
      }
    });
  });
});

editBookmarkBtn.forEach((el) =>
  el.addEventListener("click", () => setItemToEdit(el))
);

addTag.forEach((add) => {
  add.addEventListener("click", () => setItemToEdit(add));
});

alphaSort.addEventListener("click", () => {
  const bookmarksInLocalStorage = getItemsFromLocalStorage();

  bookmarksInLocalStorage.sort((a, b) => a.title.localeCompare(b.title));
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksInLocalStorage));
  displayCard("mainCard", bookmarksInLocalStorage, mainContentCards);
  window.location.reload();
});

addArchive.forEach((btn) => {
  btn.addEventListener("click", () => {
    let savedData = getItemsFromLocalStorage();
    const archivedData =
      JSON.parse(localStorage.getItem("archived-bookmarks")) || [];
    const addToArchive =
      btn.parentElement.parentElement.parentElement.firstElementChild
        .nextElementSibling.firstElementChild.textContent;

    const itemToArchive = savedData.filter((el) => el.title === addToArchive);

    savedData = savedData.filter((el) => el.title != addToArchive);

    localStorage.setItem("bookmarks", JSON.stringify(savedData));

    itemToArchive.forEach((item) => {
      archivedData.push(item);
    });

    localStorage.setItem("archived-bookmarks", JSON.stringify(archivedData));

    displayCard("mainCard", savedData, mainContentCards);
    window.location.reload();
  });
});

dateSort.addEventListener("click", () => {
  const dataInLocalStorage = getItemsFromLocalStorage();

  dataInLocalStorage.sort((a, b) => b.timeAdded.localeCompare(a.timeAdded));

  localStorage.setItem("bookmarks", JSON.stringify(dataInLocalStorage));

  displayCard("mainCard", dataInLocalStorage, mainContentCards);
  window.location.reload();
});

sortTags.addEventListener("click", () => {
  let sortArr = [];
  const card = document.querySelectorAll(".card");
  const checkedBox = tagsContainer.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  checkedBox.forEach((el) => {
    card.forEach((c) => {
      c.querySelectorAll(".tags-els").forEach((el) =>
        el.childNodes.forEach((child) => sortArr.push(child.textContent))
      );

      // <________>
      if (sortArr.includes(el.dataset.value)) {
        c.style.display = "block";
      } else {
        c.style.display = "none";
      }

      sortArr = [];
    });
  });
});

// Function to add new form data
function addNewBookmark() {
  let savedItems = getItemsFromLocalStorage();
  displayCard("mainCard", savedItems, mainContentCards);
  const { time, date } = addDateAndTime();

  let bookmarkData = {
    title: titleText.value,
    imageUrl: imageStr.value,
    pageLink: pageUrl.value,
    description: descriptionText.value,
    tags: selectedTags,
    dateAdded: date,
    timeAdded: time,
  };

  if (checkDuplicate(bookmarkData.title)) {
    alert("Bookmark with this title already exits");
    return;
  }

  savedItems.unshift(bookmarkData);
  localStorage.setItem("bookmarks", JSON.stringify(savedItems));
  formModal.classList.remove("show-modal");
  displayCard("mainCard", savedItems, mainContentCards);
}

// This sets the items to be edited
function setItemToEdit(el) {
  isEditMode = true;
  const datatSavedInLocalStorage = JSON.parse(
    localStorage.getItem("bookmarks")
  );
  const itemToEdit = datatSavedInLocalStorage.filter(
    (obj) =>
      obj.title ===
      el.parentElement.parentElement.parentElement.firstElementChild
        .nextElementSibling.firstElementChild.textContent
  )[0];

  el.parentElement.parentElement.parentElement.parentElement.classList.add(
    "edit-mode"
  );

  tagsForBookmark.querySelectorAll(".tag-id").forEach((el) => {
    if (itemToEdit.tags.includes(el.dataset.value)) {
      el.style.background = "#333";
      el.style.color = "#fff";
    }
  });

  formModal.classList.add("show-modal");
  // prefilling the modal form before editing
  titleText.value = itemToEdit.title;
  pageUrl.value = itemToEdit.pageLink;
  imageStr.value = itemToEdit.imageUrl;
  descriptionText.value = itemToEdit.description;
  selectedTags = itemToEdit.tags;
}

function addToLocaleStorage(el) {
  let itemsInLocalStorage = getItemsFromLocalStorage();
  itemsInLocalStorage.unshift(el);

  localStorage.setItem("bookmarks", JSON.stringify(itemsInLocalStorage));
}

// Global Function
function getItemsFromLocalStorage() {
  const itemsFromLocalStorage =
    JSON.parse(localStorage.getItem("bookmarks")) || [];

  return itemsFromLocalStorage;
}

// This funtion removes an item from the localStorage, since the name unique items would be removed by the name
function removeFromLocalStorage(itemTitle) {
  let itemsInLocalStorage = getItemsFromLocalStorage();

  itemsInLocalStorage = itemsInLocalStorage.filter(
    (item) => item.title.trim().toLowerCase() !== itemTitle.trim().toLowerCase()
  );

  localStorage.setItem("bookmarks", JSON.stringify(itemsInLocalStorage));
}

function addDateAndTime() {
  // Creating date and time for filter features
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "short" });

  const time = `${hour}:${min}`;
  const date = `${day} ${month}`;

  return { time, date };
}

function checkDuplicate(itemTitle) {
  const itemsStoredInLocalStorage =
    JSON.parse(localStorage.getItem("bookmarks")) || [];

  return itemsStoredInLocalStorage.some((elTitle) =>
    new RegExp(`^${itemTitle}$`, "i").test(elTitle.title)
  ); // got this from chatGPT
}

function onFormSubmit(e) {
  e.preventDefault();

  if (isEditMode) {
    editBookMark();
    isEditMode = false;
  } else {
    addNewBookmark();
    window.location.reload();
  }
}

function editBookMark() {
  const itemToEdit =
    mainContentCards.querySelector(".edit-mode").firstElementChild
      .firstElementChild.nextElementSibling.firstElementChild.textContent;
  removeFromLocalStorage(itemToEdit);
  addNewBookmark();
  window.location.reload();
}

searchBookmarks.addEventListener("input", (e) => {
  const cards = document.querySelectorAll(".card");
  const searchQuery = e.target.value.toLowerCase();

  cards.forEach((card) => {
    const bookmarkText =
      card.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.textContent.toLowerCase();

    if (bookmarkText.indexOf(searchQuery) !== -1) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// THEME
setupTheme();
