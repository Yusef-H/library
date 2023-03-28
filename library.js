
'use strict';

const library = [];
const bookContainer = document.querySelector('.container');
const modal = document.querySelector('.modal');
const addBookButton = document.querySelector('.btn');
const cancelButton = document.querySelector('.cancel-btn');
const form = document.querySelector('form');
const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');
const numPagesInput = document.getElementById('numPages');
const ReadInput = document.getElementById('read');
const notReadInput = document.getElementById('not-read');
const inputs = document.querySelectorAll('fieldset input');

class Book {
  constructor(author, title, numPages, isRead) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;
  }

  toggle() {
    this.isRead = this.isRead === 'Read' ? 'Not Read' : 'Read';
  }
}

const addBookToLibrary = (newBook) => {
  library.push(newBook);
};

const removeBookFromLibrary = (book) => {
    const bookIndex = library.indexOf(book);
    library.splice(bookIndex, 1);
}

const renderLibrary = () => {
  bookContainer.innerHTML = '';
  library.forEach((book) => {
    const bookCard = createBookCard(book);
    bookContainer.appendChild(bookCard);
  });
};

const createBookCard = (book) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const contentString = `Author: ${book.author}<br>Title: ${book.title}<br>Pages: ${book.numPages}<br>Status: ${book.isRead}`;
  bookCard.innerHTML = contentString;

  const buttonsContainer = createBookCardButtons(book);
  bookCard.appendChild(buttonsContainer);

  return bookCard;
};

const createBookCardButtons = (book) => {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('book-buttons-container');

  const removeBookButton = document.createElement('button');
  removeBookButton.classList.add('remove-button');
  removeBookButton.textContent = 'Remove Book';
  removeBookButton.addEventListener('click', () => {
    removeBookFromLibrary(book);
    renderLibrary();
  });

  const toggleButton = document.createElement('button');
  toggleButton.classList.add('toggle-button');
  toggleButton.textContent = 'Toggle Status';
  toggleButton.addEventListener('click', () => {
    book.toggle();
    renderLibrary();
  });

  buttonsContainer.appendChild(removeBookButton);
  buttonsContainer.appendChild(toggleButton);

  return buttonsContainer;
};

const createBookFromInput = () => {
  const author = authorInput.value;
  const title = titleInput.value;
  const numPages = numPagesInput.value;
  const isRead = ReadInput.checked ? 'Read' : 'Not Read';
  clearModal();

  return new Book(author, title, numPages, isRead);
};

const handleModal = () => {
  addBookButton.addEventListener('click', () => {
    modal.classList.add('visible');
  });

  cancelButton.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newBook = createBookFromInput();
    addBookToLibrary(newBook);
    renderLibrary();
    modal.classList.remove('visible');
  });
};

const clearModal = () => {
  inputs.forEach((input) => (input.value = ''));
  ReadInput.checked = false;
  notReadInput.checked = false;
};
const exampleBook = new Book("Yusef", "ABCDEF", 77, "Read");
addBookToLibrary(exampleBook);
handleModal();
renderLibrary();





