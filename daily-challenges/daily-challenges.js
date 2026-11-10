const headingColors = document.querySelectorAll("h1, h2, h3");
document.getElementById("change-colors").addEventListener("click", function () {
  headingColors.forEach(heading => {
    const color = "#" + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, "0");
    heading.style.color = color;
  });
});

let paragraphNumber = 0;
document.getElementById("add-paragraph").addEventListener("click", function () {
  paragraphNumber += 1;
  const paragraph = document.createElement("p");
  paragraph.className = "challenge-paragraph";
  const text = document.createElement("span");
  text.textContent = `Challenge paragraph ${paragraphNumber}`;
  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "Delete";
  remove.setAttribute("aria-label", `Delete paragraph ${paragraphNumber}`);
  remove.addEventListener("click", () => paragraph.remove());
  paragraph.append(text, remove);
  document.getElementById("paragraphs").appendChild(paragraph);
});

document.getElementById("remove-images").addEventListener("click", function () {
  document.querySelectorAll("img").forEach(image => image.remove());
});
document.getElementById("toggle-images").addEventListener("click", function () {
  document.querySelectorAll("img").forEach(image => image.hidden = !image.hidden);
});

const copySource = document.getElementById("copy-source");
const copyTarget = document.getElementById("copy-target");
function copyContent() {
  copyTarget.textContent = copySource.textContent;
}
document.getElementById("copy-content").addEventListener("click", copyContent);
copySource.addEventListener("dragstart", event => event.dataTransfer.setData("text/plain", copySource.textContent));
copyTarget.addEventListener("dragover", event => event.preventDefault());
copyTarget.addEventListener("drop", function (event) {
  event.preventDefault();
  copyTarget.textContent = event.dataTransfer.getData("text/plain");
});

const darkModeButton = document.getElementById("toggle-dark-mode");
function setDarkMode(enabled) {
  document.body.classList.toggle("dark-mode", enabled);
  darkModeButton.setAttribute("aria-pressed", String(enabled));
  localStorage.setItem("week5-dark-mode", String(enabled));
}
setDarkMode(localStorage.getItem("week5-dark-mode") === "true");
darkModeButton.addEventListener("click", () => setDarkMode(!document.body.classList.contains("dark-mode")));
