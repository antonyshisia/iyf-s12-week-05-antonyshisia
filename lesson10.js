const listenerDemo = document.getElementById("listener-demo");
const listenerOutput = document.getElementById("listener-output");
let demoButton;

function handleDemoClick() {
  listenerOutput.textContent = "Named click listener handled the event.";
}

listenerDemo.addEventListener("click", function () {
  if (demoButton) return;
  demoButton = document.createElement("button");
  demoButton.type = "button";
  demoButton.textContent = "Click me (listener can be removed)";
  demoButton.addEventListener("click", handleDemoClick);
  listenerOutput.before(demoButton);
  listenerOutput.textContent = "Button created. Its named listener is attached.";
});

document.getElementById("remove-listener").addEventListener("click", function () {
  if (!demoButton) return;
  demoButton.removeEventListener("click", handleDemoClick);
  listenerOutput.textContent = "Named listener removed. Click the button to confirm.";
});

let count = 0;
const countDisplay = document.getElementById("count");
function updateCount(next) {
  count = Math.max(0, next);
  countDisplay.textContent = String(count);
}
document.getElementById("increment").addEventListener("click", () => updateCount(count + 1));
document.getElementById("decrement").addEventListener("click", () => updateCount(count - 1));
document.getElementById("reset").addEventListener("click", () => updateCount(0));

const eventTypes = document.getElementById("event-types");
["click", "dblclick", "mouseenter", "mouseleave", "mousemove", "keydown", "keyup", "focus", "blur"].forEach(type => {
  eventTypes.addEventListener(type, event => console.log("Event type:", event.type));
});

document.addEventListener("click", function (event) {
  if (event.target.id === "prevent-link") {
    event.preventDefault();
    console.log("Target:", event.target, "Current target:", event.currentTarget, "Type:", event.type, "Position:", event.clientX, event.clientY);
  }
});
document.addEventListener("keydown", function (event) {
  console.log("Key:", event.key, "Code:", event.code, "Shift:", event.shiftKey, "Ctrl:", event.ctrlKey, "Alt:", event.altKey);
});

const shortcutForm = document.getElementById("shortcut-form");
const shortcutStatus = document.getElementById("shortcut-status");
shortcutForm.addEventListener("submit", event => {
  event.preventDefault();
  shortcutStatus.textContent = "Practice form submitted.";
});
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
    alert("Saved!");
  }
  if (event.key === "Escape") {
    shortcutForm.reset();
    shortcutStatus.textContent = "Practice form cleared.";
  }
  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    shortcutForm.requestSubmit();
  }
});

["grandparent", "parent", "child"].forEach(id => {
  document.getElementById(id).addEventListener("click", () => console.log(id + " clicked"));
});

const delegatedList = document.getElementById("delegated-list");
delegatedList.addEventListener("click", function (event) {
  const item = event.target.closest("li");
  if (!item || !delegatedList.contains(item)) return;
  if (event.target.closest('[data-action="delete"]')) {
    item.remove();
    return;
  }
  item.classList.toggle("completed");

});
document.getElementById("delegated-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("delegated-input");
  const value = input.value.trim();
  if (!value) return;
  const item = document.createElement("li");
  const text = document.createElement("span");
  text.textContent = value;
  const remove = document.createElement("button");
  remove.type = "button";
  remove.dataset.action = "delete";
  remove.textContent = "Delete";
  item.append(text, " ", remove);
  delegatedList.appendChild(item);
  input.value = "";
});

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const formStatus = document.getElementById("form-status");
function showError(input, message) {
  input.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  document.getElementById(input.id + "-error").textContent = message;
}
function validateName() {
  const valid = nameInput.value.trim().length >= 2;
  showError(nameInput, valid ? "" : "Name must be at least 2 characters.");
  return valid;
}
function validateEmail() {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  showError(emailInput, valid ? "" : "Please enter a valid email.");
  return valid;
}
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm));
  const nameValid = validateName();
  const emailValid = validateEmail();
  const valid = nameValid && emailValid;
  if (!valid) {
    formStatus.className = "error";
    formStatus.textContent = "Please correct the fields above.";
    return;
  }
  console.log("Form data:", data);
  formStatus.className = "success";
  formStatus.textContent = "Form submitted successfully!";
  contactForm.reset();
});


