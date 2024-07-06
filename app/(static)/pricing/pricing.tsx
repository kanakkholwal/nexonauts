import { Button } from "@/components/ui/button";

import { BsStars } from "react-icons/bs";

import Link from "next/link";

export function Pricing() {
  return (
    <>
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <span className="bg-gradient-to-b from-cyan-500 to-sky-500 text-white shadow-md mt-4 text-primary relative mb-5 font-medium text-sm inline-flex items-center gap-2 py-2 px-3 rounded-full">
            <BsStars className="text-md" />
            <span className="hero-subtitle-text">
              Launch your Developer Career
            </span>
          </span>

          <p
            className=" mx-auto mb-9 font-medium md:text-lg text-slate-600"
            data-aos="zoom-in-up"
            data-aos-delay={100}
          >
            At Nexonauts, we offer flexible plans tailored to suit every
            developer, whether you're an individual creator, a growing team, or
            an enterprise seeking comprehensive solutions.
          </p>
        </div>
        <PricingTable />
        <div className="text-center">
          <h2 className="text-3xl font-bold text-center">
            Additional Services
          </h2>
          <p
            className=" mx-auto mb-9 font-medium md:text-lg text-slate-600"
            data-aos="zoom-in-up"
            data-aos-delay={100}
          >
            We offer additional services to help you grow your business. Contact
            us for more information.
          </p>
          <ul className="my-4 space-y-2">
            <li className="flex items-center">
              <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
              Highlight your products in our marketplace for increased
              visibility.
            </li>
            <li className="flex items-center">
              <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
              Advertise your products on our platform.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function PricingTable() {
  return (
    <section className=" w-full py-12  flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-200 dark:border-slate-700 hover:border-primary transition-all duration-300 hover:translate-y-[-16px]">
            <div>
              <h3 className="text-2xl font-bold text-center">Free</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$0</span>/ month
              </div>
              <ul className="my-4 space-y-2">
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Basic access to search engine for tool discovery
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Limited marketplace browsing
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Submission of one tool to our platform
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Essential resource directory access
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link href="/signup">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
          <div className="relative flex flex-col p-6 bg-white  dark:bg-slate-800 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-cyan-500 hover:border-sky-500 transition-all duration-300 hover:translate-y-[-16px]">
            <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Popular
            </div>
            <div>
              <h3 className="text-2xl font-bold text-center">Pro</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$9.99</span>/ month
              </div>
              <ul className="my-4 space-y-2">
                <li className="flex items-center">
                  <IconCheck className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                  Full access to advanced search engine for comprehensive tool
                  discovery
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Expanded marketplace access with selling capabilities
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Submission of up to five tools
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Enhanced resource directory for learning
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-sky-500">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-200 dark:border-slate-700 hover:border-primary transition-all duration-300 hover:translate-y-[-16px]">
            <div>
              <h3 className="text-2xl font-bold text-center">Premium</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$14.99</span>/ month
              </div>
              <ul className="my-4 space-y-2">
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  All features from Pro plan
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Increased visibility in the marketplace.
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Submission of up to fifteen tools
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Priority support and exclusive resources
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link href="/signup">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
