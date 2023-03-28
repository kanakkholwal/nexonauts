import classes from "./_Home.module.scss";
import { IoArrowForwardOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../Home"

const ImgLoader = ({ src, width, quality }) => {
    return `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://kkupgrader.eu.org"}/${src}?w=${width}&q=${quality || 75}`
}

export default function Main({ data }) {

    const { DarkMode } = useContext(ThemeContext);

    return (
        <main>
            <article>

                <section className={classes.Section + " " + classes.Hero} id="home">
                    <div className={classes.Container}>
                        <figure className={classes.Hero_banner}>
                            <Image loader={ImgLoader} loading="lazy" src={data.hero.image} style={{ borderRadius: "10px" }} width={560} height={540} alt="Kanak Kholwal" className={classes.w_100} data-aos="fade-up" />
                        </figure>
                        <div className={classes.Hero_content}>
                            <h1 className={classes.h1 + " " + classes.Hero_title} data-aos="fade-up" data-aos-delay="500">{data.hero.title}</h1>
                            <p className={classes.Section_text} data-aos="fade-up" data-aos-delay="750"> {data.hero.subtitle} </p>
                            <div className={classes.btnWrapper} data-aos="fade-up" data-aos-delay="1000">
                                <a href="#projects" className={classes.btn + " " + classes.btnPrimary}>See My Works</a>
                                <a href="https://drive.google.com/file/d/1eDCwqX_0UnY_wwKR2N5ODrpsb5ub6VP5/view?usp=sharing" className={classes.btn + " " + classes.btnSecondary}>Resume <FiExternalLink /></a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={classes.Section + " " + classes.about} id="about">
                    <div className={classes.Container}>
                        <div className={classes.Wrapper}>
                            <div data-aos="fade-right">
                                <h2 className={classes.h2 + " " + classes.Section_title}>{data.sections.about.title}</h2>
                                <p className={classes.Section_text}>{data.sections.about.description}</p>
                            </div>
                            <ul className={classes.Progress_list} data-aos="fade-left">
                                {
                                    data.sections.about.skills?.map(({ name, percentage, color }, index) => {
                                        return (
                                            <li className={classes.Progress_item} key={index}>
                                                <div className={classes.LabelWrapper}>
                                                    <p>{name}</p>
                                                    <span className={classes.span}>{percentage.toString() + "%"}</span>
                                                </div>
                                                <div className={classes.Progress}>
                                                    <div className={classes.Progress_fill} style={
                                                        {
                                                            "--width": percentage.toString() + "%",
                                                            "--bg": color
                                                        }} />
                                                </div>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                        {/* <ul className={classes.gridList}>
                            <li data-aos="fade-bottom">
                                <div className={classes.AboutCard}>
                                    <div className={classes.Card_icon}>
                                        <Image loader={ImgLoader} loading="lazy" src="./assets/images/icon-1.svg" width={52} height={52} loading="lazy" alt="web design icon" />
                                    </div>
                                    <h3 className={classes.h4 + " " + classes.Card_title}>Web Design</h3>
                                    <p className={classes.Card_text}>
                                        Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Cras
                                        justo cum sociis natoque magnis.
                                    </p>
                                </div>
                            </li>
                            <li data-aos="fade-bottom" data-aos-delay="250">
                                <div className={classes.AboutCard}>
                                    <div className={classes.Card_icon}>
                                        <Image loader={ImgLoader} loading="lazy" src="./assets/images/icon-2.svg" width={52} height={52} loading="lazy" alt="mobile design icon" />
                                    </div>
                                    <h3 className={classes.h4 + " " + classes.Card_title}>Mobile Design</h3>
                                    <p className={classes.Card_text}>
                                        Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Cras
                                        justo cum sociis natoque magnis.
                                    </p>
                                </div>
                            </li>
                            <li data-aos="fade-bottom" data-aos-delay="500">
                                <div className={classes.AboutCard}>
                                    <div className={classes.Card_icon}>
                                        <Image loader={ImgLoader} loading="lazy" src="./assets/images/icon-3.svg" width={52} height={52} loading="lazy" alt="web development icon" />
                                    </div>
                                    <h3 className={classes.h4 + " " + classes.Card_title}>Development</h3>
                                    <p className={classes.Card_text}>
                                        Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Cras
                                        justo cum sociis natoque magnis.
                                    </p>
                                </div>
                            </li>
                            <li data-aos="fade-bottom" data-aos-delay="750">
                                <div className={classes.AboutCard}>
                                    <div className={classes.Card_icon}>
                                        <Image loader={ImgLoader} loading="lazy" src="./assets/images/icon-4.svg" width={52} height={52} loading="lazy" alt="web seo icon" />
                                    </div>
                                    <h3 className={classes.h4 + " " + classes.Card_title}>SEO</h3>
                                    <p className={classes.Card_text}>
                                        Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Cras
                                        justo cum sociis natoque magnis.
                                    </p>
                                </div>
                            </li>
                        </ul> */}
                    </div>
                </section>

                <section className={classes.Section + " " + classes.project} id="projects">
                    <div className={classes.Container}>
                        <div className={classes.TitleWrapper} data-aos="fade-down">
                            <div>
                                <h2 className={classes.h2 + " " + classes.Section_title} id="project-label">{data?.sections?.projects?.title}</h2>
                                <p className={classes.Section_text}>{data?.sections?.projects?.description}</p>
                            </div>
                            <Link href="/projects" className={classes.btn + " " + classes.btnSecondary}>See All Projects</Link>
                        </div>
                        <div className={classes.gridList}>
                            {data?.sections?.projects?.list?.map(({ category, title, image, theme, description, link }, i) => {
                                return (
                                    <div className={classes.Projects_card} style={{ backgroundColor: DarkMode ? theme.bg.dark : theme.bg.light }} key={i}>
                                        <div className={classes.Card_content} data-aos="fade-right">
                                            <p className={classes.Card_tag} style={{ color: DarkMode ? theme.color.dark : theme.color.light }}>{category}</p>
                                            <h3 className={classes.h3 + " " + classes.Card_title} title={title}>{title}</h3>
                                            <p className={classes.Card_text}>
                                                {description}
                                            </p>
                                            <Link href={link} className={classes.btn_text} style={{ color: DarkMode ? theme.color.dark : theme.color.light }} title={"See Project : " + title}>
                                                <span className={classes.span}>See Project</span>
                                                <IoArrowForwardOutline />
                                            </Link>
                                        </div>
                                        <figure className={classes.Card_banner} data-aos="fade-left">
                                            <Image loader={ImgLoader} loading="lazy" src={image} width={650} height={370} alt={category + " - " + title} className={classes.w_100} />
                                        </figure>
                                    </div>
                                )
                            })}
                        </div>
                    </div >
                </section>

                <section className={classes.Section + " " + classes.Blog} id="blog">
                    <div className={classes.Container}>
                        <div className={classes.Projects_card}>
                            <div className={classes.Card_content}>
                                <h3 className={classes.h3 + " " + classes.Card_title} title={"Blog"} data-aos="fade-up" data-aos-delay="100">{data?.sections?.blog.title}</h3>
                                <p className={classes.Card_tag} data-aos="fade-up" data-aos-delay="150"> <a href={data?.sections?.blog.link}>{data?.sections?.blog.blogName}</a> </p>
                                <p className={classes.Card_text} data-aos="fade-up" data-aos-delay="250">{data?.sections?.blog.description}
                                </p>
                                <a href={data?.sections?.blog.link} className={classes.btn_text} >
                                    <span className={classes.span}>Visit Blog</span>
                                    <IoArrowForwardOutline />
                                </a>
                            </div>
                            <figure className={classes.Card_banner} data-aos="fade-left">
                                <Image loader={ImgLoader} src={data.sections.blog.image} width={650} height={370} loading="lazy" alt={"Blogging"} className={classes.w_100} />
                            </figure>
                        </div>

                    </div>
                </section>

                <section className={classes.Section + " " + classes.contact} id="contact">
                    <div className={classes.Container}>
                        <div className={classes.Contact_card}>
                            <div className={classes.Contact_content} data-aos="fade-right">
                                <div className={classes.Card_icon}>
                                    <Image loader={ImgLoader} src="./assets/images/icon-5.svg" width={44} height={44} loading="lazy" alt="envelop icon" />
                                </div>
                                <h2 className={classes.h2 + " " + classes.Section_title}>If you like what you see, let's work together.</h2>
                                <p className={classes.Section_text}>
                                    I bring rapid solutions to make the life of my clients easier. Have any questions? Reach out to me from
                                    this contact form and I will get back to you shortly.
                                </p>
                            </div>
                            <form action="true" className={classes.contactForm} data-aos="fade-left">
                                <div className={classes.inputWrapper}>
                                    <input type="text" name="name" placeholder="Name *" required className={classes.inputField} />
                                    <input type="email" name="email_address" placeholder="Email *" required className={classes.inputField} />
                                </div>
                                <textarea name="message" placeholder="Message *" required className={classes.inputField} defaultValue={""} />
                                <button type="submit" className={classes.btn + " " + classes.btnSecondary}>Send message</button>
                            </form>
                        </div>
                    </div>
                </section>

            </article >
        </main >
    )
}