import { bookContainer, displayBook } from './displayBook.js';

export default class BookCollection {
  constructor(bookArray) {
    this.bookArray = bookArray;
  }

  removeBook(book) {
    this.bookArray.splice(book, 1);
    localStorage.setItem('bookCollectionArray', JSON.stringify(this.bookArray));
    bookContainer.innerHTML = '';
    this.bookArray.forEach((book, i) => {
      book.id = i;
      displayBook(book);
      if (document.querySelector(`#remove-${book.id}`)) {
        document
          .querySelector(`#remove-${book.id}`)
          .addEventListener('click', this.removeBook.bind(this, book));
      }
    });
    if (this.bookArray[0]) bookContainer.style.border = 'solid 3px #000000';
    else bookContainer.style.border = 'none';
  }

  addBook(title, author) {
    this.bookArray.push({
      title,
      author,
      id: this.bookArray.length,
    });
    localStorage.setItem('bookCollectionArray', JSON.stringify(this.bookArray));
    displayBook(this.bookArray[this.bookArray.length - 1]);
    if (
      document.querySelector(
        `#remove-${this.bookArray[this.bookArray.length - 1].id}`,
      )
    ) {
      document
        .querySelector(
          `#remove-${this.bookArray[this.bookArray.length - 1].id}`,
        )
        .addEventListener('click', () => {
          this.removeBook(this.bookArray[this.bookArray.length - 1]);
        });
    }
    if (this.bookArray[0]) bookContainer.style.border = 'solid 3px #000000';
    else bookContainer.style.border = 'none';
  }
}
