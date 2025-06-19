import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive } from './util.service.js'
import { storageService } from './async-storage.service.js'

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

function getEmptyBook(title = '', amount = '') {
    return { title, amount }
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