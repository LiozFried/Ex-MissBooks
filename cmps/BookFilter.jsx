import { debounce } from "../services/util.service.js"
import { bookService } from "../services/books.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterByDebounce = useRef(debounce(onSetFilter, 700)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    const [categories, setCategories] = useState(null)
    useEffect(() => {
        loadCategories()
    }, [])

    function loadCategories() {
        bookService.getCategories()
            .then(categories => setCategories(categories))
    }

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, amount } = filterByToEdit
    return (
        <section className="book-filter container">
            <h2>Filter</h2>

            <form>
                <label htmlFor="txt">Search</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="amount">Min Price</label>
                <input onChange={handleChange} value={amount || ''} name="amount" id="amount" type="number" />
            </form>

            <ul>
                {categories && categories.map(category =>
                    <li className="category" onClick={() => {
                        const target = {
                            name: 'txt',
                            value: category
                        }
                        console.log(target)
                        handleChange({ target })
                    }} key={category}>{category}</li>
                )}
            </ul>
        </section>
    )
}