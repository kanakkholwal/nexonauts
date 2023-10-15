import Image from "next/image";
import Link from "next/link";
import { BsStars } from "react-icons/bs";

export default function SectionHome() {
    return (
        <section id="home" className="relative overflow-hidden z-10 pt-35 md:pt-40 xl:pt-45">
            <div className="max-w-7xl mx-auto">
                <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden -mx-28">
                    <div className="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]" />
                    <div className="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 -u-z-10 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -u-z-10 max-w-[1204px] w-full aspect-[1204/394]">
                        <img
                            src="https://ai-tool.nextjstemplates.com/images/blur/blur-02.svg"
                            className="max-w-none"
                            style={{
                                position: "absolute",
                                height: "100%",
                                width: "100%",
                                top: 0,
                                left: 0,
                                color: "transparent",
                            }}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div className="absolute w-full h-full bg-[url(https://ai-tool.nextjstemplates.com/images/blur/blur-01.svg)] bg-no-repeat bg-cover bg-top top-0 left-1/2 -translate-x-1/2 -u-z-10"></div>
                </div>
            </div>
            <div className="mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0 relative z-1">
                <div className="text-center">
                    <span className="hero-subtitle-gradient hover:hero-subtitle-hover text-primary relative mb-5 font-medium text-sm inline-flex items-center gap-2 py-2 px-3 rounded-full">
                        <BsStars className="text-md" />
                        <span className="hero-subtitle-text">
                            Launch Your AI Toolkit
                        </span>
                    </span>
                    <h1 className=" mb-6 text-3xl font-extrabold sm:text-5xl xl:text-heading-1"  data-aos="zoom-in-up">
                        Nexo AI Toolkit
                    </h1>
                    <p className="max-w-[500px] mx-auto mb-9 font-medium md:text-lg text-slate-600"  data-aos="zoom-in-up" data-aos-delay={100}>
                        Nexo AI Toolkit is a collection of AI-powered apps that
                        help you to automate your daily tasks.
                    </p>
                    <Link className="hero-button-gradient inline-flex rounded-lg py-3 px-7 font-medium ease-in duration-300 hover:opacity-80" href="/apps">Try AI Apps</Link>
                </div>

            </div>
            <div className="mt-17 aspect-[1170/411] relative max-w-[1170px] w-full mx-auto backdrop-blur-2xl" data-aos-delay="0.1s">
                <Image alt="hero" loading="lazy" decoding="async" data-nimg="fill"
                className="mx-auto max-h-[580px] w-auto object-cover object-center rounded-3xl drop-shadow-2xl" 
                src="/assets/images/ai-toolkit.png" 
                height={411} width={1170}  data-aos="fade-up"
                data-aos-anchor-placement="center-center"/>
            
                </div>

        </section>
    );
}
