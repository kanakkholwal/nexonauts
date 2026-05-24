import { browser } from "$app/environment";

export class MediaQuery {
	matches = $state<boolean>(false);
	#query: string;

	constructor(query: string, fallback = false) {
		this.#query = query;
		this.matches = fallback;

		if (browser) {
			$effect.root(() => {
				const mql = window.matchMedia(this.#query);
				this.matches = mql.matches;
				const listener = (event: MediaQueryListEvent) => {
					this.matches = event.matches;
				};
				mql.addEventListener("change", listener);
				return () => mql.removeEventListener("change", listener);
			});
		}
	}
}

export const isMobile = () => new MediaQuery("(max-width: 768px)");
