import Footer from 'app/layouts/footer';
import Navbar from "app/layouts/navbar";
import { LineChart, ScanSearch } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import dbConnect from 'src/lib/dbConnect';
import Post from 'src/models/post';

const features = [
	{
		name: 'Discover the Tools You Need',
		description: `Say goodbye to endless searches. Our intelligent search engine scours the web to find the simplest and most advanced tools for every facet of your development work. From AI-powered solutions to tried-and-tested classics, it's all here at your fingertips.`,
		icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png',
	},
	{
		name: 'Marketplace for Digital Creators',
		description: `Browse, buy, sell, and promote digital products in our vibrant marketplace. Whether you're looking for themes, templates, e-books, Figma designs, illustrations, fonts, and more, our marketplace connects you with a global community of creators and buyers.`,
		icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341134.png',
	},
	{
		name: 'Dev Tools Directory',
		description: `Simplify your development process with our curated directory of open-source tools. Access a wealth of resources to expedite your projects and collaborate with fellow developers seamlessly.`,
		icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341160.png',
	},
	{
		name: 'No-Code AI App Builder',
		description: `Unleash your creativity without boundaries. Our drag-and-drop AI app builder harnesses the power of LLMs APIs, allowing you to create and deploy applications effortlessly. Build, publish, and use your apps privately right from our platform.`,
		icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341025.png',
	},
	// {
	// 	name: 'Resource Hub for Continuous Learning',
	// 	description: `Stay ahead of the curve with our resource hub. Access a plethora of resources including tips, code snippets, useful website links, and insights to fuel continuous growth and learning.`,
	// 	icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341025.png',
	// },

]

