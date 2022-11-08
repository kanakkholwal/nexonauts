import Link from "next/link";

export default function Footer() {

    return (
        <>
            <div className="G_Footer">
                <div className="Footer-section">
                    <h2 className="heading">Popular Tools</h2>
                    <ul className="Footer-links">
                        <li>
                            <Link href="/getting-started/" className="Footer-link">Get Started</Link>
                        </li>
                        <li>
                            <Link href="/docs/" className="Footer-link">Documentation</Link>
                        </li>
                        <li>
                            <Link href="/" className="Footer-link">See Demo</Link>
                        </li>
                    </ul>
                </div>
                <div className="Footer-section">
                    <h2 className="heading">Useful Tools </h2>
                    <ul className="Footer-links">
                        <li>
                            <Link href="/tools/pro-meta-tag-generator/" className="Footer-link">Meta Tag
                                Generator</Link>
                        </li>
                        <li>
                            <Link href="/tools/svg-to-css-generator/" className="Footer-link">SVG to CSS
                                Convertor</Link>
                        </li>
                    </ul>
                </div>
                <div className="Footer-section">
                    <h2 className="heading">Our Website </h2>
                    <ul className="Footer-links">
                        <li>
                            <Link href="/" className="Footer-link">K K UPGRADER</Link>
                        </li>
                        <li>
                            <a href="https://kkupgrader.blogspot.com/" className="Footer-link">Blog</a>
                        </li>
                    </ul>
                </div>
                <div className="Social">
                    <div className="Heading">Follow Us on Social Media</div>
                    <a href="https://www.instagram.com/kanakkholwal/" target="_blank" className="icon" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                            <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                    </a>
                    <a href="https://github.com/kkupgrader" target="_blank" className="icon" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                            </path>
                        </svg>
                    </a>
                    <a href="https://codepen.io/kkupgrader/" target="_blank" className="icon" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-codepen">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                            <line x1={12} y1={22} x2={12} y2="15.5" />
                            <polyline points="22 8.5 12 15.5 2 8.5" />
                            <polyline points="2 15.5 12 8.5 22 15.5" />
                            <line x1={12} y1={2} x2={12} y2="8.5" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/kanak-kholwal/" target="_blank" className="icon" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x={2} y={9} width={4} height={12} />
                            <circle cx={4} cy={4} r={2} />
                        </svg>
                    </a>
                </div>
            </div>
            <footer>
                <div className="copyright">Designed and Coded by <Link href="/" title="K K UPGRADER" className="title">K K UPGRADER</Link>
                </div>
            </footer>
        </>


    )
}