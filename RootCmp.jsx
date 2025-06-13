const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

export function RootCmp() {

    const [page, setPage] = useState('home')

    return (
        <section className="app">
            <AppHeader onSetPage={(page) => setPage(page)} />

            <main>
                {page === 'home' && <HomePage />}
                {page === 'about' && <About />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )
}