// DOM ELEMENTS
const tagsContainer = document.querySelector(".tags-container");

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
