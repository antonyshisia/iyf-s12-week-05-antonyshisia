// ============================================
// LESSON 9 — CLASSWORK EXERCISE: dom.js (Tasks 9.1–9.4)
// Copy dom-practice.html AND this file into the root of iyf-s12-week-05-{username}.
// Live Server → open dom-practice.html → F12 → Console.
//
// RULES: querySelector by default · textContent for text · classList for looks
//        (no element.style) · const/let only
// ============================================

// small helper: logs ✓ or ✗ so you can check yourself
const check = (label, ok) => console.log(`${ok ? "✓" : "✗"} ${label}`);


// ============================================
// STEP 1 — Task 9.1: select TEN ways. Store each in a const, then log it.
// ============================================
// TODO 1  the h1
const h1 = document.querySelector('h1');
// TODO 2  all elements with class "content"
const contents = document.querySelectorAll('.content');
// TODO 3  the form with id "contact-form" (use getElementById — no #)
const form = document.getElementById('contact-form');
// TODO 4  the email input INSIDE the form (one querySelector with a descendant selector)
const emailinput = document.querySelector("contact-form input[type='email']");
// TODO 5  all list items in the nav
const navitems = document.querySelectorAll('nav li');
// TODO 6  the first .nav-link
const firstnavlink = document.querySelector('.nav-link');
// TODO 7  the last paragraph in the article   (hint: p:last-of-type)
const lastparagraph = document.querySelector('article p:last-of-type');
// TODO 8–10  three more of your own — e.g. the submit button, every h2 in main, the footer
const submitbutton = document.querySelector('form button[type="submit"]');
const h2s = document.querySelectorAll('main h2');
const footer = document.querySelector('footer');

// Then: what does document.querySelector(".does-not-exist") return? Log it.
// And:  turn your nav items NodeList into an array of their text with [...list].map()


// ============================================
// STEP 2 — Task 9.2: traverse. Say the route out loud before you write it.
// ============================================
const header = document.querySelector('header');
const article = document.querySelector('article');
const ul = document.querySelector(".nav-list");

// TODO 1  from the header, find the nav inside it
console.log(header.querySelector('nav'));
// TODO 2  from the first .nav-link, get its parent li
console.log(firstnavlink.parentElement);
// TODO 3  from the article, get its next sibling (should be a section)
console.log(article.nextElementSibling);
// TODO 4  from the ul, get all its child li elements
console.log(ul.children);
// TODO 5  from the footer, go up to the body
console.log(footer.parentElement);
// TODO 6  from the first .nav-link, use closest() to reach the header
console.log(firstnavlink.closest('header'));


// ============================================
// STEP 3 — Task 9.3: change things
// ============================================
// TODO 1  change the h1 text to something of yours
h1.textContent = "my DOM masterclass!";
// TODO 2  point the first .nav-link at https://developer.mozilla.org, open in a new tab
//         (target="_blank" and rel="noopener")
firstLink.href = "https://developer.mozilla.org";
firstLink.target = "_blank";
firstLink.rel = "noopener";
// TODO 3  read the article's data-id and data-category with dataset; add data-status="reviewed"
console.log(article.dataset.id, article.dataset.category);
article.dataset.status = "reviewed";
// TODO 4  add the class "highlight" to the first .content paragraph,
//         toggle "accent" on the second — NO element.style
contents[0].classList.add("highlight");
contents[1].classList.toggle("accent");
//
// TODO 5  THE INJECTION DEMO — run these two lines and watch:
//   const userInput = `<img src="x" onerror="alert('hacked!')">`;
//   document.getElementById("unsafe").innerHTML = userInput;   // what happens?
//   document.getElementById("safe").textContent = userInput;   // and now?
//   Write one sentence in a comment: which one would you use for a user's comment, and why?
const userInput = `<img src="x" onerror="alert('hacked!')">`;
document.getElementById("unsafe").innerHTML = userInput;
document.getElementById("safe").textContent = userInput;
// I would use textContent for a user's comment because it prevents the execution of any malicious code that could be injected into the page, ensuring the safety and security of the website and its users.

// ============================================
// STEP 4 — Task 9.4: create, remove, clone
// ============================================
// TODO 1  write addNavItem(text, href): creates <li><a class="nav-link" href=…>text</a></li>
//         and appends it to .nav-list. Use textContent for the text.
// function addNavItem(text, href) { }
// addNavItem("Blog", "#blog");
// addNavItem("Portfolio", "#portfolio");
//
function addNavItem(text, href) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.classList.add('nav-link');
  a.href = href;
  a.textContent = text;
  li.appendChild(a);
  document.querySelector(".nav-list").appendChild(li)
}
addNavItem("Blog", "#blog");
addNavItem("Portfolio", "#portfolio");

// TODO 2  create a paragraph and insert it BEFORE the article's first paragraph
const newParagraph = document.createElement('p');
newParagraph.textContent = "I was inserted before the first paragraph.";
article.insertBefore(newParagraph, article.querySelector('p'));

// TODO 3  clone the first nav li (deep), change its text to "Cloned", prepend it to the list
const clone=ul.firstElementChild.cloneNode(true);
clone.querySelector('a').textContent = "Cloned";
ul.prepend(clone);
// TODO 4  remove the footer
footer.remove();


// ============================================
// STEP 5 — COMMIT as you go
//   git add dom-practice.html dom.js
//   git commit -m "Add: element selection practice"
//   git commit -m "Add: content, attribute and class changes"
//   git commit -m "Add: create and remove elements"
//   git push
// ============================================
