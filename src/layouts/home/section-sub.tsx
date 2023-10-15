
export default function SubsScribe() {
    return (<section className="pt-17 sm:pt-22 xl:pt-27 pb-11">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-10">
                <div className="max-w-[352px] w-full">
                    <h3 className="font-semibold text-heading-5 text-2xl  mb-2">News &amp; Update</h3>
                    <p className="font-medium text-slate-600">Keep up to date with everything about our tool</p>
                </div><div className="max-w-[534px] w-full">
                    <form>
                        <div className="flex items-center gap-4">
                            <div className="max-w-[395px] w-full">
                                <input id="newsletterEmail" type="email" placeholder="Enter your Email" className="rounded-lg border border-white/[0.12] bg-slate-100 focus:border-purple w-full py-3 px-6 outline-none " name="newsletterEmail" />
                            </div>
                            <button className="hero-button-gradient relative rounded-lg  text-sm flex items-center gap-1.5 py-3.5 px-7 shadow-button hover:button-gradient-hover hover:shadow-none">Subscribe</button>
                        </div></form>
                </div></div></div>
    </section>)
}