// Library logic

// DOM Variables
const libraryContainer = document.querySelector(".library-container");
const addNewBookBtn = document.querySelector("#new-book-btn");
const showLibraryBtn = document.querySelector("#show-books-btn");
const toggleStateBtnList = document.querySelectorAll(".toggle-state");

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

// Add New Book
addNewBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clean();
    let bookFormContainer = document.createElement("div");
    bookFormContainer.classList.add("book-form-container");

    bookFormContainer.innerHTML = `
    <form class="book-form" action="" method="post">
        <label for="fr-book-title">Title</label>
        <input type="text" name="book-title" id="fr-book-title" required>
        <label for="fr-book-author">Author</label>
        <input type="text" name="book-author" id="fr-book-author" required>
        <label for="fr-book-year">Publication Date</label>
        <input type="number" name="book-year" id="fr-book-year" required>
        <label for="fr-book-pages">Number of Pages</label>
        <input type="number" name="book-pages" id="fr-book-pages" required>
        
        <fieldset>
            <legend>Have you read the book?</legend>
            <div>
                <input type="radio" id="book-is-read" name="book-isRead" value="true" checked />
                <label for="book-is-read">True</label>
            </div>
            <div>
                <input type="radio" id="book-not-read" name="book-isRead" value="false" />
                <label for="book-not-read">False</label>
            </div>
        </fieldset>

        <button class="form-btn" type="submit">Add Book</button>
    </form>
    `;

    libraryContainer.appendChild(bookFormContainer);

    const bookForm = bookFormContainer.querySelector(".book-form");
    bookForm.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const title = document.getElementById("fr-book-title").value;
        const author = document.getElementById("fr-book-author").value;
        const year = document.getElementById("fr-book-year").value;
        const pages = document.getElementById("fr-book-pages").value;
        const isRead = document.querySelector('input[name="book-isRead"]:checked').value === "true";

        addBook(title, author, year, pages, isRead);

        clean();
        showLibraryBtn.click(); 
    });
});

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

         toggleButton.addEventListener("click", () => {
            book.isRead = !book.isRead; // Cambia el estado de lectura
            bookState.textContent = book.isRead ? "Read" : "Not read"; // Actualiza el texto
        });

        deleteButton.addEventListener("click", () => {
            const index = bookStack.indexOf(book); // Encuentra el índice del libro
            if (index > -1) {
                bookStack.splice(index, 1); // Elimina el libro del array
                clean(); // Limpia la vista
                showLibraryBtn.click(); // Vuelve a mostrar la biblioteca
            }
        });
    }
});

// Example Books
const basicHTML = new Book("Basic HTML", "Ridcardus", 1676, 688, true);
const basicCSS = new Book("Basic CSS", "Rodbertus", 1682, 1288, true);
const basicJS = new Book("Basic JavaScript", "Augustus", 1723, 2577, false);

bookStack.push(basicHTML, basicCSS, basicJS);

