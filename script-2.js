import { tagsArr, renderTags, displayCard, setupTheme } from "./utils.js";
let isEditMode = false;
const tagsContainer = document.querySelector(".tags-container");
const mainContentCards = document.querySelector(".main-content-cards-2");

// TAGS OBJECTS

// This creates and displays the tags label and count on the screen
renderTags(tagsArr, tagsContainer, "archived-bookmarks");

// Creating and adding card to the UI

// Get bookmarked archived
const allArchivedData =
  JSON.parse(localStorage.getItem("archived-bookmarks")) || [];

displayCard("archiveCard", allArchivedData, mainContentCards);

const mobileNavMenu = document.querySelector(".mobile-nav");
const sideBar = document.querySelector(".sidebar");
const menuBtns = document.querySelectorAll(".main-menu-items button");
const dropDownList = document.querySelector(".dropdown-list");
const cardHeaderIcon = document.querySelectorAll(".card-header-icon");
const headerMenu = document.querySelectorAll(".header-icon-menu-listen");
const unarchive = document.querySelectorAll("#add-archive");

// Mobile nav toggler
mobileNavMenu.addEventListener("click", () => {
  sideBar.classList.toggle("open");

  if (sideBar.classList.contains("open")) {
    mobileNavMenu.innerHTML = `<i class="fa-solid fa-x"></i>`;
  } else {
    mobileNavMenu.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  }
});

const bookmarkForm = document.getElementById("bookmark-form");

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

unarchive.forEach((btn) => {
  btn.addEventListener("click", () => {
    let allArchivedData =
      JSON.parse(localStorage.getItem("archived-bookmarks")) || [];

    let allBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    const dataToMove =
      btn.parentElement.parentElement.parentElement.firstElementChild
        .nextElementSibling.firstElementChild.textContent;

    const addToBookmark = allArchivedData.filter(
      (el) => el.title === dataToMove
    );

    allArchivedData = allArchivedData.filter((el) => el.title != dataToMove);

    localStorage.setItem("archived-bookmarks", JSON.stringify(allArchivedData));

    addToBookmark.forEach((el) => {
      allBookmarks.push(el);
    });

    localStorage.setItem("bookmarks", JSON.stringify(allBookmarks));

    displayCard("archiveCard", allArchivedData, mainContentCards);
    window.location.reload();
  });
});

// THEME
setupTheme();
