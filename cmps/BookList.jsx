import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook, onSelectBookId }) {

    return (
        <ul className="book-list container">
            {books.map(book => 
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>
                            Remove Book
                        </button>
                        <button onClick={() => onSelectBookId(book.id)}>
                            Select Book
                        </button>
                    </section>
                </li>
            )}
        </ul>
    )
}