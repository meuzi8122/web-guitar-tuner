import { parseTabFile } from "guitarpro-parser";
import type { Tuner } from "#/domains/entities/tuner";
import type { TunerRepository } from "#/repositories/interfaces/tuner";

export async function importTuners(
	deps: { tunerRepository: TunerRepository; generateId: () => string },
	params: { file: File; ownerId: string },
) {
	const parsed = parseTabFile(new Uint8Array(await params.file.arrayBuffer()));

	const tuners: Tuner[] = parsed.tracks.map((track) => ({
		id: deps.generateId(),
		ownerId: params.ownerId,
		name: parsed.artist ? `${parsed.title} - ${parsed.artist}` : parsed.title,
		instrument: track.instrument ?? undefined,
		tunings: track.tuning.map((tuning, index) => ({
			position: (index + 1).toString(),
			note: tuning.name,
		})),
	}));

	await deps.tunerRepository.createMany({ tuners });
}
