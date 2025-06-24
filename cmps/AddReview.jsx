import { bookService } from "../services/books.service.js";

const { useState } = React

export function AddReview({ onAddReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview())

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    return (
        <section className="add-review">
            <h3>Add Review</h3>
            <form onSubmit={(ev) => {
                ev.preventDefault()
                onAddReview(review)
                setReview(bookService.getEmptyReview())
            }}>
                <label htmlFor="fullname">Full Name
                    <input value={review.fullname} name="fullname" onChange={handleChange} type="text" placeholder="Your name" id="fullname" />
                </label>

                <label htmlFor="rating">Rating
                    <input value={review.rating} name="rating" onChange={handleChange} type="number" min={1} max={5} placeholder="Your rating" id="rating" />
                </label>

                <label htmlFor="readAt">Read At
                    <input value={review.readAt} name="readAt" onChange={handleChange} type="datetime-local" id="readAt" />
                </label>

                <button type="submit">Add review</button>
            </form>
        </section>
    )
}