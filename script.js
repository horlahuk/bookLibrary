const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
  this.toggleRead = function () {
    this.read = !this.read;
  };
}

function addBookToArray(book) {
  myLibrary.push(book);
}

function displayBooks() {
  // myLibrary.forEach((book) => {
  //   console.log(book.info());
  // });

  const bookContainer = document.querySelector("#bookContainer");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "Read" : "Not Read Yet"}</p>
      <button class="toggleReadButton" data-index="${index}">Toggle Read</button>
      <button class="deleteButton" data-index="${index}">Delete</button>
    `;

    bookContainer.appendChild(bookCard);
  });

  const toggleReadButton = document.querySelectorAll(".toggleReadButton");
  toggleReadButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      myLibrary[index].toggleRead();
      displayBooks();
    });
  });

  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      myLibrary.splice(index, 1);
      displayBooks();
    });
  });

  const newBookButton = document.querySelector("#newBookButton");
  const formContainer = document.querySelector("#bookForm");

  newBookButton.addEventListener("click", () => {
    formContainer.style.display = "block";
  });

  formContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    const newBook = { title, author, pages, read };

    addBookToArray(newBook);
    displayBooks();

    formContainer.reset();
    formContainer.style.display = "none";
  });
}

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
// const theLordOfTheRings = new Book(
//   "The Lord of the Rings",
//   "J.R.R. Tolkien",
//   1178,
//   "not read yet"
// );

// addBookToArray(theHobbit);
// addBookToArray(theLordOfTheRings);

displayBooks();
