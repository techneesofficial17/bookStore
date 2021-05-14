class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBooks() {
        const storeBooks = store.getBooks();
        const books = storeBooks;
        books.forEach(book => {
            UI.addBookToList(book);
        });
    }
    static addBookToList(book) {
        const list = document.querySelector('#bookList');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-3">${book.title}</td>
            <td class="p-3">${book.author}</td>
            <td class="p-3">${book.isbn}</td>
            <td class="p-3"><a href="#" id="remove" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }
    static autoClearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
    static showAlert(message, className) {
            const containerAlert = document.createElement('div');
            containerAlert.className = `alert alert-${className}`;
            // containerAlert.textContent = `${message}`;
            containerAlert.appendChild(document.createTextNode(message));
            const container = document.querySelector('.container');
            const form = document.querySelector('#form');
            container.insertBefore(containerAlert, form);
            setTimeout(() => {
                containerAlert.remove();
            }, 2000);
        }
        // static removeBooks() {
        //     const remove = document.querySelectorAll('.delete');
        //     console.log(remove);
        // }
}

class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBookStore(isbn) {
        const books = store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // UI.removeBooks();
    document.querySelector('#form').addEventListener('submit', e => {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        const book = new Book(title, author, isbn);

        if (title === '' || author === '' || isbn === '') {
            UI.showAlert("Fields can't be empty", 'danger');
        } else {
            UI.addBookToList(book);
            UI.autoClearFields();
            UI.showAlert('Sucessfully added book into the store', 'success');
            store.addBook(book);
        }
    });

    UI.displayBooks();
    const del = document.querySelectorAll('.delete');
    console.log(del);
    del.forEach(delBtns => {
        delBtns.addEventListener('click', () => {
            delBtns.parentElement.parentElement.remove();
            UI.showAlert('Book has been sucessfully removed from store', 'info');
            store.removeBookStore(
                delBtns.parentElement.previousElementSibling.textContent
            );
        });
    });
});