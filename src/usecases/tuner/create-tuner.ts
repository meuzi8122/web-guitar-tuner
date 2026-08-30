import type { Tuner } from "#/domains/entities/tuner";
import type { TunerRepository } from "#/repositories/interfaces/tuner";

export async function createTuner(
	params: { tuner: Omit<Tuner, "id"> },
	deps: { tunerRepository: TunerRepository; generateId: () => string },
) {
	const { tuner } = params;
	const { tunerRepository, generateId } = deps;

	await tunerRepository.createTuner({ tuner: { ...tuner, id: generateId() } });
}
