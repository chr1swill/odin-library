"use strict";

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const cancelBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");
const addBookBtn = document.querySelector("#addBook");
const removeBookBtn = document.querySelectorAll("[data-remove]");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

class Book {
    constructor(title, author, pages, read) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._read = read;
        this._index = Book.allInstances.length;
        Book.allInstances.push(this);
    }

    static allInstances = [];
    
    get title() {
        return this._title;
    }

    set title(title) {
        if(typeof title === "string") {
            this._title = title;
        } else {
            throw new TypeError("Must be a string");
        }
    }

    get author() {
        return this._author;
    }

    set author(author) {
        if(typeof author === "string") {
            this._author = author;
        } else {
            throw new TypeError("Must be a string");
        }
    }

    get pages() {
        return this._pages;
    }

    set pages(pages) {
        if(typeof pages === "number") {
            this._pages = pages;
        } else {
            throw new TypeError("Must be a number");
        }
    }

    get read() {
        return this._read ? true : false;  
    }

    set read(status) {
        if(typeof status === "boolean") {
            this._read = status;
        } else {
            throw new TypeError("Must be a boolean");
        }
    }
}

// @type { Book } - book an instance of Book
const renderBooks = (book) => {
        const bookEl = `
        <style>
        .book {
            border: 1px solid black;
            border-radius: 5px;
            padding: 10px;
            margin: 10px;
            background-color: lightgray;
            display: grid;
            place-content: center;
        }
        </style>

        <div class="book" data-index="${ book._index }">
            <p class="title">${ book.title }</p>
            <p class="author">By: ${ book.author }</p>
            <p class="pages">${ book.pages } pages</p>
            <p class="read">${ book.read ? "Read" : "Not read" }</p>
            <button data-remove="${ book._index }">Remove</button>
        </div>
    `
        addBookBtn.insertAdjacentHTML("beforebegin", bookEl);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;
    const newBook = new Book(title, author, pages, read);

    renderBooks(newBook);
    form.reset();
    dialog.close();
});



document.addEventListener('click', function(event) {
    if(event.target && event.target.getAttribute('data-remove') !== null) {
        // Get the index from the data-remove attribute
        const index = event.target.getAttribute('data-remove');

        // Remove the book from the Book.allInstances array
        Book.allInstances.splice(index, 1);

        // Update the indices of the remaining books
        Book.allInstances.forEach((book, index) => {
            book._index = index;
        });

        // Clear the current books from the DOM
        document.querySelectorAll('.book').forEach(book => book.remove());

        // Re-render the books
        Book.allInstances.forEach(book => renderBooks(book));
    }
});

