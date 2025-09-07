import Image from "next/image";

import { ArrowUpRight, Settings } from "lucide-react";

import { ButtonLink } from "@/components/utils/link";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoAnalyticsSharp } from "react-icons/io5";

export default async function Page() {
  return (
    <>
      <section className="relative" id="home">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-linear-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-linear-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative pt-36 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto mb-5">
              <h1 className="text-foreground font-bold text-3xl md:text-4xl xl:text-5xl">
                Empowering Developers, One Innovation at a Time
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-6  relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-linear-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-linear-to-r from-teal-400 to-sky-300 dark:to-indigo-600" />
        </div>
        <div className="flex gap-6 items-start w-full flex-col lg:flex-row lg:items-center">
          <div className="space-y-4">
            <p className="text-lg  text-primary font-semibold uppercase text-left">
              Our Mission
            </p>
            <h4 className="text-2xl md:text-3xl xl:text-4xl text-foreground text-left font-bold">
              To empower developers to build innovative products
            </h4>
            <p className="text-muted-foreground text-left">
              Welcome to Nexonauts.com, the brainchild of a passionate developer
              driven by the mission to simplify the development journey for
              fellow creators. As the sole visionary behind this platform, I'm
              committed to building a vibrant ecosystem that fuels creativity,
              collaboration, and growth for developers worldwide.
            </p>
          </div>
          <Image
            src={"/assets/images/about_1.png"}
            alt="values"
            priority
            width={1380}
            height={720}
            className="w-full h-auto rounded-xl max-w-xl shadow-lg"
            draggable={false}
          />
        </div>
      </section>
      <section className="space-y-6  relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-linear-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-linear-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        <p className="text-lg md:text-xl xl:text-2xl text-primary font-semibold uppercase text-center">
          Our Value
        </p>
        <h4 className="text-2xl md:text-3xl xl:text-4xl text-foreground text-center font-bold">
          The fundamental principles guiding NexoNauts
        </h4>
        <div className="flex gap-6 items-start w-full flex-col lg:flex-row lg:items-stretch">
          <div className="space-y-4">
            <div className="mt-8 flex gap-4 md:items-center">
              <div className="w-12 h-12 gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex justify-center items-center">
                <Settings
                  size={24}
                  className="w-6 h-6 m-auto text-indigo-600 dark:text-indigo-400"
                />
              </div>
              <div className="w-5/6">
                <h3 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">
                  Execution
                </h3>
                <p className="text-muted-foreground">
                  We're dedicated to making your development goals a reality,
                  not just abstract concepts. From ideation to implementation,
                  we ensure effective execution that drives your online success.
                </p>
              </div>
            </div>
            <div className="pt-4 flex gap-4 md:items-center">
              <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">
                <FaRegCircleCheck
                  size={24}
                  className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400"
                />
              </div>
              <div className="w-5/6">
                <h3 className="font-semibold text-lg text-gray-700 dark:text-teal-300">
                  Accountability
                </h3>
                <p className="text-muted-foreground">
                  {" "}
                  As a solo founder, I take personal ownership of every aspect
                  of our platform. I keep you informed at every step, holding
                  myself accountable for the strategies implemented and the
                  results delivered.
                </p>
              </div>
            </div>
            <div className="pt-4 flex gap-4 md:items-center">
              <div className="w-12 h-12 flex gap-4 rounded-full bg-sky-100 dark:bg-sky-900/20">
                <IoAnalyticsSharp
                  size={24}
                  className="w-6 h-6 m-auto text-sky-600 dark:text-sky-400"
                />
              </div>
              <div className="w-5/6">
                <h3 className="font-semibold text-lg text-gray-700 dark:text-sky-300">
                  Result
                </h3>
                <p className="text-muted-foreground">
                  Our ultimate goal isn't just about enhancing rankings; it's
                  about bolstering your online presence, driving traffic, and
                  ensuring tangible, measurable outcomes for your projects.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-16 w-full  mx-auto p-4 rounded-lg">
            <Image
              src={"/assets/images/about_2.png"}
              alt="values"
              width={1380}
              height={720}
              className="w-full h-auto rounded-xl  max-w-4xl mix-blend-multiply"
              draggable={false}
            />
          </div>
        </div>
      </section>

      <section className="space-y-6 relative mt-8 bg-card p-8 rounded-2xl">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-linear-to-br from-primary to-red-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-linear-to-r from-primary/30 to-sky-300 dark:to-indigo-600" />
        </div>
        <h4 className="text-xl md:text-3xl  text-foreground text-center font-bold">
          Join the Journey
        </h4>
        <p className="text-base md:text-lg  text-muted-foreground text-center max-w-4xl mx-auto">
          Whether you're a seasoned developer or just stepping into the world of
          coding, Nexonauts.com is your partner in innovation. Join me on this
          journey as we redefine what's possible in the realm of development.
        </p>
        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
          <ButtonLink
            href="/signup"
            variant="gradient_purple"
            rounded="full"
            size="lg"
            width="xs"
            transition="damped"
            effect="expandIcon"
          >
              Get started
              <ArrowUpRight/>
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
