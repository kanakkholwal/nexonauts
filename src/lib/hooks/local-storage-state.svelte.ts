import { browser } from "$app/environment";

export class LocalStorageState<T> {
	#key: string;
	#initial: T;
	#serializer: (value: T) => string;
	#deserializer: (raw: string) => T;
	value = $state<T>() as T;

	constructor(
		key: string,
		initial: T,
		options?: {
			serializer?: (value: T) => string;
			deserializer?: (raw: string) => T;
		}
	) {
		this.#key = key;
		this.#initial = initial;
		this.#serializer = options?.serializer ?? JSON.stringify;
		this.#deserializer = options?.deserializer ?? JSON.parse;

		this.value = browser ? this.#read() : initial;

		if (browser) {
			$effect.root(() => {
				$effect(() => {
					try {
						localStorage.setItem(this.#key, this.#serializer(this.value));
					} catch {
						// Quota exceeded or storage unavailable. Treat as ephemeral state.
					}
				});

				const onStorage = (event: StorageEvent) => {
					if (event.key === this.#key && event.newValue !== null) {
						try {
							this.value = this.#deserializer(event.newValue);
						} catch {
							// Ignore corrupt cross-tab payloads.
						}
					}
				};
				window.addEventListener("storage", onStorage);
				return () => window.removeEventListener("storage", onStorage);
			});
		}
	}

	#read(): T {
		try {
			const raw = localStorage.getItem(this.#key);
			return raw === null ? this.#initial : this.#deserializer(raw);
		} catch {
			return this.#initial;
		}
	}

	reset() {
		this.value = this.#initial;
	}
}
