import { bookService } from "../services/books.service.js"

const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    const [categories, setCategories] = useState(null)
    useEffect(() => {
        loadCategories()
    }, [])

    function loadCategories() {
        console.log('categories...')
    }
}