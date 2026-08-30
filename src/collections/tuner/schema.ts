import { z } from "zod";

// ユーザーidはミドルウェアから取得するため、ここでは不要
export const tunerSchema = z.object({
	id: z.string(),
	name: z.string(),
	tunings: z.array(
		z.object({
			position: z.string(),
			note: z.string(),
		}),
	),
});
