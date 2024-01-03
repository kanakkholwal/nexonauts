
import Footer from 'app/layouts/footer';
import Navbar from "app/navbar";

import { ContactForm } from "app/contact/form";

export default function Contact() {


    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="space-y-40 mb-40 max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative" id="home">
                    <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
                    </div>
                    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                        <div className="relative pt-36 ml-auto">
                            <div className="lg:w-2/3 text-center mx-auto">
                                <h1 className="text-gray-900 dark:text-white font-bold text-3xl md:text-4xl xl:text-5xl">
                                    Contact Us
                                </h1>
                                <p className="mt-6 text-base text-slate-600 dark:text-slate-400 max-w-[600px] mx-auto">
                                    Love to hear from you,
                                    Get in touch with us
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <section className="p-2 w-full mt-5">

                    <ContactForm />
                </section>

            </main>

            <Footer />

        </>
    )
}