import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig(({ command }) => ({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
		// Nitro is only needed for the production build (Vercel deploy).
		// In dev it breaks the SSR environment (nitrojs/nitro#4295), so
		// rely on TanStack Start's built-in dev SSR instead.
		...(command === "build" ? [nitro()] : []),
	],
	environments: {
		ssr: { build: { rollupOptions: { input: "./src/server.ts" } } },
	},
}));

export default config;
