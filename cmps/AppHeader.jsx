export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header container">
            <section>
                <h1>Miss Books App</h1>
                <nav className="app-nav">
                    <a onClick={() => onSetPage('home')}>Home</a>
                    <a onClick={() => onSetPage('about')}>About</a>
                    <a onClick={() => onSetPage('books')}>Books</a>
                </nav>
            </section>
        </header>
    )
}