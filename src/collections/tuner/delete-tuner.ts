import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "#/infrastructures/middlewares/auth";
import { tunerRepository } from "#/repositories/tuner";
import { deleteTuner } from "#/usecases/tuner/delete-tuner";
import { tunerSchema } from "./schema";

// PUTおよびUPDATEは指定不可
export const deleteTunerFn = createServerFn({ method: "POST" })
	.validator(tunerSchema.pick({ id: true }))
	.middleware([authMiddleware])
	.handler(async ({ context, data }) => {
		await deleteTuner(
			{ id: data.id, ownerId: context.user.id },
			{ tunerRepository },
		);
	});
