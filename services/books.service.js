import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { googleBook } from '../data/googleBook.js'

const BOOK_KEY = 'BookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getCategories,
    getEmptyBook,
    getEmptyReview,
    getBooksFromGoogle,
    mapGoogleBookToAppBook,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title)
                    || regExp.test(book.description)
                    || regExp.test(book.subtitle)
                    || book.categories.includes(filterBy.txt)
                )
            }
            if (filterBy.amount) {
                books = books.filter(book => book.listPrice.amount >= filterBy.amount)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
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

function getEmptyBook(title = '') {
    return { title }
}

function getDefaultFilter() {
    return { txt: '', amount: '' }
}

// function _createBooks() {
//     let books = loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = [
//             _createBook(),
//             _createBook(),
//             _createBook(),
//         ]
//         saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createBook() {
//     const book = {
//         id: makeId(),
//         title: makeLorem(getRandomIntInclusive(1, 4)),
//         description: makeLorem(getRandomIntInclusive(15, 30)),
//         thumbnail: `./assets/img/BooksImages/${getRandomIntInclusive(1, 20)}.jpg`,
//         listPrice: getDefualtListPrice(),
//     }

//     return book
// }

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {

        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `./assets/img/BooksImages/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        saveToStorage(BOOK_KEY, books)
    }
    console.log('books', books)
}

function getCategories() {
    return query()
        .then(books =>
            [...new Set(books.flatMap(book => book.categories))]
        )
}

function getEmptyReview() {
    return {
        fullname: '',
        rating: '',
        readAt: ''
    }
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function getBooksFromGoogle(searchTerm) {
    // return Promise.resolve(googleBook.items) //Demo Data from google api books.

    return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
        .then(res => res.json())
        .then(res => res.items)
}

function mapGoogleBookToAppBook(googleBook) {
    const info = googleBook.volumeInfo

    return {
        id: googleBook.id || utilService.makeId(),
        title: info.title || 'Untitled',
        subtitle: info.subtitle || utilService.makeLorem(4),
        authors: info.authors,
        publishedDate: info.publishedDate || '',
        description: info.description || utilService.makeLorem(28),
        pageCount: info.pageCount || utilService.getRandomIntInclusive(20, 600),
        categories: info.categories,
        thumbnail: (info.imageLinks && info.imageLinks.thumbnail) ? info.imageLinks.thumbnail : `./assets/img/BooksImages/${utilService.getRandomIntInclusive(1, 20)}.jpg`,
        language: info.language || 'en',
        listPrice: {
            amount: utilService.getRandomIntInclusive(15, 400),
            currencyCode: 'EUR',
            isOnSale: Math.random() > 0.7
        }
    }
}