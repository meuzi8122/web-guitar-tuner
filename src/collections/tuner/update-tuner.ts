import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "#/infrastructures/middlewares/auth";
import { tunerRepository } from "#/repositories/tuner";
import { updateTuner } from "#/usecases/tuner/update-tuner";
import { tunerSchema } from "./schema";

// PUTおよびUPDATEは指定不可
export const updateTunerFn = createServerFn({ method: "POST" })
	.validator(tunerSchema)
	.middleware([authMiddleware])
	.handler(async ({ context, data }) => {
		await updateTuner(
			{ tuner: { ...data, ownerId: context.user.id } },
			{ tunerRepository },
		);
	});
