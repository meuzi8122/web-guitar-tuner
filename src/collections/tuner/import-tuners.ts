import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "#/infrastructures/middlewares/auth";
import { tunerRepository } from "#/repositories/tuner";
import { importTuners } from "#/usecases/tuner/import-tuners";

export const importTunersFn = createServerFn({ method: "POST" })
	.validator((data: FormData) => {
		if (!(data instanceof FormData)) {
			throw new Error("Invalid form data");
		}
		const file = data.get("file");
		if (!(file instanceof File)) {
			throw new Error("file is required");
		}
		return { file };
	})
	.middleware([authMiddleware])
	.handler(async ({ context, data }) => {
		// guitarpro-parser は .gp/.gpx 内の XML を DOMParser でパースするが、
		// サーバー(Node)には DOMParser が無い。パーサー内蔵の linkedom フォールバックは
		// ESM SSR では解決できないため、ここで globalThis に自前ポリフィルしておく。
		if (typeof globalThis.DOMParser === "undefined") {
			const { DOMParser } = await import("linkedom");
			globalThis.DOMParser = DOMParser as unknown as typeof globalThis.DOMParser;
		}
		await importTuners(
			{
				tunerRepository,
				generateId: () => crypto.randomUUID(),
			},
			{
				file: data.file,
				ownerId: context.user.id,
			},
		);
	});
