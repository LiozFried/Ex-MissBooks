export function BookPreview({ book }) {
    const { title, thumbnail } = book

    return (
        <section className="book-preview">
            <h2>Title: {title}</h2>
            <img src={thumbnail} alt="" />
        </section>
    )
}