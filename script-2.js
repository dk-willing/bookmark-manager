let isEditMode = false;
const tagsContainer = document.querySelector(".tags-container");
const mainContentCards = document.querySelector(".main-content-cards-2");

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
  const stored = JSON.parse(localStorage.getItem("archived-bookmarks")) || [];
  stored.forEach((obj) => {
    if (obj.tags.includes(el.label)) {
      el.count++;
    }
    countSpan.textContent = el.count;
  });
});

// Creating and adding card to the UI
function displayCard(bookmarkItemsFetched, wrapper = mainContentCards) {
  if (bookmarkItemsFetched.length === 0) {
    wrapper.innerHTML = `
    <p class="no-bookmarks">No Archived Data found</p>
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

      const archieveLi = document.createElement("li");
      archieveLi.textContent = `Unarchieve`;
      archieveLi.id = `add-archive`;
      ul.appendChild(archieveLi);

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

// Get bookmarked archived
const allArchivedData =
  JSON.parse(localStorage.getItem("archived-bookmarks")) || [];

displayCard(allArchivedData);

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

    displayCard(allArchivedData, mainContentCards);
    window.location.reload();
  });
});
