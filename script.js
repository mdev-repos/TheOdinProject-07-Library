// Library logic

// DOM Variables
const libraryContainer = document.querySelector(".library-container");
const showLibraryBtn = document.querySelector("#show-books-btn");

// Book's Array
const bookStack = [];

// Book's Constructor
function Book(title, author, year, pages, isRead){
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.isRead = isRead;
};

// Create and Add a Book to the Library Array
function addBook(title, author, year, pages, isRead){
    let newBook = new Book(title, author, year, pages, isRead);
    bookStack.push(newBook);
};

// Clean page function
function clean() {
    if (libraryContainer.hasChildNodes()) {
        libraryContainer.innerHTML = '';
    }
};

// Show Library
showLibraryBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clean();
    for(let book of bookStack){
        //Create Elements and Class Assing
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        let bookImage = document.createElement("div");
        bookImage.classList.add("book-img");

        let bookTitle = document.createElement("p");
        bookTitle.classList.add("book-info");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = `${book.title}`;

        let bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book-info");
        bookAuthor.textContent = `by ${book.author}`;

        let bookYear = document.createElement("p");
        bookYear.classList.add("book-info");
        bookYear.textContent = `published in the year ${book.year}`;

        let bookPages = document.createElement("p");
        bookPages.classList.add("book-info");
        bookPages.textContent = `${book.pages} pages`;

        let bookState = document.createElement("p");
        bookState.classList.add("book-info");
        let text = (book.isRead) ? "Read" : "Not read";
        bookState.textContent = `${text}`;

        let bookActions = document.createElement("div");
        bookActions.classList.add("book-actions");

        let toggleButton = document.createElement("button")
        toggleButton.classList.add("book-btn");
        toggleButton.classList.add("toggle-state");
        toggleButton.textContent = "Toggle State";

        let deleteButton = document.createElement("button")
        deleteButton.classList.add("book-btn");
        deleteButton.classList.add("delete-book");
        deleteButton.textContent = "Delete";

        // Add Elements
        bookCard.appendChild(bookImage);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookYear);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookState);

        bookActions.appendChild(toggleButton);
        bookActions.appendChild(deleteButton);

        bookCard.appendChild(bookActions);

        libraryContainer.appendChild(bookCard);
    }
});

// Example Books
const basicHTML = new Book("Basic HTML", "Ridcardus", 1676, 688, true);
const basicCSS = new Book("Basic CSS", "Rodbertus", 1682, 1288, true);
const basicJS = new Book("Basic JavaScript", "Augustus", 1723, 2577, false);

bookStack.push(basicHTML, basicCSS, basicJS);

