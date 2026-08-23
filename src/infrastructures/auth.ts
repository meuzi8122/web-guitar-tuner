import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
		},
	},
	plugins: [tanstackStartCookies()],
});
