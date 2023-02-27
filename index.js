import { bookContainer, displayBook } from './modules/displayBook.js';
import BookCollection from './modules/bookCollectionClass.js';
import displayList from './modules/displayList.js';
import { DateTime } from './modules/luxon.js';

const date = document.querySelector('.date');
const addButton = document.querySelector('.add-button');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const bookCollection = localStorage.getItem('bookCollectionArray')
  ? new BookCollection(JSON.parse(localStorage.getItem('bookCollectionArray')))
  : new BookCollection([]);
bookCollection.bookArray.forEach((book) => {
  displayBook(book);
  if (document.querySelector(`#remove-${book.id}`)) {
    document
      .querySelector(`#remove-${book.id}`)
      .addEventListener(
        'click',
        bookCollection.removeBook.bind(bookCollection, book),
      );
  }
});
date.textContent = DateTime.now().toHTTP();
const displayBorder = () => {
  if (bookCollection.bookArray[0]) {
    bookContainer.style.border = 'solid 3px #000000';
  } else bookContainer.style.border = 'none';
};
addButton.addEventListener('click', () => {
  if (titleInput.value && authorInput.value) {
    bookCollection.addBook(titleInput.value, authorInput.value);
    titleInput.value = '';
    authorInput.value = '';
  }
});
displayList();
displayBorder();
