import Link from 'next/link';


export default function Header({ title, description }) {


    return (
        <>
            <nav className="G_Navbar">
                <div className="Start">
                    <button className="navToggle" data-sidenav-toggle="#sidenav">
                        <i className="fas fa-bars" />
                    </button>
                    <Link href="/" className="NavBrand">K K UPGRADER</Link>
                </div>
                <div className="End">
                    <a href="/docs/" className="NavLink">Docs</a>
                    <a href="https://github.com/kkupgrader" className="NavLink" target="_blank" rel="noreferrer">Author</a>
                    <a href="https://github.com/KKUPGRADER/genesis-ui" className="NavLink">Github</a>
                </div>
            </nav>
            <header className="G_Header">
                <h1 className="title"> {title} </h1>
                <h3 className="description"> {description} </h3>

            </header>
        </>

    )
}