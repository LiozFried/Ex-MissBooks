import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'BookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.amount) {
                books = books.filter(book => book.listPrice.amount >= filterBy.amount)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

// function getEmptyBook(title = '', listPrice = getDefualtListPrice()) {
//     return { title, listPrice }
// }

function getDefaultFilter() {
    return { txt: '', amount: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook(),
            _createBook(),
            _createBook(),
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook() {
    const book = {
        id: makeId(),
        title: makeLorem(getRandomIntInclusive(1, 4)),
        description: makeLorem(getRandomIntInclusive(15, 30)),
        thumbnail: `./assets/img/BooksImages/${getRandomIntInclusive(1, 20)}.jpg`,
        listPrice: getDefualtListPrice(),
    }

    return book
}

function getDefualtListPrice() {
    var defualtListPrice = {
        amount: getRandomIntInclusive(10, 350),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.3 ? true : false
    }

    return defualtListPrice
}