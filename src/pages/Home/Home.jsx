import { useEffect, useState } from 'react';
import Link from 'next/link';
import HomeClass from "./_Home.module.scss";
import PageMetaData from "../../components/PageMetaData";
import Logo from "../../components/Logo";


export default function HomePage() {
    const highlight = true;
    const [open, SetOpen] = useState(false);

    useEffect(() => {
        const navbar = document.querySelector("." + HomeClass.navbar);


        window.addEventListener("scroll", function () {
            navbar.classList.toggle(HomeClass.scrolled, window.scrollY > 10);
        });

        // Section Highlight
        if (highlight) {
            window.addEventListener("scroll", function () {
                const scrollY = window.pageYOffset;
                document.querySelectorAll("section[id]").forEach((section) => {
                    if (scrollY > (section.offsetTop - 50) && scrollY <= (section.offsetTop - 50) + section.offsetHeight)
                        document.querySelector(`a[href*="${section.id}"]`).parentElement.classList.add(HomeClass.active);
                    else
                        document.querySelector(`a[href*="${section.id}`).parentElement.classList.remove(HomeClass.active);

                });
            });

        }
    }, [highlight]);
    return (
        <div>
            <PageMetaData />
            <div className={HomeClass.Home}>

                <header>
                    <nav className={HomeClass.navbar}>
                        <div className={HomeClass.navBrand}>
                            <Link href="/" title="K K UPGRADER" className={HomeClass.logo}>
                                <Logo style={{ marginTop: "-0.75rem" }} />
                            </Link>
                        </div>
                        <div className={HomeClass.navContent}>
                            <div className={HomeClass.navToggler + (open ? (" " + HomeClass.active) : "")} onClick={() => SetOpen(!open)}>
                                <span /><span /><span />
                            </div>
                            <ul className={HomeClass.navList + (open ? (" " + HomeClass.open) : "")} id="menu">
                                <li className={HomeClass.navItem}><a href="#About" className={HomeClass.navLink} data-section="About">About</a></li>
                                <li className={HomeClass.navItem}><a href="#Tools" className={HomeClass.navLink} data-section="Tools">Tools</a></li>
                                <li className={HomeClass.navItem}><a href="#Blog" className={HomeClass.navLink} data-section="Blog">Blog</a></li>
                                <li className={HomeClass.navItem}><a href="#Projects" className={HomeClass.navLink} data-section="Projects">Projects</a></li>
                            </ul>
                        </div>
                    </nav>
                    <section className={HomeClass.heroContainer}>
                        <div className={HomeClass.heroContent}>
                            <h1 className={HomeClass.heroHeading}>
                                K K UPGRADER
                            </h1>
                            <h5 className={HomeClass.heroParagraph}>
                                Blogging, Internet Tools and Coding Tips.
                            </h5>
                        </div>
                    </section>
                </header>

                <main className={HomeClass.home}>
                    <section id="About">
                        <div className={HomeClass.sectionImg}>
                            <img src='../../assets/svg-images/about-us.svg' alt="About Us" loading="lazy" width="auto" height="auto" />
                        </div>
                        <div className={HomeClass.sectionContent}>
                            <h1>About Us</h1>
                            <h3>K K UPGRADER</h3>
                            <p>Hey There, I am Kanak Kholwal and I am a Frontend Developer and I share Web Development tips and
                                tricks , Internet Tools and Blog Articles on this site.</p>
                            <Link href="./portfolio/" className="btn btn-success external-link ripple">Visit Portfolio</Link>
                        </div>
                    </section>
                    <section id="Tools">
                        <div className={HomeClass.sectionImg}>
                            <img src="../../assets/svg-images/projects.svg" alt="Tools" loading="lazy" width="auto" height="auto" />
                        </div>
                        <div className={HomeClass.sectionContent}>
                            <h1>Tools</h1>
                            <p>Free to Use Internet Tools for everyone. From Text to Handwriting ,Svg designing ,Css Generator to
                                Meta Tag Generator ,JavaScript Beautifier &amp; Minifier Tools and many More
                            </p>
                            <div className={HomeClass.showCase}>
                                <Link href="/tools/" className="btn ">Use Tools</Link>

                            </div>
                        </div>
                    </section>
                    <section id="Blog">
                        <div className={HomeClass.sectionImg}>
                            <img src='../../assets/svg-images/blogging.svg' alt="Blogging" loading='lazy' width="auto" height="auto" />
                        </div>
                        <div className={HomeClass.sectionContent}>
                            <h1>Blog</h1>
                            <h3><a href="https://kkupgrader.blogspot.com" target="_blank" rel='noreferrer'>kkupgrader.blogspot.com</a></h3>
                            <p>News , Information , Tech Tips and Tricks ,Blogger, Awesome Css and Java Codes and Much More...
                            </p>
                            <div className={HomeClass.showCase}>
                                <a href="https://kkupgrader.blogspot.com" className="btn " target="_blank">Blog Posts</a>

                            </div>

                        </div>
                    </section>
                    <section id="Projects">
                        <div className={HomeClass.sectionImg}>
                            <img src="../../assets/svg-images/projects.svg" alt="Projects" loading="lazy" width="auto" height="auto" />
                        </div>
                        <div className={HomeClass.sectionContent}>
                            <h1>Projects</h1>
                            <h3>K K UPGRADER</h3>
                            <p>Many Projects have been created by us from very basic like calculator and Webpage clone to major
                                website and nowadays I am working on a personalized library framework like Bootstrap.</p>
                            <Link href="/projects/" className="btn btn-danger ripple-effect">Projects</Link>
                        </div>
                    </section>
                </main>
                <div className={HomeClass.ContactsSection}>
                    <form id="contactForm" name="contactForm" action="POST" data-netlify="true" method="POST" onSubmit={(e) => e.preventDefault()}>
                        <div className="G_Form-element">
                            <input type="email" name="Email" id="email" placeholder="Enter your email address ..." className="G_Form-input" defaultValue={""} required />
                            <label htmlFor="email" className="G_Form-label">Email</label>
                        </div>

                        <div className="G_Form-element">
                            <input type="name" name="Name" id="subject" placeholder="Subject..." className="G_Form-input form-lg" required defaultValue={""} />
                            <label htmlFor="name" className="G_Form-label">Subject</label>
                        </div>
                        <div className="G_Form-element">
                            <textarea name="Subject" id="body" cols={30} rows={10} className="G_Form-textarea" placeholder="Enter Message" required defaultValue={""} />
                            <label htmlFor="Subject" className="G_Form-label"> Message:</label>
                        </div>
                        {/* <div data-netlify-recaptcha="true"></div> */}
                        <button type="submit" className="G_Form-submit">submit</button>
                    </form>
                    <div className={HomeClass.ContactInfo}>
                        <h2>Have projects in
                            mind or want to discuss ? <span>
                                Let's Talk! </span>
                        </h2>
                        <p>Have a project in mind? Looking to partner or work together? Reach out through the form and I'll get
                            back to you in the next 48 hours.
                        </p>
                        <div className={HomeClass.ContactSocial}>
                            <a href="https://www.instagram.com/kanakkholwal/" className={HomeClass.icon} title="Instagram" rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg></a>
                            <a href="https://github.com/kkupgrader" className={HomeClass.icon} title="Github" rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                    </path>
                                </svg></a>
                            <a href="https://codepen.io/kkupgrader/" className={HomeClass.icon} title="Codepen" rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-codepen">
                                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                                    <line x1={12} y1={22} x2={12} y2="15.5" />
                                    <polyline points="22 8.5 12 15.5 2 8.5" />
                                    <polyline points="2 15.5 12 8.5 22 15.5" />
                                    <line x1={12} y1={2} x2={12} y2="8.5" />
                                </svg></a>
                            <a href="https://www.linkedin.com/in/kanak-kholwal/" className={HomeClass.icon} title="LinkedIn" rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x={2} y={9} width={4} height={12} />
                                    <circle cx={4} cy={4} r={2} />
                                </svg> </a>
                        </div>
                    </div>
                </div>

                <footer className={HomeClass.home}>
                    <div className={HomeClass.copyright}>Copyright <Link href="/" title="K K UPGRADER">K K UPGRADER</Link> © <span>{new Date().getFullYear()}</span></div>
                    <div className={HomeClass.social}>
                        <a href="https://www.instagram.com/kanakkholwal/" className={HomeClass.icon} title="Instagram" rel='noreferrer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                                <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg></a>
                        <a href="https://github.com/kkupgrader" className={HomeClass.icon} title="Github" rel='noreferrer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                </path>
                            </svg></a>
                        <a href="https://codepen.io/kkupgrader/" className={HomeClass.icon} title="Codepen" rel='noreferrer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-codepen">
                                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                                <line x1={12} y1={22} x2={12} y2="15.5" />
                                <polyline points="22 8.5 12 15.5 2 8.5" />
                                <polyline points="2 15.5 12 8.5 22 15.5" />
                                <line x1={12} y1={2} x2={12} y2="8.5" />
                            </svg></a>
                        <a href="https://www.linkedin.com/in/kanak-kholwal/" className={HomeClass.icon} title="LinkedIn" rel='noreferrer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x={2} y={9} width={4} height={12} />
                                <circle cx={4} cy={4} r={2} />
                            </svg> </a>
                    </div>
                </footer>

            </div>
        </div>
    )
}