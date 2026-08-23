export type Theme = "light" | "dark";

const KEY = "nx-theme";

function read(): Theme {
	if (typeof document === "undefined") return "light";
	return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

class ThemeState {
	current = $state<Theme>(read());

	set(next: Theme) {
		this.current = next;
		if (typeof document === "undefined") return;
		document.documentElement.setAttribute("data-theme", next);
		try {
			localStorage.setItem(KEY, next);
		} catch {
			// Private mode. The inline script in app.html falls back to the OS setting.
		}
	}

	toggle() {
		this.set(this.current === "dark" ? "light" : "dark");
	}
}

export const theme = new ThemeState();
