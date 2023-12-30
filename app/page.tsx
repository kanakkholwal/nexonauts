"use client"
import Footer from 'layouts/common/footer';
import Navbar from "./navbar";

export default function HomePage() {


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
					<p className="mt-8 text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>
					<div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
						<a href="#" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
							<span className="relative text-base font-semibold text-white">Get started</span>
						</a>
						<a href="#" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
							<span className="relative text-base font-semibold text-primary dark:text-white">Learn more</span>
						</a>
					</div>
					<div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
						<div className="text-left">
							<h6 className="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
							<p className="mt-2 text-gray-500">Some text here</p>
						</div>
						<div className="text-left">
							<h6 className="text-lg font-semibold text-gray-700 dark:text-white">The fastest on the market</h6>
							<p className="mt-2 text-gray-500">Some text here</p>
						</div>
						<div className="text-left">
							<h6 className="text-lg font-semibold text-gray-700 dark:text-white">The most loved</h6>
							<p className="mt-2 text-gray-500">Some text here</p>
						</div>
					</div>
				</div>
				<div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
					<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
						<img src="./images/clients/microsoft.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo"  />
					</div>
					<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
						<img src="./images/clients/airbnb.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo"  />
					</div>
					<div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
						<img src="./images/clients/google.svg" className="h-9 w-auto m-auto" loading="lazy" alt="client logo"  />
					</div>
					<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
						<img src="./images/clients/ge.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo"  />
					</div>
					<div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
						<img src="./images/clients/netflix.svg" className="h-8 w-auto m-auto" loading="lazy" alt="client logo"  />
					</div>
					<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
						<img src="./images/clients/google-cloud.svg" className="h-12 w-auto mx-auto" loading="lazy" alt="client logo"  />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="features">
		<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
			<div className="md:w-2/3 lg:w-1/2">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-secondary">
					<path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
				</svg>
				<h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
					A technology-first approach to payments
					and finance
				</h2>
				<p className="text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ad ipsum pariatur autem, fugit laborum in atque amet obcaecati? Nisi minima aspernatur, quidem nulla cupiditate nam consequatur eligendi magni adipisci.</p>
			</div><div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
				<div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
					<div className="relative space-y-8 py-12 p-8">
						<img src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png" className="w-12" width={512} height={512} alt="burger illustration" />
						<div className="space-y-2">
							<h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
								First feature
							</h5>
							<p className="text-gray-600 dark:text-gray-300">
								Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.
							</p>
						</div>
						<a href="#" className="flex items-center justify-between group-hover:text-secondary">
							<span className="text-sm">Read more</span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
								<path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
							</svg>                
						</a>
					</div>
				</div>
				<div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
					<div className="relative space-y-8 py-12 p-8">
						<img src="https://cdn-icons-png.flaticon.com/512/4341/4341134.png" className="w-12" width={512} height={512} alt="burger illustration" />
						<div className="space-y-2">
							<h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
								Second feature
							</h5>
							<p className="text-gray-600 dark:text-gray-300">
								Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.
							</p>
						</div>
						<a href="#" className="flex items-center justify-between group-hover:text-secondary">
							<span className="text-sm">Read more</span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
								<path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
							</svg>                
						</a>
					</div>
				</div>
				<div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
					<div className="relative space-y-8 py-12 p-8">
						<img src="https://cdn-icons-png.flaticon.com/512/4341/4341160.png" className="w-12" width={512} height={512} alt="burger illustration" />
						<div className="space-y-2">
							<h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
								Third feature
							</h5>
							<p className="text-gray-600 dark:text-gray-300">
								Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.
							</p>
						</div>
						<a href="#" className="flex items-center justify-between group-hover:text-secondary">
							<span className="text-sm">Read more</span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
								<path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
							</svg>                
						</a>
					</div>
				</div>
				<div className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
					<div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
						<img src="https://cdn-icons-png.flaticon.com/512/4341/4341025.png" className="w-12" width={512} height={512} alt="burger illustration" />
						<div className="space-y-2">
							<h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
								More features
							</h5>
							<p className="text-gray-600 dark:text-gray-300">
								Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.
							</p>
						</div>
						<a href="#" className="flex items-center justify-between group-hover:text-secondary">
							<span className="text-sm">Read more</span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
								<path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
							</svg>                
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="solution">
		<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-500">
				<path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
				<path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
			</svg><div className="space-y-6 justify-between text-gray-600 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
				<div className="md:5/12 lg:w-1/2">
					<img src="./images/pie.svg" alt="image" loading="lazy"  className="w-full" />
				</div>
				<div className="md:7/12 lg:w-1/2">
					<h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
						Nuxt development is carried out by passionate developers
					</h2>
					<p className="my-8 text-gray-600 dark:text-gray-300">
						Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
						Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia. <br /> <br /> Vitae error, quaerat officia delectus voluptatibus explicabo quo pariatur impedit, at reprehenderit aliquam a ipsum quas voluptatem. Quo pariatur asperiores eum amet.
					</p>
					<div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
						<div className="mt-8 flex gap-4 md:items-center">
							<div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-indigo-500 dark:text-indigo-400">
									<path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
								</svg>        
							</div>
							<div className="w-5/6">
								<h3 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">Chat Anytime</h3>
								<p className="text-gray-500 dark:text-gray-400">Asperiores nemo possimus nesciunt quam mollitia.</p>
							</div> 
						</div> 
						<div className="pt-4 flex gap-4 md:items-center">
							<div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">  
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400">
									<path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
								</svg>                                      
							</div>
							<div className="w-5/6">
								<h3 className="font-semibold text-lg text-gray-700 dark:text-teal-300">Real Time Location</h3>
								<p className="text-gray-500 dark:text-gray-400">Asperiores nemo possimus nesciunt quam mollitia.</p>
							</div> 
						</div> 
					</div>
				</div>
			</div>
		</div>
	</div>
	<div className="text-gray-600 dark:text-gray-300" id="reviews">
		<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
			<div className="mb-20 space-y-4 px-6 md:px-0">
				<h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
					We have some fans.
				</h2>
			</div><div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
				<div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
					<div className="flex gap-4">
						<img className="w-12 h-12 rounded-full" src="./images/avatars/avatar.webp" alt="user avatar" width={400} height={400} loading="lazy" />
						<div>
							<h6 className="text-lg font-medium text-gray-700 dark:text-white">Daniella Doe</h6>
							<p className="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
						</div>
					</div>
					<p className="mt-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquid quo eum quae quos illo earum ipsa doloribus nostrum minus libero aspernatur laborum cum, a suscipit, ratione ea totam ullam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
				</div>
				<div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
					<div className="flex gap-4">
						<img className="w-12 h-12 rounded-full" src="./images/avatars/avatar-1.webp" alt="user avatar" width={200} height={200} loading="lazy" />
						<div>
							<h6 className="text-lg font-medium text-gray-700 dark:text-white">Jane doe</h6>
							<p className="text-sm text-gray-500 dark:text-gray-300">Marketing</p>
						</div>
					</div>
					<p className="mt-8"> Lorem ipsum dolor laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
				</div>
				<div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
					<div className="flex gap-4">
						<img className="w-12 h-12 rounded-full" src="./images/avatars/avatar-2.webp" alt="user avatar" width={200} height={200} loading="lazy" />
						<div>
							<h6 className="text-lg font-medium text-gray-700 dark:text-white">Yanick Doe</h6>
							<p className="text-sm text-gray-500 dark:text-gray-300">Developer</p>
						</div>
					</div>
					<p className="mt-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
				</div>
				<div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
					<div className="flex gap-4">
						<img className="w-12 h-12 rounded-full" src="./images/avatars/avatar-3.webp" alt="user avatar" width={200} height={200} loading="lazy" />
						<div>
							<h6 className="text-lg font-medium text-gray-700 dark:text-white">Jane Doe</h6>
							<p className="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
						</div>
					</div>
					<p className="mt-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
				</div>
				<div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
					<div className="flex gap-4">
						<img className="w-12 h-12 rounded-full" src="./images/avatars/avatar-4.webp" alt="user avatar" width={200} height={200} loading="lazy" />
						<div>
							<h6 className="text-lg font-medium text-gray-700 dark:text-white">Andy Doe</h6>
							<p className="text-sm text-gray-500 dark:text-gray-300">Manager</p>
						</div>
					</div>
					<p className="mt-8"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
				</div>
				<div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
					<div className="flex gap-4">
						<img className="w-12 h-12 rounded-full" src="./images/avatars/avatar-2.webp" alt="user avatar" width={400} height={400} loading="lazy" />
						<div>
							<h6 className="text-lg font-medium text-gray-700 dark:text-white">Yanndy Doe</h6>
							<p className="text-sm text-gray-500 dark:text-gray-300">Mobile dev</p>
						</div>
					</div>
					<p className="mt-8">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.</p>
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
				<div className="flex items-center justify-center -space-x-2">
					<img loading="lazy" width={400} height={400} src="./images/avatars/avatar.webp" alt="member photo" className="h-8 w-8 rounded-full object-cover" />
					<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-2.webp" alt="member photo" className="h-12 w-12 rounded-full object-cover" />
					<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-3.webp" alt="member photo" className="z-10 h-16 w-16 rounded-full object-cover" />
					<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-4.webp" alt="member photo" className="relative h-12 w-12 rounded-full object-cover" />
					<img loading="lazy" width={200} height={200} src="./images/avatars/avatar-1.webp" alt="member photo" className="h-8 w-8 rounded-full object-cover" />
				</div>
				<div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
					<h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">Get Started now</h1>
					<p className="text-center text-xl text-gray-600 dark:text-gray-300">
						Be part of millions people around the world using tailus in modern User Interfaces.
					</p>
					<div className="flex flex-wrap justify-center gap-6">
						<a href="#" className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
							<span className="relative text-base font-semibold text-white dark:text-dark">Get Started</span>
						</a>
						<a href="#" className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max">
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
					Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum officia
					aliquid explicabo? Excepturi, voluptate?
				</p>
			</div><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
					<div className="relative overflow-hidden rounded-xl">
						<img src="https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" alt="art cover" loading="lazy" width={1000} height={667} className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
					</div>
					<div className="mt-6 relative">
						<h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
							De fuga fugiat lorem ispum laboriosam expedita.
						</h3>
						<p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
							Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
						</p>
						<a className="inline-block" href="#">
							<span className="text-info dark:text-blue-300">Read more</span>
						</a>
					</div>
				</div>
				<div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
					<div className="relative overflow-hidden rounded-xl">
						<img src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" alt="art cover" loading="lazy" width={1000} height={667} className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
					</div>
					<div className="mt-6 relative">
						<h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
							De fuga fugiat lorem ispum laboriosam expedita.
						</h3>
						<p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
							Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
						</p>
						<a className="inline-block" href="#">
							<span className="text-info dark:text-blue-300">Read more</span>
						</a>
					</div>
				</div>
				<div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
					<div className="relative overflow-hidden rounded-xl">
						<img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80" alt="art cover" loading="lazy" width={1000} height={667} className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
					</div>
					<div className="mt-6 relative">
						<h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
							De fuga fugiat lorem ispum laboriosam expedita.
						</h3>
						<p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
							Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
						</p>
						<a className="inline-block" href="#">
							<span className="text-info dark:text-blue-300">Read more</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

        <Footer />

    </>)
}