
let myLibrary = [];

function Book(author, title, numPages, isRead){
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;
}

function addBookToLibrary(newBook){
    myLibrary.push(newBook);
    //Save the book index as a data attribute
    newBook.data = myLibrary.length - 1;
}

function displayLibrary(){
    myLibrary.forEach((book) => displayBook(book));
}

function displayBook(book){
    const bookContainer = document.querySelector('.container');
    const bookCard = createBookCard(book);
    bookContainer.appendChild(bookCard);
}

function createBookCard(book){
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    var contentString = "Author: " + book.author + "\n\n" + 
                           "Title : " + book.title + "\n\n" + 
                           "Pages : " + book.numPages + "\n\n"+
                           "Status: " + ((book.isRead == true) ? "Read" : "Not Read");
    bookCard.innerHTML = contentString.replace(/\n/g, '<br>');
    

    return bookCard;
}



const book = new Book("Yusef", "Marhaba", "22", "True");
addBookToLibrary(book);
addBookToLibrary(book);
handleModal();
displayLibrary();


function createBookFromInput(){
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const numPages = document.getElementById('numPages').value;
    const isRead = document.getElementById('read').checked ? 'Read' : 'Not Read'; 
    console.log('hi');
    const newBook = new Book(author, title, numPages, isRead);
    clearModal();
    return newBook;
}

function clearModal(){
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
    document.getElementById('numPages').value = '';
    document.getElementById('read').checked = false; 
    document.getElementById('not-read').checked = false; 
}

function handleModal(){
    const modal = document.querySelector('.modal');
    const form = document.querySelector('form');
    const addBookButton = document.querySelector('.btn');
    const cancelButton = document.querySelector('.cancel-btn');
    addBookButton.addEventListener('click', () => {
        modal.classList.add('visible');
    })
    cancelButton.addEventListener('click', () => {
        modal.classList.remove('visible');
    })
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newBook = createBookFromInput();
        addBookToLibrary(newBook);
        displayBook(newBook);
        modal.classList.remove('visible');
    })
}

