import Link from "next/link";
import { BsStars } from "react-icons/bs";

export default function GetStarted() {
  return (
    <section>
      <div className="max-w-[1170px] mx-auto px-4 my-8 sm:px-8 xl:px-0">
        <div className="cta-box-gradient bg-violet-50 rounded-[30px] relative overflow-hidden px-4 py-20 lg:py-25 z-50">
          <div className="absolute z-[-1] bg-no-repeat bg-cover bg-bottom w-full h-full bottom-0 left-0 bg-[url(https://ai-tool.nextjstemplates.com/images/cta/grid.svg)]" />
          <div className="absolute -z-10 pointer-events-none inset-0 overflow-hidden">
            <span className="absolute w-full h-full left-1/2 bottom-0 -translate-x-1/2 z-[-1]">
              <img
                alt="blur"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="max-w-none"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
                src="https://ai-tool.nextjstemplates.com/images/blur/blur-22.svg"
              />
            </span>
            <span className="absolute w-full h-full left-1/2 bottom-0 -translate-x-1/2 z-[-1]">
              <img
                alt="blur"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="max-w-none"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
                src="https://ai-tool.nextjstemplates.com/images/blur/blur-23.svg"
              />
            </span>
            <span className="absolute max-w-[530px] aspect-530/253 left-1/2 bottom-0 -translate-x-1/2 -z-1">
              <img
                alt="blur"
                loading="lazy"
                decoding="async"
                data-nimg="fill"
                className="max-w-none"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
                src="/images/blur/blur-24.svg"
              />
            </span>
          </div>
          <div className="max-w-[482px] w-full h-60 overflow-hidden absolute z-[-1] -bottom-25 left-1/2 -translate-x-1/2">
            <div className="stars" />
            <div className="stars2" />
          </div>
          <div className="wow fadeInUp text-center">
            <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-3 rounded-full">
              <BsStars className="text-md" />
              <span className="hero-subtitle-text">Try our tool for Free</span>
            </span>
            <h2 className=" mb-4 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
              What are you waiting for?
            </h2>
            <p className="max-w-[714px] mx-auto font-medium mb-9 text-slate-600">
              Get started with our tool and start building AI Powered Apps
            </p>
            <Link
              className="hero-button-gradient inline-flex rounded-lg py-3 px-7  font-medium ease-in duration-300 hover:opacity-80"
              href="/signup"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
