import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "#/infrastructures/middlewares/auth";
import { tunerRepository } from "#/repositories/tuner";
import { createTuner } from "#/usecases/tuner/create-tuner";
import { tunerSchema } from "./schema";

export const createTunerFn = createServerFn({ method: "POST" })
	.validator(tunerSchema)
	.middleware([authMiddleware])
	.handler(async ({ context, data }) => {
		await createTuner(
			{
				tuner: { ...data, ownerId: context.user.id },
			},
			{
				tunerRepository,
			},
		);
	});
