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
function displayCard(bookmarkItemsFetched, wrapper = mainContentCards) {
  if (bookmarkItemsFetched.length === 0) {
    wrapper.innerHTML = `
    <p class="no-bookmarks">No Bookmarks found</p>
    `;
  } else {
    wrapper.innerHTML = "";
    bookmarkItemsFetched.forEach((obj) => {
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

      cardHeaderText.appendChild(cardLink);

      const cardHeaderIcon = document.createElement("div");
      cardHeaderIcon.classList.add("card-header-icon");

      const divIcon = document.createElement("i");
      divIcon.classList.add("fa-solid", "fa-ellipsis-vertical");

      cardHeaderIcon.appendChild(divIcon);

      const ul = document.createElement("ul");
      ul.classList.add("header-icon-menu-listen");

      const addLi = document.createElement("li");
      addLi.textContent = `Add Tag`;
      addLi.id = `add-tag`;

      ul.appendChild(addLi);

      const editLi = document.createElement("li");
      editLi.textContent = `Edit`;
      editLi.id = `edit-bookmark`;
      ul.appendChild(editLi);

      const archieveLi = document.createElement("li");
      archieveLi.textContent = `Archieve`;
      archieveLi.id = `add-archive`;
      ul.appendChild(archieveLi);

      const deleteLi = document.createElement("li");
      deleteLi.textContent = `Delete`;
      deleteLi.classList.add("delete-action");
      ul.appendChild(deleteLi);

      cardHeaderIcon.appendChild(ul);

      cardHeader.appendChild(cardHeaderIcon);

      // Card body
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardDescription = document.createElement("p");
      cardDescription.textContent = obj.description;
      cardBody.appendChild(cardDescription);

      // Tags
      const tagsDiv = document.createElement("div");
      tagsDiv.classList.add("tags-els");
      cardBody.appendChild(tagsDiv);

      // Loop through the tags array to create the tags
      obj.tags.forEach((el) => {
        const spanTag = document.createElement("span");
        spanTag.textContent = el;
        tagsDiv.appendChild(spanTag);
      });

      cardDiv.appendChild(cardBody);

      // Card Footer
      const cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");
      cardDiv.appendChild(cardFooter);

      const cardFooterInfo = document.createElement("div");
      cardFooterInfo.classList.add("footer-info");
      cardFooter.appendChild(cardFooterInfo);

      const div1 = document.createElement("div");
      const icon1 = document.createElement("i");
      icon1.classList.add("fa-solid", "fa-clock");
      div1.appendChild(icon1);
      const span1 = document.createElement("span");
      span1.textContent = obj.timeAdded;
      div1.appendChild(span1);
      cardFooterInfo.appendChild(div1);

      const div2 = document.createElement("div");
      const icon2 = document.createElement("i");
      icon2.classList.add("fa-solid", "fa-calendar");
      div2.appendChild(icon2);
      const span2 = document.createElement("span");
      span2.textContent = obj.dateAdded;
      div2.appendChild(span2);
      cardFooterInfo.appendChild(div2);

      const pinDiv = document.createElement("div");
      pinDiv.classList.add("pin");
      const icon3 = document.createElement("i");
      icon3.classList.add("fa-solid", "fa-thumbtack", "pin-bookmark");
      pinDiv.appendChild(icon3);
      cardFooter.appendChild(pinDiv);

      wrapper.appendChild(cardDiv);
    });
  }
}

let bookmarkItemsFetched = getItemsFromLocalStorage() || [];
displayCard(bookmarkItemsFetched, mainContentCards);

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
tagsArr.forEach((el) => {
  const tagDiv = document.createElement("div"); // Creating the tag div
  tagDiv.classList.add("tag"); // Adding the tag class

  const tagInfo = document.createElement("div");
  tagInfo.classList.add("tag-info");

  const tagInput = document.createElement("input");
  tagInput.type = "checkbox";
  tagInput.dataset.value = el.label;

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

  // Updating the count values
  const stored = getItemsFromLocalStorage();
  stored.forEach((obj) => {
    if (obj.tags.includes(el.label)) {
      el.count++;
    }
    countSpan.textContent = el.count;
  });
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
        displayCard(savedBookmarks, mainContentCards);

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
  displayCard(bookmarksInLocalStorage, mainContentCards);
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

    displayCard(savedData, mainContentCards);
    window.location.reload();
  });
});

dateSort.addEventListener("click", () => {
  const dataInLocalStorage = getItemsFromLocalStorage();

  dataInLocalStorage.sort((a, b) => b.timeAdded.localeCompare(a.timeAdded));

  localStorage.setItem("bookmarks", JSON.stringify(dataInLocalStorage));

  displayCard(dataInLocalStorage, mainContentCards);
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
  displayCard(savedItems, mainContentCards);
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
  displayCard(savedItems, mainContentCards);
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
const themeBtn = document.querySelector(".theme");
const logo = document.querySelector(".logo");
themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    theme = "dark";
    localStorage.setItem("myTheme", theme);
    themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    logo.innerHTML = `<img src="assets/logo-light.png" alt="" />`;
  } else {
    themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    theme = "light";
    localStorage.setItem("myTheme", theme);
    logo.innerHTML = `<img src="assets/logo.png" alt="" />`;
  }
});

if (theme === "dark") {
  document.documentElement.classList.add("dark");
  logo.innerHTML = `<img src="assets/logo-light.png" alt="" />`;
  themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
} else {
  document.documentElement.classList.remove("dark");
  logo.innerHTML = `<img src="assets/logo.png" alt="" />`;
  themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
}
