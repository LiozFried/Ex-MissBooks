import { BookPreview } from "../cmps/BookPreview.jsx"
import { LongText } from "../cmps/LongText.jsx"
import { bookService } from "../services/books.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
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
                <p>Price: <span className={`book-price ${getPriceClass(book.listPrice.amount)}`}>{book.listPrice.amount}</span></p>
                <p>Page Count: {getPageCount(book.pageCount)}</p>
                <p>Published Date: {getPublishDate(book.publishedDate)}</p>
            </section>
            <button onClick={onBack}>Back</button>
        </section>
    )
}