let addBookButton = document.getElementById("add-new");
let addBookForm = document.getElementById("add-new-wrapper");
let addBookTitle = document.getElementById("title");
let addBookAuthor = document.getElementById("author");
let addBookPages = document.getElementById("pages");
let addBookRead = document.getElementById("read");
let addBookExit = document.getElementById("form-exit");
let addBookSubmit = document.getElementById("form-submit");
let defaultBook = document.getElementById("book-default");
let defaultBookRemove = document.getElementById("book-remove");
let defaultBookRead = document.getElementById("book-read");
let bookGrid = document.getElementById("book-grid");

addBookButton.addEventListener("click", () => {
  addBookForm.attributeStyleMap.set("visibility", "visible");
  addBookForm.classList.add("visible");
});
function closeForm() {
  addBookForm.classList.remove("visible");
  addBookForm.attributeStyleMap.set("visibility", "hidden");
  addBookTitle.value = "";
  addBookAuthor.value = "";
  addBookPages.value = "";
  addBookRead.checked = false;
}
addBookExit.addEventListener("click", closeForm);

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function removeBookFromLibrary(book) {
  bookGrid.removeChild(book.element);
  let indexOfBook = myLibrary.indexOf(book);
  myLibrary.splice(indexOfBook, 1);

  if (bookGrid.childElementCount == 1) {
    defaultBook.attributeStyleMap.set("visibility", "visible");
    defaultBook.attributeStyleMap.set("position", "relative");
  }
}

function addBookToLibrary(e) {
  e.preventDefault();
  let title = addBookTitle.value;
  let author = addBookAuthor.value;
  let pages = addBookPages.value;
  let read = addBookRead.checked;
  console.log(read);
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  closeForm();

  if (bookGrid.childElementCount == 1) {
    defaultBook.attributeStyleMap.set("visibility", "hidden");
    defaultBook.attributeStyleMap.set("position", "absolute");
  }

  let bookElement = document.createElement("div");
  bookElement.classList.add("book");
  let bookText = document.createElement("div");
  bookText.classList.add("book-text");
  let bookTitle = document.createElement("div");
  bookTitle.classList.add("text", "title");
  bookTitle.textContent = title;
  let bookAuthor = document.createElement("div");
  bookAuthor.classList.add("text", "author");
  bookAuthor.textContent = author;
  let bookPages = document.createElement("div");
  bookPages.classList.add("text", "pages");
  bookPages.textContent = `${pages} pages`;
  let bookRemove = defaultBookRemove.cloneNode(true);
  bookRemove.attributeStyleMap.set("visibility", "visible");
  bookRemove.addEventListener("click", () => {
    removeBookFromLibrary(book);
  });
  let bookRead = defaultBookRead.cloneNode(true);
  bookRead.firstElementChild.checked = read;
  bookRead.attributeStyleMap.set("visibility", "visible");

  book.element = bookElement;

  bookText.append(bookTitle, bookAuthor);
  bookElement.append(bookText, bookPages, bookRemove, bookRead);
  bookGrid.appendChild(bookElement);
}

addBookSubmit.addEventListener("click", addBookToLibrary);
