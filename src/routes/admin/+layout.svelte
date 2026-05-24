<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import AppSidebar from "$lib/components/common/sidebar/app-sidebar.svelte";
	import AppNavbar from "$lib/components/common/sidebar/app-navbar.svelte";

	let { data, children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar
		user={data.session.user}
		moderator={data.session.user.role ?? "admin"}
		prefixPath="admin"
	/>
	<Sidebar.Inset class="relative z-0 flex w-full flex-1 flex-col">
		<AppNavbar
			user={data.session.user}
			impersonatedBy={data.session.session?.impersonatedBy ?? null}
		/>
		<main class="content @container z-2 h-full min-h-screen space-y-10 p-4 px-2 md:p-6">
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
