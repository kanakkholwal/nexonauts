import { Button } from "@/components/ui/button";
import Footer from 'app/layouts/footer';
import HeroSection from "app/layouts/hero";
import Navbar from "app/layouts/navbar-static";
import { ExternalLink, LineChart, ScanSearch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import dbConnect from 'src/lib/dbConnect';
import Post from 'src/models/post';

const features = [
	{
		name: 'Discover the Tools You Need',
		description: `Say good-bye to endless searching. Our ingenious search engine scours the web for the most basic and advanced tools for every phase of your development process. From AI-powered solutions to tried-and-true classics, it's everything at your fingertips.`,
		icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png',
		path: '/scout',
	},
	{
		name: 'Marketplace for Digital Creators',
		description: `Browse, purchase, sell, and promote digital products in our growing marketplace. Whether you're looking for themes, templates, e-books, Figma designs, designs, styles, or another product, our marketplace connects you to a global community of creators and buyers.`,
		icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341134.png',
		path: '/marketplace',
	},
	{
		name: 'Developer Tools',
		description: `Our curated catalogue of open-source tools can help you simplify your development process. Access a wide range of materials to help you accelerate your projects and collaborate with other developers smoothly.		`,
		icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341160.png',
		path: '/dev-tools',
	},
	// {
	// 	name: 'No-Code AI App Builder',
	// 	description: `Unleash your creativity without boundaries. Our drag-and-drop AI app builder harnesses the power of LLMs APIs, allowing you to create and deploy applications effortlessly. Build, publish, and use your apps privately right from our platform.`,
	// 	icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341025.png',
	// 	path: '/apps',
	// },
	// {
	// 	name: 'Resource Hub for Continuous Learning',
	// 	description: `Stay ahead of the curve with our resource hub. Access a plethora of resources including tips, code snippets, useful website links, and insights to fuel continuous growth and learning.`,
	// 	icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341025.png',
	// },

]
export const dynamic = 'force-dynamic';

export default async function HomePage() {
	await dbConnect();
	// get recent posts
	const articles = await Post.find({ state: 'published' })
		.sort({ createdAt: -1 })
		.limit(3)
		.select('title description slug image')
		.exec();



	return (<>
		<header>
			<Navbar />
		</header>
		<main className="space-y-20 mb-40">

			<HeroSection />
			<div id="solutions">
				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 w-full py-24 md:py-32">
					<div className="space-y-6 max-w-[42rem]">
						<h2 className="text-3xl font-bold text-start md:text-5xl">
							Explore Our Developer-Centric Solutions
						</h2>
						<p className="text-start text-lg">
							{/* Welcome to our developer-centric platform, which is designed to help you create amazing digital products and services. */}
							We've created a complete set of tools and resources that prioritise developers, allowing you to experiment, collaborate, and create without limitations.
						</p>
					</div>
					<div className="mt-16 grid lg:divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl grid-cols-1 lg:grid-cols-3 lg:divide-y-0">
						{features.map((feature, index) => {
							return (<div key={"solutions_" + index} className="group transition">
								<div className="relative py-12 p-8">
									<div className="space-y-8 mb-2">
										<div className='w-12 h-12 bg-primary/10 p-2 rounded-lg flex items-center justify-center'>
											<Image src={feature.icon} className="w-8 h-8" width={256} height={256} alt={feature.name + " | Nexonauts"} />
										</div>
										<h5 className="text-lg font-bold text-gray-700 dark:text-white">
											{feature.name}
										</h5>
									</div>
									<p className="text-gray-600 dark:text-gray-300 text-base">
										{feature.description}
									</p>
									<Link href={feature.path} className="flex items-center justify-between group-hover:text-primary mt-5">
										<span className="text-sm font-semibold">Learn more</span>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
											<path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
										</svg>
									</Link>
								</div>
							</div>)
						})}
					</div>
				</div>
			</div>
			<div id="dev-solutions" className="px-5">
				<div className="max-w-7xl mx-auto rounded-xl flex flex-col justify-center items-center w-full bg-cover relative overflow-hidden border border-transparent  bg-gradient-to-tr from-[#070523] from-[26.3%] to-[#0a0559] to-[91.13%] dark:bg-none dark:bg-slate-100/5 dark:border-border/50 shadow-xl backdrop-blur">
					<div className='flex justify-between items-stretch flex-col lg:flex-row'>
						<div className='py-16 px-6 md:pl-12 md:py-40 lg:py-20 text-center lg:text-start'>
							<h3 className='text-base font-semibold tracking-wide uppercase text-cyan-600 mb-4'>
								See all your developer portfolio at one place
							</h3>
							<h2 className='text-5xl font-bold tracking-wide text-white'>
								Turn your skills into shareable portfolio
							</h2>
							<p className='mt-6 text-lg text-gray-300'>
								Showcase your projects, skills, and experiences to the world. Create a stunning portfolio that reflects your unique style and personality.
							</p>
							<div className="mt-8 flex justify-center items-center flex-wrap  gap-6">

								<Button size="lg" className="relative flex h-12 w-full items-center justify-center sm:w-max rounded-full bg-secondary dark:bg-white text-secondary-foreground dark:text-gray-900 hover:bg-secondary/90 dark:hover:bg-white/95 px-6">Get Started for Free</Button>
								<Button size="lg" className="relative flex h-12 w-full items-center justify-center sm:w-max rounded-full bg-white/10 text-white hover:bg-white/15 dark:bg-white/10 dark:hover:bg-white/15 px-6">Live Preview<ExternalLink className="w-5 h-5 ml-2 inline-block" /></Button>
							</div>
							<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="rounded-2xl bg-white/5 text-white p-6">
									<h3 className="text-lg font-semibold text-white">Create a Portfolio</h3>
									<p className="text-gray-300">Showcase your work and skills in a stunning portfolio.</p>
								</div>
								<div className="rounded-2xl bg-white/5 text-white p-6">
									<h3 className="text-lg font-semibold text-white">Share Your Work</h3>
									<p className="text-gray-300">Share your portfolio with the world and get discovered.</p>
								</div>
								<div className="rounded-2xl bg-white/5 text-white p-6">
									<h3 className="text-lg font-semibold text-white">Get Discovered</h3>
									<p className="text-gray-300">Get discovered by potential employers and collaborators.</p>
								</div>
								<div className="rounded-2xl bg-white/5 text-white p-6">
									<h3 className="text-lg font-semibold text-white">Grow Your Career</h3>
									<p className="text-gray-300">Grow your career and network with like-minded individuals.</p>
								</div>
							</div>
						</div>
						<Image src="/assets/svg-images/home_profile.svg" alt="illustration" width={1000} height={667} className="w-full max-w-full h-full lg:w-1/2 md:w-[60%] m-auto rounded-lg" />
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
							<Image width={720} height={667} src="/assets/images/illustration_dashboard.png" alt="image" loading="lazy" className="w-full" />
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
									<span className="relative text-base font-semibold text-primary dark:text-white">
										Learn More 
									</span>
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
								return (<div key={article._id} className="group p-6 sm:p-8 ">
									<div className="relative overflow-hidden rounded-xl">
										<Image src={article.image} alt={article.title} loading="lazy" width={1000} height={667} className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
									</div>
									<div className="mt-6 relative">
										<h3 className="text-2xl font-semibold text-gray-800 dark:text-white line-clamp-2" title={article.title}>
											{article.title}
										</h3>
										<p className="mt-6 mb-8 text-gray-600 dark:text-gray-300 line-clamp-3">
											{article.description}
										</p>
										<Link href={`/blog/articles/${article.slug}`} className="inline-block" title={article.title}>
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