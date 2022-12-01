import Home from "../_Home.module.scss";
import Image from 'next/image';
import Link from 'next/link';

export default function Content({ content, link, ImageUrl, index }) {



    return (
        <>
            <div className={Home.Image} data-aos="fade-up-left">
                <Image src={ImageUrl} loading="lazy" />
            </div>

            <div className={Home.Info}>

                <div className={Home.Card} data-aos="fade-up-right">
                    <p>
                        {content}
                    </p>
                </div>
                <div className={Home.Button} data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom">

                    <Link data-aos="fade-up" data-aos-anchor-placement="top-bottom" className={Home.SectionBtn} href={link?.path}>{link?.title}</Link>
                </div>
            </div>

        </>
    )
}