export default async function HomePage() {
	await dbConnect();
	// get recent posts
	const articles = await Post.find({ state: 'published' })
		.sort({ createdAt: -1 })
		.populate('author')
		.limit(3)
		.select('title description slug image')
		.exec();



	return (<>
		<header>
			<Navbar />
		</header>
		<main className="space-y-40 mb-40">
			<div className="relative" id="home">
				<div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
					<div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
					<div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
				</div>
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<div className="relative pt-36 ml-auto">
						<div className="lg:w-2/3 text-center mx-auto">
							<h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Shaping a world with <span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">reimagination.</span></h1>
							<p className="mt-8 text-gray-700 dark:text-gray-300">
								At {process.env.NEXT_PUBLIC_WEBSITE_NAME}, we've built a comprehensive ecosystem tailored for developers like you. Whether you're a seasoned pro or just stepping into the world of coding, our platform offers a suite of tools and resources to streamline your journey and amplify your potential.


							</p>
							<div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
								<Link href="/signup" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
									<span className="relative text-base font-semibold text-white">Get started</span>
								</Link>
								<Link href="#" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
									<span className="relative text-base font-semibold text-primary dark:text-white">Learn more</span>
								</Link>
							</div>
							<div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between gap-4">
								<div className="text-left">
									<h6 className="text-lg font-semibold text-gray-700 dark:text-white">
										Use the best technology
									</h6>
									<p className="mt-2 text-gray-500 text-balance">
										Empower your creations with cutting-edge tools and advanced technology.
									</p>
								</div>
								<div className="text-left">
									<h6 className="text-lg font-semibold text-gray-700 dark:text-white">
										Build the best product
									</h6>
									<p className="mt-2 text-gray-500">
										Craft exceptional digital products that stand out in the market.
									</p>
								</div>
								<div className="text-left">
									<h6 className="text-lg font-semibold text-gray-700 dark:text-white">
										Promote your products
									</h6>
									<p className="mt-2 text-gray-500">
										Reach a global audience and showcase your creations to the world.
									</p>
								</div>
							</div>
						</div>
						<div className="mt-12  grid-cols-3 sm:grid-cols-4 md:grid-cols-6 hidden">
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
						</div>
					</div>
				</div>
			</div>
			<div id="solutions">
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<div className="md:w-2/3 lg:w-1/2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-secondary">
							<path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
						</svg>
						<h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
							Develop with Confidence, Innovate with Ease
						</h2>
						<p className="text-gray-600 dark:text-gray-300">
							Welcome to our developer-centric platform, designed to empower your journey in crafting exceptional digital products. We've curated a comprehensive suite of tools and resources that put developers at the forefront, enabling you to innovate, collaborate, and create without limitations.

						</p>
					</div><div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
						{features.map((feature, index) => {
							return (<div key={index} className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-slate-600/10 hover:bg-slate-100">
								<div className="relative space-y-8 py-12 p-8">
									<img src={feature.icon} className="w-12" width={512} height={512} alt="burger illustration" />
									<div className="space-y-2">
										<h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-primary/80">
											{feature.name}
										</h5>
										<p className="text-gray-600 dark:text-gray-300">
											{feature.description}
										</p>
									</div>
									<a href="#" className="flex items-center justify-between group-hover:text-primary">
										<span className="text-sm font-semibold">Read more</span>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
											<path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
										</svg>
									</a>
								</div>
							</div>)
						})}
					</div>
				</div>
			</div>
			<div id="get-started">
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-500">
						<path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
						<path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
					</svg><div className="space-y-6 justify-between text-gray-600 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
						<div className="md:5/12 lg:w-1/2">
							<img src="/assets/images/illustration_dashboard.png" alt="image" loading="lazy" className="w-full" />
						</div>
						<div className="md:7/12 lg:w-1/2">
							<h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
								Start Your Journey Today
							</h2>
							<p className="my-8 text-gray-600 dark:text-gray-300">
								Whether you're aiming to streamline your workflow, enhance your skills, or explore groundbreaking technologies, {process.env.NEXT_PUBLIC_WEBSITE_NAME} is your ultimate destination. Join us today and unlock a world of possibilities.
								<br />
								<br />
								Ready to revolutionize your development experience? Sign up now and embark on an exciting journey with {process.env.NEXT_PUBLIC_WEBSITE_NAME}.</p>
							<div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
								<div className="mt-8 flex gap-4 md:items-center">
									<div className="w-12 h-12 gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex justify-center items-center">
										<LineChart size={24} className='w-6 h-6 m-auto text-indigo-600 dark:text-indigo-400' />
									</div>
									<div className="w-5/6">
										<h3 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">Join Our Community</h3>
										<p className="text-gray-500 dark:text-gray-400">Become part of a thriving community of developers.</p>
									</div>
								</div>
								<div className="pt-4 flex gap-4 md:items-center">
									<div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">
										<ScanSearch size={24} className='w-6 h-6 m-auto text-teal-600 dark:text-teal-400' />
									</div>
									<div className="w-5/6">
										<h3 className="font-semibold text-lg text-gray-700 dark:text-teal-300">
											Discover New Pathways
										</h3>
										<p className="text-gray-500 dark:text-gray-400">Share insights, seek advice, and collaborate with like-minded individuals to propel your projects forward.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="relative py-16">
				<div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
					<div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
					<div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
				</div>
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<div className="relative">
						{/* <div className="flex items-center justify-center -space-x-2">
							<img loading="lazy" width={400} height={400} src="./images/avatars/avatar.webp" alt="member photo" className="h-8 w-8 rounded-full object-cover" />
							<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-2.webp" alt="member photo" className="h-12 w-12 rounded-full object-cover" />
							<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-3.webp" alt="member photo" className="z-10 h-16 w-16 rounded-full object-cover" />
							<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-4.webp" alt="member photo" className="relative h-12 w-12 rounded-full object-cover" />
							<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-1.webp" alt="member photo" className="h-8 w-8 rounded-full object-cover" />
						</div> */}
						<div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
							<h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">Get Started now</h1>
							<p className="text-center text-xl text-gray-600 dark:text-gray-300">
								Start creating, collaborating, and innovating with {process.env.NEXT_PUBLIC_WEBSITE_NAME} today.
							</p>
							<div className="flex flex-wrap justify-center gap-6">
								<Link href="/signup" className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
									<span className="relative text-base font-semibold text-white dark:text-dark">Get Started</span>
								</Link>
								<a href="/about" className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
									<span className="relative text-base font-semibold text-primary dark:text-white">More about</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="blog">
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<div className="mb-12 space-y-2 text-center">
						<h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">Latest Articles</h2>
						<p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
							Stay up-to-date with the latest news, trends, and insights from the world of technology.
						</p>
					</div>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<Suspense fallback={<div className="animate-pulse">Loading...</div>}>
						{articles.map((article) => {
							return (<div key={article._id} className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
								<div className="relative overflow-hidden rounded-xl">
									<img src={article.image} alt="art cover" loading="lazy" width={1000} height={667} className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
								</div>
								<div className="mt-6 relative">
									<h3 className="text-2xl font-semibold text-gray-800 dark:text-white line-clamp-2">
										{article.title}
									</h3>
									<p className="mt-6 mb-8 text-gray-600 dark:text-gray-300 line-clamp-3">
										{article.description}
									</p>
									<Link href={`/blog/${article.slug}`} className="inline-block">
										<span className="text-info dark:text-blue-300 font-semibold">Read more</span>
									</Link>
								</div>
							</div>)
						})}
						</Suspense>
					
					</div>
				</div>
			</div>
		</main>

		<Footer />

	</>)
}