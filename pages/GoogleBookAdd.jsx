import { bookService } from "../services/books.service.js";
import { showSuccessMsg } from "../services/event-bus.service.js";

const { useNavigate } = ReactRouterDOM
const { useState, Fragment } = React

export function GoogleBookAdd() {
    const [searchTerm, setSearchTerm] = useState('')
    const [googleBooks, setGoogleBooks] = useState(null)

    function searchGoogle() {
        bookService.getBooksFromGoogle(searchTerm)
            .then(setGoogleBooks)
    }

    const navigate = useNavigate()
    function onSelectBook({ target }) {
        const bookId = target.value
        const bookToFormatting = googleBooks.find(book => book.id === bookId)
        const { id, ...book } = bookService.mapGoogleBookToAppBook(bookToFormatting)
        bookService.save(book)
            .then(() => {
                showSuccessMsg('Google book added')
                navigate('/books')
            })
    }

    return (
        <section className="add-google-book">
            <h2>Add book from google</h2>
            <input type="text" name="searchTerm" placeholder="Search books from google"
                value={searchTerm} onChange={(ev) => setSearchTerm(ev.target.value)} />
            <button onClick={searchGoogle}>Search</button>

            {googleBooks && <Fragment>
                <label htmlFor="book-select">Choose a book:</label>
                <select onChange={onSelectBook} name="book-select" id="book-select">
                    <option value="">Please choose a book</option>
                    {googleBooks.map(book => <option key={book.id} value={book.id}>{book.volumeInfo.title}
                    </option>)}
                </select>
            </Fragment>}
        </section>
    )
}