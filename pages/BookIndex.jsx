import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTruthyValues } from "../services/util.service.js"

const { Link, useSearchParams } = ReactRouterDOM
const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    // const [selectedBookId, setSelectedBookId] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter()) // Before query params
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        loadBooks()
        setSearchParams(getTruthyValues(filterBy))
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get books...')
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                showSuccessMsg('Book Removed Successfuly!')
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem removing book..')
            })

    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    // function onSelectBookId(bookId) {
    //     setSelectedBookId(bookId)
    // }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <section className="container">
                <Link to="add/google">Add</Link>
            </section>
            <BookList onRemoveBook={onRemoveBook} books={books} />

            {/* {selectedBookId && <BookDetails
                bookId={selectedBookId}
                onBack={() => setSelectedBookId(null)}
            />
            }
            {!selectedBookId &&
                <Fragment>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </Fragment>
            } */}
        </section>
    )
}