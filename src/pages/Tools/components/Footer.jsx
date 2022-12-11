import Link from "next/link";
import component from "./_components.module.scss";
import { RxChevronRight } from "react-icons/rx";

export default function Footer({ FooterData }) {

    return (
        <>
            <div className={component.Container + " " + component.Footer}>
                <div className={component.FooterSection}>
                    <h2 className={component.Heading}>{FooterData.Links.Heading}</h2>
                    <hr className={component.LineBreak} />
                    <ul>
                        {
                            FooterData.Links.LinkList?.map(({ name, url }, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={url} className={component.FooterLink}><RxChevronRight /> {name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className={component.FooterSection}>
                    <h3 className={component.Heading}>{FooterData.About.title}</h3>
                    {
                        FooterData.About.description && (<p>{FooterData.About.description}</p>)
                    }
                    <hr className={component.LineBreak} />
                    {FooterData.About.LinkList && (<ul>
                        {
                            FooterData.About.LinkList?.map(({ name, url }, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={url} className={component.FooterLink}><RxChevronRight /> {name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>)}

                    <div className={component.Social}>
                        <h4 className={component.SubHeading}>Follow Us on Social Media</h4>
                        {

                            FooterData.About.Social?.map(({ name, icon, url }, index) => {
                                return (<Link href={url} target="_blank" className="icon" rel="noreferrer" key={index} title={name}>{icon}</Link>)
                            })
                        }

                    </div>
                </div>
            </div>
            <footer className={component.footer}>
                <div className={component.Container}>
                    <p className={component.copyright}>
                        Copyright  © {new Date().getFullYear()} <Link href={"/"}>kkupgrader</Link> . All rights reserved.
                    </p>
                    <p>Design and Coded by <strong>Kanak</strong> </p>

                </div>
            </footer>
        </>


    )
}