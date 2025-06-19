const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { NotFound } from "./cmps/NotFound.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {

    // const [page, setPage] = useState('home')

    return (
        <Router>
            <section className="app">
                <AppHeader />
                {/* <AppHeader onSetPage={(page) => setPage(page)} /> */}

                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/books" element={<BookIndex />} />

                        <Route path="/books/:bookId" element={<BookDetails />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>

                    {/* {page === 'home' && <HomePage />}
                {page === 'about' && <About />}
                {page === 'books' && <BookIndex />} */}
                </main>
            </section>
        </Router>
    )
}