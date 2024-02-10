import Link from "next/link";

export default function HeroLayout() {

	return (
		<div className="relative" id="home">
			<div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
				<div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
				<div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
			</div>
			<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
				<div className="relative pt-36 ml-auto">
					<div className="lg:w-3/4 text-center mx-auto">
						<h1 className=" font-bold text-5xl md:text-6xl xl:text-7xl relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-300  dark:from-sky-600 dark:to-purple-300">
							Develop with Confidence {`\n`} Innovate with Ease
							{/* <span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">reimagination.</span> */}
						</h1>
						<p className="mt-8 font-medium text-base text-gray-700 dark:text-gray-300">
							{/* Build your next big thing with the best tools and resources available. Our platform is designed to help you create, innovate, and grow your developer experience. */}
							Welcome to our developer-centric platform, which is designed to help you create amazing digital products and services.
						</p>
						<div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
							<Link href="/signup" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
								<span className="relative text-base font-semibold text-white">Get started</span>
							</Link>
							<Link href="#" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
								<span className="relative text-base font-semibold text-primary dark:text-white">Learn more</span>
							</Link>
						</div>
						
					</div>
					{/* <div className="mt-12  grid-cols-3 sm:grid-cols-4 md:grid-cols-6 hidden">
						<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
							<img src="./images/clients/microsoft.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
						</div>
						<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
							<img src="./images/clients/airbnb.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
						</div>
						<div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
							<img src="./images/clients/google.svg" className="h-9 w-auto m-auto" loading="lazy" alt="client logo" />
						</div>
						<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
							<img src="./images/clients/ge.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
						</div>
						<div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
							<img src="./images/clients/netflix.svg" className="h-8 w-auto m-auto" loading="lazy" alt="client logo" />
						</div>
						<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
							<img src="./images/clients/google-cloud.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo" />
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}
