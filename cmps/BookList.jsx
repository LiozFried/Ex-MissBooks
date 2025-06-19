import { BookPreview } from "./BookPreview.jsx"

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>
                            Remove Book
                        </button>
                        <Link to={`/books/${book.id}`}>
                            <button>Book Details</button>
                        </Link>
                        <Link to={`/books/edit/${book.id}`}>
                            <button>Edit</button>
                        </Link>
                    </section>
                </li>
            )}
        </ul>
    )
}