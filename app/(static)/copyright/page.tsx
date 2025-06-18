import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="relative" id="home">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-linear-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-linear-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative pt-36 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-gray-900 dark:text-white font-bold text-3xl md:text-4xl xl:text-5xl">
                Copyright Disclaimer
              </h1>
            </div>
          </div>
        </div>
      </div>

      <section className="font-medium text-base space-y-4 text-slate-600 dark:text-slate-400">
        <p className="mb-3 mt-8">
          At{" "}
          <span className="font-bold">
            {process.env.NEXT_PUBLIC_WEBSITE_NAME}
          </span>
          , we value intellectual property rights and strive to uphold copyright
          laws. The content, including images, graphics, and text, utilized on
          this platform, is sourced from various free resources such as Freepik,
          Pexels, and other similar platforms, where the rights belong to their
          respective owners.
        </p>
        <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">
          Fair Use Statement
        </h4>
        <p className="mb-3">
          Our platform operates under the principles of fair use. We utilize
          copyrighted material for educational, informational, or illustrative
          purposes only, always attributing the content to its original creators
          or sources where applicable.
        </p>
        <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">
          Acknowledgment of Ownership
        </h4>
        <p>
          All copyrighted material used on Nexonauts.com is acknowledged to its
          respective owners. We do not claim ownership or rights over any
          copyrighted material that isn't developed or created by our team.
        </p>
        <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">
          DMCA Compliance
        </h4>
        <p>
          Nexonauts.com complies with the Digital Millennium Copyright Act
          (DMCA). If you believe that your copyrighted work has been used on our
          platform in a manner that constitutes copyright infringement, please
          contact us immediately with the necessary details for prompt removal
          or appropriate credit.
        </p>
        <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">
          Contact Information
        </h4>
        <p>
          For any copyright-related queries, concerns, or takedown requests,
          please contact us at{" "}
          <Link
            href="/contact"
            className="font-bold italic text-primary hover:underline"
          >
            Contact Us
          </Link>
          .
        </p>
      </section>
    </>
  );
}
