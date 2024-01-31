import Footer from 'app/layouts/footer';
import Navbar from "app/layouts/navbar";
import Link from "next/link";


export default  async function Page() {

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
                                Privacy Policy
                            </h1>


                        </div>

                    </div>
                </div>
            </div>

            <section className="font-medium text-base space-y-4 text-slate-600 dark:text-slate-400">
                <p className="mb-3 mt-8">At <span className="font-bold">{process.env.NEXT_PUBLIC_WEBSITE_NAME}</span>,we understand the importance of protecting your privacy and personal information. This privacy policy explains the type of information we collect,how we use it,and how we protect it.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Information We Collect</h4>
                <p>We collect personal information that is necessary for us to provide our services to you. This includes the information you provide when you contact us,register for an account,and use our services. We may ask for your name,email address,phone number,company name,address,and other contact information.</p>
                <p>We may also collect information about how you use our website and services,including your IP address,browser type,internet service provider,date and time stamp,referring/exit pages,and the number of clicks. We use this information to analyze trends,administer the site,track user movements,and gather demographic information.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">How We Use Your Information</h4>
                <p>We use the information we collect to provide,operate,and maintain our website,improve and personalize your experience,develop new products and services,and communicate with you directly or through our partners. We may also use your information for customer service,fraud prevention,and marketing purposes.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Log Files</h4>
                <p>We use log files to track the use of our website. These files include information such as your IP address,browser type,internet service provider,date and time stamp,referring/exit pages,and the number of clicks. This information is used to analyze trends,administer the site,track user movements,and gather demographic information. This information is not linked to any personally identifiable information.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Cookies and Web Beacons</h4>
                <p>Like most websites,{process.env.NEXT_PUBLIC_WEBSITE_NAME} uses cookies to store information about your preferences and the pages you visit on our website. Cookies are small data files that are stored on your device. We use cookies to personalize your experience and optimize our website's performance.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Our Advertising Partners</h4>
                <p>We work with third-party advertising partners,including Google,to serve ads to our site visitors. These partners may use cookies and web beacons to collect information about your browsing behavior on our website and other sites. This information is used to personalize advertising content and measure the effectiveness of advertising campaigns.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Third-Party Privacy Policies</h4>
                <p>Our privacy policy does not apply to third-party advertisers or websites. We advise you to consult the privacy policies of these third-party ad servers for more information about their practices and instructions on how to opt-out of certain options.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">CCPA Privacy Rights</h4>
                <p>Under the California Consumer Privacy Act(CCPA),California consumers have the right to request that a business that collects their personal data disclose the categories and specific pieces of personal data that the business has collected about them. They also have the right to request that the business delete any personal data about them that it has collected and to opt-out of the sale of their personal data.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">GDPR Data Protection Rights</h4>
                <p>Under the General Data Protection Regulation(GDPR),users have the right to access their personal data and request that it be corrected or erased. We take data protection seriously and will make every effort to respond to these requests in a timely and efficient manner.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Data Security</h4>
                <p>We take the security of your personal information seriously and use industry-standard practices to protect it from unauthorized access,disclosure,alteration,or destruction.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Updates to This Policy</h4>
                <p>We reserve the right to update this policy at any time. We encourage you to review this policy periodically to stay informed about how we collect,use,and protect your personal information.</p>
                <h4 className="mb-4 text-xl font-semibold leading-7 tracking-wide text-slate-700 dark:text-slate-200">Contact Us</h4>
                <p>If you have any questions or concerns about our privacy policy,please contact us at  <Link  href="/contact"  className="font-bold italic text-primary hover:underline">Contact Us</Link></p>
            </section>
       

    </>)
}