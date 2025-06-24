import { BookPreview } from "../cmps/BookPreview.jsx"
import { LongText } from "../cmps/LongText.jsx"
import { bookService } from "../services/books.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { AddReview } from "../cmps/AddReview.jsx"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => console.log('err:', err))
    }

    function getPageCount(pageCount) {
        if (pageCount > 500) return `Serious Reading ${pageCount} pages`
        if (pageCount > 200) return `Descent Reading ${pageCount} pages`
        if (pageCount > 500) return `Light Reading ${pageCount} pages`
    }

    function getPublishDate(publishedDate) {
        const currYear = new Date().getFullYear()
        const diff = currYear - publishedDate

        if (diff > 10) return `Vintage ${publishedDate}`
        else return `New ${publishedDate}`
    }

    function getPriceClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
    }

    function onBack() {
        navigate('/books')
    }

    function onAddReview(review) {
        if (!book.reviwes) {
            book.reviwes = [review]
        } else {
            book.reviwes.push(review)
        }

        bookService.save(book)
            .then(book => {
                showSuccessMsg('New review added')
                setBook((prevBook) => ({ ...prevBook, book }))
            })
    }

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details container">
            {book.listPrice.isOnSale && <span className="on-sale">On Sale!</span>}
            <BookPreview book={book} />
            <LongText txt={book.description} />

            <section className="publish-details">
                <h3>Authors</h3>
                <ul>
                    {book.authors.map(author =>
                        <li key={author}>{author}</li>
                    )}
                </ul>
                <h3>Other Details</h3>
                <p>Price: <span className={`book-price ${getPriceClass(book.listPrice.amount)}`}>{book.listPrice.amount}</span></p>
                <p>Page Count: {getPageCount(book.pageCount)}</p>
                <p>Published Date: {getPublishDate(book.publishedDate)}</p>
            </section>

            <section className="book-review">
                <h3>Reviews:</h3>
                {book.reviwes ? <ul>
                    {book.reviwes.map((review, idx) => <li key={idx}>
                        <p>{review.fullname}</p>
                        <p>{review.rating}</p>
                        <p>{review.readAt}</p>
                    </li>
                    )}
                </ul> : 'No Reviwes yet..'
                }
            </section>

            <AddReview onAddReview={onAddReview} />

            <section>
                <Link to={`/books/${book.prevBookId}`}>
                    <button>Prev</button>
                </Link>
                <Link to={`/books/${book.nextBookId}`}>
                    <button>Next</button>
                </Link>
            </section>

            <button onClick={onBack}>Back</button>
        </section>
    )
}