const { NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header container">
            <section>
                <h1>Miss Books App</h1>
                <nav className="app-nav">
                    <NavLink to="/home" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/books" >Books</NavLink>


                    {/* <a onClick={() => onSetPage('home')}>Home</a>
                    <a onClick={() => onSetPage('about')}>About</a>
                    <a onClick={() => onSetPage('books')}>Books</a> */}
                </nav>
            </section>
        </header>
    )
}