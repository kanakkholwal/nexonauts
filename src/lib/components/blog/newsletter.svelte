<script lang="ts">
	import CalendarDays from "@lucide/svelte/icons/calendar-days";
	import Hand from "@lucide/svelte/icons/hand";
</script>

<div
	class="relative isolate overflow-hidden rounded-2xl bg-gray-900 py-16 sm:py-24 lg:py-32"
>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
		>
			<div class="max-w-xl lg:max-w-lg">
				<h2 class="text-4xl font-semibold tracking-tight text-white">
					Subscribe to our newsletter
				</h2>
				<p class="mt-4 text-lg text-gray-300">
					Stay updated with the latest news, articles, and insights from our team. Join our
					community of readers and never miss an update!
				</p>
				<form class="mt-6 flex max-w-md gap-x-4" method="POST" action="/api/newsletter">
					<label for="newsletter-email" class="sr-only">Email address</label>
					<input
						id="newsletter-email"
						name="email"
						type="email"
						required
						placeholder="Enter your email"
						autocomplete="email"
						class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
					/>
					<button
						type="submit"
						class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						Subscribe
					</button>
				</form>
			</div>

			<dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
				<div class="flex flex-col items-start">
					<div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
						<CalendarDays class="size-6 text-white" />
					</div>
					<dt class="mt-4 text-base font-semibold text-white">Weekly articles</dt>
					<dd class="mt-2 text-base/7 text-gray-400">
						Receive a curated selection of our latest articles and insights every week.
					</dd>
				</div>
				<div class="flex flex-col items-start">
					<div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
						<Hand class="size-6 text-white" />
					</div>
					<dt class="mt-4 text-base font-semibold text-white">No spam</dt>
					<dd class="mt-2 text-base/7 text-gray-400">
						We value your privacy and will never share your email with third parties.
					</dd>
				</div>
			</dl>
		</div>
	</div>

	<div
		aria-hidden="true"
		class="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
	>
		<div
			style:clip-path="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="aspect-1155/678 w-[1155px] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
		></div>
	</div>
</div>
