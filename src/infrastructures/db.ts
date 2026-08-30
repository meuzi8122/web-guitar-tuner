import { type Client, createClient, type Row } from "@libsql/client";

export interface DbClient {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	execute: (params: { query: string; values?: any[] }) => Promise<Row[]>;
}

function createDbClient(client: Client): DbClient {
	return {
		execute: async ({ query, values }) => {
			const result = await client.execute(query, values);
			return result.rows;
		},
	};
}

// 開発サーバーで動作している間はdev=Trueになる（bun run devなど）
export const dbClient = createDbClient(
	createClient(
		process.env.NODE_ENV === "development"
			? {
					url: "file:web-tuner.db",
				}
			: {
					url: process.env.DATABASE_URL as string,
					authToken: process.env.DATABASE_AUTH_TOKEN,
				},
	),
);
