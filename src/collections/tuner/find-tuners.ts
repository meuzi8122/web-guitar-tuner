import { createServerFn } from "@tanstack/react-start";
import { dbClient } from "#/infrastructures/db";
import { authMiddleware } from "#/infrastructures/middlewares/auth";

export const findTunersFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return (
			await dbClient.execute({
				query: "SELECT * FROM tuner WHERE owner_id = ?",
				values: [context.user.id],
			})
		).map((row) => ({
			id: row.id as string,
			name: row.name as string,
			ownerId: row.owner_id as string,
			tunings: JSON.parse(row.tunings as string),
		}));
	});
