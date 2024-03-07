import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { TypewriterEffectSmooth } from "src/components/animations/typewriter-effect";

export default function HeroLayout() {
	const words = [
		{
			text: "Supercharge",
		},
		{
			text: "Development ",
		},
		{
			text: "with ",
		},
		{
			text: "Nexonauts.",
			className: "text-blue-500 dark:text-blue-500",
		},
	];

	return (
		<div className="relative" id="hero">
			<div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
				<div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
				<div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
			</div>
			<div className="max-w-7xl mx-auto relative isolate px-6 md:px-12 lg:px-8">
				<div
					className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
					/>
				</div>
				<div className="mx-auto pt-32 sm:pt-48 lg:pt-56">
					<div className="hidden sm:mb-8 sm:flex sm:justify-center">
						{/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-white/10 dark:text-gray-300">
							Case study
							{`  `}
							<a href="#" className="font-semibold text-primary">
								<span className="absolute inset-0" aria-hidden="true" />
								Read more <span aria-hidden="true">&rarr;</span>
							</a>
						</div> */}
					</div>
					<div className="text-center">
						<p className="mt-6 text-base leading-8 text-gray-600 dark:text-gray-400">
							Elevate Your Development Journey Today.
						</p>
						{/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
							Develop with Confidence {`\n`} Innovate with Ease
						</h1> */}
						<TypewriterEffectSmooth words={words} />

						<div className="mt-10 flex items-center justify-center flex-wrap  gap-6">
							<Button
								size="lg"
								className='rounded-full overflow-hidden relative flex h-12 w-full items-center justify-center px-6 sm:max-w-[12rem] shadow-lg shadow-primary/30 bg-primary/80 backdrop-blur'
								asChild>
								<Link href="/signup">
									Sign Up Now
								</Link>
							</Button>
							{/* <Button
								size="lg"
								variant="outline"
								className='rounded-full relative flex h-12 w-full items-center justify-center px-6 sm:w-max shadow shadow-accent'
								asChild>
								<Link href="/login">
									Login
									<ExternalLink className="w-5 h-5 ml-2" />
								</Link>
							</Button> */}
						</div>
						<div className="mt-56 flex items-center justify-center">
							<Button
								size="icon"
								variant="outline"
								className='rounded-full relative flex h-12 items-center justify-center w-max bg-transparent animate-moveVertical'
								asChild>
								<Link href="#solutions">
									<ChevronDown className="w-6 h-6" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
				<div
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					aria-hidden="true">
					<div
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
					/>
				</div>
			</div>
		</div>
	);
}

{/* <div className="lg:w-3/4 text-center mx-auto"> */ }
{/* <h1 className=" font-bold text-5xl md:text-6xl xl:text-7xl relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-300  dark:from-sky-600 dark:to-purple-300">
							Develop with Confidence {`\n`} Innovate with Ease
							<span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">reimagination.</span>
						</h1> */}
{/* <p className="mt-8 font-medium text-base text-gray-700 dark:text-gray-300">
							Build your next big thing with the best tools and resources available. Our platform is designed to help you create, innovate, and grow your developer experience.
							Welcome to our developer-centric platform, which is designed to help you create amazing digital products and services.
						</p> */}
{/* <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
							<Link href="/signup" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
								<span className="relative text-base font-semibold text-white">Get started</span>
							</Link>
							<Link href="#" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
								<span className="relative text-base font-semibold text-primary dark:text-white">Learn more</span>
							</Link>
						</div> */}

{/* </div> */ }
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