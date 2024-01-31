import Footer from 'app/layouts/footer';
import Navbar from "app/layouts/navbar";
import Link from "next/link";


export default  async  function Page() {

    return (<>
       
            <div className="relative" id="home">
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="relative pt-36 ml-auto">
                        <div className="lg:w-2/3 text-center mx-auto">
                            <h1 className="text-gray-900 dark:text-white font-bold text-3xl md:text-4xl xl:text-5xl">
                                Terms of Service

                            </h1>


                        </div>

                    </div>
                </div>
            </div>

            <section className="font-medium text-base space-y-4 text-slate-600 dark:text-slate-400">
                <p className="mb-3 mt-8">Welcome to <span className="font-bold">{process.env.NEXT_PUBLIC_WEBSITE_NAME}</span>! These terms outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Nexonauts.com if you do not agree to all the terms and conditions stated on this page.</p>

                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice and all Agreements:</h4>
                <ul className="list-disc list-inside">
                    <li>
                        "Client", "You", and "Your" refer to you, the person accessing this website and accepting the Company's terms and conditions.

                    </li>
                    <li>
                        "The Company", "Ourselves", "We", "Our", and "Us", refer to Nexonauts.com.

                    </li>
                    <li>
                        "Party", "Parties", or "Us", refers to both the Client and ourselves.

                    </li>
                </ul>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Cookies</h4>
                <p>We employ the use of cookies. By accessing Nexonauts.com, you agreed to use cookies in agreement with the Nexonauts.com's <Link href="/privacy" className="font-bold italic text-primary hover:underline">Privacy Policy</Link>.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">License</h4>
                <p>Unless otherwise stated, Nexonauts.com and/or its licensors own the intellectual property rights for all material on Nexonauts.com. All intellectual property rights are reserved. You may access this from Nexonauts.com for your own personal use subjected to restrictions set in these terms and conditions.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">You must not:</h4>
                <ul className="list-disc list-inside">
                    <li>
                    Republish material from Nexonauts.com
                    </li>
                    <li>
                    Sell, rent, or sub-license material from Nexonauts.com
                    </li>
                    <li>
                    Reproduce, duplicate, or copy material from Nexonauts.com
                    </li>
                    <li>
                    Redistribute content from Nexonauts.com
                    </li>
                </ul>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Reservation of Rights</h4>
                <p>We reserve the right to request that you remove all links or any particular link to our website. You approve to immediately remove all links to our website upon request. We also reserve the right to amend these terms and conditions and it's linking policy at any time. By continuously linking to our website, you agree to be bound to and follow these linking terms and conditions.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Removal of Links from Our Website</h4>
                <p>If you find any link on our website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Content Liability</h4>
                <p>We shall not be held responsible for any content that appears on your website. You agree to protect and defend us against all claims that arise on your website. No link(s) should appear on any website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Disclaimer</h4>
                <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
                <ul className="list-disc list-inside">
                    <li>
                    limit or exclude our or your liability for death or personal harm
                    </li>
                    <li>
                    limit or exclude our or your liability for fraud or fraudulent misrepresentation
                    </li>
                    <li>
                    limit any of our or your liabilities in any way that is not permitted under applicable law
                    </li>
                    <li>
                    exclude any of our or your liabilities that may not be excluded under applicable law
                    </li>
                </ul>
            <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Contact Us</h4>
                <p>For any inquiries or concerns regarding our Terms of Service, please contact us at   <Link href="/contact" className="font-bold italic text-primary hover:underline">Contact Us</Link></p>
            </section>
     

    </>)
}